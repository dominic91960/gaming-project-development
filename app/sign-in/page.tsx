import Link from "next/link";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Logo from "../../public/images/sign-in/logo.png";
import GoogleIcon from "../../public/images/sign-in/google.png";
import FacebookIcon from "../../public/images/sign-in/facebook.png";
import AppleIcon from "../../public/images/sign-in/apple.png";

const SignIn = () => {
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

        <div>
          <div className="mb-8">
            <p className="text-white font-primaryFont font-medium text-[15px] mb-1">
              EMAIL
            </p>
            <Input
              type="email"
              placeholder="Enter your email"
              className="text-white rounded-none"
            />
          </div>

          <div className="mb-4">
            <p className="text-white font-primaryFont font-medium text-[15px] mb-1">
              PASSWORD
            </p>
            <Input
              type="password"
              placeholder="Enter your password"
              className="text-white rounded-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-center gap-2">
            <Checkbox className="bg-[#45F882] rounded-none w-[13px] h-[13px]" />
            <p className="text-white font-primaryFont font-medium text-[12px]">
              Remember me
            </p>
          </div>

          <Link
            href="/"
            className="text-[#45F882] font-primaryFont font-normal text-[13px]"
          >
            Forgot your password ?
          </Link>
        </div>

        <Button className="w-full mb-6 bg-[#0BDB45] font-primaryFont text-[17px] text-black font-bold rounded-none group">
          <p className="font-primaryFont text-[17px] font-bold text-black hover:text-white group-hover:text-white">
            SIGN IN
          </p>
        </Button>

        <p className="text-white font-primaryFont font-normal text-[13px] mb-2">
          Do not have an account? 
        </p>
        <Link href="/sign-up">
          <Button variant="outline" className="w-full mb-6 rounded-none group">
            <p className="font-primaryFont text-[17px] text-white font-bold group-hover:text-black">
              CREATE ACCOUNT
            </p>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
