"use client";
"use stict";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditCategoryPop from "./EditCategoryPop";
import { useState } from "react";
import { set } from "react-hook-form";
import DeleteCategory from "../DeleteCategoryPopup";
import { useCategoryContext } from "@/context/CategoryContext";

export type Category = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  level: number;
};

export const columns = (
  onDelete: (id: string) => void,
  onEdit: (id: string) => void
): ColumnDef<Category>[] => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const {setEditCategory,editCategory} = useCategoryContext();

  const handleDeleteClick = (id: string) => {
    setShowDelete(true);
  };

  return [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="text-[1em] px-[1em] py-[0.5em] h-fit"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-[0.5em] size-[1em]" />
          </Button>
        );
      },
    },

    {
      accessorKey: "description",
      header: "Description",
    },

    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => {
        return (
          <div className="flex items-center size-[2em]">
            {/* <img
              src={row.original.imageUrl}
              alt="category_img"
              className="w-full h-full rounded-full"
            /> */}
            <Image
              src={row.original.imageUrl}
              alt="category_img"
              className="w-full h-full rounded-full"
              width={10}
              height={10}
            />
          </div>
        );
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <>
            <DropdownMenu>
              {/* <EditCategoryPop onAddCategory={()=>{}} isOpen={isOpen} setIsOpen={setIsOpen} /> */}
              <DropdownMenuTrigger asChild className="text-[1em]">
                <Button variant="ghost" className="size-[2em] p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="size-[1em]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-black/20 backdrop-blur-md rounded-sm text-white border border-white/10 text-[14px]"
              >
                <DropdownMenuLabel className="text-[1em]">
                  Actions
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="w-[90%] mx-auto bg-white/10" />
                <DropdownMenuItem
                  onClick={() => {
                    setIsOpen(true);
                    onEdit(payment.id);
                    setEditCategory(payment);
                  }}
                  className="cursor-pointer text-[1em]"
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDeleteClick(payment.id)}
                  className="cursor-pointer text-[1em]"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {showDelete && (
              <DeleteCategory
                currentId={payment.id}
                handleCancel={setShowDelete}
              />
            )}
          </>
        );
      },
    },
  ];
};
