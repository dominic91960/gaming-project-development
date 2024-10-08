"use client";

import { useState } from "react";
import Image from "next/image";

import { PiWarningCircleLight } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import StarRating from "@/app/(home)/_components/star-rating";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LiaAngleRightSolid } from "react-icons/lia";
import { IoMdHeartEmpty, IoIosCart } from "react-icons/io";

import ContactBar from "@/app/contact-bar/contact-bar";
import ProductSearchBar from "@/components/product-search/product-search";
import Navbar from "@/components/navbar/navbar";
import ImageCarousel from "../_components/image-carousel";
import RequirementsCard from "../_components/requirements-card";
import ReviewCard from "../_components/review-card";
import Footer from "@/components/footer/footer";

import bg from "@/public/images/product/bg.png";
import paypalLogo from "@/public/images/product/paypal-logo.png";
import wishlist from "@/public/images/product/wishlist.png";
import cart from "@/public/images/product/cart.png";
import video from "@/public/images/product/video.png";
import imgOne from "@/public/images/product/image-one.png";
import imgTwo from "@/public/images/product/image-two.png";
import imgThree from "@/public/images/product/image-three.png";
import availability from "@/public/images/product/worldwide.png";
import digitalKey from "@/public/images/product/digital-key.png";
import lock from "@/public/images/product/lock.png";
import paypal from "@/public/images/product/paypal.png";
import visa from "@/public/images/product/visa.png";
import mastercard from "@/public/images/product/mastercard.png";
import skrill from "@/public/images/product/skrill.png";
import samplePic from "@/public/images/sample-pic.png";
import "../_components/product.css";

const gameData = {
  image: bg,
  title: "Star wars: outlaws",
  fullTitle: "STAR WARS: OUTLAWS (PC) Steam Key Global",
  originalPrice: 39.99,
  discountPrice: 20.99,
  //   discountPrice: null,
  rating: 4,
  languages: ["English", "Japanese", "Russian", "French", "Chinese"],
  os: "windows",
  developedBy: "ubisoft",
  platform: "steam",
  tags: ["Difficult", "RPG", "Dark Fantasy", "Souls-like"],
  video: video,
  images: [imgOne, imgTwo, imgThree, imgOne, imgTwo, imgThree],
  about:
    "Experience the first-ever open world Star Wars™ game and explore distinct locations across the galaxy, both iconic and new. Risk it all as scoundrel Kay Vess, seeking freedom and the means to start a new life. Fight, steal, and outwit your way through the galaxy’s crime syndicates as you join the galaxy’s most wanted. If you’re willing to take the risk, the galaxy is full of opportunity.",
  requirements: {
    minimum: {
      os: "WINDOWS 10 / 11 WITH DIRECTX 12",
      cpu: "INTEL® CORE™ i7-8700K, AMD RYZEN™ 5 3600",
      graphics:
        "GEFORCE® GTX 1660 · 6GB, AMD RX 5600 XT · 6GB, INTEL® ARC A750 · 8GB (REBAR ON)",
      ram: "8 GB (dual-channel mode)",
      storage: "65 GB SSD",
      resolution: "1080p / 30 Fps / Low Preset with Upscaler Set to Quality",
    },
    recommended: {
      os: "WINDOWS 10 / 11 WITH DIRECTX 12 RECO",
      cpu: "INTEL® CORE™ i7-8700K, AMD RYZEN™ 5 3600",
      graphics:
        "GEFORCE® GTX 1660 · 6GB, AMD RX 5600 XT · 6GB, INTEL® ARC A750 · 8GB (REBAR ON)",
      ram: "16 GB (dual-channel mode)",
      storage: "65 GB SSD",
      resolution: "1080p / 30 Fps / Low Preset with Upscaler Set to Quality",
    },
    high: {
      os: "WINDOWS 10 / 11 WITH DIRECTX 12 HIGH",
      cpu: "INTEL® CORE™ i7-8700K, AMD RYZEN™ 5 3600",
      graphics:
        "GEFORCE® GTX 1660 · 6GB, AMD RX 5600 XT · 6GB, INTEL® ARC A750 · 8GB (REBAR ON)",
      ram: "32 GB (dual-channel mode)",
      storage: "65 GB SSD",
      resolution: "1080p / 30 Fps / Low Preset with Upscaler Set to Quality",
    },
  },
};

const reviews = [
  {
    avatar: samplePic,
    username: "The Gamer",
    fullname: "John Doe",
    title: "Incredibly fun game. Worth it!",
    content:
      "It's beautiful, frantic, challenging, and a delight to play It's beautiful, frantic, challenging, and a delight to play It's beautiful, frantic, challenging, and a delight to play",
    date: "March 29, 2024",
    rating: 5,
  },
  {
    avatar: samplePic,
    username: "The Gamer 2",
    fullname: "John Doe",
    title: "Incredibly fun game. Worth it!",
    content:
      "It's beautiful, frantic, challenging, and a delight to play It's beautiful, frantic, challenging, and a delight to play It's beautiful, frantic, challenging, and a delight to play",
    date: "March 29, 2024",
    rating: 4,
  },
  {
    avatar: samplePic,
    username: "The Gamer 3",
    fullname: "John Doe",
    title: "Incredibly fun game. Worth it!",
    content:
      "It's beautiful, frantic, challenging, and a delight to play It's beautiful, frantic, challenging, and a delight to play It's beautiful, frantic, challenging, and a delight to play",
    date: "March 29, 2024",
    rating: 5,
  },
];

