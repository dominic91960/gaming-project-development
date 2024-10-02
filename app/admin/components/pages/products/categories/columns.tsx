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

// Define the Payment type
export type Payment = {
  id: string;
  name: string;
  description: string;
  imageUrl: string; // New property for image URL
};

// Define columns and pass onDelete to handle the delete action
export const columns = (
  onDelete: (id: string) => void
): ColumnDef<Payment>[] => [
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
    accessorKey: "imageUrl", // New column for Image
    header: "Image",
    cell: ({ row }) => {
      const payment = row.original; // Access the row data (Payment object)
      return (
        <div className="flex items-center">
          <img
            src={payment.imageUrl}
            alt={payment.name}
            className="h-10 w-10 rounded-full" // Adjust height/width based on your needs
          />
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original; // Access the row data (Payment object)
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => alert(`Editing ${payment.name}`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(payment.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
