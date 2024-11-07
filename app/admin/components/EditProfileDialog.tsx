import React from "react";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaUser } from "react-icons/fa";
import { X } from "lucide-react";

const EditProfileDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="w-full h-fit flex items-center gap-[0.5em] px-[1em] py-[0.3em] rounded-none font-primaryFont uppercase hover:opacity-80">
          <FaUser className="text-[1.6em] text-[#00FFA1]" />
          Profile
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogPrimitive.Close>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
