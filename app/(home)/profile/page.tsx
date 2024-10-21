"use client";

import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Transaction, columns } from "./columns";
import { DataTable } from "./data-table";

import { FaPencilAlt } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";
import { LuMonitor } from "react-icons/lu";
import { FaEye } from "react-icons/fa";

import ProductSearchBar from "@/components/product-search/product-search";
import Navbar from "@/components/navbar/navbar";
import bg from "@/public/images/products/bg.png";
import samplePic from "@/public/images/sample-pic.png";
import StarRating from "../_components/star-rating";
import Footer from "@/components/footer/footer";

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
  password: "ABCD1234",
  tel: "0284948483",
  trustedDevices: 2,
};

const recentActivity = [
  {
    poster: samplePic,
    name: "Greed Fall",
    desc: "Wishlist is a game key store offering top titles at unbeatable prices. Find and purchase game keys quickly and securely.",
    rating: 5,
    originalPrice: 299,
    discountPrice: 399,
  },
  {
    poster: samplePic,
    name: "Greed Fall",
    desc: "Wishlist is a game key store offering top titles at unbeatable prices. Find and purchase game keys quickly and securely.",
    rating: 5,
    originalPrice: 299,
    discountPrice: 399,
  },
  {
    poster: samplePic,
    name: "Greed Fall",
    desc: "Wishlist is a game key store offering top titles at unbeatable prices. Find and purchase game keys quickly and securely.",
    rating: 5,
    originalPrice: 299,
    discountPrice: 399,
  },
];

const transactions = [
  {
    orderId: "#546FGd",
    date: "2023/08/04",
    username: "Dominic Brian",
    total: 9.25,
    products: [
      {
        productId: "#rid294",
        poster: samplePic,
        name: "Greed Fall",
        originalPrice: 12.5,
        discountPrice: 10.5,
      },
      {
        productId: "#ri6s94",
        poster: samplePic,
        name: "Sample game",
        originalPrice: 59.99,
        discountPrice: 39.99,
      },
    ],
    coupon: 5.99,
  },
  {
    orderId: "#546FGw",
    date: "2023/08/04",
    username: "Dominic Brian",
    total: 12.99,
    products: [
      {
        productId: "#rid294",
        poster: samplePic,
        name: "Greed Fall",
        originalPrice: 12.5,
        discountPrice: 10.5,
      },
      {
        productId: "#ri6s94",
        poster: samplePic,
        name: "Sample game",
        originalPrice: 59.99,
        discountPrice: 39.99,
      },
    ],
    coupon: 5.99,
  },
  {
    orderId: "#546FGa",
    date: "2023/02/14",
    username: "Dominic Brian",
    total: 6.5,
    products: [
      {
        productId: "#rid294",
        poster: samplePic,
        name: "Greed Fall",
        originalPrice: 12.5,
        discountPrice: 10.5,
      },
      {
        productId: "#ri6s94",
        poster: samplePic,
        name: "Sample game",
        originalPrice: 59.99,
        discountPrice: 39.99,
      },
    ],
    coupon: 5.99,
  },
];

