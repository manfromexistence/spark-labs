"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/registry/new-york/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"

import { labels } from "../data/data"
import { taskSchema } from "../data/schema"
import { Separator } from "@radix-ui/react-context-menu"
import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<any>) {
  const task = row.original

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex size-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">

        {/* <DropdownMenuItem>View</DropdownMenuItem>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              View
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[55%] min-w-[300px] max-w-[750px]">
            <div className="w-full flex flex-col gap-2 row.original-center justify-center p-3 text-sm">
              <div className="flex w-max min-w-full flex-col gap-2 rounded-lg border p-3 text-sm">
                <div className="flex gap-2">
                  <p>Subjects: </p>
                  <span className="font-semibold w-[250px] truncate">
                    {JSON.stringify(row.original.subjects, null, 2) || "No Subjects is Provided."}
                  </span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <p>Universities: </p>
                  <span className="font-semibold w-[250px] truncate">
                    {JSON.stringify(row.original.universities, null, 2) || "No Universities is Provided."}
                  </span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <p>MinScrores: </p>
                  <span className="font-semibold w-[250px] truncate">
                    {JSON.stringify(row.original.minScrores, null, 2) || "No MinScrores is Provided."}
                  </span>
                </div>
                <Separator />

                <div className="flex gap-2">
                  <p>Name: </p>
                  <span className="font-semibold">
                    {row.original.name || "No Name is Provided."}
                  </span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <p>Code: </p>
                  <span className="font-semibold">
                    {row.original.specialtyCode || "No Code is Provided."}
                  </span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <p>GeneralCompetition: </p>
                  <span className="font-semibold">
                    {row.original.possibleScoreGeneralCompetition || "No GeneralCompetition is Provided."}
                  </span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <p>possibleScoreRuralQuota: </p>
                  <span className="font-semibold">
                    {row.original.possibleScoreRuralQuota || "No possibleScoreRuralQuota is Provided."}
                  </span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <p>OrphanQuota: </p>
                  <span className="font-semibold">
                    {row.original.possibleScoreOrphanQuota || "No OrphanQuota is Provided."}
                  </span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <p>DisabilityQuota: </p>
                  <span className="font-semibold">
                    {row.original.possibleScoreDisabilityQuota || "No DisabilityQuota is Provided."}
                  </span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <p>LargeFamilyQuota: </p>
                  <span className="font-semibold">
                    {row.original.possibleScoreLargeFamilyQuota || "No LargeFamilyQuota is Provided."}
                  </span>
                </div>
              </div>
            </div>


          </DialogContent>
        </Dialog> */}



        <DropdownMenuSub>
          <DropdownMenuSubTrigger>View</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="min-w-[500px]">
            {/* <DropdownMenuRadioGroup value={task.label}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup> */}
            <div className="w-full flex flex-col gap-2 row.original-center justify-center p-3 text-sm">
              <div className="flex w-max min-w-full flex-col gap-2 rounded-lg border p-3 text-sm">
                {/* <div className="flex gap-2">
                  <p>Id: </p>
                  <span className="font-semibold w-[250px] truncate">
                    {row.original.id || "No Id is Provided."}
                  </span>
                </div>
                <Separator /> */}
                <div className="flex gap-2">
                  <p>Subjects: </p>
                  <span className="font-semibold w-[250px] truncate">
                    {row.original.subjects || "No Subjects is Provided."}
                  </span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <p>Universities: </p>
                  <span className="font-semibold w-[250px] truncate">
                    {row.original.universities || "No Universities is Provided."}
                  </span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <p>MinScrores: </p>
                  <span className="font-semibold w-[250px] truncate">
                    {row.original.minScrores || "No MinScrores is Provided."}
                  </span>
                </div>
                <Separator />

                <div className="flex gap-2">
                  <p>Name: </p>
                  <span className="font-semibold">
                    {row.original.name || "No Name is Provided."}
                  </span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <p>Level: </p>
                  <span className="font-semibold">
                    {row.original.level || "No Name is Provided."}
                  </span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <p>Code: </p>
                  <span className="font-semibold">
                    {row.original.specialtyCode || "No Code is Provided."}
                  </span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <p>GeneralCompetition: </p>
                  <span className="font-semibold">
                    {row.original.possibleScoreGeneralCompetition || "No GeneralCompetition is Provided."}
                  </span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <p>RuralQuota: </p>
                  <span className="font-semibold">
                    {row.original.possibleScoreRuralQuota || "No possibleScoreRuralQuota is Provided."}
                  </span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <p>OrphanQuota: </p>
                  <span className="font-semibold">
                    {row.original.possibleScoreOrphanQuota || "No OrphanQuota is Provided."}
                  </span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <p>DisabilityQuota: </p>
                  <span className="font-semibold">
                    {row.original.possibleScoreDisabilityQuota || "No DisabilityQuota is Provided."}
                  </span>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <p>LargeFamilyQuota: </p>
                  <span className="font-semibold">
                    {row.original.possibleScoreLargeFamilyQuota || "No LargeFamilyQuota is Provided."}
                  </span>
                </div>
              </div>
            </div>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem disabled={true}>Make a copy</DropdownMenuItem>
        <DropdownMenuItem disabled={true}>Favorite</DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem disabled={true}>
          Request Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
