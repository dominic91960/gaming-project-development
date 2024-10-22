"use client";

import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Transaction, columns } from "./columns";
import { DataTable } from "./data-table";

import { FaEye } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import ProductSearchBar from "@/components/product-search/product-search";
import Navbar from "@/components/navbar/navbar";
import bg from "@/public/images/products/bg.png";
import samplePic from "@/public/images/sample-pic.png";
import StarRating from "../_components/star-rating";
import Footer from "@/components/footer/footer";
import AccountInfo from "./components/account-info";
import SecurityInfo from "./components/security-info";
import RecentActivityCard from "./components/recent-activity-card";

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
    name: "1Greed Fall",
    desc: "Wishlist is a game key store offering top titles at unbeatable prices. Find and purchase game keys quickly and securely.",
    rating: 5,
    originalPrice: 299,
    discountPrice: 399,
  },
  {
    poster: samplePic,
    name: "2Greed Fall",
    desc: "Wishlist is a game key store offering top titles at unbeatable prices. Find and purchase game keys quickly and securely.",
    rating: 5,
    originalPrice: 299,
    discountPrice: 399,
  },
  {
    poster: samplePic,
    name: "3Greed Fall",
    desc: "Wishlist is a game key store offering top titles at unbeatable prices. Find and purchase game keys quickly and securely.",
    rating: 5,
    originalPrice: 299,
    discountPrice: 399,
  },
  {
    poster: samplePic,
    name: "4Greed Fall",
    desc: "Wishlist is a game key store offering top titles at unbeatable prices. Find and purchase game keys quickly and securely.",
    rating: 5,
    originalPrice: 299,
    discountPrice: 399,
  },
  {
    poster: samplePic,
    name: "5Greed Fall",
    desc: "Wishlist is a game key store offering top titles at unbeatable prices. Find and purchase game keys quickly and securely.",
    rating: 5,
    originalPrice: 299,
    discountPrice: 399,
  },
  {
    poster: samplePic,
    name: "6Greed Fall",
    desc: "Wishlist is a game key store offering top titles at unbeatable prices. Find and purchase game keys quickly and securely.",
    rating: 5,
    originalPrice: 299,
    discountPrice: 399,
  },
  {
    poster: samplePic,
    name: "7Greed Fall",
    desc: "Wishlist is a game key store offering top titles at unbeatable prices. Find and purchase game keys quickly and securely.",
    rating: 5,
    originalPrice: 299,
    discountPrice: 399,
  },
  {
    poster: samplePic,
    name: "8Greed Fall",
    desc: "Wishlist is a game key store offering top titles at unbeatable prices. Find and purchase game keys quickly and securely.",
    rating: 5,
    originalPrice: 299,
    discountPrice: 399,
  },
  {
    poster: samplePic,
    name: "9Greed Fall",
    desc: "Wishlist is a game key store offering top titles at unbeatable prices. Find and purchase game keys quickly and securely.",
    rating: 5,
    originalPrice: 299,
    discountPrice: 399,
  },
  {
    poster: samplePic,
    name: "10Greed Fall",
    desc: "Wishlist is a game key store offering top titles at unbeatable prices. Find and purchase game keys quickly and securely.",
    rating: 5,
    originalPrice: 299,
    discountPrice: 399,
  },
  {
    poster: samplePic,
    name: "11Greed Fall",
    desc: "Wishlist is a game key store offering top titles at unbeatable prices. Find and purchase game keys quickly and securely.",
    rating: 5,
    originalPrice: 299,
    discountPrice: 399,
  },
  {
    poster: samplePic,
    name: "12Greed Fall",
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
        price: 12.5,
      },
      {
        productId: "#ri6s94",
        poster: samplePic,
        name: "Sample game",
        price: 11.5,
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
        price: 23.99,
      },
      {
        productId: "#ri6s94",
        poster: samplePic,
        name: "Sample game",
        price: 12.5,
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
        price: 12.5,
      },
      {
        productId: "#ri6s94",
        poster: samplePic,
        name: "Sample game",
        price: 12.5,
      },
    ],
    coupon: 5.99,
  },
];

