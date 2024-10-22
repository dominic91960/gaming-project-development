"use client";

import Image, { StaticImageData } from "next/image";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Order = {
  productId: string;
  poster: StaticImageData;
  name: string;
  price: number;
  quantity: number;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "productNo",
    header: "No",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "poster",
    header: "Product",
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.poster}
          alt={row.original.name}
          className="size-[3em]"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-fit text-[1em] px-[1em] py-[0.5em] rounded-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ms-[0.5em] size-[1em]" />
        </Button>
      );
    },
  },
  {
    accessorKey: "productId",
    header: "Product Code",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-fit text-[1em] px-[1em] py-[0.5em] rounded-none"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ms-[0.5em] size-[1em]" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "totalPrice",
    header: "Total",
    cell: ({ row }) => {
      const amount = row.original.price * row.original.quantity;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div>{formatted}</div>;
    },
  },
];
