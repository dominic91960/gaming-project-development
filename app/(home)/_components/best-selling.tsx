import React from "react";
import Image from "next/image";

import bg from "@/public/images/home/best-selling/bg.png";
import titleBorder from "@/public/images/home/best-selling/title-border.png";
import cardBg from "@/public/images/home/best-selling/card-bg.jpg";
import StarRating from "./star-rating";

const bestSellingGames = [
  {
    title: "Black Myth: Wukong",
    desc: "Black Myth: Wukong is an action RPG rooted in Chinese mythology. You shall set out as the Destined One to venture into the challenges and marvels",
    discountPrice: 299,
    originalPrice: 399,
    rating: 4.7,
  },
];

const BestSelling = () => {
  return (
    <section
      className="font-primaryFont bg-cover"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
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
      <div>
        <article className="relative text-[28px] w-[420px]">
          <div
            className="bg-white/20 px-[0.8em] py-[0.4em] backdrop-blur-sm"
            style={{
              clipPath:
                "polygon(5% 0%, 96% 0%, 100% 13%, 100% 100%, 82% 100%, 77% 85%, 46% 85%, 41% 100%, 0% 100%, 0% 13%)",
            }}
          >
            <h4 className="font-bold uppercase">Black Myth: Wukong</h4>
            <p className="text-[7px] font-semibold">
              Black Myth: Wukong is an action RPG rooted in Chinese mythology.
              You shall set out as the Destined One to venture into the
              challenges and marvels
            </p>
            <hr className="mt-[0.3em] mb-[0.3em] w-1/2" />
            <p className="text-[36px] font-semibold leading-none">
              $299&nbsp;
              <span className="text-[13px] font-normal line-through">$399</span>
            </p>
            <Image
              src={titleBorder}
              alt="title border"
              className="absolute top-0 right-0 w-full h-full"
            />
          </div>
          <div
            className="h-[200px] -translate-y-[10.5%]"
            style={{
              clipPath:
                "polygon(5% 10%, 41.6% 10%, 46.3% 0%, 76.7% 0%, 81.7% 10%, 98% 10%, 98% 74%, 90% 90%, 47% 90%, 42% 100%, 1% 100%, 1% 50%, 5% 42%)",
            }}
          >
            <Image src={cardBg} alt="Name" className="w-full" />
          </div>
          <div
            className="absolute left-0 bottom-[4.5%] w-fit text-[18px] text-[#f29d38] bg-black/20 backdrop-blur-sm px-[0.8em] pt-[0.4em] pb-[0.1em]"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 80%, 90% 100%, 0% 100%)",
            }}
          >
            <StarRating rating={5} />
            <p className="text-[14px] font-semibold text-white mt-[0.2em]">
              4.7 <span className="text-[10px] font-medium">rating</span>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default BestSelling;
