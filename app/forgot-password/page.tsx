import Image from "next/image";
import Logo from "../../public/images/sign-in/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ForgotPasswordOtp from "./forgot-password-otp";
import PasswordReset from "./password-reset";

const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-center bg-[#0B0E13] h-full">
      <div className="flex flex-col border border-white w-[500px] h-max px-[70px] py-[50px]">
        <div className="flex items-center justify-center">
          <Image src={Logo} alt="logo" />
        </div>
        <p className="font-primaryFont text-[1.6em] font-medium text-white text-center mb-8">
          Forgot Password
        </p>
        <p className="text-white text-[15px] text-center mb-2">
          Please Enter email address to revive a verification code
        </p>

        <div className="h-[1px] bg-white mb-8"></div>

        <p className="text-white text-[15px] mb-1">EMAIL</p>
        <Input
          type="email"
          placeholder="enter your email"
          className="mb-12 text-white"
        />
        <Button
          type="submit"
          variant="gaming"
          className="w-full h-fit font-primaryFont text-[1.1em] px-[1em] py-[0.5em] mb-3"
        >
          Send
        </Button>

        <p className="text-white text-[13px] text-center font-primaryFont font-regular underline">
          Try phone number
        </p>
      </div>

      <ForgotPasswordOtp />

      <PasswordReset />
    </div>
  );
};

export default ForgotPassword;
