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

export type AllOrdersNew = {
  imageUrl: string;
  id: string;
  customer_name: string;
  customer_id: string;
  customer_username: string;
  customer_country: string;
  customer_phone: string;
  status: string;
  date: string;
};

export const columns: ColumnDef<AllOrdersNew>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      const AllOrdersNew = row.original;
      return (
        <div className="flex items-center size-[2em]">
          <img
            src={AllOrdersNew.imageUrl}
            alt={AllOrdersNew.customer_name}
            className="w-full h-full rounded-full"
          />
        </div>
      );
    },
  },

  {
    accessorKey: "customer_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "customer_id",
    header: "Customer_id",
  },

  {
    accessorKey: "customer_username",
    header: "Customer_username",
  },

  {
    accessorKey: "customer_country",
    header: "Customer_country",
  },

  {
    accessorKey: "customer_phone",
    header: "customer_phone",
  },

  {
    accessorKey: "status",
    header: "Status",
  },

  {
    accessorKey: "date",
    header: "Date",
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
