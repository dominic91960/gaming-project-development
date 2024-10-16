"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";

export type AllReviews = {
  imageUrl: string;
  author: string;
  id: string;
  rating: string;
  review: string;
  product: string;
  status: string;
};

export const columns: ColumnDef<AllReviews>[] = [
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      const AllReviews = row.original;
      return (
        <div className="flex items-center size-[2em]">
          <img
            src={AllReviews.imageUrl}
            alt={AllReviews.rating}
            className="w-full h-full rounded-full"
          />
        </div>
      );
    },
  },

  {
    accessorKey: "author",
    header: "Author",
  },

  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "review",
    header: "Review",
  },

  {
    accessorKey: "product",
    header: "Product",
  },

  {
    accessorKey: "status",
    header: "Status",
  },
];
