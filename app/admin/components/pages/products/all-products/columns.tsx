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

export type AllProductsNew = {
  id: string;
  name: string;
  displayName: string;
  about: string;
  cardDescription: string;
  language: string;
  date: string;
  icon: string;
  imageUrl: string;
  sku: string;
  stock: string;
  selling_price: string;
  regular_price: string;
  status: string;
  saleQuantity: number;
  coverImage: string;
  galleryImages: string[];
  latestImage: string;
  cardImage: string;
  videoUrl: string;
  addToLatestGame: boolean;
  carousel: boolean;
  displayLatestGame: boolean;
  platform: string;
  brand: string;
  minimumOS: string;
  minimumCPU: string;
  minimumRAM: string;
  minimumStorage: string;
  minimumGPU: string;
  recommendedOS: string;
  recommendedCPU: string;
  recommendedRAM: string;
  recommendedStorage: string;
  recommendedGPU: string;
};

export const columns: ColumnDef<AllProductsNew>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      const AllProductsNew = row.original;
      return (
        <div className="flex items-center size-[2em]">
          <img
            src={AllProductsNew.imageUrl}
            alt={AllProductsNew.name}
            className="w-full h-full rounded-full"
          />
        </div>
      );
    },
  },

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
    accessorKey: "sku",
    header: "SKU",
  },

  {
    accessorKey: "stock",
    header: "Stock",
  },

  {
    accessorKey: "selling_price",
    header: "Selling_Price",
  },

  {
    accessorKey: "regular_price",
    header: "Regular_Price",
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
