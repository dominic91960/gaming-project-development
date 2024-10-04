import { useState } from "react";
import { Tags, columns } from "./tags/columns";
import { DataTable } from "./tags/data-table";

function getData(): Tags[] {
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

export default function TagsPage() {
  const [data, setData] = useState<Tags[]>(getData());

  const handleAddTags = (newTags: {
    name: string;
    description: string;
    imageUrl: string;
  }) => {
    const newEntry: Tags = {
      id: Math.random().toString(36).substring(2),
      ...newTags,
    };
    setData((prevData) => [...prevData, newEntry]);
  };

  const handleDelete = (id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-full font-primaryFont text-[24px] p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-md text-white">
      <div className="pb-[2em]">
        <h1 className="font-bold text-[36px] leading-none text-white">
          All Tags
        </h1>
        <p className="text-[12px] text-white">Products / Tags</p>
      </div>
      {/* <DataTable
        columns={columns}
        data={data}
        onDelete={handleDelete}
        onAddCategory={handleAddTags}
      /> */}

      <DataTable
        columns={columns}
        data={data}
        onDelete={handleDelete}
        onAddTags={handleAddTags}
      />
    </div>
  );
}
