"use client";
import Image from "next/image";
import Logo from "../../public/images/sign-in/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface ForgotPasswordOtpProps {
  email: string;
  setIsPin: (isPin: boolean) => void;
  setIsReset: (isReset: boolean) => void;
}

const ForgotPasswordOtp: React.FC<ForgotPasswordOtpProps> = ({
  email,
  setIsPin,
  setIsReset,
}) => {
  const [values, setValues] = useState<string[]>(["", "", "", "", "", ""]);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(60);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Handle OTP input change
  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace key press
  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle form submit
  const handleSubmit = async () => {
    const otpCode = values.join("");

    try {
      const url = process.env.NEXT_PUBLIC_BASE_URL + "/auth/verify-otp";
      const response = await axios.post(url, {
        email,
        pin: otpCode,
      });
      setIsPin(false);
      setIsReset(true);
      toast.success("OTP verified successfully!");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  // Resend OTP function
  const resendCode = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_BASE_URL + "/auth/request-password-reset";
      await axios.post(url, { email });
      toast.success("OTP has been resent!");
      setIsResendDisabled(true);
      setTimer(60);
    } catch (error: any) {
      toast.error("Failed to resend OTP. Please try again later.");
    }
  };

  // Timer effect for resend button
  useEffect(() => {
    let countdown: NodeJS.Timeout | null = null;
    if (isResendDisabled && timer > 0) {
      countdown = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false); // Enable resend button after timer ends
    }
    return () => {
      if (countdown) clearTimeout(countdown);
    };
  }, [isResendDisabled, timer]);

  return (
    <div className="flex items-center justify-center bg-[#0B0E13] h-full">
      <div className="flex flex-col border border-white w-[500px] h-max px-[70px] py-[50px]">
        <div className="flex items-center justify-center">
          <Image src={Logo} alt="logo" />
        </div>
        <p className="font-primaryFont text-[1.6em] font-medium text-white text-center mb-8">
          Forgot Password
        </p>
        <p className="text-white text-[15px] text-center">
          Please Enter the 6 digit code sent to
        </p>
        <p className="text-white text-[15px] text-center mb-2">{email}</p>
        <div className="h-[1px] bg-white mb-8"></div>

        <div className="flex items-center justify-center gap-3 mb-12 text-white">
          {values.map((value, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
              className="text-center w-12 h-12 text-lg"
            />
          ))}
        </div>

        <Button
          type="button"
          onClick={handleSubmit}
          variant="gaming"
          className="w-full h-fit font-primaryFont text-[1.1em] px-[1em] py-[0.5em] mb-3"
        >
          Verify
        </Button>

        <p className="text-white text-[13px] text-center font-primaryFont font-regular underline">
          {isResendDisabled ? (
            <span>Resend Code in {timer}s</span>
          ) : (
            <span onClick={resendCode} className="cursor-pointer">
              Resend Code
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordOtp;
