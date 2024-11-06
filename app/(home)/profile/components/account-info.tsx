import React from "react";

import { Button } from "@/components/ui/button";
import { FaPencilAlt } from "react-icons/fa";

interface AccountInfoProps {
  id: string;
  username: string | null;
  email: string;
  firstName: string;
  lastName: string;
  // DOB: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  handleClick: () => void;
  setReloadProfile: (state: boolean) => void;
}

const AccountInfo: React.FC<AccountInfoProps> = ({
  id,
  username,
  email,
  firstName,
  lastName,
  // DOB,
  address,
  city,
  state,
  country,
  postalCode,
  handleClick,
  setReloadProfile,
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
      <div className="flex items-baseline justify-between">
        <h3 className="font-bold text-[15px] sm:text-[20px] md:text-[25px] lg:text-[30px] xl:text-[32px] 2xl:text-[35px]">
          Account Information
        </h3>
        <Button
          type="button"
          variant="ghost"
          className="h-fit text-[8px] uppercase px-[0.5em] py-[0.5em] rounded-sm sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[12px]"
          onClick={handleClick}
        >
          Edit&nbsp;&nbsp;
          <FaPencilAlt />
        </Button>
      </div>
      <hr className="border-t-[#BCBCBC] mt-[0.1em] mb-[1.7em]" />

      {/* Account info */}
      <div className="*:mb-[0.7em]">
        {/* ID */}
        {/* <p className="mb-[0.7em]">
          <span className="font-bold">ID: </span>
          {id}
        </p> */}

        {/* Username */}
        <p className="mb-[0.7em]">
          <span className="font-bold">Username: </span>
          {username ?? (
            <span className="opacity-70 italic text-[0.8em]">
              Please provide a username
            </span>
          )}
        </p>

        {/* Email */}
        <p>
          <span className="font-bold">Email: </span> {email}
        </p>

        {/* First name */}
        <p>
          <span className="font-bold">First Name: </span>
          {firstName.charAt(0).toUpperCase() + firstName.slice(1)}
        </p>

        {/* Last name */}
        <p>
          <span className="font-bold">Last Name: </span>
          {lastName.charAt(0).toUpperCase() + lastName.slice(1)}
        </p>

        {/* DOB
        <p>
          <span className="font-bold">Date of Birth: </span>
          {DOB ?? (
            <span className="opacity-70 italic text-[0.8em]">
              Please provide a DOB
            </span>
          )}
        </p> */}

        {/* Address */}
        <p>
          <span className="font-bold">Address: </span>
          {address?.trim() ? (
            address
          ) : (
            <span className="opacity-70 italic text-[0.8em]">
              Please provide an address
            </span>
          )}
        </p>

        {/* City */}
        <p>
          <span className="font-bold">City: </span>
          {city?.trim() ? (
            city
          ) : (
            <span className="opacity-70 italic text-[0.8em]">
              Please provide a city
            </span>
          )}
        </p>

        {/* State */}
        <p>
          <span className="font-bold">State: </span>
          {state?.trim() ? (
            state
          ) : (
            <span className="opacity-70 italic text-[0.8em]">
              Please provide a state
            </span>
          )}
        </p>

        {/* Country */}
        <p>
          <span className="font-bold">Country: </span>
          {country?.trim() ? (
            country
          ) : (
            <span className="opacity-70 italic text-[0.8em]">
              Please provide a country
            </span>
          )}
        </p>

        {/* Postal code */}
        <p>
          <span className="font-bold">Postal Code: </span>
          {postalCode?.trim() ? (
            postalCode
          ) : (
            <span className="opacity-70 italic text-[0.8em]">
              Please provide a postal code
            </span>
          )}
        </p>
      </div>
    </menu>
  );
};

export default AccountInfo;
