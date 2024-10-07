import React, { useEffect } from "react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import axiosInstance from "@/axios/axiosInstance";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { set } from "react-hook-form";

interface AddCategoryPopProps {
  onAddCategory: (newCategory: {
    name: string;
    description: string;
    imageUrl: string;
    level: number;
    parentCategoryId: number | null;
  }) => void;
}

const AddCategoryPop: React.FC<AddCategoryPopProps> = ({ onAddCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState<string | null>(null); // To store selected parent category
  const [data, setData] = useState<any[]>([]);
  const [isImageInputDisabled, setIsImageInputDisabled] = useState(false);

  const handleSubmit = async () => {
    console.log(name, description, imageUrl, parentCategoryId);
    const level = data.find((item) => item.id == parentCategoryId)?.level + 1;
    console.log(level);

    const dataToSend = {
      name: name,
      description: description,
      image: imageUrl,
      level: level || 1,
      parentId: parentCategoryId,
    };

    try {
      const res = await axiosInstance.post("/categories", dataToSend);
      console.log(res.status);
      if (res.status === 201) {
        toast.success("Category added successfully");
        onAddCategory({
          name,
          description,
          imageUrl,
          level,
          parentCategoryId: parentCategoryId
            ? parseInt(parentCategoryId)
            : null,
        });
        setIsOpen(false);
      } else {
        toast.error("Failed to add category");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category");
    } finally {
      setName("");
      setDescription("");
      setImageUrl("");
      setParentCategoryId(null);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axiosInstance.get("/categories");
      const processedData = response.data.map((item: any) => {
        let name = item.name;
        if (item.level == 1) {
          name = "- " + name;
        } else if (item.level == 2) {
          name = "- - " + name;
        } else if (item.level == 3) {
          name = "- - - " + name;
        }
        return {
          id: item.id,
          name: name,
          description: item.description,
          imageUrl: item.image ? item.image.url : "/images/sample-pic.png",
          level: item.level,
        };
      });
      // console.log(processedData);
      setData(processedData);
    };
    getData();
  }, []);

  return (
    <>
      <button
        className="bg-[#00FFA1] font-bold text-black text-[0.95em] px-[2em] py-[1em] rounded hover:opacity-90 transition-opacity duration-100 flex-shrink-0"
        onClick={() => setIsOpen(true)}
      >
        Add Categories
      </button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gradient-to-tr from-black/40 from-15% to-[#00a76a66] border-[#0D6D49] backdrop-blur-[2px] rounded-sm font-primaryFont text-white text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] 2xl:text-[13px] p-[3em]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between border-b border-b-[#606060] pb-[1em] text-[1.5em]">
              <h2>Add Category</h2>
              <button
                className="text-[#00FFA1] hover:opacity-80 transition-opacity duration-100"
                onClick={() => setIsOpen(false)}
              >
                <IoClose />
              </button>
            </DialogTitle>
          </DialogHeader>

          <div className="font-medium lg:bg-black/50 lg:border lg:border-[#0D6D49] lg:mt-[1em] lg:px-[2em] lg:py-[3em] lg:rounded-sm">
            <div className="grid grid-cols-2 gap-x-[0.8em] 2xl:gap-x-[4.8em]">
              <div>
                <p className="mb-[0.5em]">Name</p>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-[1em] px-[1em] py-[0.6em] h-fit border-[#606060]"
                />
              </div>
              <div>
                <p className="mb-[0.5em]">Parent Category</p>
                <Select
                  onValueChange={(value) => setParentCategoryId(value)}
                  onOpenChange={(open: boolean) => {
                    open
                      ? setIsImageInputDisabled(true)
                      : setTimeout(() => setIsImageInputDisabled(false), 100);
                  }}
                >
                  <SelectTrigger className="h-fit px-[1em] py-[0.5em] border-[#606060] text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] 2xl:text-[13px]">
                    <SelectValue placeholder="Select Parent Category" />
                  </SelectTrigger>
                  <SelectContent className="h-[20em] overflow-y-scroll bg-transparent border border-[#606060] text-white backdrop-blur-[2px]">
                    {data.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                        className="h-fit ps-[5ch] pe-[1em] py-[0.5em] my-[1em] text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] 2xl:text-[13px]"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-[1.4em]">
              <p className="mb-[0.5em]">Image</p>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () =>
                      setImageUrl(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
                className="text-[1em] p-0 border-[#606060] h-fit file:bg-[#313131] file:text-[1em] file:text-[#D9D9D9] file:px-[1em] file:py-[0.6em] file:me-[1em] file:cursor-pointer hover:file:text-white"
                disabled={isImageInputDisabled}
              />
            </div>

            <div className="mt-[1.4em]">
              <p className="mb-[0.5em]">Description</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-w-[50ch] bg-transparent border border-[#606060] rounded-sm text-[1em] px-[1em] py-[0.6em] sm:w-[78ch]"
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-between items-center mt-[3.1em]">
            <p className="text-[0.8em] max-w-[45ch] sm:max-w-[65ch]">
              Please review and ensure that all the details you have entered are
              correct before submitting.
            </p>
            <button
              className="text-black font-semibold text-[1.1em] px-[1.5em] py-[0.5em] bg-[#00FFA1] rounded hover:opacity-90 transition-opacity duration-100"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCategoryPop;
