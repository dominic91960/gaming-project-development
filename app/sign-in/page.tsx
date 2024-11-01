"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FcGoogle } from "react-icons/fc";
import ProductSearchBar from "@/components/product-search/product-search";
import Logo from "../../public/images/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthNavbar from "@/components/navbar/AuthNavbar";
import Spinner from "@/components/Spinner/Spinner";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface SignInFormInputs {
  email: string;
  password: string;
}

const SignIn = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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
          console.log(res.data);
          if (res.data.role.name === "ADMIN") {
            router.push("/admin");
          } else {
            router.push("/");
          }
        } else {
          throw new Error("Session expired");
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    verifySession();
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignInFormInputs) => {
    try {
      const url = process.env.NEXT_PUBLIC_BASE_URL + "/auth/login";
      const response = await axios.post(url, data);

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

        // Redirect to home page
        // router.push("/admin");
        if (user.role.name === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        console.error("Login failed");
      }
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      setError(true);
      toast({
        variant: "error",
        title: error.response.data.message,
      });
    }
  };
  // const handleGoogleLogin = () => {
  //   const width = 500;
  //   const height = 600;
  //   const left = window.screen.width / 2 - width / 2;
  //   const top = window.screen.height / 2 - height / 2;

  //   const popup = window.open(
  //     process.env.NEXT_PUBLIC_BASE_URL + "/auth/google",
  //     "GoogleAuth",
  //     `width=${width},height=${height},top=${top},left=${left}`
  //   );

  //   const popupCheckInterval = setInterval(() => {
  //     if (!popup || popup.closed || popup.closed === undefined) {
  //       clearInterval(popupCheckInterval);
  //       console.log("Popup closed");
  //     }
  //   }, 1000);
  // };

  useEffect(() => {
    const handleAuthMessage = (event: {
      origin: string;
      data: { user: any; accessToken: any; refreshToken: any };
    }) => {
      const url = process.env.NEXT_PUBLIC_BASE_URL;
      if (event.origin !== url) return;

      const { user, accessToken, refreshToken } = event.data;

      console.log("User:", user);

      if (accessToken && refreshToken && user) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }

        // router.push("/admin");
      }
    };

    window.addEventListener("message", handleAuthMessage);

    return () => {
      window.removeEventListener("message", handleAuthMessage);
    };
  }, [router]);

  const [showPassword, setShowPassword] = useState(false);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <section className="h-full flex flex-col bg-[#0B0E13] text-white">
      <Toaster title={""} description={""} variant={""} />
      <ProductSearchBar />
      {/* <Navbar /> */}
      {/* <AuthNavbar /> */}
      <div className="bg-[#0B0E13] flex-grow flex items-center justify-center font-primaryFont text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] text-white px-[36px] p-[50px]">
        <div className="w-full border px-[2em] py-[1em] sm:px-[8em] sm:py-[3.3em] sm:w-fit">
          <div className="flex items-center justify-center">
            <Image src={Logo} alt="logo" className="w-[4em] my-[1em]" />
          </div>
          <p className=" text-[1.6em] font-medium text-white text-center mb-[1em]">
            Sign In To Your Account
          </p>

          {/* Social sign-in buttons */}
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
            <p className="text-white  font-medium px-2">or</p>
            <div className="w-full h-[1px] bg-white"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-[2.1em] text-white  font-medium">
              <p className="mb-[0.2em]">EMAIL</p>
              <Input
                type="email"
                autoFocus
                placeholder="Enter your email"
                className="text-white rounded-none text-[1em] px-[1em] py-[0.5em] h-fit sm:w-[44ch]"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-red-500 mt-[0.2em]">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-[calc(1em+1px)] text-white font-medium">
              <p className="mb-[0.2em]">PASSWORD</p>

              <div className="relative w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="text-white rounded-none text-[1em] px-[1em] py-[0.5em] h-fit"
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

            {/* Remember me*/}
            <div className="flex items-center justify-between mb-[calc(1em+1px)]">
              <div className="flex items-center justify-center gap-[0.5em]">
                <Checkbox
                  id="remember-me"
                  className="bg-[#45F882] rounded-none size-[0.86em] flex items-center justify-center"
                />
                <label
                  htmlFor="remember-me"
                  className="text-white font-medium text-[0.8em] cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              <Link
                href="/forgot-password"
                className="text-[#45F882] font-normal text-[0.8em] hover:opacity-80"
              >
                Forgot your password ?
              </Link>
            </div>

            <Button
              type="submit"
              variant="gaming"
              className="w-full h-fit mb-[1.3em] font-semibold text-[1.1em] px-[1em] py-[0.5em]"
            >
              SIGN IN
            </Button>
          </form>
          {error && <p className="text-red-500 mt-[0.2em]">{errorMessage}</p>}

          <p className="text-white font-normal text-[0.86em] mb-2">
            Do not have an account?
          </p>
          <Button
            onClick={() => router.push("/sign-up")}
            variant="outline"
            className="w-full h-fit text-[1.1em] px-[1em] py-[0.5em] mb-[1.3em] rounded-none group"
          >
            <p className="text-[1.1em] text-white font-semibold group-hover:text-black">
              CREATE ACCOUNT
            </p>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
