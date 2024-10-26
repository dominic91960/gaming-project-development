"use client";
import { useState } from "react";
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
import StatusPopup from "./OrderStatusPopup";

export type OrderItem = {
  productImage: string;
  productName: string;
  productCode: string;
  regularPrice: string; // Change to number if it's a numeric value
  quantity: number;
  total: string; // Change to number if it's a numeric value
};

export type AllOrdersNew = {
  id: string;
  order_id: string;
  username: string;
  order_total: string;
  status: string;
  date: string;
  items: OrderItem[]; // Include items property
};

export const columns: ColumnDef<AllOrdersNew>[] = [
  {
    accessorKey: "order_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "order_total",
    header: "Order Total",
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
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
