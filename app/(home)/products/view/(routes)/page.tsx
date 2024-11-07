"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import axios from "axios";
import axiosInstance from "@/axios/axiosInstance";

import { useAuthContext } from "@/context/AuthContext";
import { useCartContext } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import Spinner from "@/components/Spinner/Spinner";

import ImageArea from "../_components/image-area";
import TitleArea from "../_components/title-area";
import DesktopPriceCard from "../_components/desktop-price-card";
import DesktopSoldOutCard from "../_components/desktop-sold-out-card";
import MobilePriceCard from "../_components/mobile-price-card";
import MobileSoldOutCard from "../_components/mobile-sold-out-card";
import ImageCarousel from "../_components/image-carousel";
import IconCards from "../_components/icon-cards";
import Checkout from "../_components/checkout";
import About from "../_components/about";
import SystemRequirements from "../_components/system-requirements";
import AddReviewButton from "../_components/add-review-button";
import AddReviewForm from "../_components/add-review-form";
import PastReviews from "../_components/past-reviews";
import AccessDeniedModal from "@/components/access-denied-modal/AccessDeniedModal";
import Footer from "@/components/footer/footer";
import "../_components/product.css";

type CartItem = {
  id: number;
  image: string;
  choiceType: string;
  title: string;
  quantity: number;
  price: number;
  productType: string;
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

export default function ProductPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
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
    
      } finally {
        // setLoading(false);
      }
    };

    verifySession();
  }, []);

  const { addItem } = useCartContext();

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
          rating: res.data.averageRating,
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
      addToast(message, "success");

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
          <ImageArea imageSrc={gameData?.image} />

          {/* Gradient Wrapper for the rest of the content */}
          <div
            style={{
              background:
                "linear-gradient(to bottom, black 0%, transparent 10%, transparent 90%, black 100%)",
            }}
          >
            {/* Container for the rest of the content */}
            <div className="container mx-auto px-[36px]">
              {/* Flex container for Product header area and desktop price card*/}
              <div className="relative flex items-end pt-[1em] mb-[0.8em] sm:mb-[3em] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px]">
                {/* Container for title, info and tags*/}
                <TitleArea
                  fullTitle={gameData.fullTitle}
                  rating={gameData.rating}
                  languages={gameData.languages[0]}
                  os={gameData.os}
                  brand={gameData.developedBy}
                  tags={gameData.tags}
                />

                {/* Container for desktop price card */}
                <div className="hidden sm:block">
                  {gameData.stockStatus !== "OUT_OF_STOCK" ? (
                    <DesktopPriceCard
                      id={id || ""}
                      title={gameData.title}
                      discountPrice={gameData.discountPrice}
                      originalPrice={gameData.originalPrice}
                      discountPercentage={calDiscountPercentage()}
                      handleBuy={() => {
                        addToCartAndRedirect(id);
                      }}
                      handleAddToCart={() => {
                        addToCardItem(id);
                      }}
                    />
                  ) : (
                    <DesktopSoldOutCard title={gameData.title} />
                  )}
                </div>
              </div>

              {/* Carousel */}
              <ImageCarousel video={gameData.video} images={gameData.images} />

              {/* Mobile price card */}
              {gameData.stockStatus !== "OUT_OF_STOCK" ? (
                <MobilePriceCard
                  title={gameData.title}
                  discountPrice={gameData.discountPrice}
                  originalPrice={gameData.originalPrice}
                  discountPercentage={calDiscountPercentage()}
                  handleBuy={() => {
                    addToCartAndRedirect(id);
                  }}
                  handleAddToCart={() => {
                    addToCardItem(id);
                  }}
                />
              ) : (
                <MobileSoldOutCard title={gameData.title} />
              )}

              {/* Card Area */}
              <IconCards
                platformImage={gameData.platform.image}
                platformName={gameData.platform.name}
              />

              {/* Checkout Area */}
              <Checkout />

              {/* About */}
              <About
                about={gameData.about}
                releaseDate={gameData.releaseDate}
              />

              {/* System requirements */}
              {gameData.os === "windows" && (
                <SystemRequirements
                  title={gameData.title}
                  requirements={gameData.requirements}
                />
              )}

              {/* Reviews */}
              <div className=" text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] pt-[4em] pb-[4.5em]">
                <h3 className="font-semibold capitalize text-[1.4em]">
                  User Reviews
                </h3>
                <hr className="my-[2em]" />

                {/* Review button */}
                <AddReviewButton
                  handleClick={() => {
                    if (verifySession) {
                      setIsReviewFormVisible(true);
                    } else {
                      setAccessDeniedPopupOpen(true);
                    }
                  }}
                  overallRating={calculateOverallRating(reviews)}
                />

                {/* Review form */}
                <AddReviewForm
                  isReviewFormVisible={isReviewFormVisible}
                  profileImage={user?.profile_image}
                  firstName={user?.firstName}
                  email={user?.email}
                  setRate={setRate}
                  setTitle={setTitle}
                  setComment={setComment}
                  setIsReviewFormVisible={setIsReviewFormVisible}
                  handleAddReview={() => addReview()}
                />

                {/* Review card */}
                <PastReviews reviews={reviews} />
              </div>
            </div>
          </div>
        </section>
        <Footer />

        {accessDeniedPopupOpen && (
          <AccessDeniedModal
            open={accessDeniedPopupOpen}
            setIsOpen={setAccessDeniedPopupOpen}
          />
        )}
      </>
    </Suspense>
  );
}