export default function ProfilePage() {
  const viewColumn: ColumnDef<Transaction> = {
    id: "view",
    header: "Action",
    cell: ({ row }) => (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="h-fit text-[1em] px-[0.6em] py-[0.6em] rounded-sm"
          >
            <FaEye />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          {transactions
            .filter(({ orderId }) => orderId === row.original.orderId)
            .map(({ orderId, date, total, username }) => (
              <div key={orderId}>
                <p>{date}</p>
                <p>{total}</p>
                <p>{username}</p>
              </div>
            ))}
        </PopoverContent>
      </Popover>
    ),
  };

  const updatedColumns: ColumnDef<Transaction>[] = [...columns, viewColumn];

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

        <div className="bg-gradient-to-b from-black to-transparent">
          {/* Container for the rest of the content */}
          <div className="container mx-auto px-[36px] pb-[20px] 2xl:pb-[80px]">
            {/* Container for account details and security details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-[20px] sm:gap-[16px] md:gap-[20px] lg:gap-[26px] xl:gap-[32px] 2xl:gap-[38px]">
              {/* Account details */}
              <menu
                className="bg-gradient-to-b from-transparent to-white/30 text-[8px] p-[2em] border border-t-0 sm:text-[10px] md:col-span-7 md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
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
                      <span className="font-bold">ID: </span>
                      {profile.id}
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

              {/* Security details */}
              <menu
                className="bg-gradient-to-b from-transparent to-white/30 text-[8px] p-[2em] border border-t-0 sm:text-[10px] md:col-span-5 md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
                style={{
                  borderImage:
                    "linear-gradient(to bottom, transparent, #75F94C) 1",
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
                        value={profile.password}
                        className="bg-transparent outline-none"
                        readOnly
                      />
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-fit text-[8px] uppercase px-[0.5em] py-[0.5em] rounded-sm sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[12px]"
                    >
                      Edit&nbsp;&nbsp;
                      <FaPencilAlt />
                    </Button>
                  </div>

                  <hr className="border-t-[#BCBCBC]" />

                  <h4 className="font-bold text-[10px] mt-[0.6em] sm:text-[12px] md:text-[15px] lg:text-[18px] xl:text-[21px] 2xl:text-[23px]">
                    2-Step Verification
                  </h4>

                  <div className="mt-[0.3em]">
                    <p className="flex items-center gap-x-[0.3em] text-[8px] sm:text-[8.5px] md:text-[8.75px] lg:text-[9px]">
                      <FaCircleCheck className="text-[#0BDB45]" />
                      Email
                    </p>
                    <p className="text-[8px] sm:text-[8.5px] md:text-[8.75px] lg:text-[9px]">
                      Each time you log in with a new device, you&apos;ll be
                      asked for the security code sent to v
                    </p>
                  </div>

                  {/* Backup phone number */}
                  <div className="flex items-center justify-between mt-[1.5em]">
                    <div className="flex items-center gap-x-[0.4em]">
                      <FaMobileAlt className="size-[12px] sm:size-[15px] md:size-[18px] lg:size-[21px] xl:size-[24px] 2xl:size-[27px]" />
                      <div className="w-px h-[2.5em] bg-[#BCBCBC]"></div>
                      <div className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[14px]">
                        <p className="font-semibold">
                          Phone number used for backup class
                        </p>
                        <p>
                          {profile.tel.replace(
                            profile.tel.slice(0, 7),
                            "*******"
                          )}
                        </p>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      className="h-fit text-[8px] uppercase px-[0.5em] py-[0.5em] rounded-sm sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[12px]"
                    >
                      Edit&nbsp;&nbsp;
                      <FaPencilAlt />
                    </Button>
                  </div>

                  <hr className="border-t-[#BCBCBC] my-[0.6em]" />

                  {/* Trusted devices */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-[0.4em]">
                      <LuMonitor className="size-[12px] sm:size-[15px] md:size-[18px] lg:size-[21px] xl:size-[24px] 2xl:size-[27px]" />
                      <div className="w-px h-[2.5em] bg-[#BCBCBC]"></div>
                      <div className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[14px]">
                        <p className="font-semibold">Trusted devices</p>
                        <p>
                          You have <span>{profile.trustedDevices}</span> trusted
                          devices
                        </p>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      className="h-fit text-[8px] uppercase px-[0.5em] py-[0.5em] rounded-sm sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[12px]"
                    >
                      Edit&nbsp;&nbsp;
                      <FaPencilAlt />
                    </Button>
                  </div>
                </form>

                <div className="mt-[1.5em]">
                  <p className="text-justify text-[8px] sm:text-[8.5px] md:text-[8.75px] lg:text-[9px]">
                    Each time you log in with a new device, you&apos;ll be asked
                    for the security code sent toEach time you log in with a new
                    device, you&apos;ll be asked for the security code sent to v
                    v
                  </p>

                  <p className="mt-[0.5em] text-justify text-[8px] sm:text-[8.5px] md:text-[8.75px] lg:text-[9px]">
                    Each time you log in with a new device, you&apos;ll be asked
                    for the security code sent toEach time you log in with a new
                    device, you&apos;ll be asked for the security code sent to v
                    vEach time you log in with a new device, you&apos;ll be
                    asked for the security code sent toEach time you log in with
                    a new device, you&apos;ll be asked for the security code
                    sent to v v
                  </p>
                </div>
              </menu>
            </div>

            {/* Recent activity */}
            <h3 className="font-semibold text-[15px] mt-[1.2em] mb-[0.7em] sm:text-[20px] md:text-[25px] lg:text-[30px] xl:text-[35px] 2xl:text-[40px]">
              Recent Activity
            </h3>
            <div className="flex justify-between">
              {recentActivity.map(
                ({
                  poster,
                  name,
                  desc,
                  rating,
                  originalPrice,
                  discountPrice,
                }) => (
                  <article
                    key={name}
                    className="w-fit bg-white/5 text-[7px] p-[0.6em] border border-white/20 sm:text-[9px] md:text-[11px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]"
                  >
                    <div
                      className="w-[86px] h-[96px] bg-cover bg-center mb-[0.5em] sm:w-[120px] md:w-[150px] lg:w-[180px] xl:w-[210px] 2xl:w-[246px] sm:h-[130px] md:h-[160px] lg:h-[200px] xl:h-[240px] 2xl:h-[270px]"
                      style={{ backgroundImage: `url(${poster.src})` }}
                    ></div>

                    <h5 className="w-[12ch] font-bold text-[9px] uppercase overflow-hidden text-nowrap text-ellipsis sm:text-[12px] md:text-[15px] lg:text-[18px] xl:text-[22px] 2xl:text-[25px]">
                      {name}
                    </h5>
                    <p className="w-[14ch] font-medium uppercase overflow-hidden text-nowrap text-ellipsis">
                      {desc}
                    </p>
                    <hr className="border-t-white/20 my-[0.5em]" />

                    <div className="text-[6px] text-[#f29d38] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px]">
                      <StarRating rating={rating} />
                    </div>

                    <div className="flex items-baseline gap-x-[0.5em]">
                      <p className="font-semibold text-[17px] text-[#75F94C] sm:text-[24px] md:text-[30px] lg:text-[36px] xl:text-[42px] 2xl:text-[46px]">
                        ${discountPrice}
                      </p>
                      <p className="line-through">${originalPrice}</p>
                    </div>
                  </article>
                )
              )}
            </div>

            {/* Transaction history */}
            <h3 className="font-semibold text-[15px] mt-[1.2em] mb-[0.7em] sm:text-[20px] md:text-[25px] lg:text-[30px] xl:text-[35px] 2xl:text-[40px]">
              Transaction History
            </h3>
            <div
              className="bg-gradient-to-b from-transparent to-white/30 border border-t-0 text-[8px] p-[12px] 2xl:p-[50px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
              style={{
                borderImage:
                  "linear-gradient(to bottom, transparent, #75F94C) 1",
              }}
            >
              <DataTable columns={updatedColumns} data={transactions} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
