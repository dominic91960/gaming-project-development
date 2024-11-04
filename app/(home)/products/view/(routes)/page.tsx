"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import axiosInstance from "@/axios/axiosInstance";
import Spinner from "@/components/Spinner/Spinner";
import { Button } from "@/components/ui/button";
import Reviews from "@/app/(home)/_components/reviews";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PiWarningCircleLight } from "react-icons/pi";
import { LiaAngleRightSolid } from "react-icons/lia";
import { IoMdHeart, IoMdHeartEmpty, IoIosCart } from "react-icons/io";
import { MdOutlineSpeakerNotesOff } from "react-icons/md";
import { RiEmotionSadLine } from "react-icons/ri";

import { useCartContext } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import StarRating from "@/app/(home)/_components/star-rating";
import ImageCarousel from "../_components/image-carousel";
import RequirementsCard from "../_components/requirements-card";
import ReviewCard from "../_components/review-card";
import Footer from "@/components/footer/footer";
// import paypalLogo from "@/public/images/product/paypal-logo.png";
import availability from "@/public/images/product/worldwide.png";
import digitalKey from "@/public/images/product/digital-key.png";
import lock from "@/public/images/product/lock.png";
import paypal from "@/public/images/product/paypal.png";
import visa from "@/public/images/product/visa.png";
import mastercard from "@/public/images/product/mastercard.png";
import skrill from "@/public/images/product/skrill.png";
import samplePic from "@/public/images/sample-pic.png";
import "../_components/product.css";
import CartSidebar from "@/app/(home)/_components/shopping-cart-sidebar";
import AccessDeniedModal from "@/components/access-denied-modal/AccessDeniedModal";
import axios from "axios";

