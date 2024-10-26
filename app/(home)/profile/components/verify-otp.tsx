import React, { useEffect, useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";

interface VerifyOTPProps {
  updatedTel: string;
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
  onSuccess: () => void;
}

const VerifyOTP: React.FC<VerifyOTPProps> = ({
  updatedTel,
  setProfile,
  onClose,
  onSuccess,
}) => {
  const [OTP, setOTP] = useState("");
  const [expirationTime, setExpirationTime] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [inputOTP, setInputOTP] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  useEffect(() => {
    setOTP("123456");

    const OTPExpirationTime = new Date();
    OTPExpirationTime.setMinutes(OTPExpirationTime.getMinutes() + 2);

    setExpirationTime(OTPExpirationTime);
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const handleSubmit = () => {
    const currentTime = new Date();
    const remainingTime = expirationTime.getTime() - currentTime.getTime();
    console.log(inputOTP.length);

    if (inputOTP === "" || inputOTP.length !== 6) {
      setErrorMessage("Please enter the OTP to continue.");
      return;
    }
    if (remainingTime < 1) {
      setInputOTP("");
      setErrorMessage("The OTP has expired. Please request a new one.");
      return;
    }
    if (OTP !== inputOTP) {
      setInputOTP("");
      setErrorMessage("Invalid OTP. Please check and try again.");
      return;
    }
    setProfile((prev) => ({ ...prev, tel: updatedTel }));
    onClose();
    onSuccess();
  };

  return (
    <div
      className="relative w-full h-fit flex flex-col items-center justify-center bg-gradient-to-tr from-black to-[#007147] text-[8px] text-white border rounded-none p-[1.5em] overflow-auto z-10 sm:text-[9px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px] sm:w-[400px] md:w-[500px] lg:w-[580px] xl:w-[630px] 2xl:w-[680px]"
      style={{
        borderImage: "linear-gradient(to bottom, #19D38E, #0D6D49) 1",
      }}
    >
      {/* Close button */}
      <IoClose
        className="absolute top-[0.7em] right-[0.7em] text-[1.5em] text-[#00FFA1] cursor-pointer hover:scale-110"
        onClick={onClose}
      />

      {/* Title */}
      <h4 className="font-bold text-[1.6em] text-center pt-[1em] pb-[2em]">
        OTP VERIFICATION
      </h4>

      {/* Message */}
      <p className="text-center pb-[2em]">
        Enter the code from the sms we sent to
        <br />
        <span className="font-semibold">{updatedTel}</span>
      </p>

      {/* Timer */}
      <p className="font-bold text-[#0BDB45] text-center pb-[2em]">
        {`${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`}
      </p>

      {/* OTP */}
      <InputOTP
        maxLength={6}
        value={inputOTP}
        onFocus={() => setErrorMessage(null)}
        onChange={(value) => setInputOTP(value)}
      >
        <InputOTPGroup className="text-[1em] *:text-[1.2em] *:size-[3em]">
          <InputOTPSlot index={0} className="first:rounded-l-none" />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} className="last:rounded-r-none" />
        </InputOTPGroup>
      </InputOTP>
      {errorMessage && (
        <p className="mt-[0.7em] text-[0.9em] text-[#8b8b8b]">{errorMessage}</p>
      )}

      {/* Message */}
      <p className="text-center  pt-[2em] pb-[0.5em]">
        Didn&apos;t receive OTP code ?
      </p>

      {/* Resend */}
      <button className="font-bold text-[#0BDB45] text-center pb-[2em] hover:opacity-80">
        Resend
      </button>

      {/* Submit */}
      <Button
        variant="gaming"
        className="h-fit text-[8px] px-[2em] py-[0.2em] rounded-none sm:text-[9px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]"
        onClick={handleSubmit}
      >
        Enable SMS Authentication
      </Button>
    </div>
  );
};

export default VerifyOTP;
