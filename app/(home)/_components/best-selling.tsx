import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { LiaAngleRightSolid } from "react-icons/lia";

import StarRating from "./star-rating";
import bg from "@/public/images/home/best-selling/bg.png";
import cardBg from "@/public/images/home/best-selling/card-bg.jpg";

const bestSellingGames = [
  {
    title: "Black Myth: Wukong",
    desc: "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels",
    discountPrice: 299,
    originalPrice: 399,
    poster: cardBg,
    rating: 3.2,
  },
  {
    title: "Black Myth: Wukong",
    desc: "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels",
    discountPrice: 89,
    originalPrice: 99,
    poster: cardBg,
    rating: 4.1,
  },
  {
    title: "Black Myth: Wukong",
    desc: "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels",
    originalPrice: 69,
    poster: cardBg,
    rating: 4.7,
  },
  {
    title: "Black Myth: Wukong",
    desc: "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels",
    discountPrice: 299,
    originalPrice: 399,
    poster: cardBg,
    rating: 4.7,
  },
  {
    title: "Black Myth: Wukong",
    desc: "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels",
    discountPrice: 299,
    originalPrice: 399,
    poster: cardBg,
    rating: 4.7,
  },
  {
    title: "Black Myth: Wukong",
    desc: "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels",
    discountPrice: 299,
    originalPrice: 399,
    poster: cardBg,
    rating: 4.7,
  },
];

