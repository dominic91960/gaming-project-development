import React from "react";

import { Button } from "@/components/ui/button";
import { FaPencilAlt } from "react-icons/fa";
// import { FaMobileAlt, FaPencilAlt } from "react-icons/fa";
// import { FaCircleCheck } from "react-icons/fa6";
// import { LuMonitor } from "react-icons/lu";

interface SecurityInfoProps {
  password: string;
  tel: string;
  trustedDevices: number;
  handlePasswordEditClick: () => void;
  handleTelEditClick: () => void;
}

const SecurityInfo: React.FC<SecurityInfoProps> = ({
  password,
  // tel,
  // trustedDevices,
  handlePasswordEditClick,
  // handleTelEditClick,
}) => {
  return (
    <menu
      className="bg-gradient-to-b from-transparent to-white/30 text-[8px] p-[2em] border border-t-0 sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
      style={{
        borderImage: "linear-gradient(to bottom, transparent, #75F94C) 1",
      }}
    >
      {/* Header */}
      <p className="sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[14px]">
        Security details.
      </p>
      <h3 className="font-bold text-[15px] sm:text-[20px] md:text-[25px] lg:text-[30px] xl:text-[32px] 2xl:text-[35px]">
        Security
      </h3>
      <hr className="border-t-[#BCBCBC] mt-[0.1em]" />

      {/* Security info */}
      <form>
        {/* Password */}
        <div className="flex items-center justify-between my-[0.6em] text-[10px] sm:text-[12px] md:text-[15px] lg:text-[18px] xl:text-[21px] 2xl:text-[23px]">
          <p>
            <span className="font-bold text">Password: </span>
            <input
              type="password"
              value={password}
              className="bg-transparent outline-none"
              readOnly
            />
          </p>

          <Button
            type="button"
            variant="ghost"
            className="h-fit text-[8px] uppercase px-[0.5em] py-[0.5em] rounded-sm sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[12px]"
            onClick={handlePasswordEditClick}
          >
            Edit&nbsp;&nbsp;
            <FaPencilAlt />
          </Button>
        </div>

        <hr className="border-t-[#BCBCBC]" />

        {/* <h4 className="font-bold text-[10px] mt-[0.6em] sm:text-[12px] md:text-[15px] lg:text-[18px] xl:text-[21px] 2xl:text-[23px]">
          2-Step Verification
        </h4> */}

        {/* <div className="mt-[0.3em]">
          <p className="flex items-center gap-x-[0.3em] text-[8px] sm:text-[8.5px] md:text-[8.75px] lg:text-[9px]">
            <FaCircleCheck className="text-[#0BDB45]" />
            Email
          </p>
          <p className="text-[8px] sm:text-[8.5px] md:text-[8.75px] lg:text-[9px]">
            Each time you log in with a new device, you&apos;ll be asked for the
            security code sent to v
          </p>
        </div> */}

        {/* Backup phone number */}
        {/* <div className="flex items-center justify-between mt-[1.5em]">
          <div className="flex items-center gap-x-[0.4em]">
            <FaMobileAlt className="size-[12px] sm:size-[15px] md:size-[18px] lg:size-[21px] xl:size-[24px] 2xl:size-[27px]" />
            <div className="w-px h-[2.5em] bg-[#BCBCBC]"></div>
            <div className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[14px]">
              <p className="font-semibold">
                Phone number used for backup class
              </p>
              <p>{tel?.replace(tel.slice(0, 7), "*******")}</p>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            className="h-fit text-[8px] uppercase px-[0.5em] py-[0.5em] rounded-sm sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[12px]"
            onClick={handleTelEditClick}
          >
            Edit&nbsp;&nbsp;
            <FaPencilAlt />
          </Button>
        </div> */}

        {/* <hr className="border-t-[#BCBCBC] my-[0.6em]" /> */}

        {/* Trusted devices */}
        {/* <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-[0.4em]">
            <LuMonitor className="size-[12px] sm:size-[15px] md:size-[18px] lg:size-[21px] xl:size-[24px] 2xl:size-[27px]" />
            <div className="w-px h-[2.5em] bg-[#BCBCBC]"></div>
            <div className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[14px]">
              <p className="font-semibold">Trusted devices</p>
              <p>
                You have <span>{trustedDevices}</span> trusted devices
              </p>
            </div>
          </div>
        </div> */}
      </form>

      {/* <div className="mt-[1.5em]">
        <p className="text-justify text-[8px] sm:text-[8.5px] md:text-[8.75px] lg:text-[9px]">
          Each time you log in with a new device, you&apos;ll be asked for the
          security code sent toEach time you log in with a new device,
          you&apos;ll be asked for the security code sent to v v
        </p>

        <p className="mt-[0.5em] text-justify text-[8px] sm:text-[8.5px] md:text-[8.75px] lg:text-[9px]">
          Each time you log in with a new device, you&apos;ll be asked for the
          security code sent toEach time you log in with a new device,
          you&apos;ll be asked for the security code sent to v vEach time you
          log in with a new device, you&apos;ll be asked for the security code
          sent toEach time you log in with a new device, you&apos;ll be asked
          for the security code sent to v v
        </p>
      </div> */}
    </menu>
  );
};

export default SecurityInfo;
