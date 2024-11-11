"use client";

import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import cardBgOne from "@/public/images/home/swiper-carousel/card-bg-one.png";
import cardBgTwo from "@/public/images/home/swiper-carousel/card-bg-two.png";
import cardBgThree from "@/public/images/home/swiper-carousel/card-bg-three.png";
import cardBgFour from "@/public/images/home/swiper-carousel/card-bg-four.png";
import gamePoster from "@/public/images/home/swiper-carousel/poster.png";
import SwiperCarouselCard from "./swiper-carousel-card";
import axiosInstance from "@/axios/axiosInstance";
import { set } from "date-fns";
import SwiperCarouselSkeleton from "./swiper-carousel-skeleton";

// const data = [
//   {
//     id: "670f554d92cae82274f98b54",
//     background: cardBgOne.src,
//     poster: gamePoster.src,
//     title: "Warhammer 40,000: Space Marine 2",
//     rating: 0,
//     description:
//       "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past. ",
//     price: 40.0,
//     wishlistedBy: 9452399,
//     releaseDate: "20 Aug, 2024",
//     soldOut: true,
//   },
//   {
//     id: "670f5ce892cae82274f98b5b",
//     background: cardBgTwo.src,
//     poster: gamePoster.src,
//     title: "Black Myth: Wukong",
//     rating: 5,
//     description:
//       "Embark on an epic journey through Ancient Greece and shape your destiny as a legendary Spartan hero.",
//     price: 40.0,
//     wishlistedBy: 539999,
//     releaseDate: "20 Aug, 2024",
//     soldOut: false,
//   },
//   {
//     id: "670fbcca0a1092877a48494c",
//     background: cardBgThree.src,
//     poster: gamePoster.src,
//     title: "Black Myth: Wukong",
//     rating: 5,
//     description:
//       "Red Dead Redemption 2 is an epic tale of life in America at the dawn of the modern age. Set in 1899, you play as Arthur Morgan, an outlaw and a member of the Van der Linde gang, who must deal with the decline of the Wild West while surviving against government forces, rival gangs, and other adversaries in an open world setting.",
//     price: 40.0,
//     wishlistedBy: 24364,
//     releaseDate: "20 Aug, 2024",
//     soldOut: false,
//   },
//   {
//     id: "67160d8b0342881a0be83757",
//     background: cardBgFour.src,
//     poster: gamePoster.src,
//     title: "Black Myth: Wukong",
//     rating: 5,
//     description:
//       "The Last of Us is an action/adventure game set in a post-apocalyptic world. You play as Joel, a smuggler tasked with escorting a teenage girl, Ellie, across the United States, while battling hostile humans and zombie-like creatures infected by a mutated fungus. The game focuses on stealth and combat in an emotionally driven narrative.",
//     price: 4000.0,
//     wishlistedBy: 1200,
//     releaseDate: "20 Aug, 2024",
//     soldOut: false,
//   },
// ];

interface GameData {
  id: string;
  background: string;
  poster: string;
  title: string;
  rating: number;
  description: string;
  price: number;
  wishlistedBy: number;
  releaseDate: string;
  soldOut: boolean;
}

const SwiperCarousel = () => {
  const getTopRatedGames = async () => {
    try {
      const response = await axiosInstance.get(
        "/games?addToCarousel=true&limit=4"
      );
      const formattedData = response.data.data.map((game: any) => ({
        id: game.id,
        background: game.coverImage,
        poster: game.cardImage,
        title: game.displayName,
        rating: game.averageRating,
        description: game.aboutThisGame,
        price: game.sellingPrice,
        wishlistedBy: 90,
        releaseDate: game.releaseDate,
        soldOut: game.stockStatus === "IN_STOCK" ? false : true,
      }));
      setGameData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => getTopRatedGames(), 10000);
  }, []);

  const [bg, setBg] = useState("");
  const [gameData, setGameData] = useState<GameData[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSlideChange = (swiper: { realIndex: number }) => {
    const realIndex = swiper.realIndex;
    setBg(gameData[realIndex]?.background);
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <section
      className={`relative min-h-svh bg-cover bg-center flex items-center justify-center font-primaryFont font-semibold text-[8px] lg:text-[9px] xl:text-[11px] 2xl:text-[13px] text-white transition-all duration-1000 ease-in-out`}
      style={{
        backgroundImage: `url('${loading ? cardBgOne.src : bg}')`,
      }}
    >
      {/* Top gradient */}
      <div className="absolute top-0 w-full h-2/5 bg-gradient-to-b from-black to-transparent"></div>

      <div className="relative container mx-auto pb-[2em] z-20">
        <Swiper
          modules={[EffectCoverflow, Pagination, Autoplay]}
          speed={1500}
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 55,
            stretch: 40,
            depth: 400,
            modifier: 1,
            scale: 0.6,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          autoplay={{ disableOnInteraction: false, pauseOnMouseEnter: true }}
          onSlideChange={handleSlideChange}
          className="mySwiper"
        >
          {!loading && gameData.length > 0
            ? gameData.map(
                (
                  {
                    id,
                    poster,
                    title,
                    rating,
                    description,
                    price,
                    wishlistedBy,
                    releaseDate,
                    soldOut,
                  },
                  i
                ) => (
                  <SwiperSlide key={id}>
                    <SwiperCarouselCard
                      id={gameData[i]?.id || id}
                      poster={poster}
                      title={title}
                      rating={Math.round(rating)}
                      description={description}
                      price={price}
                      // wishlistedBy={wishlistedBy}
                      releaseDate={releaseDate}
                      soldOut={soldOut}
                    />
                  </SwiperSlide>
                )
              )
            : Array(4)
                .fill(null)
                .map((_, index) => (
                  <SwiperSlide key={index}>
                    <SwiperCarouselSkeleton />
                  </SwiperSlide>
                ))}
        </Swiper>
        <style>{`
            .swiper {
              width: 100%;
              padding-top: 6%;
              padding-bottom: 5%;
            }
            
            .swiper-slide {
              width: 340px;
            }
              
            .swiper-slide-next {
              background-color: transparent;
            }

            .swiper-pagination-bullet {
              background-color: #45F882;
              transition-property: all;
              transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
              transition-duration: 1s;
              margin-bottom: 200px;
            }
  
            .swiper-pagination-bullet-active {
              scale: 1.8;
            }

            @media (min-width: 768px) {
              .swiper-slide {
                width: 70%;
              }
            }

            @media (min-width: 1024px) {
              .swiper-slide {
                width: 60%;
              }
            }

            @media (min-width: 1024px) {
              .swiper-slide {
                width: 55%;
              }
            }
          `}</style>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 w-full h-2/5 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  );
};

export default SwiperCarousel;
