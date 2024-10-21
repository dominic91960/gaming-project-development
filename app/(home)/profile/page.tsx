import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FaPencilAlt } from "react-icons/fa";

import ProductSearchBar from "@/components/product-search/product-search";
import Navbar from "@/components/navbar/navbar";
import bg from "@/public/images/products/bg.png";
import samplePic from "@/public/images/sample-pic.png";

const profile = {
  id: "b0ijjfb4343asc4848##56",
  avatar: samplePic,
  username: "ellison342",
  email: "kavindakmanohara@gmail.com",
  city: "Kandy",
  country: "Sri Lanka",
  language: "English",
  firstName: "Ellison",
  lastName: "Smith",
  address: "270/F, Kadawatha Road Ganemulla",
  postalCode: "11020",
  region: "western",
  DOB: "2001/08/04",
};

export default function ProfilePage() {
  return (
    <>
      <ProductSearchBar />
      <Navbar />
      <section className="bg-[#051301] font-primaryFont text-white">
        {/* Header */}
        <div
          className="relative font-normal leading-tight bg-cover bg-center"
          style={{ backgroundImage: `url('${bg.src}')` }}
        >
          {/* Header text container */}
          <div className="relative container mx-auto px-[36px] text-[7px] z-10 sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]">
            <div className="flex items-center gap-x-[15px] pt-[64px] sm:gap-x-[25px] md:gap-x-[35px] lg:gap-x-[45px] xl:gap-x-[50px] 2xl:gap-x-[56px] pb-[55px] sm:pt-[74px] md:pt-[86px] lg:pt-[98px] xl:pt-[107px] 2xl:pt-[116px]">
              <div className="size-[46px] sm:size-[70px] md:size-[94px] lg:size-[118px] xl:size-[135px] 2xl:size-[152px]">
                <Image
                  src={profile.avatar}
                  alt={profile.id}
                  className="w-full rounded-full"
                />
              </div>
              <div>
                <h3 className="font-bold text-[16px] mb-[0.1em] sm:text-[22px] md:text-[28px] lg:text-[34px] xl:text-[37px] 2xl:text-[40px]">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p>
                  {profile.email}
                  <span className="text-[#BCBCBC]">&nbsp;|&nbsp;</span>
                  {profile.city} {profile.country}
                </p>
                <hr className="border-t-[#0BDB45] my-[0.2em]" />
                <p className="capitalize sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-[10.5px] 2xl:text-[11px]">
                  your private information is
                  <span className="font-bold"> not visible to others.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom gradient  */}
          <div className="w-full h-1/2 absolute bottom-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <div className="bg-gradient-to-b from-black from-0% via-transparent via-20% to-black to-80%">
          {/* Container for the rest of the content */}
          <div className="container mx-auto px-[36px]">
            {/* Container for account details and security details */}
            <div className="grid grid-cols-1 sm:grid-cols-12">
              {/* Account details */}
              <menu
                className="bg-gradient-to-b from-transparent to-white/30 text-[8px] p-[2em] border border-t-0 sm:col-span-7 sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
                style={{
                  borderImage:
                    "linear-gradient(to bottom, transparent, #75F94C) 1",
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
                      <span className="font-bold">ID:</span> {profile.id}
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
                      {profile.username}
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
                      <span className="font-bold">Email: </span> {profile.email}
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
                      {profile.language}
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
                      {profile.firstName}
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
                      {profile.lastName}
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
                      {profile.address}
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
                      {profile.postalCode}
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
                      {profile.region}
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
                      {profile.DOB}
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
              <menu className="sm:col-span-5 bg-slate-200"></menu>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
