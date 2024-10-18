"use client";
import { useState } from "react";
import { IoStar } from "react-icons/io5";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import StatusPopup from "./StatusPopup";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoIosArrowForward } from "react-icons/io";

export type AllReviews = {
  user: {
    profile_image: string;
    firstName: string;
  };
  game: {
    productName: string;
  };
  id: string;
  rating: string;
  comment: string;
  product: string;
  status: string;
  publish: string;
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
            src={AllReviews.user.profile_image}
            alt={AllReviews.rating}
            className="w-full h-full rounded-full"
          />
        </div>
      );
    },
  },

  {
    accessorKey: "user.firstName",
    header: "Author",
  },

  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-[1em] px-[1em] py-[0.5em] h-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rating
          <ArrowUpDown className="ml-[0.5em] size-[1em]" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rating = parseInt(row.original.rating, 10);
      return (
        <div className="flex gap-[0.3em]">
          {Array.from({ length: 5 }, (_, index) => (
            <IoStar
              key={index}
              className={`w-4 h-4 ${
                index < rating ? "text-[#f29d38]" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "comment",
    header: "Review",
  },

  {
    accessorKey: "game.productName",
    header: "Product",
  },

  {
    accessorKey: "publish",
    header: "Status",
    cell: ({ row }) => {
      const [showPopup, setShowPopup] = useState(false);
      const [status, setStatus] = useState(row.original.publish);

      const handleStatusClick = () => {
        setShowPopup(true);
      };

      const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        row.original.publish = newStatus;
      };

      return (
        <Popover open={showPopup}>
          <PopoverTrigger
            onClick={() => setShowPopup(true)}
            className="w-[10ch] capitalize hover:opacity-85"
          >
            <div className="flex items-center justify-between gap-[0.3em]">
              <p>{status}</p>
              <IoIosArrowForward className="text-[#00FFA1]" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[14em] bg-black/40 border-[#0D6D49] text-white backdrop-blur-md font-primaryFont">
            {/* <div className="relative">
              <button onClick={handleStatusClick} className="text white">
                {status}
              </button>
              {showPopup && (
                <StatusPopup
                  initialStatus={status}
                  onSave={handleStatusChange}
                  onClose={() => setShowPopup(false)}
                />
              )}
            </div> */}
            <StatusPopup
              initialStatus={status}
              id={row.original.id}
              onSave={handleStatusChange}
              onClose={() => setShowPopup(false)}
            />
          </PopoverContent>
        </Popover>
      );
    },
  },
];
