import { useState } from "react";
import { AllReviews, columns } from "./columns";
import { DataTable } from "./data-table";

import { ColumnDef } from "@tanstack/react-table";
import { IoTrash } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";

function getInitialData(): AllReviews[] {
  return [
    {
      imageUrl: "/images/sample-pic.png",
      author: "Dominic Brian",
      id: "728ed512",
      rating: "4",
      review: "It was popularised in the 1960s with the...",
      product: "BL104",
      status: "active",
    },
    {
      imageUrl: "/images/sample-pic.png",
      author: "Steve Smith",
      id: "728ed534",
      rating: "3",
      review: "It was popularised in the 1960s with the...",
      product: "BL105",
      status: "active",
    },
    {
      imageUrl: "/images/sample-pic.png",
      author: "Ricky Ponting",
      id: "728ed556",
      rating: "5",
      review: "It was popularised in the 1960s with the...",
      product: "BL106",
      status: "active",
    },
  ];
}

export default function AllCustomerReviews() {
  const [reviews, setreviews] = useState<AllReviews[]>(getInitialData());

  const handleDeletecustomer = (id: string) => {
    setreviews((prevreviews) =>
      prevreviews.filter((review) => review.id !== id)
    );
  };

  const actionColumn: ColumnDef<AllReviews> = {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-x-[1em] w-[6ch] lg:w-fit lg:gap-x-[0.5em]">
        <button className="hover:opacity-80 transition-opacity duration-100">
          <LuPencilLine />
        </button>
        <button
          className="hover:opacity-80 transition-opacity duration-100"
          onClick={() => handleDeletecustomer(row.original.id)}
        >
          <IoTrash />
        </button>
      </div>
    ),
  };

  const columnsWithActions: ColumnDef<AllReviews>[] = [
    ...columns,
    actionColumn,
  ];

  return (
    <div className="min-h-full font-primaryFont text-[8px] sm:text-[12px] md:text-[16px] xl:text-[20px] 2xl:text-[24px] pt-[3.5em] md:p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-[2px] text-white">
      <div className="pb-[2em] px-[36px]">
        <h1 className="font-bold text-[1.5em] leading-none text-white">
          All Reviews
        </h1>
        <p className="text-[0.9em] text-white md:text-[0.5em]">Reviews</p>
      </div>

      {/* Data Table */}
      <DataTable columns={columnsWithActions} data={reviews} />
    </div>
  );
}
