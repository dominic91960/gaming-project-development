import { useState } from "react";
import { Tags, columns } from "./tags/columns";
import { DataTable } from "./tags/data-table";
import { EditTagPopup } from "./tags/EditTagPopup"; // Import the popup component

// Sample data generation function
const getData = (): Tags[] => {
  return [
    {
      id: "1",
      name: "Tag 1",
      description: "Description for Tag 1",
      imageUrl: "path/to/image1.jpg",
    },
    {
      id: "2",
      name: "Tag 2",
      description: "Description for Tag 2",
      imageUrl: "path/to/image2.jpg",
    },
    // Add more initial tags as needed
  ];
};

export default function TagsPage() {
  const [data, setData] = useState<Tags[]>(getData());
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tags | null>(null);

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

  const handleEdit = (tag: Tags) => {
    setEditingTag(tag);
    setEditPopupOpen(true);
  };

  const handleSaveEdit = (tagData: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  }) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === tagData.id ? { ...item, ...tagData } : item
      )
    );
  };

  return (
    <div className="min-h-full font-primaryFont text-[24px] p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-md text-white">
      <div className="pb-[2em]">
        <h1 className="font-bold text-[36px] leading-none text-white">
          All Tags
        </h1>
        <p className="text-[12px] text-white">Products / Tags</p>
      </div>

      <DataTable
        columns={(onDelete) => columns(handleEdit, onDelete)} // Pass the edit handler
        data={data}
        onDelete={handleDelete}
        onAddTags={handleAddTags}
      />

      {/* Edit Popup */}
      <EditTagPopup
        isOpen={isEditPopupOpen}
        onClose={() => setEditPopupOpen(false)}
        onSave={handleSaveEdit}
        tag={editingTag}
      />
    </div>
  );
}