export default function ProductPage() {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const calDiscountPercentage = () => {
    const discount = (gameData.discountPrice / gameData.originalPrice) * 100;
    return discount.toFixed(2);
  };

  return (
    <>
      <ProductSearchBar />
      {/* <Navbar /> */}
      <section className="bg-[#051301] font-primaryFont">
        {/* Image area with desktop price card */}
        <div
          className="h-[160px] bg-[length:640px_360px] bg-fixed sm:h-[220px] sm:bg-contain md:h-[280px] lg:h-[340px] lg:bg-[0px_-115px] 2xl:h-[480px]"
          style={{
            backgroundImage: `url(${gameData.image.src})`,
            backgroundPositionX: "center",
          }}
        >
          {/* Bottom gradient */}
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>

          {/* Price card container*/}
          <div className="relative container mx-auto hidden sm:block">
            {/* Desktop price card */}
            <div
              className="absolute top-0 right-[36px] translate-y-1/2 bg-black/50 px-[1.6em] py-[2.7em] backdrop-blur-[2px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px]"
              style={{
                borderImage:
                  "linear-gradient(to bottom, transparent, #999999) 1",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
            >
              {/* Game title */}
              <h3 className="uppercase font-bold text-[1.3em] border-b">
                {gameData.title}
              </h3>

              {/* Price */}
              <div className="flex text-[2em] font-bold mt-[0.3em]">
                <p className="">
                  $ {gameData.discountPrice || gameData.originalPrice}
                </p>
                <div className="flex items-center text-[0.35em] font-medium ps-[0.7em] gap-x-[0.2em]">
                  <PiWarningCircleLight className="size-[1.25em]" />
                  <p className="opacity-70">Price is not final</p>
                </div>
              </div>

              {/* Discount percentage (if any) */}
              {gameData.discountPrice && (
                <p className="font-semibold flex items-center">
                  <span className="line-through opacity-70">
                    $ {gameData.originalPrice}
                  </span>
                  <span className="font-medium text-[0.8em] text-[#0BDB45] ">
                    &nbsp;Save&nbsp;
                    {calDiscountPercentage()}%
                  </span>
                </p>
              )}

              {/* Paypal button */}
              <Button
                variant="secondary"
                className="w-full h-[2em] rounded-none text-[1em] px-[1em] py-0 mt-[0.5em] mb-[1em]"
              >
                <Image
                  src={paypalLogo}
                  alt="Paypal logo"
                  className="w-auto h-[70%]"
                />
              </Button>

              {/* Buy, wishlist and add to cart */}
              <div className="flex gap-x-[3%]">
                <Button
                  variant="gaming"
                  className="h-[2em] text-[1em] px-[1em] py-0 font-semibold flex-grow"
                >
                  Buy now
                </Button>
                <button className="size-[2em] hover:opacity-80 border flex items-center justify-center">
                  <IoMdHeartEmpty className="text-[1em]" />
                </button>
                <button className="size-[2em] hover:opacity-80 border flex items-center justify-center">
                  <IoIosCart className="text-[1em]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Wrapper for the rest of the content */}
        <div
          className="container mx-auto px-[36px]"
          style={{
            background:
              "linear-gradient(to bottom, black, transparent, transparent, black)",
          }}
        >
          <div
            className="w-fit mx-auto bg-white/5 px-[1.6em] py-[2.7em] my-[1em] backdrop-blur-[2px] text-[15px] sm:hidden"
            style={{
              borderImage: "linear-gradient(to bottom, transparent, #999999) 1",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            {/* Game title */}
            <h3 className="uppercase font-bold text-[1.3em] border-b">
              {gameData.title}
            </h3>

            {/* Price */}
            <div className="flex text-[2em] font-bold mt-[0.3em]">
              <p className="">
                $ {gameData.discountPrice || gameData.originalPrice}
              </p>
              <div className="flex items-center text-[0.35em] font-medium ps-[0.7em] gap-x-[0.2em]">
                <PiWarningCircleLight className="size-[1.25em]" />
                <p className="opacity-70">Price is not final</p>
              </div>
            </div>

            {/* Discount percentage (if any) */}
            {gameData.discountPrice && (
              <p className="font-semibold flex items-center">
                <span className="line-through opacity-70">
                  $ {gameData.originalPrice}
                </span>
                <span className="font-medium text-[0.8em] text-[#0BDB45] ">
                  &nbsp;Save&nbsp;
                  {calDiscountPercentage()}%
                </span>
              </p>
            )}

            {/* Paypal button */}
            <Button
              variant="secondary"
              className="w-full h-[2em] rounded-none text-[1em] px-[1em] py-0 mt-[0.5em] mb-[1em]"
            >
              <Image
                src={paypalLogo}
                alt="Paypal logo"
                className="w-auto h-[70%]"
              />
            </Button>

            {/* Buy, wishlist and add to cart */}
            <div className="flex gap-x-[3%]">
              <Button
                variant="gaming"
                className="h-[2em] text-[1em] px-[1em] py-0 font-semibold flex-grow"
              >
                Buy now
              </Button>
              <button className="size-[2em] hover:opacity-80 border flex items-center justify-center">
                <IoMdHeartEmpty className="text-[1em]" />
              </button>
              <button className="size-[2em] hover:opacity-80 border flex items-center justify-center">
                <IoIosCart className="text-[1em]" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
