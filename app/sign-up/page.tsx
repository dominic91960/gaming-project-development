import Link from "next/link";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Logo from "../../public/images/sign-in/logo.png";
import GoogleIcon from "../../public/images/sign-in/google.png";
import FacebookIcon from "../../public/images/sign-in/facebook.png";
import AppleIcon from "../../public/images/sign-in/apple.png";

const SignUp = () => {
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

        <div className="grid grid-cols-2 text-white font-primaryFont font-medium text-[15px] gap-x-[1em]">
          <div className="mb-8">
            <p className="mb-1">FIRST NAME</p>
            <Input
              type="text"
              className="text-white rounded-none"
              placeholder="Enter first name"
            />
          </div>

          <div className="mb-4">
            <p className="mb-1">LAST NAME</p>
            <Input
              type="text"
              className="text-white rounded-none"
              placeholder="Enter last name"
            />
          </div>
        </div>

        <div className="text-white font-primaryFont font-medium text-[15px]">
          <div className="mb-8">
            <p className="mb-1">EMAIL</p>
            <Input
              type="email"
              className="text-white rounded-none"
              placeholder="Enter email address"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 text-white font-primaryFont font-medium text-[15px] gap-x-[1em]">
          <div className="mb-8">
            <p className="mb-1">PASSWORD</p>
            <Input
              type="password"
              className="text-white rounded-none"
              placeholder="Enter password"
            />
          </div>

          <div className="mb-4">
            <p className="mb-1">CONFIRM PASSWORD</p>
            <Input
              type="password"
              className="text-white rounded-none"
              placeholder="Confirm password"
            />
          </div>
        </div>

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

        <Button className="w-full mb-6 bg-[#0BDB45] font-primaryFont text-[17px] text-black font-bold rounded-none group">
          <p className="font-primaryFont text-[17px] font-bold text-black hover:text-white group-hover:text-white">
            CREATE ACCOUNT
          </p>
        </Button>

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
