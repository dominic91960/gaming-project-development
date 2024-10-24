import React, { useState } from "react";
import { StaticImageData } from "next/image";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";

interface VerifyOtpProps {
  updatedTel: string;
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

const VerifyOtp: React.FC<VerifyOtpProps> = ({
  updatedTel,
  setProfile,
  onClose,
}) => {
  const [inputOtp, setInputOtp] = useState("");

  const hanldeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setProfile((prev) => ({
    //   ...prev,
    //   tel: updatedTel,
    // }));
    onClose();
  };

  return (
    <div
      className="relative w-full h-fit flex flex-col items-center justify-center bg-gradient-to-tr from-black to-[#007147] text-[8px] text-white border rounded-none p-[1.5em] overflow-auto z-10 sm:w-[664px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
      style={{
        borderImage: "linear-gradient(to bottom, #19D38E, #0D6D49) 1",
      }}
    >
      {/* Close button */}
      <IoClose
        className="absolute top-[5%] right-[1.5%] text-[1.5em] text-[#00FFA1] cursor-pointer hover:scale-110"
        onClick={onClose}
      />

      {/* Title */}
      <h4 className="font-bold text-[1.125em] text-center pt-[1em] pb-[2em]">
        OTP Verification
      </h4>

      {/* Message */}
      <p className="text-[0.75em] text-center pb-[2em]">
        Enter the code from the sms we sent to
        <br />
        <span className="font-semibold">+8801774280874</span>
      </p>

      {/* Timer */}
      <p className="font-bold text-[0.75em] text-[#0BDB45] text-center pb-[2em]">
        00:34
      </p>

      {/* OTP */}
      <InputOTP maxLength={6} onChange={(value) => setInputOtp(value)}>
        <InputOTPGroup className="text-[1em] pb-[2em] *:text-[1em]">
          <InputOTPSlot index={0} className="first:rounded-l-none" />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} className="last:rounded-r-none" />
        </InputOTPGroup>
      </InputOTP>

      {/* Message */}
      <p className="text-[0.75em] text-center pb-[0.5em]">
        Didn&apos;t receive OTP code ?
      </p>

      {/* Resend */}
      <p className="font-bold text-[0.75em] text-[#0BDB45] text-center pb-[2em]">
        Resend
      </p>

      <form onSubmit={hanldeSubmit}>
        {/* Submit */}
        <Button
          type="submit"
          variant="gaming"
          className="h-fit text-[8px] px-[2em] py-[0.2em] rounded-none sm:text-[9px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]"
        >
          Enable SMS Authentication
        </Button>
      </form>
    </div>
  );
};

export default VerifyOtp;
