"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/registry/new-york/ui/badge"
import { Checkbox } from "@/registry/new-york/ui/checkbox"

import { labels, priorities, statuses } from "../data/data"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { CircleSlash } from "lucide-react"
import { CheckCircledIcon } from "@radix-ui/react-icons"

export const columns: any[] | any = [
  {
    id: "select",
    header: ({ table }:any) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="ml-3 translate-y-[2px]"
      />
    ),
    cell: ({ row }:any) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="ml-3 translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "id",
  //   header: ({ column }:any) => (
  //     <DataTableColumnHeader column={column} title="Specialty Id" />
  //   ),
  //   cell: ({ row }:any) => (
  //     <div className="select-all truncate font-medium">
  //       {row.id || <CircleSlash />}
  //     </div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({ column }:any) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }:any) => {
      const label = labels.find((label) => label.value === row.original.name)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[100px] truncate font-medium">
            {row.getValue("name") || <CircleSlash />}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "code",
    header: ({ column }:any) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: ({ row }:any) => {
      const label = labels.find((label) => label.value === row.original.code)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[50px] truncate font-medium">
            {row.getValue("code") || <CircleSlash />}
          </span>
        </div>
      )
    },
  },
  // {
  //   accessorKey: "level",
  //   header: ({ column }:any) => (
  //     <DataTableColumnHeader column={column} title="Level" />
  //   ),
  //   cell: ({ row }:any) => {
  //     const label = labels.find((label) => label.value === row.original.name)

  //     return (
  //       <div className="flex space-x-2">
  //         {label && <Badge variant="outline">{label.label}</Badge>}
  //         <span className="max-w-[100px] truncate font-medium">
  //           {row.getValue("level") || <CircleSlash />}
  //         </span>
  //       </div>
  //     )
  //   },
  // },
  {
    accessorKey: "level",
    header: ({ column }:any) => (
      <DataTableColumnHeader column={column} title="level" />
    ),
    cell: ({ row }:any) => {
      // const status = statuses.find(
      //   (status) => status.value === row.getValue("level")
      // )
      // const status = statuses.find(
      //   (status) => status.value === row.getValue("level")
      // )
      // const status = statuses.map(
      //   (status) => status.value === row.getValue("level")
      // )

      // if (!status) {
      //   return null
      // }

      return (
        // <div className="flex w-[100px] items-center">
        //   {status.icon && (
        //     <status.icon className="mr-2 size-4 text-muted-foreground" />
        //   )}
        //   <span>{status.label}</span>
        // </div>
        <div className="flex w-[100px] items-center">
            <CheckCircledIcon className="text-muted-foreground mr-2 size-4" />
          
          <span>{row.getValue("level")}</span>
        </div>
      )
    },
    filterFn: (row:any, id:any, value:any) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "generalQuota",
    header: ({ column }:any) => (
      <DataTableColumnHeader column={column} title="General Quota" />
    ),
    cell: ({ row }:any) => {
      const label = labels.find((label) => label.value === row.original.name)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[50px] truncate font-medium">
            {row.getValue("generalQuota") || <CircleSlash />}
          </span>
        </div>
      )
    },
  },
  // {
  //   accessorKey: "code",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Code" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue("code")
  //     )

  //     if (!status) {
  //       return null
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className="text-muted-foreground mr-2 size-4" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Level" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("level")
  //     )

  //     if (!priority) {
  //       return null
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="text-muted-foreground mr-2 size-4" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Demand" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("demand")
  //     )

  //     if (!priority) {
  //       return null
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="text-muted-foreground mr-2 size-4" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  {
    id: "actions",
    header: ({ column }:any) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }:any) => <DataTableRowActions row={row} />,
  },
]
