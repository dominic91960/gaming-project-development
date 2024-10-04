'use client'
import { useState, useEffect } from "react";
import { Category, columns } from "./categories/columns";
import { DataTable } from "./categories/data-table";
import AddCategoryPop from "./categories/AddCategoryPop";
import axiosInstance from "@/axios/axiosInstance";
import { set } from "react-hook-form";
import toast from "react-hot-toast";

// function getData(): Category[] {
//   return [
//     {
//       id: "1234",
//       name: "main category 1",
//       description: "description 1 here",
//       imageUrl: "/images/sample-pic.png",
//     },
//     {
//       id: "1231",
//       name: "Sub category 1",
//       description: "description 2 here",
//       imageUrl: "/images/sample-pic.png",
//     },
//     {
//       id: "1222",
//       name: "Super Sub category 2.1",
//       description: "description 3 here",
//       imageUrl: "/images/sample-pic.png",
//     },
//   ];
// }

export default function DemoPage() {
  const [data, setData] = useState<Category[]>([]);
  const [reload, setReload] = useState(false);
  const [isEitOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response = await axiosInstance.get("/categories");
      console.log(response.data);
      const processedData = response.data.map((item: any) => {
        let name = item.name;
        if(item.level == 1) {
          name = "- " + name;
      }else if(item.level == 2) {

        name = "- - " + name;
      }else if(item.level == 3) {
        name = "- - - " + name;
      }
        return {
          id: item.id,
          name: name,
          description: item.description,
          imageUrl: item.image ? item.image.url : "/images/sample-pic.png",
        };
      }

    );
      setData(processedData);
    }
    getData();
  }, [reload]);

  const handleAddCategory = (newCategory: {
    name: string;
    description: string;
    imageUrl: string;
    level: number;
  }) => {
    const newEntry: Category = {
      id: Math.random().toString(36).substring(2),
      ...newCategory,
    };
    setData((prevData) => [...prevData, newEntry]);
  };

  const handleDelete = async (id: string) => {
    console.log("Delete", id);
    try{
      const res = await axiosInstance.delete(`/categories/${id}`);
      console.log("res",res);
      if(res.status === 200) {
        toast.success("Category deleted successfully");
      }else if(res.status === 404) {
        toast.error("Category not found");
      }else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      toast.error("Failed to delete category1");
      console.log("errrrr",error);
    }
    setReload(prev => !prev);
    // setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleEdit = (id: string) => {
    console.log("Edit", id);
    setIsEditOpen(true);
    // setReload(prev => !prev);
  };

  return (
    <div className="min-h-full font-primaryFont text-[8px] sm:text-[12px] md:text-[16px] xl:text-[20px] 2xl:text-[24px] pt-[3.5em] md:p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-[2px] text-white">
      <div className="pb-[2em] px-[36px]">
        <h1 className="font-bold text-[1.5em] leading-none text-white">
          All Categories
        </h1>
        <p className="text-[0.9em] text-white md:text-[0.5em]">
          Product / Categories
        </p>
      </div>
      <DataTable
        columns={columns}
        data={data}
        onDelete={handleDelete} 
        onEdit={handleEdit}
        isEditOpen={isEitOpen}
        setIsEditOpen={setIsEditOpen}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
}