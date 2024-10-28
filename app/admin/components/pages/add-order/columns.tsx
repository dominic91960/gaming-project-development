"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type AllAddOrdersNew = {
  imageUrl: string;
  id: string;
  addorder_name: string;
  addorder_sku: string;
  addorder_cost: string;
  addorder_quantity: string;
  addorder_total: string;
};

export const columns: ColumnDef<AllAddOrdersNew>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      const AllAddOrdersNew = row.original;
      return (
        <div className="flex items-center size-[2em]">
          <img
            src={AllAddOrdersNew.imageUrl}
            alt={AllAddOrdersNew.addorder_name}
            className="w-full h-full rounded-full"
          />
        </div>
      );
    },
  },

  {
    accessorKey: "addorder_name",
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
    accessorKey: "addorder_sku",
    header: "SKU",
  },

  {
    accessorKey: "addorder_cost",
    header: "Cost",
  },

  {
    accessorKey: "addorder_quantity",
    header: "Quantity",
  },

  {
    accessorKey: "addorder_total",
    header: "Total",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
