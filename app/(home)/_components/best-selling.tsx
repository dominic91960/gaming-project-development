import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import axiosInstance from "@/axios/axiosInstance";
import { Button } from "@/components/ui/button";
import { LiaAngleRightSolid } from "react-icons/lia";

import Rating from "@/components/rating/rating";
import bg from "@/public/images/home/best-selling/bg.png";

interface Game {
  id: string;
  title: string;
  desc: string;
  discountPrice?: number;
  originalPrice: number;
  poster: string;
  rating: number;
  stockStatus: string;
}

const BestSelling = () => {
  const router = useRouter();

  const [bestSellingGames, setBestSellingGames] = useState<Game[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axiosInstance.get("/games?sort=popularity&limit=8");
      const resGames: Game[] = res.data.data.map((game: any) => {
        return {
          id: game.id,
          title: game.productName,
          desc: game.cardDescription,
          discountPrice: game.sellingPrice,
          originalPrice: game.regularPrice,
          poster: game.cardImage,
          rating: game.averageRating,
          stockStatus: game.stockStatus,
        };
      });
      setBestSellingGames(resGames);
    };
    getData();
  }, []);

  return (
    <section
      className="relative bg-black bg-cover font-primaryFont text-white"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      {/* Top gradient */}
      <div className="absolute top-0 w-full h-2/5 bg-gradient-to-b from-black to-transparent"></div>

      {/* Container */}
      <div className="container mx-auto px-[32px]">
        {/* Title */}
        <div className="text-[18px] uppercase font-medium w-fit mx-auto mb-[2.3em] text-center sm:text-[22px] md:text-[26px] lg:text-[29px] xl:text-[31px] 2xl:text-[33px]">
          <p className="text-[#0BDB45] translate-y-[55%]">Top much</p>
          <p
            className="font-bold text-[1.2em] border-[#0BDB45] border-[0.1em] px-[1em] py-[0.5em]"
            style={{
              clipPath:
                "polygon(0% 0%, 15% 0%, 15% 5%, 85% 5%, 85% 0%, 100% 0%, 100% 100%, 65% 100%, 65% 95%, 35% 95%, 35% 100%, 0% 100%)",
            }}
          >
            Best selling games
          </p>
        </div>

        {/* Product card grid*/}
        <div className="grid grid-cols-2 gap-y-[10px] place-items-center lg:grid-cols-3 2xl:grid-cols-4 sm:gap-y-[15px] md:gap-y-[20px] lg:gap-y-[25px] xl:gap-y-[30px] 2xl:gap-y-[33px]">
          {/* Products */}
          {bestSellingGames.map(
            ({
              id,
              title,
              desc,
              discountPrice,
              originalPrice,
              poster,
              rating,
              stockStatus,
            }) => (
              <article
                key={id}
                className="relative w-[150px] cursor-pointer sm:w-[200px] md:w-[240px] lg:w-[280px] xl:w-[300px] 2xl:w-[320px] z-10 group"
                onClick={() => {
                  router.push(`/products/view/?id=${id}`);
                }}
              >
                {/* Text area */}
                <div
                  className="relative w-full h-fit bg-white/20 text-[12px] px-[0.8em] pt-[0.5em] pb-[0.2em] backdrop-blur-[8px] sm:text-[16px] md:text-[20px] md:px-[0.6em] md:pt-[0.35em] md:pb-[0.1em] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] z-10"
                  style={{
                    clipPath:
                      "polygon(5% 0%, 96% 0%, 100% 13%, 100% 100%, 82% 100%, 77% 86%, 46% 86%, 41% 100%, 0% 100%, 0% 13%)",
                  }}
                >
                  {/* title */}
                  <h4 className="font-bold uppercase text-nowrap overflow-hidden text-ellipsis">
                    {title}
                  </h4>

                  {/* desc */}
                  <p className="text-[9px] font-normal uppercase text-nowrap overflow-hidden text-ellipsis sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
                    {desc}
                  </p>

                  {/* Seperator */}
                  <hr className="my-[0.2em]" />

                  {/* Stars */}
                  <div className="text-[8px] mt-[0.1em] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]">
                    <Rating rating={Math.round(rating)} />
                  </div>

                  {/* Rating text */}
                  <p className="mt-[0em] text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]">
                    {rating.toFixed(1)}&nbsp;
                    <span className="text-[7px] sm:text-[8px] md:text-[8.5px] lg:text-[9px] xl:text-[9.5px] 2xl:text-[10px]">
                      Rating
                    </span>
                  </p>

                  {/* Border */}
                  <div
                    className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-white to-[#75F94C]"
                    style={{
                      clipPath:
                        "polygon(5% 0%, 96% 0%, 100% 13%, 100% 100%, 82% 100%, 77% 86%, 46% 86%, 41% 100%, 0% 100%, 0% 99%, 40.5% 99%, 45.7% 84.5%, 77.5% 84.5%, 82.5% 99%, 99.5% 99%,99.5% 13%, 96% 1.5%, 5% 1.5%, 0.5% 13%, 0.5% 99%, 0% 99%, 0% 13%)",
                    }}
                  ></div>
                </div>

                {/* Image area */}
                <div
                  className="relative h-fit bg-white flex items-start justify-center -translate-y-[14%]"
                  style={{
                    clipPath:
                      "polygon(5% 14%, 41% 14%, 45.6% 0%, 77.5% 0%, 82% 14%, 98% 14%, 98% 73.5%, 89.8% 90%, 47.3% 90%, 42.3% 100%, 1% 100%, 1% 49%, 5% 41%)",
                  }}
                >
                  {/* Image and box shadow container*/}
                  <div
                    className="relative w-full h-[68px] m-[1.5px] mt-0 sm:h-[85px] md:h-[102px] lg:h-[120px] xl:h-[130px] 2xl:h-[142px]"
                    style={{
                      clipPath:
                        "polygon(5% 14%, 41% 14%, 45.6% 0%, 77.5% 0%, 82% 14%, 98% 14%, 98% 74%, 90% 90%, 47% 90%, 42% 100%, 1% 100%, 1% 50%, 5% 42%)",
                    }}
                  >
                    {/* Image */}
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{ backgroundImage: `url(${poster})` }}
                    ></div>

                    {/* Inset box shadow */}
                    <div
                      className={`w-full h-full absolute top-0 left-0 flex items-center justify-center ${
                        stockStatus === "OUT_OF_STOCK"
                          ? "bg-black/60"
                          : "shadow-[0px_10px_30px_black_inset]"
                      }`}
                      style={{
                        clipPath:
                          "polygon(5% 14%, 41% 14%, 45.6% 0%, 77.5% 0%, 82% 14%, 98% 14%, 98% 74%, 90% 90%, 47% 90%, 42% 100%, 1% 100%, 1% 50%, 5% 42%)",
                      }}
                    >
                      {stockStatus === "OUT_OF_STOCK" && (
                        <h3 className="font-rajdhaniFont font-bold text-[16px] text-[#FF374E] -translate-y-[0.3em] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[30px] 2xl:text-[32px]">
                          SOLD OUT
                        </h3>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div
                  className="absolute bottom-[5%] left-0 w-fit h-fit bg-black/20 text-[8px] backdrop-blur-[3px] sm:text-[9px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]"
                  style={{
                    clipPath:
                      "polygon(0% 0%, 100% 0%, 100% 80%, 90% 100%, 0% 100%)",
                  }}
                >
                  <div className="relative ps-[0.8em] pe-[1.2em] py-[0.5em]">
                    {/* Origianl and discount price */}
                    <p className="font-rajdhaniFont font-semibold leading-none text-[#75F94C] text-[12px] sm:text-[16px] md:text-[20px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px]">
                      ${discountPrice?.toFixed(2) || originalPrice.toFixed(2)}
                      &nbsp;
                    </p>

                    {discountPrice && (
                      <p className="text-[8px] font-normal line-through sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[13px]">
                        ${originalPrice.toFixed(2)}
                      </p>
                    )}

                    {/* Price border */}
                    <div
                      className="w-full h-full absolute left-0 top-0 bg-white"
                      style={{
                        clipPath:
                          "polygon(0% 0%, 100% 0%, 100% 81%, 91% 100%, 0% 100%, 0% 98%, 90% 98%, 98.9% 80%, 98.9% 2%, 1% 2%, 1% 98%, 0% 98%)",
                      }}
                    ></div>
                  </div>
                </div>
              </article>
            )
          )}
        </div>

        {/* See more */}
        <div className="grid grid-cols-2 place-items-center lg:grid-cols-3 2xl:grid-cols-4">
          <div className="w-[150px] col-start-2 flex justify-end sm:w-[200px] md:w-[240px] lg:w-[280px] lg:col-start-3 xl:w-[300px] 2xl:w-[320px] 2xl:col-start-4">
            <Link href="/shop-page">
              <Button
                variant="gaming"
                className="h-fit text-[7px] px-[2.26em] py-[0.5em] mt-[2em] mb-[4.5em] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]"
              >
                See More <LiaAngleRightSolid />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 w-full h-2/5 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default BestSelling;
