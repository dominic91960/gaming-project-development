import React, { useEffect, useState } from "react";
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
  handleLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  user,
  handleClick,
  handleLogout,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // To fix a bug where profile menu jumps to top left of the screen on resize
  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleProfileClick = () => {
    setIsOpen(false);
    setTimeout(() => {
      handleClick();
      router.push("/profile?id=" + user.id);
    }, 120);
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    setTimeout(() => {
      handleLogout();
    }, 120);
  };

  return (
    <DropdownMenu open={isOpen}>
      <DropdownMenuTrigger
        className="cursor-pointer rounded-full hover:scale-110"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Image
          src={user?.profile_image}
          width={20}
          height={20}
          alt="Avatar"
          className="size-[1em] rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-[#111111] font-primaryFont text-[0.8em] text-white rounded-none border-none"
        onInteractOutside={() => setIsOpen(false)}
      >
        <DropdownMenuLabel className="font-semibold text-center text-[1.3em]">
          {user.firstName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/40 mx-[0.2em]" />
        <DropdownMenuItem
          className="bg-transparent text-[1em] focus:bg-transparent focus:text-white"
          onClick={handleProfileClick}
        >
          <button className="w-full h-fit flex items-center gap-[0.5em] px-[1em] py-[0.3em] rounded-none font-primaryFont uppercase hover:opacity-80">
            <FaUser className="text-[1.3em] text-[#0BDB45]" />
            Profile
          </button>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/40 mx-[0.2em]" />
        <DropdownMenuItem
          className="bg-transparent text-[1em] focus:bg-transparent focus:text-white"
          onClick={handleLogoutClick}
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
