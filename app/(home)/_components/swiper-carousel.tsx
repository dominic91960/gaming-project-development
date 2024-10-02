"use client";

import { useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import StarRating from "./star-rating";
import { Button } from "@/components/ui/button";
import posterBg from "@/public/images/home/swiper-carousel/card-bg.png";
import posterBg2 from "@/public/images/home/home-background.png";
import gamePoster from "@/public/images/home/swiper-carousel/poster.png";

const data = [
  {
    background: posterBg,
    theme: "#33CCFF",
    poster: gamePoster,
    title: "Black Myth: Wukong",
    rating: 5,
    description: [
      "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past. ",
      " Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ",
    ],
    price: 40.0,
    wishlistedBy: "530K",
    releaseDate: "20 Aug, 2024",
  },
  {
    background: posterBg2,
    theme: "#FF8200",
    poster: gamePoster,
    title: "Black Myth: Wukong",
    rating: 5,
    description: [
      "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past. ",
      " Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ",
    ],
    price: 40.0,
    wishlistedBy: "530K",
    releaseDate: "20 Aug, 2024",
  },
  {
    background: posterBg,
    theme: "#FA00FF",
    poster: gamePoster,
    title: "Black Myth: Wukong",
    rating: 5,
    description: [
      "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past. ",
      " Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ",
    ],
    price: 40.0,
    wishlistedBy: "530K",
    releaseDate: "20 Aug, 2024",
  },
  {
    background: posterBg2,
    theme: "#00FF47",
    poster: gamePoster,
    title: "Black Myth: Wukong",
    rating: 5,
    description: [
      "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ahead, to uncover the obscured truth beneath the veil of a glorious legend from the past. ",
      " Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels ",
    ],
    price: 40.0,
    wishlistedBy: "530K",
    releaseDate: "20 Aug, 2024",
  },
];

const SwiperCarousel = () => {
  const [bg, setBg] = useState("");
  const [bullet, setBullet] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleSlideChange = (swiper: { realIndex: number }) => {
    const realIndex = swiper.realIndex;
    setBg(data[realIndex].background.src);
    setBullet(data[realIndex].theme);
  };

  return (
    <section
      className={`transition-all duration-1000 ease-in-out`}
      style={{
        backgroundImage: `url('${bg}')`,
      }}
    >
      <div className="bg-gradient-to-b from-black via-transparent to-black">
        <div className="container mx-auto">
          <Swiper
            modules={[EffectCoverflow, Pagination, Autoplay]}
            speed={1500}
            loop={true}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 70,
              stretch: 40,
              depth: 400,
              modifier: 1,
              scale: 0.8,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            autoplay={{ disableOnInteraction: false, pauseOnMouseEnter: true }}
            onSlideChange={handleSlideChange}
            className="mySwiper"
          >
            {data.map(
              ({
                theme,
                poster,
                title,
                rating,
                description,
                price,
                wishlistedBy,
                releaseDate,
              }) => (
                <SwiperSlide key={title}>
                  <div
                    className={`w-full h-fit p-[45px] pt-[25px] flex gap-x-[25px] font-primaryFont text-[13px] font-medium backdrop-blur-md mt-[6%] relative`}
                    style={{
                      backgroundImage: `linear-gradient(to top right, ${theme}80 0%, #FFFFFF14 25%, #FFFFFF14 75%, ${theme}80 100%)`,
                      borderImage: `linear-gradient(to bottom right, #9DA8A0 0%, ${theme} 100%) 1`,
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }}
                  >
                    {/* Poster */}
                    <div className="relative w-[51%]">
                      <Image
                        src={poster}
                        alt="Poster"
                        className="absolute -bottom-[4%] w-full"
                      />
                    </div>
                    <div className="w-[49%]">
                      {/* Title */}
                      <h3 className="font-bold text-[32px]">{title}</h3>
                      {/* Rating */}
                      <div className="text-[#f29d38] text-[19px] pb-[0.7em]">
                        <StarRating rating={rating} />
                      </div>
                      <hr className="w-3/5" />
                      {/* Description */}
                      <div className="pt-[2em]">
                        {description.map((paragraph, index) => (
                          <p key={index} className="pb-[1em]">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      {/* Price and release date */}
                      <div className="flex justify-between pt-[1.5em]">
                        <h4 className="text-[32px]">
                          $ {price.toFixed(2)}
                          <span className="text-base"> USD</span>
                        </h4>
                        <div>
                          <p
                            className="flex text-[15px] cursor-pointer hover:scale-105 transition-transform duration-150 w-fit"
                            onClick={() => setIsWishlisted((prev) => !prev)}
                          >
                            {!isWishlisted ? (
                              <IoHeartOutline className="text-[20px] me-[0.2em]" />
                            ) : (
                              <IoHeartSharp className="text-[20px] me-[0.2em]" />
                            )}

                            {wishlistedBy}
                          </p>
                          <p className="text-[12px]">
                            Release Date: {releaseDate}
                          </p>
                        </div>
                      </div>
                      {/* Actions */}
                      <div className="flex justify-between pt-[2em]">
                        <Button
                          variant="gaming"
                          className=" text-base font-semibold capitalize px-[3em] py-[1.5em]"
                        >
                          Buy now
                        </Button>
                        <Button
                          variant={"outline"}
                          className="text-base font-semibold capitalize px-[3em] py-[1.5em] rounded-none"
                        >
                          Add wishlist
                        </Button>
                      </div>
                    </div>
                  </div>
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
              width: 60%;
            }
              
            .swiper-slide-next {
              background-color: transparent;
            }

            .swiper-pagination-bullet {
              background-color: ${bullet};
              transition-property: all;
              transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
              transition-duration: 1s;
            }
  
            .swiper-pagination-bullet-active {
              scale: 1.8;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default SwiperCarousel;
