"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type AllCouponsNew = {
  id: string;
  code: string;
  discount: string;
  type: string;
  startDate: string;
  endDate: string;
  description: string;
};

export const columns: ColumnDef<AllCouponsNew>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-[1em] px-[1em] py-[0.5em] h-fit rounded-sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Coupon Code
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
    accessorKey: "discount",
    header: "Discount",
  },

  {
    accessorKey: "type",
    header: "Type",
  },

  {
    accessorKey: "startDate",
    header: "Start Date",
  },

  {
    accessorKey: "endDate",
    header: "Expiry Date",
  },
];
