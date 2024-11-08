import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { IoClose } from "react-icons/io5";
import { uploadImage } from "@/components/helper/uploadImage";
import { uploadImageToObjectStore } from "@/components/helper/uploadImageToObjectStore";

interface EditBrandPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (brandData: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  }) => void;
  brand?: { id: string; name: string; description: string; imageUrl: string };
}

export const EditBrandPopup = ({
  isOpen,
  onClose,
  onSave,
  brand,
}: EditBrandPopupProps) => {
  const [name, setName] = useState(brand?.name || "");
  const [description, setDescription] = useState(brand?.description || "");
  const [imageUrl, setImageUrl] = useState(brand?.imageUrl || "");

  useEffect(() => {
    if (brand) {
      setName(brand.name);
      setDescription(brand.description);
      setImageUrl(brand.imageUrl);
    }
  }, [brand]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (brand) {
      onSave({ id: brand.id, name, description, imageUrl });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center font-medium text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] xl:text-[13px] z-50">
      <div className="w-fit bg-gradient-to-tr from-black/40 from-15% to-[#00a76a66] border-[#0D6D49] backdrop-blur-md rounded-sm font-primaryFont text-white p-[3em]">
        <div className="flex items-center justify-between border-b border-b-[#606060] pb-[1em] text-[1.5em]">
          <h2>Edit Brand</h2>
          <button
            className="text-[#00FFA1] hover:opacity-80 transition-opacity duration-100"
            onClick={onClose}
          >
            <IoClose />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="font-medium lg:bg-black/50 lg:border lg:border-[#0D6D49] my-[2.5em] lg:px-[2em] lg:py-[3em] lg:rounded-sm"
        >
          <div className="w-full grid grid-cols-2 gap-x-[0.8em] 2xl:gap-x-[4.8em]">
            <div className="grid">
              <label className="mb-[0.5em]">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border text-white border-[#606060] rounded w-full bg-transparent px-[1em] py-[0.5em] outline-none"
              />
            </div>
          </div>

          <div className="grid mt-[1.4em]">
            <label className="mb-[0.5em]">Image URL</label>
            <Input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const fileType = file.type;
                  // const url = await uploadImage(file, fileType);
                  const url = await uploadImageToObjectStore(file);
                  setImageUrl(url);
                }
              }}
              className="w-full text-[1em] p-0 border-[#606060] h-fit file:bg-[#313131] file:text-[1em] file:text-[#D9D9D9] file:px-[1em] file:py-[0.6em] file:me-[1em] file:cursor-pointer hover:file:text-white rounded-sm"
            />

            {/* <input
              type="file"
              accept="image/*"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border rounded w-full px-2 py-1"
            /> */}
          </div>

          <div className="grid mt-[1.4em]">
            <label className="mb-[0.5em]">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-transparent border border-[#606060] rounded-sm text-[1em] px-[1em] py-[0.6em] sm:w-[68ch]"
              rows={4}
            />
          </div>

          <div className="flex justify-between items-center mt-[3.1em]">
            <p className="text-[0.8em] max-w-[45ch] sm:max-w-[65ch]">
              Please review and ensure that all the details you have entered are
              correct before submitting.
            </p>
            <button
              type="submit"
              className="text-black font-semibold text-[1.1em] px-[1.5em] py-[0.5em] bg-[#00FFA1] rounded hover:opacity-90 transition-opacity duration-100"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
