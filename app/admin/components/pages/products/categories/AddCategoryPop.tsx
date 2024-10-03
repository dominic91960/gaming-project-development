import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface AddCategoryPopProps {
  onAddCategory: (newCategory: {
    name: string;
    description: string;
    imageUrl: string;
  }) => void;
}

const AddCategoryPop: React.FC<AddCategoryPopProps> = ({ onAddCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = () => {
    if (name && description && imageUrl) {
      onAddCategory({ name, description, imageUrl });

      setIsOpen(false);
      setName("");
      setDescription("");
      setImageUrl("");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <>
      <button
        className="bg-[#00FFA1] font-bold text-black text-[11px] px-[2em] py-[1em] rounded hover:opacity-90 transition-opacity duration-100"
        onClick={() => setIsOpen(true)}
      >
        Add Categories
      </button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-[#7eb9f3]">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Category Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Parent Cateogry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Parent 1">Parent 1</SelectItem>
                <SelectItem value="Sub Category 1.1">
                  Sub Category 1.1
                </SelectItem>
                <SelectItem value="Sub Category 1.1.1">
                  Sub Category 1.1.1
                </SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => setImageUrl(reader.result as string);
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>OK</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCategoryPop;
