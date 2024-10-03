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
      <Button onClick={() => setIsOpen(true)}>Add Categories</Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
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
