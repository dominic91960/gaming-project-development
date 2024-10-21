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

export type AllCouponsNew = {
  id: string;
  coupon_code: string;
  coupon_description: string;
  coupon_discount: string;
  coupon_type: string;
  coupon_start_date: string;
  coupon_end_date: string;
};

export const columns: ColumnDef<AllCouponsNew>[] = [
  {
    accessorKey: "coupon_code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Coupon Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "coupon_description",
    header: "Description",
  },

  {
    accessorKey: "coupon_discount",
    header: "Discount",
  },

  {
    accessorKey: "coupon_type",
    header: "Type",
  },

  {
    accessorKey: "coupon_start_date",
    header: "Start Date",
  },

  {
    accessorKey: "coupon_end_date",
    header: "Expiry Date",
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
