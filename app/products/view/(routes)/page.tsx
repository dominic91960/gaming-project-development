"use client";

import { useEffect, useState } from "react";
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

import ProductSearchBar from "@/components/product-search/product-search";
import ImageCarousel from "../_components/image-carousel";
import RequirementsCard from "../_components/requirements-card";
import ReviewCard from "../_components/review-card";
import Footer from "@/components/footer/footer";
import paypalLogo from "@/public/images/product/paypal-logo.png";
import availability from "@/public/images/product/worldwide.png";
import digitalKey from "@/public/images/product/digital-key.png";
import lock from "@/public/images/product/lock.png";
import paypal from "@/public/images/product/paypal.png";
import visa from "@/public/images/product/visa.png";
import mastercard from "@/public/images/product/mastercard.png";
import skrill from "@/public/images/product/skrill.png";
import samplePic from "@/public/images/sample-pic.png";
import "../_components/product.css";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/axios/axiosInstance";
import Spinner from "@/components/Spinner/Spinner";

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
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [isLanguageTooltipOpen, setIsLanguageTooltipOpen] = useState(false);
  interface GameData {
    image: string;
    title: string;
    fullTitle: string;
    originalPrice: number;
    discountPrice: number;
    releaseDate: string;
    rating: number;
    languages: string[];
    os: string;
    developedBy: string;
    platform: {
      name: string;
      image: string;
    };
    tags: string[];
    video: string;
    images: string[];
    about: string;
    requirements: {
      minimum: {
        os: string;
        cpu: string;
        graphics: string;
        ram: string;
        storage: string;
        resolution: string;
      };
      recommended: {
        os: string;
        cpu: string;
        graphics: string;
        ram: string;
        storage: string;
        resolution: string;
      };
    };
  }

  const [gameData, setGameData] = useState<GameData | null>(null);

  useEffect(() => {
    console.log("id",id);
    const getData = async () => {
      try {
        const res = await axiosInstance.get(`/games/${id}`);
        console.log(res.data);

        const mappedGameData = {
          image: res.data.coverImage,
          title: res.data.displayName,
          fullTitle: `${res.data.displayName} (PC) ${res.data.Platform.name} Key Global`,
          originalPrice: res.data.regularPrice,
          discountPrice: res.data.sellingPrice,
          releaseDate: res.data.releaseDate.split("T")[0],
          rating: 4,
          languages: res.data.languages,
          os: res.data.system.toLowerCase(),
          developedBy: "ubisoft",
          platform: {
            name: res.data.Platform.name,
            image: res.data.Platform.image
          },
          tags: res.data.tags.map((tag: { tag: { name: any; }; }) => tag.tag.name),
          video: res.data.video,
          images: res.data.screenshots,
          about: res.data.aboutThisGame,
          requirements: {
            minimum: {
              os: res.data.minimumOS,
              cpu: res.data.minimumCPU,
              graphics: res.data.minimumGPU,
              ram: res.data.minimumRAM,
              storage: res.data.minimumStorage,
              resolution: "1080p / 30 Fps / Low Preset with Upscaler Set to Quality",
            },
            recommended: {
              os: res.data.recommendedOS,
              cpu: res.data.recommendedCPU,
              graphics: res.data.recommendedGPU,
              ram: res.data.recommendedRAM,
              storage: res.data.recommendedStorage,
              resolution: "1080p / 30 Fps / High Preset with Upscaler Set to Quality",
            }
          }
        };

        setGameData(mappedGameData);
        
      } catch (error) {
        console.log(error);
      }

    }
    getData();
  }, []);
  const calDiscountPercentage = () => {
    if (!gameData) {
      return "0";
    }
    const discount =
      ((gameData.originalPrice - gameData.discountPrice) /
        gameData.originalPrice) *
      100;
    return discount.toFixed(2);
  };

  if (!gameData) {
    return <Spinner loading={true} />;
  }

  return (
    <>
      <ProductSearchBar />
      {/* <Navbar /> */}
      <section className="bg-[#051301] font-primaryFont text-white">
        {/* Image area with gradient */}
        <div
          className="relative h-[160px] bg-[length:640px_360px] bg-fixed sm:h-[220px] sm:bg-contain md:h-[280px] lg:h-[340px] lg:bg-[0px_-115px] 2xl:h-[480px]"
          style={{
            backgroundImage: `url(${gameData?.image})`,
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
            <div className="relative flex items-end pt-[1em] mb-[0.8em] sm:mb-[3em] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px]">
              {/* Container for title, info and tags*/}
              <div>
                {/* Full title */}
                <h2 className="font-bold pt-[1em] sm:pt-[0.8em] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[30px] 2xl:text-[32px] sm:max-w-[19ch] md:max-w-[21ch] lg:max-w-[29ch] xl:max-w-[38ch] 2xl:max-w-[46ch]">
                  {gameData?.fullTitle}
                </h2>

                {/* Product info */}
                <div className="flex items-center text-[10px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] gap-x-[0.8em] leading-normal mt-[0.2em] mb-[0.6em]">
                  {/* Rating */}
                  <div className="text-[#f29d38] -translate-y-[10%]">
                    <StarRating rating={gameData?.rating} />
                  </div>
                  <p>{gameData?.rating}/5</p>
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
                              {gameData?.languages[0]}
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
                <div className="flex flex-wrap gap-[1em] mt-[1em] text-[8px] sm:text-[9px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px] font-semibold text-center sm:w-[40ch] md:w-[49ch] lg:w-[67ch] xl:w-[87ch] 2xl:w-[102ch]">
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
            <div className="flex flex-wrap justify-around gap-y-[2.4em] border-t border-t-[#999999] capitalize font-medium text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-center pt-[4em] mt-[4em] lg:text-left">
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
                  <p className="opacity-70">All country</p>
                </div>
              </div>

              {/* Card two */}
              <div className="w-fit flex flex-col items-center gap-[0.6em] lg:flex-row">
                <Image
                  src={`${gameData.platform.image}`}
                  alt="Platform"
                  width={68}
                  height={68}
                  className="size-[3.4em]"
                />
                <div>
                  <p className="font-bold text-[1.4em] uppercase">
                    {gameData.platform.name}
                  </p>
                  <p className="opacity-70">Activate/redeem on Steam</p>
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
                  <p className="opacity-70">Instant delivery</p>
                </div>
              </div>
            </div>

            {/* Checkout Area */}
            <div className="text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] pt-[4em]">
              <h3 className="font-semibold text-[1.4em] capitalize">
                Checkout guaranteed
              </h3>
              <div className="bg-white/5 p-[2em] mt-[2em]">
                <div className="flex justify-between items-center text-[1.2em] font-medium">
                  <p>Payment method</p>
                  <Image src={lock} alt="Payment secured" />
                </div>
                <div className="flex gap-x-[1em] my-[2em]">
                  <Image src={paypal} alt="Paypal" />
                  <Image src={visa} alt="Visa" />
                  <Image src={mastercard} alt="Mastercard" />
                  <Image src={skrill} alt="Skrill" />
                </div>
                <p className="opacity-70">
                  Your payment information is processed securely. We do not
                  store credit card details nor have access to your credit card
                  information.
                </p>
              </div>
            </div>

            {/* About */}
            <div className="text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] pt-[4em]">
              <h3 className="font-semibold text-[1.4em] capitalize">
                About this game
              </h3>
              <div className="bg-white/5 p-[2em] mt-[2em]">
                <p className="pb-[2em] text-justify opacity-70">
                  {gameData.about}
                </p>
                <p className="flex justify-between items-center text-[1.2em] font-medium ">
                  Release Date: {gameData.releaseDate}
                </p>
              </div>
            </div>

            {/* System requirements */}
            <div className="text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] pt-[4em]">
              <h3 className="font-semibold text-[1.4em] capitalize">
                System Requirements for {gameData.title}
              </h3>
              <RequirementsCard requirements={gameData.requirements} />
            </div>

            {/* Reviews */}
            <div className=" text-[8px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] pt-[4em] pb-[4.5em]">
              <h3 className="font-semibold capitalize text-[1.4em]">
                User Reviews
              </h3>
              <hr className="my-[2em]" />

              {/* Review button */}
              <div className="flex items-center mb-[1.5em] text-[1.4em] sm:text-[1em] md:text-[0.8em] *:flex-grow">
                <div>
                  <StarRating rating={5} />
                  <Button
                    variant="outline"
                    className="h-fit text-white text-[1em] py-[0.5em] px-[1em] mt-[0.8em] rounded-none"
                    onClick={() => setIsReviewFormVisible(true)}
                  >
                    &#43; Add your review
                  </Button>
                </div>
                <div>
                  <p className="flex leading-tight">
                    <span className="text-[#f29d38]">
                      <StarRating rating={1} />
                    </span>
                    &nbsp;{gameData.rating}/5
                  </p>
                  <p>Overall Rating</p>
                </div>
              </div>

              {/* Review form */}
              <div
                className={`md:w-fit bg-white/10 md:text-[0.8em] p-[4em] mt-[3em] mb-[3.5em] origin-top ${
                  isReviewFormVisible
                    ? "flex flex-col md:flex-row justify-around gap-x-[5em] animate-slide-down"
                    : "hidden"
                }`}
              >
                {/* User profile preview */}
                <div>
                  <div className="flex items-center gap-x-[1.5em]">
                    <div>
                      <Image
                        src={samplePic}
                        alt="username"
                        className="size-[4.5em] rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-[1.25em] font-bold">The Gamer</h4>
                      <p className="text-[0.9em]">By John Doe</p>
                    </div>
                  </div>
                  <hr className="my-[1em]" />
                  <p>Your review must contain at least 150 characters.</p>
                </div>

                {/* Review form*/}
                <div>
                  <h4 className="text-[1.5em] font-semibold mt-[2em] md:mt-0">
                    Detailed Rating
                  </h4>

                  <p className="text-[1.4em] mt-[1em] mb-[0.3em]">Rating</p>
                  <div className="text-[1.5em]">
                    <StarRating rating={5} />
                  </div>

                  <p className="text-[1.4em] mt-[1em] mb-[0.3em]">
                    Review Title
                  </p>
                  <input
                    type="text"
                    className="w-full md:w-[50ch] px-[1em] py-[0.5em] outline-none text-white bg-white/10 text-[1.3em] sm:text-[1em]"
                  />

                  <p className="text-[1.4em] mt-[1em] mb-[0.3em]">
                    Review Text
                  </p>
                  <textarea
                    className="w-full md:w-[50ch] px-[1em] py-[0.5em] outline-none text-white bg-white/10 text-[1.3em] sm:text-[1em]"
                    rows={5}
                  ></textarea>

                  <div className="flex justify-end pt-[1.2em] gap-x-[1em] text-[1.2em] md:text-[1em]">
                    <Button
                      variant="destructive"
                      className="text-[1em] h-fit px-[1em] py-[0.5em] rounded-none"
                      onClick={() => setIsReviewFormVisible(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="gaming"
                      className="text-[1em] h-fit px-[1em] py-[0.5em] hover:opacity-90"
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              </div>

              {/* Review card */}
              <div className="flex justify-between flex-wrap">
                {reviews.map(
                  ({
                    avatar,
                    username,
                    fullname,
                    title,
                    content,
                    date,
                    rating,
                  }) => (
                    <ReviewCard
                      key={username}
                      avatar={avatar}
                      username={username}
                      fullname={fullname}
                      title={title}
                      content={content}
                      date={date}
                      rating={rating}
                    />
                  )
                )}
              </div>
              <div className="flex justify-end">
                <Button
                  variant="gaming"
                  className="text-[1em] px-[1em] py-[0.5em] h-fit"
                >
                  See More <LiaAngleRightSolid />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
