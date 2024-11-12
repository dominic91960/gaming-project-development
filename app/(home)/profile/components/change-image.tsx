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

interface ChangeImageProps {
  open: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  avatar: string;
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
        className="w-[224px] bg-gradient-to-tr from-black/40 from-20%  to-[#00935D]/40 font-primaryFont text-[10px] sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] text-white py-[1.5em] sm:py-[2em] md:py-[3.5em] border rounded-none backdrop-blur-[8px] sm:w-[300px] md:w-[360px] lg:w-[420px] xl:w-[460px] 2xl:w-[500px]"
        style={{
          borderImage: `linear-gradient(to bottom, #0D6D49 0%, #19D38E 100%) 1`,
        }}
      >
        <button
          className="absolute top-[1em] right-[1em] hover:opacity-70"
          onClick={() => {
            onCancel();
            setIsOpen(false);
          }}
        >
          <IoMdClose className="text-[#00FFA1] text-[1.5em]" />
        </button>

        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-col items-center text-center">
            <h4 className="font-bold text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[22px] pb-[0.6em]">
              Save Profile Picture!
            </h4>

            <hr className="w-4/5 mx-auto border-t-[#0D6D49]" />

            <div className="relative size-[68px] border-[3px] sm:border-[4px] md:border-[4.5px] lg:border-[5px] xl:border-[5.5px] 2xl:border-[6px] border-[#75F94C] mt-[12px] sm:mt-[18px] md:mt-[24px] lg:mt-[30px] xl:mt-[34px] 2xl:mt-[38px] sm:mb-[6px] md:mb-[12px] lg:mb-[18px] xl:mb-[22px] 2xl:mb-[26px] rounded-full sm:size-[89px] md:size-[110px] lg:size-[130px] xl:size-[141px] 2xl:size-[152px]">
              <Image
                src={avatar}
                alt={id || "Empty image"}
                className="w-full rounded-full"
                fill
              />
            </div>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter className="items-center justify-center text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[17px]">
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
              className="w-full px-[1em] py-[0.5em] cursor-pointer"
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
