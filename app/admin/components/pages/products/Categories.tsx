import { useState } from "react";
import { Payment, columns } from "./categories/columns";
import { DataTable } from "./categories/data-table";
import AddCategoryPop from "./categories/AddCategoryPop";

function getData(): Payment[] {
  return [
    {
      id: "728ed52f1",
      name: "Steve",
      description: "description 1 here",
      imageUrl: "/images/sample-pic.png",
    },
    {
      id: "728ed52f2",
      name: "Jason",
      description: "description 2 here",
      imageUrl: "/images/sample-pic.png",
    },
    {
      id: "728ed52f3",
      name: "Mark",
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
    <div className="container mx-auto py-10">
      <AddCategoryPop onAddCategory={handleAddCategory} />
      <DataTable columns={columns} data={data} onDelete={handleDelete} />
    </div>
  );
}
