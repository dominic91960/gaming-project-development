import { useEffect, useState } from "react";
import { Tags, columns } from "./tags/columns";
import { DataTable } from "./tags/data-table";
import { EditTagPopup } from "./tags/EditTagPopup";
import axiosInstance from "@/axios/axiosInstance";
import { set } from "react-hook-form";
import toast from "react-hot-toast";

const getData = (): Tags[] => {
  return [
    {
      id: "1",
      name: "Tag 1",
      description: "Description for Tag 1",
      imageUrl: "/images/sample-pic.png",
    },
    {
      id: "2",
      name: "Tag 2",
      description: "Description for Tag 2",
      imageUrl: "/images/sample-pic.png",
    },
  ];
};

export default function TagsPage() {
  const [data, setData] = useState<Tags[]>([]);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tags | null>(null);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/tags")
      .then((response) => {
        setData(
          response.data.map((tag: any) => ({
            id: tag.id,
            name: tag.name,
            description: tag.description,
            imageUrl: tag.image || "/images/sample-pic.png",
          }))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reload]);

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

  const handleDelete = async (id: string) => {
    // setData((prevData) => prevData.filter((item) => item.id !== id));
    console.log("Delete tag with id: ", id);
    try {
      await axiosInstance.delete(`/tags/${id}`);
      // setData((prevData) => prevData.filter((item) => item.id !== id));
      toast.success("Tag deleted successfully");
      setReload((prev) => !prev);
    } catch (error) {
      toast.error("Error deleting tag");
      console.error(error);
    }
  };

  const handleEdit = (tag: Tags) => {
    // setEditingTag(tag);
    console.log("Edit tag with id: ", tag);
    setEditingTag(tag);
    setEditPopupOpen(true);
  };

  const handleSaveEdit = async (tagData: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  }) => {
    //
    console.log("Save tag with data: ", tagData);
    try {
      const data = {
        name: tagData.name,
        description: tagData.description,
        image: tagData.imageUrl,
      };
      const res = await axiosInstance.patch(`/tags/${tagData.id}`, data);
      if (res.status !== 200) {
        throw new Error("Failed to update tag");
      }
      toast.success("Tag updated successfully");
      setReload((prev) => !prev);
    } catch (error) {
      console.error(error);
      toast.error("Error updating tag");
    }
  };

  return (
    <div className="min-h-full font-primaryFont text-[8px] sm:text-[12px] md:text-[16px] xl:text-[20px] 2xl:text-[24px] pt-[3.5em] md:p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-md text-white">
      <div className="pb-[2em] px-[36px]">
        <h1 className="font-bold text-[1.5em] leading-none text-white">
          All Tags
        </h1>
        <p className="text-[0.9em] text-white md:text-[0.5em]">
          Products / Tags
        </p>
      </div>

      <DataTable
        columns={(onDelete) => columns(handleEdit, onDelete)}
        data={data}
        onDelete={handleDelete}
        onAddTags={handleAddTags}
      />
      <EditTagPopup
        isOpen={isEditPopupOpen}
        onClose={() => setEditPopupOpen(false)}
        onSave={handleSaveEdit}
        tag={editingTag ?? undefined}
      />
    </div>
  );
}