export default function ProductPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [isLanguageTooltipOpen, setIsLanguageTooltipOpen] = useState(false);
  const [accessDeniedPopupOpen, setAccessDeniedPopupOpen] = useState(false);

  const [rate, setRate] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [reviews, setReviews] = useState<any[]>([]);
  const router = useRouter();
  const { user } = useAuthContext();
  const addToast = useToast();
  const [verifySession, setVerifySession] = useState<boolean>(false);

  useEffect(() => {
    const verifySession = async () => {
      // setLoading(true);
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_BASE_URL + "/auth/verify-session",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (res.status === 200) {
          setVerifySession(true);
          return res.data;
        } else {
          setVerifySession(false);
        }
        // setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    };

    verifySession();
  }, []);

  const { addItem } = useCartContext();

  type CartItem = {
    id: number;
    image: string;
    choiceType: string;
    title: string;
    quantity: number;
    price: number;
    productType: string;
  };

  const addToCardItem = (cartItemId: any) => {
    if (!gameData) {
      console.error("Game data is missing");
      return;
    }

    const newCardItem: CartItem = {
      id: cartItemId,
      image: gameData?.image,
      choiceType: "aaaaaa",
      title: gameData?.title,
      quantity: 1,
      price: gameData?.discountPrice,
      productType: "bbbbbb",
    };

    addItem(newCardItem);
  };
  interface GameData {
    stockStatus: string;
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
    const getData = async () => {
      try {
        const res = await axiosInstance.get(`/games/${id}`);

        const mappedGameData = {
          stockStatus: res.data.stockStatus,
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
            image: res.data.Platform.image,
          },
          tags: res.data.tags.map(
            (tag: { tag: { name: any } }) => tag.tag.name
          ),
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
              resolution:
                "1080p / 30 Fps / Low Preset with Upscaler Set to Quality",
            },
            recommended: {
              os: res.data.recommendedOS,
              cpu: res.data.recommendedCPU,
              graphics: res.data.recommendedGPU,
              ram: res.data.recommendedRAM,
              storage: res.data.recommendedStorage,
              resolution:
                "1080p / 30 Fps / High Preset with Upscaler Set to Quality",
            },
          },
        };

        setGameData(mappedGameData);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
    getReviewsByGameId(id);
    window.scrollTo(0, 0);
  }, [id]);

  const getReviewsByGameId = async (id: any) => {
    try {
      const response = await axiosInstance.get(
        `/reviews/reviewByFlat?gameId=${id}`
      );
      setReviews(response.data);
    } catch (error: any) {
      /* toast({
        variant: "error",
        title: error.response.data.message,
      }); */
      addToast(error.response.data.message, "error");
    } finally {
      // setLoading(false);
    }
  };

  const calculateOverallRating = (reviews: any) => {
    let total = 0;
    reviews.forEach((review: any) => {
      total = total + review.rating;
    });
    return total / (reviews.length * 5);
  };

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

  const addToCartAndRedirect = async (id: string | null) => {
    await addToCardItem(id);
    router.push("/cart");
  };

  const addReview = async () => {
    const newReview = {
      rating: rate,
      comment,
      title,
      userId: user?.id,
      gameId: id,
    };
    try {
      const response = await axiosInstance.post(`/reviews`, newReview);
      const { message } = response.data;
      getReviewsByGameId(id);
    } catch (error: any) {
    } finally {
      setComment("");
      setRate(0);
      // setLoading(false);
      setIsReviewFormVisible(false);
    }
  };

  return (
    <Suspense fallback={<Spinner loading={true} />}>
      <>
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
                  <h2 className="font-bold pt-[1em] sm:pt-[0.8em] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[27px] 2xl:text-[29px] sm:max-w-[19ch] md:max-w-[21ch] lg:max-w-[29ch] xl:max-w-[38ch] 2xl:max-w-[46ch]">
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
                              <p className="max-w-[8ch] text-nowrap overflow-hidden text-ellipsis">
                                {gameData?.languages[0].split(",")[0]}
                              </p>
                              {gameData.languages[0].split(",").length > 1 && (
                                <p>
                                  &&nbsp;
                                  {gameData.languages[0].split(",").length - 1}
                                  &nbsp;more
                                </p>
                              )}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent
                            className="rounded-none bg-black/50 text-white backdrop-blur-sm"
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
                            {gameData.languages[0]
                              .split(",")
                              .map((language) => (
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
                  {gameData.stockStatus !== "OUT_OF_STOCK" ? (
                    <div
                      className="absolute bottom-0 right-0 bg-black/50 px-[1.6em] py-[2.7em] backdrop-blur-md z-10"
                      style={{
                        borderImage:
                          "linear-gradient(to bottom, transparent, #999999) 1",
                        borderWidth: "1px",
                        borderStyle: "solid",
                      }}
                    >
                      {/* Game title */}
                      <h3 className="max-w-[20ch] uppercase font-bold text-[1.2em] border-b">
                        {gameData.title}
                      </h3>

                      {/* Price */}
                      <div className="flex text-[1.8em] font-bold mt-[0.3em]">
                        <p className="">
                          ${" "}
                          {gameData.discountPrice.toFixed(2) ||
                            gameData.originalPrice.toFixed(2)}
                        </p>
                        <div className="flex items-center text-[0.33em] font-medium ps-[0.7em] gap-x-[0.2em]">
                          <PiWarningCircleLight className="size-[1.22em]" />
                          <p className="opacity-70">Price is not final</p>
                        </div>
                      </div>

                      {/* Discount percentage (if any) */}
                      {gameData.discountPrice && (
                        <p className="font-semibold flex items-center">
                          <span className="line-through opacity-70">
                            $ {gameData.originalPrice.toFixed(2)}
                          </span>
                          <span className="font-medium text-[0.7em] text-[#0BDB45] ">
                            &nbsp;Save&nbsp;
                            {calDiscountPercentage()}%
                          </span>
                        </p>
                      )}

                      {/* Paypal button */}
                      {/* <Button
                      variant="secondary"
                      className="w-full h-[2em] rounded-none text-[0.9em] px-[1em] py-0 mt-[0.5em] mb-[1em]"
                    >
                      <Image
                        src={paypalLogo}
                        alt="Paypal logo"
                        className="w-auto h-[70%]"
                      />
                    </Button> */}

                      {/* Buy, wishlist and add to cart */}
                      <div className="flex mt-[0.5em]">
                        <Button
                          disabled={gameData.stockStatus === "OUT_OF_STOCK"}
                          variant="gaming"
                          onClick={() => {
                            addToCartAndRedirect(id);
                          }}
                          className="h-[2em] text-[0.9em] me-[0.3em] px-[1em] py-0 font-semibold flex-grow"
                        >
                          Buy now
                        </Button>

                        <button className="size-[1.8em] hover:opacity-80 border flex items-center justify-center me-[0.3em]">
                          <IoMdHeartEmpty className="text-[1em]" />
                        </button>

                        <CartSidebar>
                          <button
                            disabled={gameData.stockStatus === "OUT_OF_STOCK"}
                            className="size-[1.8em] hover:opacity-80 border flex items-center justify-center"
                            onClick={() => {
                              addToCardItem(id);
                            }}
                          >
                            <IoIosCart className="text-[1em]" />
                          </button>
                        </CartSidebar>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="absolute bottom-0 right-0 bg-black/50 px-[1.6em] py-[1.6em] backdrop-blur-md z-10"
                      style={{
                        borderImage:
                          "linear-gradient(to bottom, transparent, #999999) 1",
                        borderWidth: "1px",
                        borderStyle: "solid",
                      }}
                    >
                      {/* Game title */}
                      <h3 className="uppercase font-bold text-[1.2em] border-b">
                        {gameData.title}
                      </h3>

                      <div className="flex flex-col items-center justify-center text-center">
                        <RiEmotionSadLine className="text-[1.5em] text-[#75F94C] mt-[0.3em] md:text-[2em] lg:text-[2.6em] 2xl:text-[3.6em] 2xl:mt-[0.1em]" />

                        <h4 className="font-bold text-[0.83em] text-[#75F94C] my-[0.4em] uppercase">
                          Sorry, sold out &#58;&#40;
                        </h4>

                        <p className="text-[0.75em] mb-[1em]">
                          Want this game? Add it to your wishlist <br /> to keep
                          track of it while it&apos;s sold out.
                        </p>

                        <Button
                          variant="gaming"
                          className="w-[70%] h-[2em] text-[0.9em] px-[1em] py-0 font-semibold"
                        >
                          <IoMdHeart className="text-[1.2em] me-[0.1em]" />
                          Add to Wishlist
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Carousel */}
              <ImageCarousel video={gameData.video} images={gameData.images} />

              {/* Mobile price card */}
              {gameData.stockStatus !== "OUT_OF_STOCK" ? (
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
                      ${" "}
                      {gameData.discountPrice.toFixed(2) ||
                        gameData.originalPrice.toFixed(2)}
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
                        $ {gameData.originalPrice.toFixed(2)}
                      </span>
                      <span className="font-medium text-[0.8em] text-[#0BDB45] ">
                        &nbsp;Save&nbsp;
                        {calDiscountPercentage()}%
                      </span>
                    </p>
                  )}

                  {/* Paypal button */}
                  {/* <Button
                    variant="secondary"
                    className="w-full h-[2em] rounded-none text-[1em] px-[1em] py-0 mt-[0.5em] mb-[1em]"
                  >
                    <Image
                      src={paypalLogo}
                      alt="Paypal logo"
                      className="w-auto h-[70%]"
                    />
                  </Button> */}

                  {/* Buy, wishlist and add to cart */}
                  <div className="flex mt-[0.5em]">
                    <Button
                      disabled={gameData.stockStatus === "OUT_OF_STOCK"}
                      variant="gaming"
                      onClick={() => {
                        addToCartAndRedirect(id);
                      }}
                      className="h-[2em] text-[1em] me-[0.3em] px-[1em] py-0 font-semibold flex-grow"
                    >
                      Buy now
                    </Button>
                    <button className="size-[2em] hover:opacity-80 border flex items-center justify-center me-[0.3em]">
                      <IoMdHeartEmpty className="text-[1em]" />
                    </button>
                    <CartSidebar>
                      <button className="size-[2em] hover:opacity-80 border flex items-center justify-center">
                        <IoIosCart
                          className="text-[1em]"
                          onClick={() => {
                            addToCardItem(id);
                          }}
                        />
                      </button>
                    </CartSidebar>
                  </div>
                </div>
              ) : (
                <div
                  className=" bg-white/5 px-[1.6em] py-[1.6em] mt-[0.6em] mb-[1.6em] backdrop-blur-[2px] text-[15px] text-center sm:hidden"
                  style={{
                    borderImage:
                      "linear-gradient(to bottom, transparent, #999999) 1",
                    borderWidth: "1px",
                    borderStyle: "solid",
                  }}
                >
                  {/* Game title */}
                  <h3 className="uppercase font-bold text-[1.2em]">
                    {gameData.title}
                  </h3>

                  <hr className="max-w-[360px] mx-auto" />

                  <div className="flex flex-col items-center justify-center text-center">
                    <RiEmotionSadLine className="text-[3em] text-[#75F94C] mt-[0.15em]" />

                    <h4 className="font-bold text-[0.83em] text-[#75F94C] my-[0.4em] uppercase">
                      Sorry, sold out &#58;&#40;
                    </h4>

                    <p className="text-[0.75em] mb-[1em]">
                      Want this game? Add it to your wishlist <br /> to keep
                      track of it while it&apos;s sold out.
                    </p>

                    <Button
                      variant="gaming"
                      className="w-[70%] h-[2em] text-[0.9em] px-[1em] py-0 font-semibold"
                    >
                      <IoMdHeart className="text-[1.2em] me-[0.1em]" />
                      Add to Wishlist
                    </Button>
                  </div>
                </div>
              )}

              {/* Card Area */}
              <div className="flex justify-around gap-[2em] border-t border-t-[#999999] capitalize font-normal text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-center pt-[4em] mt-[4em] lg:text-left">
                {/* Card one */}
                <div className="w-fit flex flex-col items-center gap-[0.6em] lg:flex-row">
                  <Image
                    src={availability}
                    alt="Availability"
                    width={68}
                    height={68}
                    className="size-[3.3em]"
                  />
                  <div>
                    <p className="font-bold text-[1.3em] uppercase">Global</p>
                    <p className="opacity-70">
                      Available in all regions worldwide
                    </p>
                  </div>
                </div>

                {/* Card two */}
                <div className="w-fit flex flex-col items-center gap-[0.6em] lg:flex-row">
                  <Image
                    src={gameData.platform.image}
                    alt="Platform"
                    width={68}
                    height={68}
                    className="size-[3.4em]"
                  />
                  <div>
                    <p className="font-bold text-[1.3em] uppercase">
                      {gameData.platform.name}
                    </p>
                    <p className="font-normal capitalize">
                      <span className="opacity-70">Activate/redeem on</span>
                      &nbsp;
                      {gameData.platform.name}
                    </p>
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
                    <p className="font-bold text-[1.3em] uppercase">
                      Digital keys
                    </p>
                    <p className="opacity-70">Instant delivery sent by email</p>
                  </div>
                </div>
              </div>

              {/* Checkout Area */}
              <div className="text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] pt-[4em]">
                <h3 className="font-semibold text-[1.2em] capitalize">
                  Checkout guaranteed
                </h3>
                <div className="bg-white/5 p-[2em] mt-[2em]">
                  <div className="flex justify-between items-center text-[1.2em] font-medium">
                    <p>Payment method</p>
                    <Image
                      src={lock}
                      alt="Payment secured"
                      className="w-[25px] sm:w-[30px] md:w-[35px] lg:w-[40px] xl:w-[42px] 2xl:w-[45px]"
                    />
                  </div>
                  <div className="flex gap-x-[1em] my-[2em]">
                    <Image
                      src={paypal}
                      alt="Paypal"
                      className="w-[20px] sm:w-[24px] md:w-[28px] lg:w-[30px] xl:w-[32px] 2xl:w-[36px]"
                    />
                    <Image
                      src={visa}
                      alt="Visa"
                      className="w-[20px] sm:w-[24px] md:w-[28px] lg:w-[30px] xl:w-[32px] 2xl:w-[36px]"
                    />
                    <Image
                      src={mastercard}
                      alt="Mastercard"
                      className="w-[20px] sm:w-[24px] md:w-[28px] lg:w-[30px] xl:w-[32px] 2xl:w-[36px]"
                    />
                    <Image
                      src={skrill}
                      alt="Skrill"
                      className="w-[20px] sm:w-[24px] md:w-[28px] lg:w-[30px] xl:w-[32px] 2xl:w-[36px]"
                    />
                  </div>
                  <p className="opacity-70">
                    Your payment information is processed securely. We do not
                    store credit card details nor have access to your credit
                    card information.
                  </p>
                </div>
              </div>

              {/* About */}
              <div className="text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] pt-[4em]">
                <h3 className="font-semibold text-[1.2em] capitalize">
                  About this game
                </h3>
                <div className="bg-white/5 p-[2em] mt-[2em]">
                  <p className="pb-[2em] text-justify opacity-70">
                    {gameData.about}
                  </p>
                  <p className="flex justify-between items-center text-[1.1em] font-medium ">
                    Release Date: {gameData.releaseDate}
                  </p>
                </div>
              </div>

              {/* System requirements */}
              <div className="text-[8px] sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[17px] pt-[4em]">
                <h3 className="font-semibold text-[1.2em] capitalize">
                  System Requirements for {gameData.title}
                </h3>
                <RequirementsCard requirements={gameData.requirements} />
              </div>

              {/* Reviews */}
              <div className=" text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] pt-[4em] pb-[4.5em]">
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
                      onClick={() => {
                        if (verifySession) {
                          setIsReviewFormVisible(true);
                        } else {
                          setAccessDeniedPopupOpen(true); // Set to true to open the modal
                        }
                      }}
                    >
                      &#43; Add your review
                    </Button>
                    {accessDeniedPopupOpen && (
                      <AccessDeniedModal
                        open={accessDeniedPopupOpen}
                        setIsOpen={setAccessDeniedPopupOpen}
                      />
                    )}
                  </div>
                  {calculateOverallRating(reviews) < 0 && (
                    <div>
                      <p className="flex leading-tight">
                        <span className="text-[#f29d38]">
                          <StarRating rating={1} />
                        </span>
                        &nbsp;{calculateOverallRating(reviews)}
                      </p>
                      <p>Overall Rating</p>
                    </div>
                  )}
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
                        {user && (
                          <Image
                            src={user?.profile_image || samplePic}
                            alt="username"
                            width={72}
                            height={72}
                            className="rounded-full"
                          />
                        )}
                      </div>
                      <div>
                        <h4 className="text-[1.25em] font-bold">
                          {user?.firstName}
                        </h4>
                        <p className="text-[0.9em]">{user?.email}</p>
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
                      <Reviews rating={5} setRate={setRate} />
                    </div>

                    <p className="text-[1.4em] mt-[1em] mb-[0.3em]">
                      Review Title
                    </p>
                    <input
                      type="text"
                      className="w-full md:w-[50ch] px-[1em] py-[0.5em] outline-none text-white bg-white/10 text-[1.3em] sm:text-[1em]"
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    <p className="text-[1.4em] mt-[1em] mb-[0.3em]">
                      Review Text
                    </p>
                    <textarea
                      className="w-full md:w-[50ch] px-[1em] py-[0.5em] outline-none text-white bg-white/10 text-[1.3em] sm:text-[1em]"
                      rows={5}
                      onChange={(e) => setComment(e.target.value)}
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
                        onClick={() => addReview()}
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Review card */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 justify-between">
                  {/* {reviews.length > 0 ? (
                    reviews.map((review: any) => (
                      <p key={review.id}>
                        Review by {review.username}: {review.comment}
                      </p>
                    ))
                  ) : (
                    <p>No reviews found</p>
                  )} */}
                  {reviews.length > 0 ? (
                    reviews.map(
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
                    )
                  ) : (
                    <div className="w-full h-[20em] col-span-3 bg-white/5 flex flex-col items-center justify-center text-[8px] pb-[1em] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
                      <MdOutlineSpeakerNotesOff className="text-[4em] opacity-80 animate-pulse" />
                      <p className="mt-[0.5em]">
                        No feedback available. You could be the first to write a
                        review!
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex justify-end pt-[1em]">
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
    </Suspense>
  );
}
