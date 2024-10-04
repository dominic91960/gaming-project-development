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

export type Tags = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export const columns = (
  onEdit: (tag: Tags) => void,
  onDelete: (id: string) => void
): ColumnDef<Tags>[] => [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
      const Tags = row.original;
      return (
        <div className="flex items-center">
          <img
            src={Tags.imageUrl}
            alt={Tags.name}
            className="h-10 w-10 rounded-full"
          />
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const Tags = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-black/20 backdrop-blur-sm rounded-sm text-white border border-white/10"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator className="w-[90%] mx-auto bg-white/10" />
            <DropdownMenuItem
              onClick={() => onEdit(Tags)} // Use onEdit to open the edit popup
              className="cursor-pointer"
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(Tags.id)}
              className="cursor-pointer"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
