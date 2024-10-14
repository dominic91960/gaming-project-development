"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import ProductSearchBar from "@/components/product-search/product-search";
import Logo from "../../public/images/sign-in/logo.png";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  pin: Yup.string()
    .required("PIN is required")
    .matches(/^\d{6}$/, "PIN must be exactly 6 digits"),
});

const VerifyEmail = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const url = process.env.NEXT_PUBLIC_BASE_URL + "/auth/verify-otp";
      const response = await axios.post(url, {
        email: data.email,
        pin: data.pin,
      });

      console.log("Verification successful", response.data);
      toast.success(response.data.message);
      router.push("/sign-in");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="flex flex-col min-h-svh bg-[#0B0E13]">
      <ProductSearchBar />
      <div className="bg-[#0B0E13] flex-grow flex items-center justify-center font-primaryFont text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] text-white px-[36px] p-[50px]">
        <div className="w-full border px-[2em] py-[1em] sm:px-[8em] sm:py-[3.3em] sm:w-fit">
          <div className="flex items-center justify-center">
            <Image src={Logo} alt="logo" />
          </div>
          <p className="font-primaryFont text-[1.6em] font-medium text-white text-center">
            Verify Email
          </p>

          {/* Verification Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="mb-[2.1em] text-white font-primaryFont font-medium">
              <p className="mb-[0.2em]">EMAIL</p>
              <Input
                type="email"
                className="text-white rounded-none text-[1em] px-[1em] py-[0.5em] h-fit"
                placeholder="Enter email address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 mt-[0.2em]">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PIN */}
            <div className="mb-[2.1em] text-white font-primaryFont font-medium">
              <p className="mb-[0.2em]">PIN</p>
              <Input
                type="text"
                className="text-white rounded-none text-[1em] px-[1em] py-[0.5em] h-fit"
                placeholder="Enter 6-digit PIN"
                {...register("pin")}
              />
              {errors.pin && (
                <p className="text-red-500 mt-[0.2em]">
                  {errors.pin.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              variant="gaming"
              className="w-full h-fit mb-[1.3em] font-primaryFont text-[1.1em] px-[1em] py-[0.5em]"
            >
              Verify Account
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="text-white font-primaryFont font-normal text-[0.86em] mb-2">
            Have a problem verifying?
          </p>
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="w-full h-fit text-[1.1em] px-[1em] py-[0.5em] mb-[1.3em] rounded-none group"
            >
              <p className="font-primaryFont text-[1.1em] text-white font-bold group-hover:text-black">
                SIGN IN
              </p>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;
