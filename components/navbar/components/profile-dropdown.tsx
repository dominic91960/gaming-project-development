import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

interface ProfileDropdownProps {
  user: any;
  handleClick: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
  handleClick,
}) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hidden cursor-pointer rounded-full sm:block">
        <Image
          src={user?.profile_image}
          width={20}
          height={20}
          alt="Avatar"
          className="size-[1em] rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="hidden bg-[#111111] font-primaryFont text-[0.8em] text-white rounded-none border-none sm:block">
        <DropdownMenuLabel className="font-semibold text-center text-[1.3em]">
          {user.firstName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/40 mx-[0.2em]" />
        <DropdownMenuItem
          className="bg-transparent text-[1em] focus:bg-transparent focus:text-white"
          onClick={() => {
            router.push("/profile?id=" + user.id);
          }}
        >
          <button className="w-full h-fit flex items-center gap-[0.5em] px-[1em] py-[0.3em] rounded-none font-primaryFont uppercase hover:opacity-80">
            <FaUser className="text-[1.3em] text-[#0BDB45]" />
            Profile
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/40 mx-[0.2em]" />
        <DropdownMenuItem
          className="bg-transparent text-[1em] focus:bg-transparent focus:text-white"
          onClick={handleClick}
        >
          <button className="w-full h-fit flex items-center gap-[0.5em] px-[1em] py-[0.3em] rounded-none font-primaryFont uppercase hover:opacity-80">
            <IoLogOut className="text-[1.6em] text-[#0BDB45]" />
            Logout
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/40 mx-[0.2em]" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
