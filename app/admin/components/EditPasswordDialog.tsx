import React, { FormEvent, useRef, useState } from "react";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const EditPasswordDialog = () => {
  const currentPasswordRef = useRef<HTMLInputElement | null>(null);
  const newPasswordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const [isCurrentPasswordHidden, setIsCurrentPasswordHidden] = useState(true);
  const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

  const [isCurrentPasswordWrong, setIsCurrentPasswordWrong] = useState(false);
  const [doPasswordsMismatch, setDoPasswordsMismatch] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const password = currentPasswordRef.current?.value;
    const newPassword = newPasswordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (newPassword !== confirmPassword) setDoPasswordsMismatch(true);
    if (password !== "1234") setIsCurrentPasswordWrong(true);
  };

  const hideErrors = () => {
    isCurrentPasswordWrong && setIsCurrentPasswordWrong(false);
    doPasswordsMismatch && setDoPasswordsMismatch(false);
  };

  return (
    <Dialog>
      <DialogTrigger className="font-primaryFont text-white">
        <button
          type="button"
          className="bg-[#00FFA1] font-semibold text-black uppercase px-[1em] py-[0.5em] rounded-sm mt-[1.5em] hover:opacity-80"
        >
          Change password
        </button>
      </DialogTrigger>
      <DialogContent className="w-[320px] bg-gradient-to-tr from-black/40 to-[#00945E]/40 font-primaryFont text-white border-[#0D6D49] rounded-sm backdrop-blur-md sm:w-[400px] md:w-[480px] lg:w-[600px] xl:w-[680px] 2xl:w-[784px]">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 text-[13px] mb-[0.7em] sm:text-[15px] md:text-[17px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]">
          <DialogTitle className="text-[1em]">Change Password</DialogTitle>
          <DialogPrimitive.Close>
            <X className="size-[18px] text-[#00FFA1] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] hover:opacity-80" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogHeader>
        <hr className="border-t-[#0D6D49]" />

        <DialogDescription className="text-white text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
          {/* Form section */}
          <form onSubmit={handleSubmit}>
            {/* Current password */}
            <div className="mt-[1em]">
              <label htmlFor="current-password">Current Password</label>

              <div className="w-full flex items-center border border-[#D9D9D9]/50 rounded-sm">
                <input
                  type={isCurrentPasswordHidden ? "password" : "text"}
                  ref={currentPasswordRef}
                  id="current-password"
                  className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 outline-none rounded-sm sm:py-[0.4em]"
                  onFocus={hideErrors}
                  required
                />
                <button
                  type="button"
                  className="text-[1.8em] px-[0.3em] py-[0.2em] text-white/60 sm:text-[1.4em]"
                  onClick={() => setIsCurrentPasswordHidden((prev) => !prev)}
                >
                  {isCurrentPasswordHidden ? <BsEye /> : <BsEyeSlash />}
                </button>
              </div>

              {isCurrentPasswordWrong && (
                <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
                  Current password incorrect.
                </p>
              )}
            </div>
            <hr className="border-t-[#0D6D49] mt-[2em]" />

            {/* New password */}
            <div className="mt-[1.5em]">
              <label htmlFor="new-password">New Password</label>

              <div className="w-full flex items-center border border-[#D9D9D9]/50 rounded-sm">
                <input
                  type={isNewPasswordHidden ? "password" : "text"}
                  ref={newPasswordRef}
                  id="new-password"
                  className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 outline-none rounded-sm sm:py-[0.4em]"
                  onFocus={hideErrors}
                  required
                />
                <button
                  type="button"
                  className="text-[1.8em] px-[0.3em] py-[0.2em] text-white/60 sm:text-[1.4em]"
                  onClick={() => setIsNewPasswordHidden((prev) => !prev)}
                >
                  {isNewPasswordHidden ? <BsEye /> : <BsEyeSlash />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div className="mt-[1em]">
              <label htmlFor="confirm-password">Confirm Password</label>

              <div className="w-full flex items-center border border-[#D9D9D9]/50 rounded-sm">
                <input
                  type={isConfirmPasswordHidden ? "password" : "text"}
                  ref={confirmPasswordRef}
                  id="confirm-password"
                  className="w-full bg-transparent px-[1em] py-[0.2em] text-[#D9D9D9]/80 outline-none rounded-sm sm:py-[0.4em]"
                  onFocus={hideErrors}
                  required
                />
                <button
                  type="button"
                  className="text-[1.8em] px-[0.3em] py-[0.2em] text-white/60 sm:text-[1.4em]"
                  onClick={() => setIsConfirmPasswordHidden((prev) => !prev)}
                >
                  {isConfirmPasswordHidden ? <BsEye /> : <BsEyeSlash />}
                </button>
              </div>

              {doPasswordsMismatch && (
                <p className="text-[0.9em] mt-[0.3em] text-[#FF374E]">
                  Passwords do not match.
                </p>
              )}
            </div>

            {/* Footer text and submit button */}
            <div className="flex items-center justify-between leading-none mt-[2.5em] md:mt-[3em]">
              <p className="max-w-[40ch] text-[8px] sm:max-w-[60ch] sm:text-[8.5px] md:text-[9px] lg:text-[9.5px] xl:text-[9.75px] 2xl:text-[10px]">
                Please review and ensure that all the details you have entered
                are correct before submitting.
              </p>
              <button className="bg-[#00FFA1] font-semibold text-black uppercase px-[1.4em] py-[0.8em] rounded-sm hover:opacity-80">
                Save
              </button>
            </div>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default EditPasswordDialog;
