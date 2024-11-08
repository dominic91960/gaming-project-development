import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";

import axiosInstance from "@/axios/axiosInstance";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoLogOut } from "react-icons/io5";

import { useAuthContext } from "@/context/AuthContext";
import NavBarSpinner from "@/components/Spinner/NavBarSpinner";
import logo from "@/public/images/logo.png";
import "./admin.css";
import EditProfileDialog from "./EditProfileDialog";

interface StatusBarProps {
  isMobileNavToggled: boolean | undefined;
  setIsMobileNavToggled: Dispatch<SetStateAction<boolean | undefined>>;
}

const StatusBar: React.FC<StatusBarProps> = ({
  isMobileNavToggled,
  setIsMobileNavToggled,
}) => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <section className="bg-black font-secondaryFont font-medium text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[17px] 2xl:text-[18px] border-b border-b-[#0D6D49]">
      <div className="container mx-auto px-[36px] py-[1.2em] xl:py-[0.4em] flex items-center justify-between">
        <div>
          {/* Logo */}
          <div className="hidden xl:flex xl:items-center">
            <Image
              src={logo}
              alt="Logo"
              className="w-[3em] me-[0.7em] py-[0.5em]"
            />
            <h2 className="font-primaryFont font-semibold text-[1.6em] uppercase text-white">
              VINGAME
            </h2>
          </div>

          {/* Mobile navbar toggle  */}
          <button
            className={`${
              isMobileNavToggled ? "animate-toggle-button" : ""
            } relative h-4 w-6 transition-opacity duration-300 xl:hidden`}
            onClick={() =>
              isMobileNavToggled === undefined
                ? setIsMobileNavToggled(true)
                : setIsMobileNavToggled((prev) => !prev)
            }
          >
            <div className="absolute -mt-[0.5px] h-[1px] w-full rounded bg-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] transition-all duration-700 ease-in-out before:absolute before:left-0 before:h-[1px] before:w-full before:-translate-y-[6px] before:rounded before:bg-white before:transition-transform before:duration-700 before:ease-in-out after:absolute after:left-0 after:h-[1px] after:w-full after:translate-y-[6px] after:rounded after:bg-white after:transition-transform after:duration-700 after:ease-in-out"></div>
          </button>
        </div>

        {/* Status area */}
        <div className="flex items-center gap-x-[1em]">
          {/* <div className="flex items-center gap-x-[0.4em]">
            <CiSearch className="size-[1.5em] lg:size-[1.8em] text-white" />
            <IoMdNotificationsOutline className="size-[1.5em] lg:size-[1.8em] text-white" />
          </div> */}
          <div className="flex items-center gap-x-[0.8em]">
            <DropdownMenu open={isDropdownOpen}>
              <DropdownMenuTrigger
                className="font-primaryFont cursor-pointer rounded-full hover:shadow-[0_0_8px_#00FFA1] transition-all duration-200"
                onClick={() => setIsDropdownOpen(true)}
              >
                {loading ? (
                  <NavBarSpinner loading={loading} />
                ) : (
                  <Image
                    src={user?.profile_image}
                    width={30}
                    height={30}
                    alt="Avatar"
                    className="size-[2em] rounded-full lg:size-[2.5em]"
                  />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-black font-primaryFont text-[10px] text-white rounded-none border-none sm:text-[11px] md:text-[12px] lg:text-[12.5px] xl:text-[12.8px] 2xl:text-[13px]"
                onInteractOutside={() => setIsDropdownOpen(false)}
              >
                <DropdownMenuLabel className="font-semibold text-center text-[1.3em]">
                  {user?.firstName}
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-[#0D6D49] mx-[0.2em]" />
                <DropdownMenuItem className="bg-transparent text-[1em] focus:bg-transparent focus:text-white">
                  <EditProfileDialog
                    user={{
                      profileImage: user ? user.profile_image : "",
                      username: user ? user.username : "",
                      firstName: user ? user.firstName : "",
                      lastName: user ? user.lastName : "",
                      email: user ? user.email : "",
                    }}
                  />
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#0D6D49] mx-[0.2em]" />

                <DropdownMenuItem
                  onClick={() => {
                    setIsDropdownOpen(false);
                    axiosInstance.patch("/auth/logout");
                    localStorage.clear();
                    window.location.href = "/sign-in";
                  }}
                  className="bg-transparent text-[1em] focus:bg-transparent focus:text-white"
                >
                  <button className="w-full h-fit flex items-center gap-[0.5em] px-[1em] py-[0.3em] rounded-none font-primaryFont uppercase hover:opacity-80">
                    <IoLogOut className="text-[1.6em] text-[#00FFA1]" />
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatusBar;
