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
  originalPrice: 329.99,
  discountPrice: 20.99,
  //   discountPrice: null,
  rating: 4,
  languages: ["English", "Japanese", "Russian", "French", "Chinese"],
  os: "windows",
  developedBy: "ubisoft",
  platform: "steam",
  tags: [
    "Difficult",
    "RPG",
    "Dark Fantasy",
    "Souls-like",
    "Difficult",
    "RPG",
    "Dark Fantasy",
    "Souls-like",
  ],
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
  const [isLanguageTooltipOpen, setIsLanguageTooltipOpen] = useState(false);
  const calDiscountPercentage = () => {
    const discount = (gameData.discountPrice / gameData.originalPrice) * 100;
    return discount.toFixed(2);
  };

  return (
    <>
      <ProductSearchBar />
      {/* <Navbar /> */}
      <section className="bg-[#051301] font-primaryFont">
        {/* Image area with gradient */}
        <div
          className="relative h-[160px] bg-[length:640px_360px] bg-fixed sm:h-[220px] sm:bg-contain md:h-[280px] lg:h-[340px] lg:bg-[0px_-115px] 2xl:h-[480px]"
          style={{
            backgroundImage: `url(${gameData.image.src})`,
            backgroundPositionX: "center",
          }}
        >
          {/* Bottom gradient */}
          <div className="absolute bottom-0 w-full h-1/2 translate-y-px bg-gradient-to-t from-black to-transparent"></div>
        </div>

        {/* Gradient Wrapper for the rest of the content */}
        <div
          style={{
            background:
              "linear-gradient(to bottom, black, transparent, transparent, black)",
          }}
        >
          {/* Container for the rest of the content */}
          <div className="container mx-auto px-[36px]">
            {/* Flex container for Product header area and desktop price card*/}
            <div className="relative flex items-end pt-[1em] mb-[0.8em] sm:mb-[2em] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px]">
              {/* Container for title, info and tags*/}
              <div>
                {/* Full title */}
                <h2 className="font-bold pt-[1em] sm:pt-[0.8em] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[30px] 2xl:text-[32px] sm:max-w-[19ch] md:max-w-[21ch] lg:max-w-[29ch] xl:max-w-[38ch] 2xl:max-w-[46ch]">
                  {gameData.fullTitle}
                </h2>

                {/* Product info */}
                <div className="flex items-center text-[10px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] gap-x-[0.8em] leading-normal mt-[0.2em] mb-[0.6em]">
                  {/* Rating */}
                  <div className="text-[#f29d38] -translate-y-[10%]">
                    <StarRating rating={gameData.rating} />
                  </div>
                  <p>{gameData.rating}/5</p>
                  <div className="w-[1px] self-stretch bg-white"></div>

                  {/* Languages */}
                  <div className="flex">
                    <TooltipProvider delayDuration={0}>
                      <Tooltip
                        open={isLanguageTooltipOpen}
                        onOpenChange={setIsLanguageTooltipOpen}
                      >
                        <TooltipTrigger
                          className="text-[1em]"
                          onTouchStart={() => setIsLanguageTooltipOpen(true)}
                          onTouchEnd={() => setIsLanguageTooltipOpen(false)}
                          asChild
                        >
                          <button className="select-none flex gap-x-[0.5ch]">
                            <p className="max-w-[8ch] overflow-hidden text-ellipsis">
                              {gameData.languages[0]}
                            </p>
                            {gameData.languages.length > 1 && (
                              <p> & {gameData.languages.length - 1} more</p>
                            )}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          className="rounded-none bg-black/50 text-white backdrop-blur-[2px]"
                          style={{
                            borderImage:
                              "linear-gradient(to bottom, transparent, #999999) 1",
                            borderWidth: "1px",
                            borderStyle: "solid",
                          }}
                        >
                          <p className="text-[13px] py-[0.4em] font-bold border-b">
                            Available Languages
                          </p>
                          {gameData.languages.map((language) => (
                            <p
                              key={language}
                              className="text-[13px] py-[0.4em]"
                            >
                              {language}
                            </p>
                          ))}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="w-[1px] self-stretch bg-white"></div>

                  {/* OS */}
                  <div className="size-[1.15em] flex items-center justify-center">
                    <Image
                      src={`/images/product/os/${gameData.os}.png`}
                      alt={gameData.os}
                      width={23}
                      height={23}
                    />
                  </div>
                  <div className="w-[1px] self-stretch bg-white"></div>

                  {/* developedBy */}
                  <div className="size-[1.15em] flex items-center justify-center">
                    <Image
                      src={`/images/product/developed-by/${gameData.developedBy}.png`}
                      alt={gameData.developedBy}
                      width={23}
                      height={23}
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-[1em] mt-[1em] text-[8px] sm:text-[9px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px] font-semibold text-center text-white sm:w-[40ch] md:w-[49ch] lg:w-[67ch] xl:w-[87ch] 2xl:w-[102ch]">
                  {gameData.tags.map((tag) => (
                    <div
                      key={tag}
                      className="bg-[#3B3B3B] flex items-center justify-center"
                    >
                      <p className="px-[1em] py-[0.3em]">{tag}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Container for desktop price card */}
              <div className="hidden sm:block">
                {/* Desktop price card */}
                <div
                  className="absolute bottom-0 right-0 bg-black/50 px-[1.6em] py-[2.7em] backdrop-blur-[2px] z-10"
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

            {/* Carousel */}
            <ImageCarousel video={gameData.video} images={gameData.images} />

            {/* Mobile price card */}
            <div
              className=" bg-white/5 px-[1.6em] py-[2.7em] mt-[0.6em] mb-[1.6em] backdrop-blur-[2px] text-[15px] sm:hidden"
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

            {/* Card Area */}
            <div className="flex flex-wrap justify-around gap-y-[2.4em] border-t capitalize font-medium text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-center py-[2.5em] mt-[2.5em] lg:text-left">
              {/* Card one */}
              <div className="w-fit flex flex-col items-center gap-[0.6em] lg:flex-row">
                <Image
                  src={availability}
                  alt="Availability"
                  width={68}
                  height={68}
                  className="size-[3.4em]"
                />
                <div>
                  <p className="font-bold text-[1.4em] uppercase">Global</p>
                  <p>All country</p>
                </div>
              </div>

              {/* Card two */}
              <div className="w-fit flex flex-col items-center gap-[0.6em] lg:flex-row">
                <Image
                  src={`/images/product/platform/${gameData.platform}.png`}
                  alt="Platform"
                  width={68}
                  height={68}
                  className="size-[3.4em]"
                />
                <div>
                  <p className="font-bold text-[1.4em] uppercase">
                    {gameData.platform}
                  </p>
                  <p>Activate/redeem on Steam</p>
                </div>
              </div>

              {/* Card three */}
              <div className="w-fit flex flex-col items-center gap-[0.6em] lg:flex-row">
                <Image
                  src={digitalKey}
                  alt="Digital key"
                  width={68}
                  height={68}
                  className="size-[3.4em]"
                />
                <div>
                  <p className="font-bold text-[1.4em] uppercase">
                    Digital keys
                  </p>
                  <p>Instant delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