interface RecentActivity {
  poster: StaticImageData;
  name: string;
  desc: string;
  rating: number;
  originalPrice: number;
  discountPrice: number;
}

export default function ProfilePage() {
  const [productsPerPage, setProductsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState<RecentActivity[]>(
    []
  );
  const totalPages = Math.ceil(recentActivity.length / productsPerPage);

  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;

    setDisplayedProducts(
      recentActivity.slice(startIndex, startIndex + productsPerPage)
    );
  }, [currentPage, productsPerPage]);

  useEffect(() => {
    const handleResize = () => {
      setCurrentPage(1);
      const screenWidth = window.innerWidth;

      switch (true) {
        case screenWidth < 550:
          setProductsPerPage(3);
          break;
        case screenWidth >= 550 && screenWidth < 1280:
          setProductsPerPage(4);
          break;
        case screenWidth >= 1280:
          setProductsPerPage(5);
          break;
        default:
          setProductsPerPage(3);
          break;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getTransaction = (selectedOrderId: string) =>
    transactions.filter(({ orderId }) => orderId === selectedOrderId)[0];

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
          {/* Order no */}
          <h4>Order No {row.original.orderId}</h4>

          {/* Ordered products */}
          {getTransaction(row.original.orderId).products.map(
            ({ productId, poster, name, price }) => (
              <div key={productId} className="flex justify-between">
                <Image src={poster} alt={name} className="size-[20px]" />
                <p>{name}</p>
                <p>{productId}</p>
                <p>${price}</p>
              </div>
            )
          )}

          {/* Order subtotal */}
          <p>
            Items Subtotal: $
            {getTransaction(row.original.orderId)
              .products.reduce((sum, product) => sum + product.price, 0)
              .toFixed(2)}
          </p>

          {/* Coupons */}
          <p>Coupon: ${getTransaction(row.original.orderId).coupon}</p>

          {/* Order total */}
          <p>
            Order Total: $
            {(
              getTransaction(row.original.orderId).products.reduce(
                (sum, product) => sum + product.price,
                0
              ) -
              transactions.filter(
                ({ orderId }) => orderId === row.original.orderId
              )[0].coupon
            ).toFixed(2)}
          </p>
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
              <AccountInfo
                id={profile.id}
                avatar={profile.avatar}
                username={profile.username}
                email={profile.email}
                city={profile.city}
                country={profile.country}
                language={profile.language}
                firstName={profile.firstName}
                lastName={profile.lastName}
                address={profile.address}
                postalCode={profile.postalCode}
                region={profile.region}
                DOB={profile.DOB}
              />

              {/* Security details */}
              <SecurityInfo
                password={profile.password}
                tel={profile.password}
                trustedDevices={profile.trustedDevices}
              />
            </div>

            {/* Recent activity */}
            <h3 className="font-semibold text-[15px] mt-[1.2em] mb-[0.7em] sm:text-[20px] md:text-[25px] lg:text-[30px] xl:text-[35px] 2xl:text-[40px]">
              Recent Activity
            </h3>
            <div
              className={`flex ${
                displayedProducts.length < productsPerPage
                  ? "gap-x-[1em]"
                  : "justify-around"
              }`}
            >
              {displayedProducts.map(
                (
                  { poster, name, desc, rating, originalPrice, discountPrice },
                  index
                ) => (
                  <RecentActivityCard
                    key={index}
                    poster={poster}
                    name={name}
                    desc={desc}
                    rating={rating}
                    originalPrice={originalPrice}
                    discountPrice={discountPrice}
                  />
                )
              )}
            </div>
            <div className="flex justify-center gap-x-[1em] mt-[1.8em] text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]">
              <button
                className="hover:text-[#45F882] disabled:hover:text-white disabled:opacity-70"
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
              >
                <IoIosArrowBack />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`${
                    i + 1 === currentPage ? "text-[#45F882]" : ""
                  } hover:opacity-80`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="hover:text-[#45F882] disabled:hover:text-white disabled:opacity-70"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
              >
                <IoIosArrowForward />
              </button>
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
