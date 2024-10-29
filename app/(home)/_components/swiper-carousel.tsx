"use client";

import { useState } from "react";

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

const data = [
  {
    id: "670f554d92cae82274f98b54",
    background: cardBgOne,
    poster: gamePoster,
    title: "Warhammer 40,000: Space Marine 2",
    rating: 0,
    description: [
      "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past. ",
      " Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ",
    ],
    price: 40.0,
    wishlistedBy: 9452399,
    releaseDate: "20 Aug, 2024",
    soldOut: false,
  },
  {
    id: "670f5ce892cae82274f98b5b",
    background: cardBgTwo,
    poster: gamePoster,
    title: "Black Myth: Wukong",
    rating: 5,
    description: [
      "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past. ",
      " Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ",
    ],
    price: 40.0,
    wishlistedBy: 539999,
    releaseDate: "20 Aug, 2024",
    soldOut: false,
  },
  {
    id: "670fbcca0a1092877a48494c",
    background: cardBgThree,
    poster: gamePoster,
    title: "Black Myth: Wukong",
    rating: 5,
    description: [
      "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past. ",
      " Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ",
    ],
    price: 40.0,
    wishlistedBy: 24364,
    releaseDate: "20 Aug, 2024",
    soldOut: false,
  },
  {
    id: "67160d8b0342881a0be83757",
    background: cardBgFour,
    poster: gamePoster,
    title: "Black Myth: Wukong",
    rating: 5,
    description: [
      "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past. ",
      " Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ",
    ],
    price: 4000.0,
    wishlistedBy: 1200,
    releaseDate: "20 Aug, 2024",
    soldOut: false,
  },
];

const SwiperCarousel = () => {
  const [bg, setBg] = useState("");

  const handleSlideChange = (swiper: { realIndex: number }) => {
    const realIndex = swiper.realIndex;
    setBg(data[realIndex].background.src);
  };

  return (
    <section
      className={`relative min-h-svh bg-cover bg-center flex items-center justify-center font-primaryFont font-semibold text-[8px] lg:text-[9px] xl:text-[11px] 2xl:text-[13px] text-white transition-all duration-1000 ease-in-out`}
      style={{
        backgroundImage: `url('${bg}')`,
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
          {data.map(
            ({
              id,
              poster,
              title,
              rating,
              description,
              price,
              wishlistedBy,
              releaseDate,
              soldOut,
            }) => (
              <SwiperSlide key={title}>
                <SwiperCarouselCard
                  id={id}
                  poster={poster}
                  title={title}
                  rating={rating}
                  description={description}
                  price={price}
                  wishlistedBy={wishlistedBy}
                  releaseDate={releaseDate}
                  soldOut={soldOut}
                />
              </SwiperSlide>
            )
          )}
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
