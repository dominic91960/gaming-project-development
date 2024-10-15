"use client";
import Image from "next/image";
import Logo from "../../public/images/sign-in/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, use } from "react";

const ForgotPasswordOtp = () => {
  const [values, setValues] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

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
          Please Enter the 4 digit code sent to
        </p>

        <p className="text-white text-[15px] text-center mb-2">
          avishkarathnaya@gmail.com
        </p>
        <div className="h-[1px] bg-white mb-8"></div>

        <div className="flex items-center justify-center gap-6 mb-12 text-white">
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
          type="submit"
          variant="gaming"
          className="w-full h-fit font-primaryFont text-[1.1em] px-[1em] py-[0.5em] mb-3"
        >
          Verify
        </Button>
        <p className="text-white text-[13px] text-center font-primaryFont font-regular underline">
          Resend Code
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordOtp;
