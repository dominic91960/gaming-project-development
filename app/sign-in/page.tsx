"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useToast } from "@/context/ToastContext";
import ProductSearchBar from "@/components/product-search/product-search";
import AuthNavbar from "@/components/navbar/AuthNavbar";
import Spinner from "@/components/Spinner/Spinner";
import Logo from "../../public/images/logo.png";
import "./sign-in.css";

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
  const addToast = useToast();
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
  } = useForm<SignInFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignInFormInputs) => {
    try {
      const url = process.env.NEXT_PUBLIC_BASE_URL + "/auth/login";
      const response = await axios.post(url, data);

      if (response.status === 201) {
        const { accessToken, refreshToken, user, message } = response.data;
        addToast(message, "success");

        // Store tokens and user data in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect to home page
        // router.push("/admin");
        if (user.role.name === "ADMIN") {
          // router.push("/admin");
          window.location.href = "/admin";
          return;
        } else {
          // router.push("/");
          window.location.href = "/";
          return;
        }
      } else {
        addToast("Login failed, please try again later.", "error");
      }
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      setError(true);
    }
  };
  //   const handleAuthMessage = (event: {
  //     origin: string;
  //     data: { user: any; accessToken: any; refreshToken: any };
  //   }) => {
  //     const url = process.env.NEXT_PUBLIC_BASE_URL;
  //     if (event.origin !== url) return;

  //     const { user, accessToken, refreshToken } = event.data;

  //     if (accessToken && refreshToken && user) {
  //       localStorage.setItem("accessToken", accessToken);
  //       localStorage.setItem("refreshToken", refreshToken);

  //       localStorage.setItem("user", JSON.stringify(user));

  //       if (user.role === "ADMIN") {
  //         // router.push("/admin");
  //         window.location.href = "/admin";
  //         return;
  //       } else {
  //         // router.push("/");
  //         window.location.href = "/";
  //         return;
  //       }

  //       // router.push("/admin");
  //     }
  //   };

  //   window.addEventListener("message", handleAuthMessage);

  //   return () => {
  //     window.removeEventListener("message", handleAuthMessage);
  //   };
  // }, [router]);

  useEffect(() => {
    const handleAuthMessage = (event: any) => {
      if (event.origin !== 'https://api.thevingame.com') return; // Ensure message is from your backend
      const { user, accessToken, refreshToken } = event.data;
  
      // Save the tokens and user data, e.g., in localStorage or context
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
  
      // Redirect to desired page or update UI state
      window.location.href = '/';
    };
  
    window.addEventListener('message', handleAuthMessage);
  
    // Clean up event listener on component unmount
    return () => window.removeEventListener('message', handleAuthMessage);
  }, []);
  

  const [showPassword, setShowPassword] = useState(false);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <section className="h-full flex flex-col bg-[#0B0E13] text-white">
      <ProductSearchBar />
      {/* <Navbar /> */}
      <AuthNavbar />
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
  type="button"
  variant="secondary"
  className="w-full h-fit mb-[1.3em] font-medium text-[1.1em] px-[1em] py-[0.5em] rounded-none"
  onClick={() => {
    const authWindow = window.open(
      'https://api.thevingame.com/auth/google',
      '_blank',
      'width=500,height=600'
    );

    // You can optionally check if the auth window closed without login
    // const timer = setInterval(() => {
    //   if (authWindow.closed) {
    //     clearInterval(timer);
    //     console.log("Login window closed without completing authentication");
    //   }
    // }, 500);
  }}
>
  <FcGoogle className="text-[1.2em] me-[0.5em]" /> Sign In With Google
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
                className="abby text-white rounded-none text-[1em] px-[1em] py-[0.5em] h-fit sm:w-[44ch]"
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
