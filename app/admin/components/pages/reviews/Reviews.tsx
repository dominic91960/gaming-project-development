import { useEffect, useState } from "react";
import { AllReviews, columns } from "./columns";
import { DataTable } from "./data-table";

import { ColumnDef } from "@tanstack/react-table";
import { IoTrash } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import axiosInstance from "@/axios/axiosInstance";
import toast from "react-hot-toast";



export default function AllCustomerReviews() {
  const [reviews, setReviews] = useState<AllReviews[]>([]);

  useEffect(() => {
    getAllReviews();
  }, []);

  const getAllReviews = async () => {
    try {
      const res = await axiosInstance.get("/reviews");
      setReviews(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  };

  const handleDeletecustomer = (id: string) => {
    setReviews((prevreviews) =>
      prevreviews.filter((review) => review.id !== id)
    );
    
  };

  const deleteReview = async  (id:string) => {
    try {
      const res = await axiosInstance.get("/reviews");
      setReviews(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    }
  }

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
