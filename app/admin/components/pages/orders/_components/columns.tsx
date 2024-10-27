"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type AllCustomersNew = {
  no: string;
  imageUrl: string;
  id: string;
  order_detail_name: string;
  order_detail_code: string;
  order_detail_regular_price: string;
  order_detail_quantity: string;
  order_detail_total: string;
};

export const columns: ColumnDef<AllCustomersNew>[] = [
  {
    accessorKey: "no",
    header: "No",
  },

  {
    accessorKey: "imageUrl",
    header: "Product Image",
    cell: ({ row }) => {
      const AllCustomersNew = row.original;
      return (
        <div className="flex items-center size-[2em]">
          <img
            src={AllCustomersNew.imageUrl}
            alt={AllCustomersNew.order_detail_name}
            className="w-full h-full rounded-full"
          />
        </div>
      );
    },
  },

  {
    accessorKey: "order_detail_name",
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
    accessorKey: "order_detail_code",
    header: "Product Code",
  },

  {
    accessorKey: "order_detail_regular_price",
    header: "Regular Price",
  },

  {
    accessorKey: "order_detail_quantity",
    header: "Quantity",
  },

  {
    accessorKey: "order_detail_total",
    header: "Total",
  },
];
