"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import ProductSearchBar from "@/components/product-search/product-search";
import AuthNavbar from "@/components/navbar/AuthNavbar";
import Spinner from "@/components/Spinner/Spinner";
import Logo from "../../public/images/logo.png";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

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
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password format incorrect"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});

const SignUp = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isTermsAccepted, setIsTermsAccepted] = useState<any>(false);
  const [checkboxError, setCheckboxError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_BASE_URL + "/auth/verify-session",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (res.status === 200) {
          if (res.data.role.name === "ADMIN") {
            router.push("/admin");
          } else {
            router.push("/");
          }
        } else {
          throw new Error("Session expired");
        }
      } catch (error) {
        setLoading(false);
      }
    };
    verifySession();
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    if (!isTermsAccepted) {
      setCheckboxError("Please agree to the terms and conditions");
      return;
    }

    try {
      const url = process.env.NEXT_PUBLIC_BASE_URL + "/auth/register";
      const username = data.email.split('@')[0];
      const response = await axios.post(url, {
        username: username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: "USER",
      });
      const { message } = response.data;
      toast({
        variant: "success",
        title: message,
      });
      if (response.status === 201) {
        const { accessToken, refreshToken, user, message } = response.data;

        // Store tokens and user data in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
        toast({
          variant: "success",
          title: message,
        });

        // Redirect to profile page
        router.push("/profile?id=" + user.id);
      } else {
        console.error("Register failed");
      }
      // router.push("/emailVerify");
    } catch (error: any) {
      toast({
        variant: "error",
        title: error.response.data.message,
      });
    }
  };

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <section className="h-full flex flex-col bg-[#0B0E13] text-white">
      <Toaster title={""} description={""} variant={""}  />
      <ProductSearchBar />
      <AuthNavbar />
      <div className="bg-[#0B0E13] flex-grow flex items-center justify-center font-primaryFont text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] text-white px-[36px] p-[50px]">
        <div className="w-full border px-[2em] py-[1em] sm:px-[8em] sm:py-[3.3em] sm:w-fit">
          <div className="flex items-center justify-center">
            <Image src={Logo} alt="logo" className="w-[4em] my-[1em]" />
          </div>
          <p className="text-[1.6em] font-medium text-white text-center">
            Sign Up To Your Account
          </p>
          <p className="text-[0.86em] font-medium text-white text-center mb-[1em]">
            Start from the beginning.
          </p>

          {/* Social Sign-In Buttons */}
          <div className="flex items-center justify-center gap-6">
            <Button
              type="submit"
              variant="secondary"
              className="w-full h-fit mb-[1.3em] font-medium text-[1.1em] px-[1em] py-[0.5em] rounded-none"
            >
              <FcGoogle className="text-[1.2em] me-[0.5em]" /> Sign In With
              Google
            </Button>
          </div>

          <div className="flex items-center justify-center mb-[1em]">
            <div className="w-full h-[1px] bg-white"></div>
            <p className="text-white font-medium px-2">or</p>
            <div className="w-full h-[1px] bg-white"></div>
          </div>

          {/* Sign-Up Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First/Last name grid */}
            <div className="grid text-white font-medium gap-x-[1em] sm:grid-cols-2">
              <div className="mb-[2.1em]">
                <p className="mb-[0.2em]">FIRST NAME</p>
                <Input
                  type="text"
                  autoFocus
                  className="text-white rounded-none text-[1em] px-[1em] py-[0.5em] h-fit"
                  placeholder="Enter first name"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-red-500 mt-[0.2em]">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="mb-[2.1em]">
                <p className="mb-[0.2em]">LAST NAME</p>
                <Input
                  type="text"
                  className="text-white rounded-none text-[1em] px-[1em] py-[0.5em] h-fit"
                  placeholder="Enter last name"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-red-500 mt-[0.2em]">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-[2.1em] text-white font-medium">
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

            <div className="grid text-white font-medium gap-x-[1em] sm:grid-cols-2">
              <div className="mb-[2.1em]">
                <p className="mb-[0.2em]">PASSWORD</p>
                <div className="relative w-full">
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="text-white rounded-none text-[1em] px-[1em] py-[0.5em] h-fit"
                    placeholder="Enter password"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 mt-[0.2em]">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="mb-[2.1em]">
                <p className="mb-[0.2em]">CONFIRM PASSWORD</p>
                <div className="relative w-full">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    className="text-white rounded-none text-[1em] px-[1em] py-[0.5em] h-fit"
                    placeholder="Confirm password"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 mt-[0.2em]">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-[calc(1em+1px)]">
              <div className="flex items-center gap-[0.5em]">
                <Checkbox
                  className="bg-[#45F882] rounded-none size-[0.86em] flex items-center justify-center"
                  checked={isTermsAccepted}
                  onCheckedChange={(checked) => {
                    setIsTermsAccepted(checked);
                    setCheckboxError(""); // Clear error when checked
                  }}
                />
                <p className="text-white font-medium text-[0.8em] flex items-center ">
                  I agree to all
                  <Link href="/" className="text-[#45F882] hover:opacity-80">
                    &nbsp;terms and conditions
                  </Link>
                </p>
              </div>
              {checkboxError && (
                <p className="text-red-500 mt-[0.2em]">{checkboxError}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              variant="gaming"
              className="w-full h-fit mb-[1.3em] font-semibold text-[1.1em] px-[1em] py-[0.5em]"
            >
              CREATE ACCOUNT
            </Button>
          </form>

          <p className="text-white font-normal text-[0.86em] mb-2">
            Already have an account?
          </p>
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="w-full h-fit text-[1.1em] px-[1em] py-[0.5em] mb-[1.3em] rounded-none group"
            >
              <p className="text-[1.1em] text-white font-semibold group-hover:text-black">
                SIGN IN
              </p>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
