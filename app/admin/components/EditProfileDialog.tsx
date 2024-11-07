import React from "react";
import Image from "next/image";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaUser } from "react-icons/fa";
import { X } from "lucide-react";
import { IoIosAddCircle } from "react-icons/io";

import sampleUser from "@/public/images/sample-user.png";
import EditPasswordDialog from "./EditPasswordDialog";

const EditProfileDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="font-primaryFont text-white">
        <button className="w-full h-fit flex items-center gap-[0.5em] px-[1em] py-[0.3em] rounded-none font-primaryFont uppercase hover:opacity-80">
          <FaUser className="text-[1.6em] text-[#00FFA1]" />
          Profile
        </button>
      </DialogTrigger>
      <DialogContent className="w-[320px] bg-gradient-to-tr from-black/40 to-[#00945E]/40 font-primaryFont text-white border-[#0D6D49] rounded-sm backdrop-blur-md sm:w-[500px] md:w-[680px] lg:w-[860px] xl:w-[970px] 2xl:w-[1070px]">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 text-[13px] mb-[0.7em] sm:text-[15px] md:text-[17px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]">
          <DialogTitle className="text-[1em]">Edit Profile</DialogTitle>
          <DialogPrimitive.Close>
            <X className="size-[18px] text-[#00FFA1] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] hover:opacity-80" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogHeader>
        <hr className="border-t-[#0D6D49]" />

        <DialogDescription className="text-white text-[10px] sm:text-[11px] md:grid md:grid-cols-12 md:gap-x-[2em] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
          {/* Image section */}
          <div className="flex items-center gap-[0.9em] px-[1.5em] leading-none rounded-sm md:col-span-4 md:h-4/5 md:flex-col md:text-center md:bg-black/40 md:py-[1.5em] md:border md:border-[#0D6D49] lg:col-span-3">
            <div className="relative size-[47px] rounded-full sm:size-[61px] md:size-[75px] lg:size-[89px] xl:size-[97px] 2xl:size-[105px]">
              <Image
                src={sampleUser.src}
                alt="username"
                fill
                className="rounded-full"
              />
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 text-[2em] text-[#0BDB45] cursor-pointer hover:opacity-80"
              >
                <IoIosAddCircle />
              </label>
              <input
                id="profile-image"
                type="file"
                className="hidden"
                accept="image/*"
              />
            </div>
            <div className="flex-grow">
              <h4 className="font-bold">Avishka Rathnayke</h4>
              <p className="text-[8px] mt-[0.4em] mb-[0.8em] opacity-70 sm:text-[8.5px] md:text-[9px] lg:text-[9.2px] xl:text-[9.5px] 2xl:text-[10px]">
                kavindakmanohara@gmail.com
              </p>
              <hr className="border-t-[#0D6D49]" />
            </div>
          </div>

          {/* Form section */}
          <div className="text-[9px] py-[1.5em] rounded-sm md:col-span-8 sm:text-[10px] md:bg-black/40 md:text-[11px] md:p-[1.5em] md:border md:border-[#0D6D49] lg:col-span-9 lg:text-[12px] xl:text-[12.5px] 2xl:text-[13px]">
            <h3 className="font-bold text-[12px] uppercase sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px] 2xl:text-[18px]">
              Personal details
            </h3>
            <form>
              {/* Grid for username */}
              <div className="grid grid-cols-2 gap-[1em] mt-[1em]">
                {/* Username */}
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.4em]"
                  />
                </div>
              </div>

              {/* Grid for firstname and lastname */}
              <div className="grid grid-cols-2 gap-[1em] mt-[1em]">
                {/* Firstname */}
                <div>
                  <label htmlFor="first-name">First Name</label>
                  <input
                    type="text"
                    id="first-name"
                    className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.4em]"
                  />
                </div>

                {/* Lastname */}
                <div>
                  <label htmlFor="last-name">Last Name</label>
                  <input
                    type="text"
                    id="last-name"
                    className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.4em]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mt-[1em]">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 border border-[#D9D9D9]/50 outline-none rounded-sm sm:py-[0.4em]"
                />
              </div>

              {/* <button
                type="button"
                className="bg-[#00FFA1] font-semibold text-black uppercase px-[1em] py-[0.5em] rounded-sm mt-[1.5em] hover:opacity-80"
              >
                Change password
              </button> */}
              <EditPasswordDialog />

              {/* Footer text and submit button */}
              <div className="flex items-center justify-between leading-none mt-[2.5em] md:mt-[12em]">
                <p className="max-w-[40ch] text-[8px] sm:max-w-[60ch] sm:text-[8.5px] md:text-[9px] lg:text-[9.5px] xl:text-[9.75px] 2xl:text-[10px]">
                  Please review and ensure that all the details you have entered
                  are correct before submitting.
                </p>
                <button className="bg-[#00FFA1] font-semibold text-black uppercase px-[1.4em] py-[0.8em] rounded-sm hover:opacity-80">
                  Save
                </button>
              </div>
            </form>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
