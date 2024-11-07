import React, { useState } from "react";

import axiosInstance from "@/axios/axiosInstance";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import { useToast } from "@/context/ToastContext";

interface EditPasswordProps {
  setProfile: React.Dispatch<
    React.SetStateAction<{
      avatar: string | null;
      id: string;
      username: string | null;
      email: string;
      firstName: string;
      lastName: string;
      // DOB: string | null;
      address: string | null;
      city: string | null;
      state: string | null;
      country: string | null;
      postalCode: string | null;
      password: string;
      tel: string;
      trustedDevices: number;
    }>
  >;
  onClose: () => void;
}

const EditPassword: React.FC<EditPasswordProps> = ({ setProfile, onClose }) => {
  const addToast = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [confirmUpdatedPassword, setConfirmUpdatedPassword] = useState("");
  const [isCurrentPasswordWrong, setIsCurrentPasswordWrong] = useState(false);
  const [isConfirmPasswordWrong, setIsConfirmPasswordWrong] = useState(false);
  const [isCurrentPasswordHidden, setIsCurrentPasswordHidden] = useState(true);
  const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

  const hanldeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (updatedPassword !== confirmUpdatedPassword) {
      setIsConfirmPasswordWrong(true);
      return;
    }

    const data = {
      oldPassword: currentPassword,
      newPassword: updatedPassword,
    };

    try {
      const res = await axiosInstance.patch("/auth/update-password", data);

      if (res.status === 200) {
        addToast("Password updated successfully!", "success");
        axiosInstance.patch("/auth/logout");
        localStorage.clear();
        window.location.href = "/sign-in";
      } else {
        throw new Error("Failed to update password");
      }
    } catch (error) {
      setIsCurrentPasswordWrong(true);
    }

    setProfile((prev) => ({
      ...prev,
      password: "xxxxxxxx",
    }));
  };

  return (
    <aside
      className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center px-[36px] backdrop-blur-md z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-[450px] h-fit bg-gradient-to-tr from-black to-[#007147] text-[8px] text-white border rounded-none p-[1.5em] overflow-auto z-10 sm:w-fit sm:max-w-none sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
        style={{
          borderImage: "linear-gradient(to bottom, #19D38E, #0D6D49) 1",
        }}
      >
        <div className="flex justify-between text-[1.125em] pb-[1em] border-b border-b-[#0D6D49]">
          <h4 className="font-bold">Change Password</h4>

          {/* Close button */}
          <IoClose
            className="text-[1.3em] text-[#00FFA1] cursor-pointer hover:scale-110"
            onClick={onClose}
          />
        </div>

        <form onSubmit={hanldeSubmit}>
          {/* Current password and new password */}
          <div className="grid grid-cols-2 gap-[2em] mt-[1em] sm:gap-[5em]">
            {/* Current password */}
            <div>
              <label htmlFor="current-password" className="block mb-[0.5em]">
                Current Password
              </label>
              <div className="w-full flex items-center border border-[#0BDB45]/50">
                <input
                  type={isCurrentPasswordHidden ? "password" : "text"}
                  id="current-password"
                  value={currentPassword}
                  onFocus={() => {
                    setIsCurrentPasswordWrong(false);
                    setIsConfirmPasswordWrong(false);
                  }}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-[85%] bg-transparent px-[0.6em] py-[0.3em] outline-none sm:w-[30ch]"
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
            </div>
          </div>
          {isCurrentPasswordWrong && (
            <p className="mt-[0.5em] text-[0.8em] text-[#FA6565]">
              Incorrect password. Please check and try again.
            </p>
          )}

          {/* New password and Confirm password */}
          <div className="grid grid-cols-2 gap-[2em] mt-[1em] sm:gap-[5em]">
            {/* New password */}
            <div>
              <label htmlFor="new-password" className="block mb-[0.5em]">
                New Password
              </label>
              <div className="w-full flex items-center border border-[#0BDB45]/50">
                <input
                  type={isNewPasswordHidden ? "password" : "text"}
                  id="new-password"
                  value={updatedPassword}
                  onFocus={() => {
                    setIsCurrentPasswordWrong(false);
                    setIsConfirmPasswordWrong(false);
                  }}
                  onChange={(e) => setUpdatedPassword(e.target.value)}
                  className="w-full bg-transparent px-[0.6em] py-[0.3em] outline-none"
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
            <div>
              <label htmlFor="confirm-password" className="block mb-[0.5em]">
                Confirm Password
              </label>
              <div className="w-full flex items-center border border-[#0BDB45]/50">
                <input
                  type={isConfirmPasswordHidden ? "password" : "text"}
                  id="confirm-password"
                  value={confirmUpdatedPassword}
                  onFocus={() => {
                    setIsCurrentPasswordWrong(false);
                    setIsConfirmPasswordWrong(false);
                  }}
                  onChange={(e) => setConfirmUpdatedPassword(e.target.value)}
                  className="w-full bg-transparent px-[0.6em] py-[0.3em] outline-none"
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
            </div>
          </div>
          {isConfirmPasswordWrong && (
            <p className="mt-[0.5em] text-[0.8em] text-[#FA6565]">
              Passwords mismatch. Make sure they are identical.
            </p>
          )}

          {/* Submit */}
          <div className="flex justify-end mt-[1.8em]">
            <Button
              type="submit"
              variant="gaming"
              className="h-fit text-[8px] px-[2em] py-[0.2em] rounded-none sm:text-[9px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </aside>
  );
};

export default EditPassword;
