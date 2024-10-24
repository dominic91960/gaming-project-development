import React, { useState } from "react";
import { StaticImageData } from "next/image";

import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import VerifyOtp from "./verify-otp";

interface EditTelProps {
  setProfile: React.Dispatch<
    React.SetStateAction<{
      avatar: StaticImageData;
      id: string;
      username: string | null;
      email: string;
      firstName: string;
      lastName: string;
      DOB: string | null;
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

const EditTel: React.FC<EditTelProps> = ({ setProfile, onClose }) => {
  const [updatedTel, setUpdatedTel] = useState("");
  const [isOtpPopupOpen, setIsOtpPopupOpen] = useState(false);

  const hanldeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOtpPopupOpen(true);
  };

  return (
    <aside
      className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center px-[36px] backdrop-blur-md z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {!isOtpPopupOpen && (
        <div
          className="w-full h-fit bg-gradient-to-tr from-black to-[#007147] text-[8px] text-white border rounded-none p-[1.5em] overflow-auto z-10 sm:w-fit sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
          style={{
            borderImage: "linear-gradient(to bottom, #19D38E, #0D6D49) 1",
          }}
        >
          <div className="flex justify-between text-[1.125em] pb-[1em] border-b border-b-[#0D6D49]">
            <h4 className="font-bold">Manage Phone Number</h4>

            {/* Close button */}
            <IoClose
              className="text-[1.3em] text-[#00FFA1] cursor-pointer hover:scale-110"
              onClick={onClose}
            />
          </div>

          <form onSubmit={hanldeSubmit}>
            {/* Confirm password */}
            <div className="grid grid-cols-2 gap-[5em] mt-[1em]">
              <div>
                <label htmlFor="phone-number" className="block mb-[0.5em]">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone-number"
                  value={updatedTel}
                  onChange={(e) => setUpdatedTel(e.target.value)}
                  className="w-full bg-transparent px-[0.6em] py-[0.3em] border border-[#0BDB45]/50 outline-none sm:w-[30ch]"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end mt-[1.8em]">
              <Button
                type="submit"
                variant="gaming"
                className="h-fit text-[8px] px-[2em] py-[0.2em] rounded-none sm:text-[9px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]"
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      )}

      {isOtpPopupOpen && (
        <VerifyOtp
          updatedTel={updatedTel}
          setProfile={setProfile}
          onClose={() => setIsOtpPopupOpen(false)}
        />
      )}
    </aside>
  );
};

export default EditTel;
