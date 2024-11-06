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
import OrderDetailPopupCopy from "./OrderDetailPopup copy";
import { useOrderContext } from "@/context/OrderContext";

interface OrderItem {
  price: number;
  quantity: number;
  game: {
    cardImage: string;
    displayName: string;
    id: string;
    regularPrice: number;
  };
}

/* export type AllOrdersNew = {
  createdAt: string;
  id: string;
  order_id: string;
  username: string;
  totalAmount: string;
  status: string;
  items: OrderItem[]; // Include items property
}; */

export type AllOrdersNew1 = {
  createdAt: string;
  id: string;
  order_id: string;
  username: string;
  firstName: string;
  lastName: string;
  totalAmount: number;
  status: string;
  products: OrderItem[]; // Include items property
};

export const columns: ColumnDef<AllOrdersNew1>[] = [
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Order ID
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "user.username",
    header: "Username",
    cell: ({ row }) => {
      return <div className="flex">{row.original.firstName + " " + row.original.lastName}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return (
        <div className="relative">{row.original.createdAt.split("T")[0]}</div>
      );
    },
  },

  {
    accessorKey: "totalAmount",
    header: "Order Total",
    cell: ({ row }) => {
      return (
        <div className="flex text-end">
          {Math.max(row.original.totalAmount, 0).toFixed(2)}
        </div>
      );
    },
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
              id={row.original.id}
              onSave={handleStatusChange}
              onClose={() => setShowPopup(false)}
            />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const [selectedOrder, setSelectedOrder] = useState<AllOrdersNew1 | null>(
        null
      );
      const [isViewModalOpen, setIsViewModalOpen] = useState(false);

      const handleViewOrder = (order: AllOrdersNew1) => {
        setSelectedOrder(order);
        setIsViewModalOpen(true);
      };
      const {
        getAllOrders,
        currentPage,
        setCurrentPage,
        searchTerm,
        setSearchTerm,
        totalPages,
        setTotalPages,
        loading,
        deleteOrderById,
      } = useOrderContext();
      return (
        <div className="flex space-x-2">
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => deleteOrderById(row.original.id)}
          >
            Delete
          </button>

          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => handleViewOrder(row.original)}
          >
            View
          </button>
          <OrderDetailPopupCopy
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            products={row.original.products}
            order={row.original}
          />
        </div>
      );
    },
  },

  /* {
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
  }, */
];
