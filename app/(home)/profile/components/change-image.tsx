import React, { useRef, useEffect, ChangeEvent } from "react";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { IoMdClose } from "react-icons/io";
import { Button } from "@/components/ui/button";
import samplePic from "@/public/images/sample-pic.png";

interface ChangeImageProps {
  open: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  avatar: string | null;
  id: string | null;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  onSave: () => Promise<void>;
  onCancel: () => void;
}

const ChangeImage: React.FC<ChangeImageProps> = ({
  open,
  setIsOpen,
  avatar,
  id,
  onImageChange,
  onSave,
  onCancel,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onCancel();
        setIsOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel, open, setIsOpen]);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        ref={dialogRef}
        className="w-[500px] bg-gradient-to-tr from-black/40 from-20%  to-[#00935D]/40 font-primaryFont text-[16px] text-white py-[3.5em] border rounded-none backdrop-blur-[8px]"
        style={{
          borderImage: `linear-gradient(to bottom, #0D6D49 0%, #19D38E 100%) 1`,
        }}
      >
        <button
          className="absolute top-[1em] right-[1em] text-[16px] hover:opacity-70"
          onClick={() => {
            onCancel();
            setIsOpen(false);
          }}
        >
          <IoMdClose className="text-[#00FFA1] text-[1.5em]" />
        </button>

        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-col items-center text-center">
            <h4 className="font-bold text-[22px] pb-[0.6em]">
              Save Profile Picture!
            </h4>

            <hr className="w-4/5 mx-auto border-t-[#0D6D49]" />

            <div className="relative size-[46px] border-[6px] border-[#75F94C] my-[16px] rounded-full sm:size-[70px] md:size-[94px] lg:size-[118px] xl:size-[135px] 2xl:size-[152px]">
              <Image
                src={avatar || samplePic.src}
                alt={id || "Empty image"}
                className="w-full rounded-full"
                fill
              />
            </div>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="items-center justify-center text-[17px]">
          <input
            type="file"
            id="profile-image"
            accept="image/*"
            className="hidden"
            onChange={onImageChange}
          />

          <Button
            variant="gaming"
            className="w-1/2 h-fit text-[1em] mb-[0.8em] p-0 uppercase"
          >
            <label
              htmlFor="profile-image"
              className="w-fullpx-[1em] py-[0.5em] cursor-pointer"
            >
              Select another
            </label>
          </Button>

          <Button
            variant="gaming"
            className="w-1/2 h-fit text-[1em] mb-[0.8em] px-[1em] py-[0.5em] uppercase"
            onClick={onSave}
          >
            Save
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChangeImage;
