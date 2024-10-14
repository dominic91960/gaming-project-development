"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Customers = {
  name: string;
  id: string;
  username: string;
  country: string;
  phone: number;
};

export const columns: ColumnDef<Customers>[] = [
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
    accessorKey: "id",
    header: "Id",
  },

  {
    accessorKey: "username",
    header: "Username",
  },

  {
    accessorKey: "country",
    header: "Country",
  },

  {
    accessorKey: "phone",
    header: "Phone",
  },
];