const BestSelling = () => {
  return (
    <section
      className="relative font-primaryFont bg-cover py-[6%]"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      {/* Top gradient */}
      <div className="absolute top-0 w-full h-1/5 bg-gradient-to-b from-black to-transparent"></div>

      {/* Title */}
      <div className="text-[50px] uppercase font-medium w-fit mx-auto text-center mb-[1.5em]">
        <p className="text-[40px] text-[#0BDB45] translate-y-[55%]">Top much</p>
        <p
          className="font-bold border-[#0BDB45] border-[0.1em] px-[1em] py-[0.5em]"
          style={{
            clipPath:
              "polygon(0% 0%, 15% 0%, 15% 5%, 85% 5%, 85% 0%, 100% 0%, 100% 100%, 65% 100%, 65% 95%, 35% 95%, 35% 100%, 0% 100%)",
          }}
        >
          Best selling games
        </p>
      </div>
      <div className="scale-x-0 w-10 h-1 bg-[#0BDB45] mx-auto my-10 shadow-[0_0_15px_5px_#0BDB45]"></div>
      {/* Cards */}
      <div className="container mx-auto grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 place-items-center min-w-[170px] w-full md:w-full lg:w-full md:min-w-[300px] lg:min-w-[420px] xl:min-w-[350px] xl:w-full gap-4 px-4 md:px-8 lg:px-14 xl:px-8">
        {bestSellingGames.map(
          ({ title, desc, discountPrice, originalPrice, poster, rating }) => (
            <article
              key={title}
              className="relative text-xs lg:text-[28px] mb-[2em] hover:-translate-y-1 transition-transform duration-200 w-full"
            >
              {/* Text area */}
              <div
                className="lg:w-full h-[100px] md:h-[120px] xl:h-[150px] pt-3 space-y-2 md:px-5 bg-white/20 text-[28px] px-3 lg:px-[1em] flex flex-col justify-center backdrop-blur-[2px]"
                style={{
                  clipPath:
                    "polygon(5% 0%, 96% 0%, 100% 13%, 100% 100%, 82% 100%, 77% 86%, 46% 86%, 41% 100%, 0% 100%, 0% 13%)",
                }}
              >
                <h4 className="font-bold uppercase text-[14px] md:text-[20px] xl:text-[28px] leading-3 xl:leading-7">
                  {title}
                </h4>
                <p className="text-[9px] xl:text-[10px] font-semibold truncate xl:line-clamp-2">
                  {desc}
                </p>
                <hr className="my-[0.2em] xl:my-[0.3em] w-1/2" />
                <p className="text-[12px] md:text-lg lg:text-xl xl:text-[36px] font-semibold leading-none">
                  ${discountPrice || originalPrice}&nbsp;
                  {discountPrice && (
                    <span className="text-[8px] xl:text-[13px] font-normal line-through">
                      ${originalPrice}
                    </span>
                  )}
                </p>
              </div>

              {/* Text area border */}
              <div
                className="min-w-[170px] w-full xl:w-full h-[100px] md:h-[120px] xl:h-[150px] absolute top-0 left-0 bg-gradient-to-r from-white to-[#75F94C] z-10"
                style={{
                  clipPath:
                    "polygon(5% 0%, 96% 0%, 100% 13%, 100% 100%, 82% 100%, 77% 86%, 46% 86%, 41% 100%, 0% 100%, 0% 99%, 40.5% 99%, 45.7% 84.5%, 77.5% 84.5%, 82.5% 99%, 99.5% 99%,99.5% 13%, 96% 1.5%, 5% 1.5%, 0.5% 13%, 0.5% 99%, 0% 99%, 0% 13%)",
                }}
              ></div>

              {/* Image area */}
              <div
                className="bg-white w-fit h-fit -translate-y-[calc(10.4%+1px)] md:-translate-y-[calc(10.4%+1px)] xl:-translate-y-[calc(10.4%+1px)] flex items-start justify-center"
                style={{
                  clipPath:
                    "polygon(5% 10.5%, 41% 10.5%, 45.6% 0%, 77.5% 0%, 82% 10.5%, 98% 10.5%, 98% 73.5%, 89.8% 90%, 47.3% 90%, 42.3% 100%, 1% 100%, 1% 49%, 5% 41%)",
                }}
              >
                <div
                  className="min-h-[60px] md:max-h-[150px] xl:max-h-[250px] xl:h-[200px] m-[2px] mt-0"
                  style={{
                    clipPath:
                      "polygon(5% 10.5%, 41% 10.5%, 45.6% 0%, 77.5% 0%, 82% 10.5%, 98% 10.5%, 98% 74%, 90% 90%, 47% 90%, 42% 100%, 1% 100%, 1% 50%, 5% 42%)",
                  }}
                >
                  <Image src={poster} alt="Name" className="w-full" />
                </div>
              </div>

              {/* Rating area */}
              <div
                className="min-w-[80px] w-1/2 h-[54px] lg:h-1/4 xl:h-20 md:h-16 absolute left-0 bottom-[4.5%] text-[18px] ps-[2.5%] pt-3 lg:pt-1 text-[#f29d38] bg-black/50 backdrop-blur-[2px] flex flex-col justify-center"
                style={{
                  clipPath:
                    "polygon(0% 0%, 100% 0%, 100% 80%, 90% 100%, 0% 100%)",
                }}
              >
                <StarRating rating={Math.round(rating)} />
                <p className="text-[10px] md:text-base font-semibold text-white mt-[0.2em]">
                  {rating}&nbsp;
                  <span className="text-[8px] md:text-[12px] font-medium">
                    Rating
                  </span>
                </p>
              </div>

              {/* Rating area border */}
              <div
                className="w-1/2 h-[54px] xl:h-20 md:h-16 lg:h-1/4 absolute left-0 bottom-2 xl:bottom-[4.5%] bg-white z-[15]"
                style={{
                  clipPath:
                    "polygon(0% 0%, 100% 0%, 100% 81%, 91% 100%, 0% 100%, 0% 98%, 90% 98%, 98.9% 80%, 98.9% 2%, 1% 2%, 1% 98%, 0% 98%)",
                }}
              ></div>
            </article>
          )
        )}
      </div>

      {/* See more */}
      <div className="flex justify-end me-[5%] md:me-[15%] lg:me-[5%]  2xl:me-[10%] z-10">
        <Button
          variant="gaming"
          className="relative text-[12px] px-4 py-2 md:text-[14px] md:px-4 md:py-3 lg:text-[16px] lg:px-8 lg:py-5 xl:text-[20px] xl:px-10 xl:py-5 h-fit"
        >
          See More <LiaAngleRightSolid />
        </Button>
        {/* <Button
            variant="gaming"
            className="relative text-[24px] px-[0.8em] py-[0.4em] h-fit before:w-[1px] before:h-full before:bg-white before:scale-y-0 before:origin-bottom before:absolute before:bottom-0 before:left-0 before:shadow-[0_0_5px_#0BDB45] hover:before:scale-y-[98%] before:transition-transform before:duration-300 after:w-[1px] after:h-full after:bg-white after:scale-y-0 after:origin-top after:absolute after:top-0 after:right-0 after:shadow-[0_0_1px_#0BDB45] hover:after:scale-y-[98%] after:transition-transform after:duration-300 group"
          >
            <p className="flex items-center before:w-full before:h-[1px] before:bg-white before:scale-x-0 before:origin-left before:absolute before:top-0 before:left-0 before:shadow-[0_0_1px_#0BDB45] group-hover:before:scale-x-[98%] before:transition-transform before:duration-300 after:w-full after:h-[1px] after:bg-white after:scale-x-0 after:origin-right after:absolute after:bottom-0 after:right-0 after:shadow-[0_0_1px_#0BDB45] group-hover:after:scale-x-[98%] after:transition-transform after:duration-300">
              See More <LiaAngleRightSolid />
            </p>
          </Button> */}
      </div>
      {/* Bottom gradient */}
      <div className="absolute bottom-0 w-full h-1/5 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default BestSelling;
