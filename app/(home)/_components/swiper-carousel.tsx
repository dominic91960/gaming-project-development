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
import cardBgOne from "@/public/images/home/swiper-carousel/card-bg-one.png";
import cardBgTwo from "@/public/images/home/swiper-carousel/card-bg-two.png";
import cardBgThree from "@/public/images/home/swiper-carousel/card-bg-three.png";
import cardBgFour from "@/public/images/home/swiper-carousel/card-bg-four.png";
import gamePoster from "@/public/images/home/swiper-carousel/poster.png";

const data = [
  {
    background: cardBgOne,
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
    background: cardBgTwo,
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
    background: cardBgThree,
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
    background: cardBgFour,
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
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleSlideChange = (swiper: { realIndex: number }) => {
    const realIndex = swiper.realIndex;
    setBg(data[realIndex].background.src);
  };

  return (
    <section
      className={`transition-all duration-1000 ease-in-out font-primaryFont font-semibold text-[8px] lg:text-[9px] xl:text-[11px] 2xl:text-[13px] text-white`}
      style={{
        backgroundImage: `url('${bg}')`,
      }}
    >
      <div className="bg-gradient-to-b from-black via-transparent to-black">
        <div className="container mx-auto pb-[2em]">
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
                    className="w-full h-fit backdrop-blur-[10px] p-[5em] pt-0 mt-[8em] mb-[3em] md:p-[2em] md:mt-[4em] md:mb-[0.5em] md:grid md:grid-cols-2 md:place-items-end md:gap-x-[2em]"
                    style={{
                      backgroundImage: `linear-gradient(to top right, #002304 0%, #FFFFFF14 40%, #FFFFFF14 60%, #002304 100%)`,
                      borderImage: `linear-gradient(to bottom, #9DA8A0 0%, #00FF47 100%) 1`,
                      borderWidth: "1px",
                      borderStyle: "solid",
                    }}
                  >
                    {/* Poster */}
                    <div className="relative w-[92%] h-[300px] mx-auto -translate-y-[7em] shadow-[0px_0px_9px_rgba(0,0,0,0.5)] md:w-full md:h-full md:-translate-y-0">
                      <Image
                        src={poster}
                        alt="Poster"
                        className="absolute bottom-0"
                      />
                    </div>

                    <div className="-mt-[5em] md:-mt-0">
                      {/* Title */}
                      <h3 className="font-bold text-[2em]">{title}</h3>

                      {/* Rating */}
                      <div className="text-[#f29d38] text-[1.25em] pb-[0.7em]">
                        <StarRating rating={rating} />
                      </div>
                      <hr className="w-2/5" />

                      {/* Description */}
                      <div className="pt-[2em] text-justify font-normal">
                        {description.map((paragraph, index) => (
                          <p key={index} className="pb-[1em]">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* Price and release date */}
                      <div className="flex justify-between pt-[1.5em]">
                        <h4>
                          <span className="text-[2.25em]">
                            $ {price.toFixed(2)}
                          </span>
                          <span className="text-[1.1em]"> USD</span>
                        </h4>
                        <div>
                          <p
                            className="flex cursor-pointer hover:scale-105 transition-transform duration-150 w-fit"
                            onClick={() => setIsWishlisted((prev) => !prev)}
                          >
                            {!isWishlisted ? (
                              <IoHeartOutline className="text-[1.4em] me-[0.2em]" />
                            ) : (
                              <IoHeartSharp className="text-[1.4em] me-[0.2em]" />
                            )}

                            {wishlistedBy}
                          </p>
                          <p>Release Date: {releaseDate}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-between pt-[2em]">
                        <Button
                          variant="gaming"
                          className="text-[1.1em] font-semibold capitalize px-[3em] py-[1em] border border-[#0BDB45] h-fit"
                        >
                          Buy now
                        </Button>
                        <Button
                          variant={"outline"}
                          className="text-[1.1em] font-semibold capitalize px-[3em] py-[1em] rounded-none h-fit"
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
      </div>
    </section>
  );
};

export default SwiperCarousel;
