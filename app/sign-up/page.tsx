"use client";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Logo from "../../public/images/sign-in/logo.png";
import GoogleIcon from "../../public/images/sign-in/google.png";
import FacebookIcon from "../../public/images/sign-in/facebook.png";
import AppleIcon from "../../public/images/sign-in/apple.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});

const SignUp = () => {
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
      const url = process.env.NEXT_PUBLIC_BASE_URL + "/auth/register";
      const response = await axios.post(url, {
        username: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: "USER",
      });

      console.log("Registration successful", response.data);
      toast.success(response.data.message);
      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-[#0B0E13] h-full flex items-center justify-center">
      <div className="border-[1px] border-white w-[682px] px-[120px] py-[50px]">
        <div className="flex items-center justify-center">
          <Image src={Logo} alt="logo" />
        </div>
        <p className="font-primaryFont text-[24px] font-medium text-white text-center">
          Sign Up To Your Account
        </p>
        <p className="font-primaryFont text-[13px] font-medium text-white text-center mb-[60px]">
          Start from the beginning.
        </p>

        {/* Social Sign-In Buttons */}
        <div className="flex items-center justify-center gap-6 mb-[25px]">
          <div className="w-[40px] h-[40px] bg-white rounded-[4px] flex items-center justify-center hover:-translate-y-[1px] transition-transform duration-150 cursor-pointer">
            <Image src={GoogleIcon} alt="google icon" />
          </div>
          <div className="w-[40px] h-[40px] bg-white rounded-[4px] flex items-center justify-center hover:-translate-y-[1px] transition-transform duration-150 cursor-pointer">
            <Image src={FacebookIcon} alt="facebook icon" />
          </div>
          <div className="w-[40px] h-[40px] bg-white rounded-[4px] flex items-center justify-center hover:-translate-y-[1px] transition-transform duration-150 cursor-pointer">
            <Image src={AppleIcon} alt="apple icon" />
          </div>
        </div>

        <div className="flex items-center justify-center mb-[15px]">
          <div className="w-full h-[1px] bg-white"></div>
          <p className="text-white font-primaryFont font-medium px-2">or</p>
          <div className="w-full h-[1px] bg-white"></div>
        </div>

        {/* Sign-Up Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 text-white font-primaryFont font-medium text-[15px] gap-x-[1em]">
            {/* First Name */}
            <div className="mb-8">
              <p className="mb-1">FIRST NAME</p>
              <Input
                type="text"
                className="text-white rounded-none"
                placeholder="Enter first name"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-8">
              <p className="mb-1">LAST NAME</p>
              <Input
                type="text"
                className="text-white rounded-none"
                placeholder="Enter last name"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mb-8 text-white font-primaryFont font-medium text-[15px]">
            <p className="mb-1">EMAIL</p>
            <Input
              type="email"
              className="text-white rounded-none"
              placeholder="Enter email address"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-2 text-white font-primaryFont font-medium text-[15px] gap-x-[1em]">
            {/* Password */}
            <div className="mb-8">
              <p className="mb-1">PASSWORD</p>
              <Input
                type="password"
                className="text-white rounded-none"
                placeholder="Enter password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-8">
              <p className="mb-1">CONFIRM PASSWORD</p>
              <Input
                type="password"
                className="text-white rounded-none"
                placeholder="Confirm password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <Checkbox className="bg-[#45F882] rounded-none w-[13px] h-[13px] flex items-center justify-center" />
              <p className="text-white font-primaryFont font-medium text-[12px]">
                I agree to all
                <Link href="/" className="text-[#45F882]">
                  &nbsp;terms and conditons
                </Link>
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button className="w-full mb-6 bg-[#0BDB45] font-primaryFont text-[17px] text-black font-bold rounded-none group">
            <p className="font-primaryFont text-[17px] font-bold text-black hover:text-white group-hover:text-white">
              CREATE ACCOUNT
            </p>
          </Button>
        </form>

        {/* Sign In Link */}
        <p className="text-white font-primaryFont font-normal text-[13px] mb-2">
          Already have an account? 
        </p>
        <Link href="/sign-in">
          <Button variant="outline" className="w-full mb-6 rounded-none group">
            <p className="font-primaryFont text-[17px] text-white font-bold group-hover:text-black">
              SIGN IN
            </p>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
