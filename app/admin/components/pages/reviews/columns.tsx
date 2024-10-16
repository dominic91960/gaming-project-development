"use client";
import { useState } from "react";
import { Star } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import StatusPopup from "./StatusPopup";

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
    cell: ({ row }) => {
      const rating = parseInt(row.original.rating, 10);
      return (
        <div className="flex">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < rating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
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
    cell: ({ row }) => {
      const [showPopup, setShowPopup] = useState(false);
      const [status, setStatus] = useState(row.original.status);

      const handleStatusClick = () => {
        setShowPopup(true);
      };

      const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        row.original.status = newStatus; // Update the row's status value
      };

      return (
        <div className="relative">
          <button
            onClick={handleStatusClick}
            className="text-blue-500 underline"
          >
            {status}
          </button>
          {showPopup && (
            <StatusPopup
              initialStatus={status}
              onSave={handleStatusChange}
              onClose={() => setShowPopup(false)}
            />
          )}
        </div>
      );
    },
  },
];
