"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Image from "next/image";
import GoogleIcon from "../../public/images/sign-in/google.png";
import FacebookIcon from "../../public/images/sign-in/facebook.png";
import AppleIcon from "../../public/images/sign-in/apple.png";
import Logo from "../../public/images/sign-in/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

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
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignInFormInputs) => {
    try {
      const url = process.env.NEXT_PUBLIC_BASE_URL+"/auth/login";
      const response = await axios.post(
        url,
        data
      );

      if (response.status === 201) {
        const { accessToken, refreshToken, user, message } = response.data;

        // Store tokens and user data in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(message); 

        // Redirect to home page
        router.push("/admin");
      } else {
        console.error("Login failed");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      process.env.NEXT_PUBLIC_BASE_URL+"/auth/google",
      "GoogleAuth",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    const popupCheckInterval = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(popupCheckInterval);
        console.log("Popup closed");
      }
    }, 1000);
  };

  useEffect(() => {
    const handleAuthMessage = (event: {
      origin: string;
      data: { user: any; accessToken: any; refreshToken: any };
    }) => {
      const url = process.env.NEXT_PUBLIC_BASE_URL;
      if (event.origin !== url ) return;

      const { user, accessToken, refreshToken } = event.data;

      console.log("User:", user);

      if (accessToken && refreshToken && user) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        localStorage.setItem("user", JSON.stringify(user));

        router.push("/admin");
      }
    };

    window.addEventListener("message", handleAuthMessage);

    return () => {
      window.removeEventListener("message", handleAuthMessage);
    };
  }, [router]);

  return (
    <div className="bg-[#0B0E13] h-full flex items-center justify-center">
      <div className="border-[1px] border-white w-[682px] h-[757px] px-[120px] py-[50px]">
        <div className="flex items-center justify-center">
          <Image src={Logo} alt="logo" />
        </div>
        <p className="font-primaryFont text-[24px] font-medium text-white text-center mb-[60px]">
          Sign In To Your Account
        </p>
        <div className="flex items-center justify-center gap-6 mb-[25px]">
          <div
            onClick={handleGoogleLogin}
            className="w-[40px] h-[40px] bg-white rounded-[4px] flex items-center justify-center"
          >
            <Image src={GoogleIcon} alt="google icon" />
          </div>

          <div className="w-[40px] h-[40px] bg-white rounded-[4px] flex items-center justify-center">
            <Image src={FacebookIcon} alt="facebook icon" />
          </div>

          <div className="w-[40px] h-[40px] bg-white rounded-[4px] flex items-center justify-center">
            <Image src={AppleIcon} alt="apple icon" />
          </div>
        </div>

        <div className="flex items-center justify-center mb-[15px]">
          <div className="w-full h-[1px] bg-white"></div>
          <p className="text-white font-primaryFont font-medium px-2">or</p>
          <div className="w-full h-[1px] bg-white"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8">
            <p className="text-white font-primaryFont font-medium text-[15px] mb-1">
              EMAIL
            </p>
            <Input
              type="email"
              placeholder="Enter your email"
              className="text-white"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <p className="text-white font-primaryFont font-medium text-[15px] mb-1">
              PASSWORD
            </p>
            <Input
              type="password"
              placeholder="Enter your password"
              className="text-white"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center justify-center gap-2">
              <Checkbox className="bg-[#45F882] rounded-none w-[13px] h-[13px]" />
              <p className="text-white font-primaryFont font-medium text-[12px]">
                Remember me
              </p>
            </div>

            <p className="text-[#45F882] font-primaryFont font-normal text-[13px]">
              Forgot your password ?
            </p>
          </div>

          <Button
            type="submit"
            className="w-full mb-6 bg-[#45F882] font-primaryFont text-[17px] text-black font-bold"
          >
            <p className="font-primaryFont text-[17px]  font-bold text-black">
              SIGN IN
            </p>
          </Button>
        </form>

        <p className="text-white font-primaryFont font-normal text-[13px] mb-2">
          Do not have an account? 
        </p>
        <Button 
        onClick={() => router.push("/sign-up")}
        variant="outline" className="w-full mb-6">
          <p className="font-primaryFont text-[17px] text-white font-bold">
            CREATE ACCOUNT
          </p>
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
