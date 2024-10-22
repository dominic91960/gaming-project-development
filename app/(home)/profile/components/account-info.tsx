import React from "react";
import { StaticImageData } from "next/image";

import { Button } from "@/components/ui/button";
import { FaPencilAlt } from "react-icons/fa";

interface AccountInfoProps {
  id: string;
  avatar: StaticImageData;
  username: string;
  email: string;
  city: string;
  country: string;
  language: string;
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  region: string;
  DOB: string;
}

const AccountInfo: React.FC<AccountInfoProps> = ({
  id,
  avatar,
  username,
  email,
  city,
  country,
  language,
  firstName,
  lastName,
  address,
  postalCode,
  region,
  DOB,
}) => {
  return (
    <menu
      className="bg-gradient-to-b from-transparent to-white/30 text-[8px] p-[2em] border border-t-0 sm:text-[10px] md:col-span-7 md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
      style={{
        borderImage: "linear-gradient(to bottom, transparent, #75F94C) 1",
      }}
    >
      {/* Header */}
      <p className="sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[14px]">
        Manage your account&apos;s details.
      </p>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[15px] sm:text-[20px] md:text-[25px] lg:text-[30px] xl:text-[32px] 2xl:text-[35px]">
          Account Information
        </h3>
        <Button
          type="button"
          variant="ghost"
          className="h-fit text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[20px] uppercase px-[1em] py-[0.5em] rounded-sm"
        >
          Edit&nbsp;&nbsp;
          <FaPencilAlt />
        </Button>
      </div>
      <hr className="border-t-[#BCBCBC] mt-[0.1em] mb-[1.7em]" />

      {/* Account info */}
      <form>
        {/* ID */}
        <div className="flex items-center justify-between mb-[0.5em]">
          <p>
            <span className="font-bold">ID: </span>
            {id}
          </p>
          <Button
            type="button"
            variant="ghost"
            className="h-fit text-[1em] uppercase px-[0.5em] py-[0.5em] rounded-sm"
          >
            <FaPencilAlt />
          </Button>
        </div>

        {/* Username */}
        <div className="flex items-center justify-between  mb-[0.5em]">
          <p>
            <span className="font-bold">Username: </span>
            {username}
          </p>
          <Button
            type="button"
            variant="ghost"
            className="h-fit text-[1em] uppercase px-[0.5em] py-[0.5em] rounded-sm"
          >
            <FaPencilAlt />
          </Button>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between  mb-[0.5em]">
          <p>
            <span className="font-bold">Email: </span> {email}
          </p>
          <Button
            type="button"
            variant="ghost"
            className="h-fit text-[1em] uppercase px-[0.5em] py-[0.5em] rounded-sm"
          >
            <FaPencilAlt />
          </Button>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between  mb-[0.5em]">
          <p>
            <span className="font-bold">Language: </span>
            {language}
          </p>
          <Button
            type="button"
            variant="ghost"
            className="h-fit text-[1em] uppercase px-[0.5em] py-[0.5em] rounded-sm"
          >
            <FaPencilAlt />
          </Button>
        </div>

        {/* First name */}
        <div className="flex items-center justify-between  mb-[0.5em]">
          <p>
            <span className="font-bold">First Name: </span>
            {firstName}
          </p>
          <Button
            type="button"
            variant="ghost"
            className="h-fit text-[1em] uppercase px-[0.5em] py-[0.5em] rounded-sm"
          >
            <FaPencilAlt />
          </Button>
        </div>

        {/* Last name */}
        <div className="flex items-center justify-between  mb-[0.5em]">
          <p>
            <span className="font-bold">Last Name: </span>
            {lastName}
          </p>
          <Button
            type="button"
            variant="ghost"
            className="h-fit text-[1em] uppercase px-[0.5em] py-[0.5em] rounded-sm"
          >
            <FaPencilAlt />
          </Button>
        </div>

        {/* Address */}
        <div className="flex items-center justify-between  mb-[0.5em]">
          <p>
            <span className="font-bold">Address: </span>
            {address}
          </p>
          <Button
            type="button"
            variant="ghost"
            className="h-fit text-[1em] uppercase px-[0.5em] py-[0.5em] rounded-sm"
          >
            <FaPencilAlt />
          </Button>
        </div>

        {/* Postal code */}
        <div className="flex items-center justify-between  mb-[0.5em]">
          <p>
            <span className="font-bold">Postal Code: </span>
            {postalCode}
          </p>
          <Button
            type="button"
            variant="ghost"
            className="h-fit text-[1em] uppercase px-[0.5em] py-[0.5em] rounded-sm"
          >
            <FaPencilAlt />
          </Button>
        </div>

        {/* Region */}
        <div className="flex items-center justify-between  mb-[0.5em]">
          <p>
            <span className="font-bold">Region: </span>
            {region}
          </p>
          <Button
            type="button"
            variant="ghost"
            className="h-fit text-[1em] uppercase px-[0.5em] py-[0.5em] rounded-sm"
          >
            <FaPencilAlt />
          </Button>
        </div>

        {/* DOB */}
        <div className="flex items-center justify-between  mb-[0.5em]">
          <p>
            <span className="font-bold">Date of Birth: </span>
            {DOB}
          </p>
          <Button
            type="button"
            variant="ghost"
            className="h-fit text-[1em] uppercase px-[0.5em] py-[0.5em] rounded-sm"
          >
            <FaPencilAlt />
          </Button>
        </div>
      </form>
    </menu>
  );
};

export default AccountInfo;
