import React, { useEffect, useState } from "react";
import Link from "next/link";

import axiosInstance from "@/axios/axiosInstance";
import { Button } from "@/components/ui/button";
import { LiaAngleRightSolid } from "react-icons/lia";

import bg from "@/public/images/home/best-selling/bg.png";
import BestSellingCard from "./best-selling-card";
import BestSellingSkeleton from "./best-selling-skeleton";

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
  const [bestSellingGames, setBestSellingGames] = useState<Game[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axiosInstance.get("/games?sort=popularity&limit=12");
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
          {bestSellingGames.length > 0
            ? bestSellingGames.map((game, i) => (
                <BestSellingCard key={i} game={game} i={i} />
              ))
            : Array(12)
                .fill(null)
                .map((_, index) => (
                  <BestSellingSkeleton key={index} i={index} />
                ))}
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
