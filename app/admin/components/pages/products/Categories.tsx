import { useState } from "react";
import { Payment, columns } from "./categories/columns";
import { DataTable } from "./categories/data-table";

function getData(): Payment[] {
  return [
    {
      id: "1234",
      name: "main category 1",
      description: "description 1 here",
      imageUrl: "/images/sample-pic.png",
    },
    {
      id: "1231",
      name: "Sub category 1",
      description: "description 2 here",
      imageUrl: "/images/sample-pic.png",
    },
    {
      id: "1222",
      name: "Super Sub category 2.1",
      description: "description 3 here",
      imageUrl: "/images/sample-pic.png",
    },
  ];
}

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>(getData());

  const handleAddCategory = (newCategory: {
    name: string;
    description: string;
    imageUrl: string;
  }) => {
    const newEntry: Payment = {
      id: Math.random().toString(36).substring(2),
      ...newCategory,
    };
    setData((prevData) => [...prevData, newEntry]);
  };

  const handleDelete = (id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
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
        onAddCategory={handleAddCategory}
      />
    </div>
  );
}
