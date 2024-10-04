import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface EditTagPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tagData: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  }) => void;
  tag?: { id: string; name: string; description: string; imageUrl: string };
}

export const EditTagPopup = ({
  isOpen,
  onClose,
  onSave,
  tag,
}: EditTagPopupProps) => {
  const [name, setName] = useState(tag?.name || "");
  const [description, setDescription] = useState(tag?.description || "");
  const [imageUrl, setImageUrl] = useState(tag?.imageUrl || "");

  useEffect(() => {
    if (tag) {
      setName(tag.name);
      setDescription(tag.description);
      setImageUrl(tag.imageUrl);
    }
  }, [tag]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tag) {
      onSave({ id: tag.id, name, description, imageUrl });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black">
      <div className="bg-[#89b8e7] rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold">Edit Tag</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded w-full px-2 py-1 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded w-full px-2 py-1 text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Image URL</label>

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
              className="text-[1em] p-0 border-[#606060] h-fit file:bg-[#313131] file:text-[#D9D9D9] file:px-[1em] file:py-[0.6em] file:me-[1em] file:cursor-pointer hover:file:text-white"
            />

            {/* <input
              type="file"
              accept="image/*"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border rounded w-full px-2 py-1"
            /> */}
          </div>
          <div className="flex justify-end">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="ml-2">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
