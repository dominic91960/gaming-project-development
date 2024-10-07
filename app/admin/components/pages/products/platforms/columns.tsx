"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Platforms = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export const columns = (
  onEdit: (platform: Platforms) => void,
  onDelete: (id: string) => void
): ColumnDef<Platforms>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-[1em] px-[1em] py-[0.5em] h-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-[0.5em] size-[1em]" />
        </Button>
      );
    },
  },

  {
    accessorKey: "description",
    header: "Description",
  },

  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      const Platforms = row.original;
      return (
        <div className="flex items-center size-[2em]">
          <img
            src={Platforms.imageUrl}
            alt={Platforms.name}
            className="w-full h-full rounded-full"
          />
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const Platforms = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="text-[1em]">
            <Button variant="ghost" className="size-[2em] p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-[1em]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-black/20 backdrop-blur-[2px] rounded-sm text-white border border-white/10 text-[14px]"
          >
            <DropdownMenuLabel className="text-[1em]">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="w-[90%] mx-auto bg-white/10" />
            <DropdownMenuItem
              onClick={() => onEdit(Platforms)} // Use onEdit to open the edit popup
              className="cursor-pointer text-[1em]"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(Platforms.id)}
              className="cursor-pointer text-[1em]"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
