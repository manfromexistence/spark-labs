import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  type Assertion,
  HeaderAssertion,
  StatusAssertion,
  serialize,
} from "@openstatus/assertions";
import { and, eq, inArray, isNull, sql } from "@openstatus/db";
import {
  insertMonitorSchema,
  maintenancesToMonitors,
  monitor,
  monitorTag,
  monitorTagsToMonitors,
  monitorsToPages,
  monitorsToStatusReport,
  notification,
  notificationsToMonitors,
  page,
  selectMaintenanceSchema,
  selectMonitorSchema,
  selectMonitorTagSchema,
  selectNotificationSchema,
  selectPublicMonitorSchema,
} from "@openstatus/db/src/schema";
import { allPlans } from "@openstatus/plans";

import { trackNewMonitor } from "../analytics";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const monitorRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertMonitorSchema)
    .output(selectMonitorSchema)
    .mutation(async (opts) => {
      const monitorLimit = allPlans[opts.ctx.workspace.plan].limits.monitors;
      const periodicityLimit =
        allPlans[opts.ctx.workspace.plan].limits.periodicity;

      const monitorNumbers = (
        await opts.ctx.db.query.monitor.findMany({
          where: and(
            eq(monitor.workspaceId, opts.ctx.workspace.id),
            isNull(monitor.deletedAt),
          ),
        })
      ).length;

      // the user has reached the limits
      if (monitorNumbers >= monitorLimit) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You reached your monitor limits.",
        });
      }

      // the user is not allowed to use the cron job
      if (
        opts.input.periodicity &&
        !periodicityLimit.includes(opts.input.periodicity)
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You reached your cron job limits.",
        });
      }

      // FIXME: this is a hotfix
      const {
        regions,
        headers,
        notifications,
        id,
        pages,
        tags,
        statusAssertions,
        headerAssertions,
        ...data
      } = opts.input;

      const assertions: Assertion[] = [];
      for (const a of statusAssertions ?? []) {
        assertions.push(new StatusAssertion(a));
      }
      for (const a of headerAssertions ?? []) {
        assertions.push(new HeaderAssertion(a));
      }

      const newMonitor = await opts.ctx.db
        .insert(monitor)
        .values({
          // REMINDER: We should explicitly pass the corresponding attributes
          // otherwise, unexpected attributes will be passed
          ...data,
          workspaceId: opts.ctx.workspace.id,
          regions: regions?.join(","),
          headers: headers ? JSON.stringify(headers) : undefined,
          assertions: assertions.length > 0 ? serialize(assertions) : undefined,
        })
        .returning()
        .get();

      if (notifications.length > 0) {
        const allNotifications = await opts.ctx.db.query.notification.findMany({
          where: and(
            eq(notification.workspaceId, opts.ctx.workspace.id),
            inArray(notification.id, notifications),
          ),
        });

        const values = allNotifications.map((notification) => ({
          monitorId: newMonitor.id,
          notificationId: notification.id,
        }));

        await opts.ctx.db.insert(notificationsToMonitors).values(values).run();
      }

      if (tags.length > 0) {
        const allTags = await opts.ctx.db.query.monitorTag.findMany({
          where: and(
            eq(monitorTag.workspaceId, opts.ctx.workspace.id),
            inArray(monitorTag.id, tags),
          ),
        });

        const values = allTags.map((monitorTag) => ({
          monitorId: newMonitor.id,
          monitorTagId: monitorTag.id,
        }));

        await opts.ctx.db.insert(monitorTagsToMonitors).values(values).run();
      }

      if (pages.length > 0) {
        const allPages = await opts.ctx.db.query.page.findMany({
          where: and(
            eq(page.workspaceId, opts.ctx.workspace.id),
            inArray(page.id, pages),
          ),
        });

        const values = allPages.map((page) => ({
          monitorId: newMonitor.id,
          pageId: page.id,
        }));

        await opts.ctx.db.insert(monitorsToPages).values(values).run();
      }

      await trackNewMonitor(opts.ctx.user, {
        url: newMonitor.url,
        periodicity: newMonitor.periodicity,
      });

      return selectMonitorSchema.parse(newMonitor);
    }),

  getMonitorById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async (opts) => {
      const _monitor = await opts.ctx.db.query.monitor.findFirst({
        where: and(
          eq(monitor.id, opts.input.id),
          eq(monitor.workspaceId, opts.ctx.workspace.id),
          isNull(monitor.deletedAt),
        ),
        with: {
          monitorTagsToMonitors: { with: { monitorTag: true } },
          maintenancesToMonitors: {
            with: { maintenance: true },
            where: eq(maintenancesToMonitors.monitorId, opts.input.id),
          },
        },
      });

      const parsedMonitor = selectMonitorSchema
        .extend({
          monitorTagsToMonitors: z
            .object({
              monitorTag: selectMonitorTagSchema,
            })
            .array(),
          maintenance: z.boolean().default(false).optional(),
        })
        .safeParse({
          ..._monitor,
          maintenance: _monitor?.maintenancesToMonitors.some(
            (item) =>
              item.maintenance.from.getTime() <= Date.now() &&
              item.maintenance.to.getTime() >= Date.now(),
          ),
        });

      if (!parsedMonitor.success) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not allowed to access the monitor.",
        });
      }
      return parsedMonitor.data;
    }),

  getPublicMonitorById: publicProcedure
    // REMINDER: if on status page, we should check if the monitor is associated with the page
    // otherwise, using `/public` we don't need to check
    .input(z.object({ id: z.number(), slug: z.string().optional() }))
    .query(async (opts) => {
      const _monitor = await opts.ctx.db.query.monitor.findFirst({
        where: and(
          eq(monitor.id, opts.input.id),
          isNull(monitor.deletedAt),
          eq(monitor.public, true),
        ),
      });
      if (!_monitor) return undefined;

      if (opts.input.slug) {
        const _page = await opts.ctx.db.query.page.findFirst({
          where: sql`lower(${page.slug}) = ${opts.input.slug} OR  lower(${page.customDomain}) = ${opts.input.slug}`,
          with: { monitorsToPages: true },
        });

        const hasPageRelation = _page?.monitorsToPages.find(
          ({ monitorId }) => _monitor.id === monitorId,
        );

        if (!hasPageRelation) return undefined;
      }

      return selectPublicMonitorSchema.parse(_monitor);
    }),

  update: protectedProcedure
    .input(insertMonitorSchema)
    .mutation(async (opts) => {
      if (!opts.input.id) return;

      const periodicityLimit =
        allPlans[opts.ctx.workspace.plan].limits.periodicity;

      // the user is not allowed to use the cron job
      if (
        opts.input?.periodicity &&
        !periodicityLimit.includes(opts.input?.periodicity)
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You reached your cron job limits.",
        });
      }

      const {
        regions,
        headers,
        notifications,
        pages,
        tags,
        statusAssertions,
        headerAssertions,
        ...data
      } = opts.input;

      const assertions: Assertion[] = [];
      for (const a of statusAssertions ?? []) {
        assertions.push(new StatusAssertion(a));
      }
      for (const a of headerAssertions ?? []) {
        assertions.push(new HeaderAssertion(a));
      }

      const currentMonitor = await opts.ctx.db
        .update(monitor)
        .set({
          ...data,
          regions: regions?.join(","),
          updatedAt: new Date(),
          headers: headers ? JSON.stringify(headers) : undefined,
          assertions: serialize(assertions),
        })
        .where(
          and(
            eq(monitor.id, opts.input.id),
            eq(monitor.workspaceId, opts.ctx.workspace.id),
            isNull(monitor.deletedAt),
          ),
        )
        .returning()
        .get();

      const currentMonitorNotifications = await opts.ctx.db
        .select()
        .from(notificationsToMonitors)
        .where(eq(notificationsToMonitors.monitorId, currentMonitor.id))
        .all();

      const addedNotifications = notifications.filter(
        (x) =>
          !currentMonitorNotifications
            .map(({ notificationId }) => notificationId)
            ?.includes(x),
      );

      if (addedNotifications.length > 0) {
        const values = addedNotifications.map((notificationId) => ({
          monitorId: currentMonitor.id,
          notificationId,
        }));

        await opts.ctx.db.insert(notificationsToMonitors).values(values).run();
      }

      const removedNotifications = currentMonitorNotifications
        .map(({ notificationId }) => notificationId)
        .filter((x) => !notifications?.includes(x));

      if (removedNotifications.length > 0) {
        await opts.ctx.db
          .delete(notificationsToMonitors)
          .where(
            and(
              eq(notificationsToMonitors.monitorId, currentMonitor.id),
              inArray(
                notificationsToMonitors.notificationId,
                removedNotifications,
              ),
            ),
          )
          .run();
      }

      const currentMonitorTags = await opts.ctx.db
        .select()
        .from(monitorTagsToMonitors)
        .where(eq(monitorTagsToMonitors.monitorId, currentMonitor.id))
        .all();

      const addedTags = tags.filter(
        (x) =>
          !currentMonitorTags
            .map(({ monitorTagId }) => monitorTagId)
            ?.includes(x),
      );

      if (addedTags.length > 0) {
        const values = addedTags.map((monitorTagId) => ({
          monitorId: currentMonitor.id,
          monitorTagId,
        }));

        await opts.ctx.db.insert(monitorTagsToMonitors).values(values).run();
      }

      const removedTags = currentMonitorTags
        .map(({ monitorTagId }) => monitorTagId)
        .filter((x) => !tags?.includes(x));

      if (removedTags.length > 0) {
        await opts.ctx.db
          .delete(monitorTagsToMonitors)
          .where(
            and(
              eq(monitorTagsToMonitors.monitorId, currentMonitor.id),
              inArray(monitorTagsToMonitors.monitorTagId, removedTags),
            ),
          )
          .run();
      }

      const currentMonitorPages = await opts.ctx.db
        .select()
        .from(monitorsToPages)
        .where(eq(monitorsToPages.monitorId, currentMonitor.id))
        .all();

      const addedPages = pages.filter(
        (x) => !currentMonitorPages.map(({ pageId }) => pageId)?.includes(x),
      );

      if (addedPages.length > 0) {
        const values = addedPages.map((pageId) => ({
          monitorId: currentMonitor.id,
          pageId,
        }));

        await opts.ctx.db.insert(monitorsToPages).values(values).run();
      }

      const removedPages = currentMonitorPages
        .map(({ pageId }) => pageId)
        .filter((x) => !pages?.includes(x));

      if (removedPages.length > 0) {
        await opts.ctx.db
          .delete(monitorsToPages)
          .where(
            and(
              eq(monitorsToPages.monitorId, currentMonitor.id),
              inArray(monitorsToPages.pageId, removedPages),
            ),
          )
          .run();
      }
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async (opts) => {
      const monitorToDelete = await opts.ctx.db
        .select()
        .from(monitor)
        .where(
          and(
            eq(monitor.id, opts.input.id),
            eq(monitor.workspaceId, opts.ctx.workspace.id),
          ),
        )
        .get();
      if (!monitorToDelete) return;

      await opts.ctx.db
        .update(monitor)
        .set({ deletedAt: new Date(), active: false })
        .where(eq(monitor.id, monitorToDelete.id))
        .run();

      await opts.ctx.db.transaction(async (tx) => {
        await tx
          .delete(monitorsToPages)
          .where(eq(monitorsToPages.monitorId, monitorToDelete.id));
        await tx
          .delete(monitorTagsToMonitors)
          .where(eq(monitorTagsToMonitors.monitorId, monitorToDelete.id));
        await tx
          .delete(monitorsToStatusReport)
          .where(eq(monitorsToStatusReport.monitorId, monitorToDelete.id));
        await tx
          .delete(notificationsToMonitors)
          .where(eq(notificationsToMonitors.monitorId, monitorToDelete.id));
      });
    }),

  getMonitorsByWorkspace: protectedProcedure.query(async (opts) => {
    const monitors = await opts.ctx.db.query.monitor.findMany({
      where: and(
        eq(monitor.workspaceId, opts.ctx.workspace.id),
        isNull(monitor.deletedAt),
      ),
      with: {
        monitorTagsToMonitors: { with: { monitorTag: true } },
      },
    });

    return z
      .array(
        selectMonitorSchema.extend({
          monitorTagsToMonitors: z
            .array(z.object({ monitorTag: selectMonitorTagSchema }))
            .default([]),
        }),
      )
      .parse(monitors);
  }),

  getMonitorsByPageId: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async (opts) => {
      const _page = await opts.ctx.db.query.page.findFirst({
        where: and(
          eq(page.id, opts.input.id),
          eq(page.workspaceId, opts.ctx.workspace.id),
        ),
      });

      if (!_page) return undefined;

      const monitors = await opts.ctx.db.query.monitor.findMany({
        where: and(
          eq(monitor.workspaceId, opts.ctx.workspace.id),
          isNull(monitor.deletedAt),
        ),
        with: {
          monitorTagsToMonitors: { with: { monitorTag: true } },
          monitorsToPages: {
            where: eq(monitorsToPages.pageId, _page.id),
          },
        },
      });

      return z
        .array(
          selectMonitorSchema.extend({
            monitorTagsToMonitors: z
              .array(z.object({ monitorTag: selectMonitorTagSchema }))
              .default([]),
          }),
        )
        .parse(
          monitors.filter((monitor) =>
            monitor.monitorsToPages
              .map(({ pageId }) => pageId)
              .includes(_page.id),
          ),
        );
    }),

  toggleMonitorActive: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async (opts) => {
      const monitorToUpdate = await opts.ctx.db
        .select()
        .from(monitor)
        .where(
          and(
            eq(monitor.id, opts.input.id),
            eq(monitor.workspaceId, opts.ctx.workspace.id),
            isNull(monitor.deletedAt),
          ),
        )
        .get();

      if (!monitorToUpdate) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Monitor not found.",
        });
      }

      await opts.ctx.db
        .update(monitor)
        .set({
          active: !monitorToUpdate.active,
        })
        .where(
          and(
            eq(monitor.id, opts.input.id),
            eq(monitor.workspaceId, opts.ctx.workspace.id),
          ),
        )
        .run();
    }),

  // rename to getActiveMonitorsCount
  getTotalActiveMonitors: publicProcedure.query(async (opts) => {
    const monitors = await opts.ctx.db
      .select({ count: sql<number>`count(*)` })
      .from(monitor)
      .where(eq(monitor.active, true))
      .all();
    if (monitors.length === 0) return 0;
    return monitors[0].count;
  }),

  // TODO: return the notifications inside of the `getMonitorById` like we do for the monitors on a status page
  getAllNotificationsForMonitor: protectedProcedure
    .input(z.object({ id: z.number() }))
    // .output(selectMonitorSchema)
    .query(async (opts) => {
      const data = await opts.ctx.db
        .select()
        .from(notificationsToMonitors)
        .innerJoin(
          notification,
          and(
            eq(notificationsToMonitors.notificationId, notification.id),
            eq(notification.workspaceId, opts.ctx.workspace.id),
          ),
        )
        .where(eq(notificationsToMonitors.monitorId, opts.input.id))
        .all();
      return data.map((d) => selectNotificationSchema.parse(d.notification));
    }),

  isMonitorLimitReached: protectedProcedure.query(async (opts) => {
    const monitorLimit = allPlans[opts.ctx.workspace.plan].limits.monitors;
    const monitorNumbers = (
      await opts.ctx.db.query.monitor.findMany({
        where: and(
          eq(monitor.workspaceId, opts.ctx.workspace.id),
          isNull(monitor.deletedAt),
        ),
      })
    ).length;

    return monitorNumbers >= monitorLimit;
  }),
});