"use client";
import { useState, useEffect } from "react";
import { Category, columns } from "./categories/columns";
import { DataTable } from "./categories/data-table";
import AddCategoryPop from "./categories/AddCategoryPop";
import axiosInstance from "@/axios/axiosInstance";
import { set } from "react-hook-form";
import toast from "react-hot-toast";
import { useCategoryContext } from "../../../../../context/CategoryContext";

export default function DemoPage() {
  // const [reload, setReload] = useState(false);
  const [isEitOpen, setIsEditOpen] = useState(false);
  const { categories, deleteCategoriesById, loading } = useCategoryContext();


  const handleAddCategory = (newCategory: {
    name: string;
    description: string;
    imageUrl: string;
    level: number;
  }) => {
    // const newEntry: Category = {
    //   id: Math.random().toString(36).substring(2),
    //   ...newCategory,
    // };
    // setData((prevData) => [...prevData, newEntry]);
    // setReload((prev) => !prev);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategoriesById(id);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleEdit = (id: string) => {
    console.log("Edit", id);
    setIsEditOpen(true);
    // setReload(prev => !prev);
  };

  return (
    <div className="min-h-full font-primaryFont text-[8px] sm:text-[12px] md:text-[16px] xl:text-[20px] 2xl:text-[24px] pt-[3.5em] md:p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-md text-white">
      <div className="pb-[2em] px-[36px]">
        <h1 className="font-bold text-[1.5em] leading-none text-white">
          All Categories
        </h1>
        <p className="text-[0.9em] text-white md:text-[0.5em]">
          Products / Categories
        </p>
      </div>
      <DataTable
        columns={columns}
        data={categories}
        onDelete={handleDelete}
        onEdit={handleEdit}
        isEditOpen={isEitOpen}
        setIsEditOpen={setIsEditOpen}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
}
