"use client";
import Image from "next/image";
import Logo from "../../public/images/sign-in/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ForgotPasswordOtp from "./forgot-password-otp";
import PasswordReset from "./password-reset";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define validation schema using yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const [isPin, setIsPin] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [email, setEmail] = useState("");

  const router = useRouter();

  // Initialize react-hook-form and bind it with the yup schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submission
  const onSubmit = async (data: any) => {
    const email = data.email;
    setEmail(email);
    try {
      const url =
        process.env.NEXT_PUBLIC_BASE_URL + "/auth/request-password-reset";
      const response = await axios.post(url, { email }); // Send the email object with the correct structure
      setIsPin(true);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#0B0E13] h-full">
      {!isPin && !isReset && (
        <div className="flex flex-col border border-white w-[500px] h-max px-[70px] py-[50px]">
          <div className="flex items-center justify-center">
            <Image src={Logo} alt="logo" />
          </div>
          <p className="font-primaryFont text-[1.6em] font-medium text-white text-center mb-8">
            Forgot Password
          </p>
          <p className="text-white text-[15px] text-center mb-2">
            Please Enter email address to receive a verification code
          </p>

          <div className="h-[1px] bg-white mb-8"></div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-white text-[15px] mb-1">EMAIL</p>
            <Input
              type="email"
              placeholder="Enter your email"
              className="mb-3 text-white"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-[13px] mb-4">
                {errors.email.message}
              </p>
            )}

            <Button
              type="submit"
              variant="gaming"
              className="w-full h-fit font-primaryFont text-[1.1em] px-[1em] py-[0.5em] mb-3"
            >
              Send
            </Button>
          </form>

          <p className="text-white text-[13px] text-center font-primaryFont font-regular underline">
            Try phone number
          </p>
        </div>
      )}

      {isPin && !isReset && <ForgotPasswordOtp email={email} setIsPin={setIsPin} setIsReset={setIsReset} />}
      {!isPin && isReset && <PasswordReset />}
    </div>
  );
};

export default ForgotPassword;
