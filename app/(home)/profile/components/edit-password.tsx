import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";

interface EditPasswordProps {
  password: string;
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

const EditPassword: React.FC<EditPasswordProps> = ({
  password,
  setProfile,
  onClose,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [confirmUpdatedPassword, setConfirmUpdatedPassword] = useState("");
  const [isCurrentPasswordWrong, setIsCurrentPasswordWrong] = useState(false);
  const [isConfirmPasswordWrong, setIsConfirmPasswordWrong] = useState(false);

  const hanldeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== currentPassword) {
      setIsCurrentPasswordWrong(true);
      return;
    }
    if (updatedPassword !== confirmUpdatedPassword) {
      setIsConfirmPasswordWrong(true);
      return;
    }

    setProfile((prev) => ({
      ...prev,
      password: updatedPassword,
    }));
    onClose();
  };

  return (
    <aside
      className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center px-[36px] backdrop-blur-md z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full h-fit bg-gradient-to-tr from-black to-[#007147] text-[8px] text-white border rounded-none p-[1.5em] overflow-auto z-10 sm:w-fit sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
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
          <div className="grid grid-cols-2 gap-[5em] mt-[1em]">
            {/* Current password */}
            <div>
              <label htmlFor="current-password" className="block mb-[0.5em]">
                Current Password
              </label>
              <input
                type="password"
                id="current-password"
                value={currentPassword}
                onFocus={() => {
                  setIsCurrentPasswordWrong(false);
                  setIsConfirmPasswordWrong(false);
                }}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none sm:w-[30ch]"
                required
              />
            </div>

            {/* New password */}
            <div>
              <label htmlFor="new-password" className="block mb-[0.5em]">
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                value={updatedPassword}
                onFocus={() => {
                  setIsCurrentPasswordWrong(false);
                  setIsConfirmPasswordWrong(false);
                }}
                onChange={(e) => setUpdatedPassword(e.target.value)}
                className="w-full bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
                required
              />
            </div>
          </div>
          {isCurrentPasswordWrong && (
            <p className="mt-[0.5em] text-[0.8em] text-[#8b8b8b]">
              Incorrect password. Please check and try again.
            </p>
          )}

          {/* Confirm password */}
          <div className="grid grid-cols-2 gap-[5em] mt-[1em]">
            <div>
              <label htmlFor="confirm-password" className="block mb-[0.5em]">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmUpdatedPassword}
                onFocus={() => {
                  setIsCurrentPasswordWrong(false);
                  setIsConfirmPasswordWrong(false);
                }}
                onChange={(e) => setConfirmUpdatedPassword(e.target.value)}
                className="w-full bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none"
                required
              />
            </div>
          </div>
          {isConfirmPasswordWrong && (
            <p className="mt-[0.5em] text-[0.8em] text-[#8b8b8b]">
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
