import { useEffect, useState } from "react";
import axiosInstance from "@/axios/axiosInstance";

import VerticalCarouselSkeleton from "./vertical-carousel-skeleton";
import VerticalCarouselCard from "./vertical-carousel-card";
import "./verticle-carousel.css";

// const data = [
//   {
//     id: "670f554d92cae82274f98b54",
//     poster: one.src,
//     name: "Worshippers of Cthulu",
//     price: 2992,
//     rating: 0,
//     soldOut: true,
//   },
//   {
//     id: "670f5ce892cae82274f98b5b",
//     poster: two.src,
//     name: "Warhammer 40,000: Space Marine 2",
//     price: 2992,
//     rating: 5,
//     soldOut: false,
//   },
//   {
//     id: "670fbcca0a1092877a48494c",
//     poster: three.src,
//     name: "Assassin's Creed Shadows",
//     price: 2991,
//     rating: 5,
//     soldOut: false,
//   },
//   {
//     id: "67160d8b0342881a0be83757",
//     poster: four.src,
//     name: "Star Wars Outlaws",
//     price: 2993,
//     rating: 4,
//     soldOut: false,
//   },
//   {
//     id: "670f554d92cae82274f98b54",
//     poster: five.src,
//     name: "Skull and Bones",
//     price: 2994,
//     rating: 5,
//     soldOut: false,
//   },
// ];

// interface GameData {
//   id: string;
//   poster: string;
//   name: string;
//   price: number;
//   rating: number;
//   soldOut: boolean;
// }

const VerticalCarousel = () => {
  const [gameData, setGameData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getTopRatedGames = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        "/games?displayInLatesGames=true&limit=5"
      );
      const formattedData = response.data.data.map((game: any) => ({
        id: game.id,
        poster: game.latestImage || game.cardImage,
        name: game.displayName,
        price: game.sellingPrice,
        rating: game.averageRating,
        soldOut: game.stockStatus === "IN_STOCK" ? false : true,
      }));
      setGameData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTopRatedGames();
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-black via-[#063C28] via-80% to-black font-primaryFont text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-1/12 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-1/12 h-full bg-gradient-to-l from-black to-transparent z-10"></div>

      <div className="container mx-auto sm:px-[36px] pt-[20px] pb-[60px] sm:pt-[35px] sm:pb-[90px] md:pt-[50px] md:pb-[120px] lg:pt-[65px] lg:pb-[150px] xl:pt-[72px] xl:pb-[175px] 2xl:pt-[80px] 2xl:pb-[200px]">
        {/* Title */}
        <div className="text-[18px] uppercase font-medium w-fit mx-auto mb-[2.3em] text-center flex-shrink-0 sm:text-[22px] md:text-[26px] lg:text-[29px] xl:text-[31px] 2xl:text-[33px]">
          <p className="text-[#0BDB45] translate-y-[55%]">Top much</p>
          <p
            className="font-bold text-[1.2em] border-[#0BDB45] border-[0.1em] px-[1em] py-[0.5em]"
            style={{
              clipPath:
                "polygon(0% 0%, 15% 0%, 15% 5%, 85% 5%, 85% 0%, 100% 0%, 100% 100%, 65% 100%, 65% 95%, 35% 95%, 35% 100%, 0% 100%)",
            }}
          >
            Latest games
          </p>
        </div>

        {/* Carousel */}
        <div className="vertical-carousel-container">
          {loading
            ? Array(5)
                .fill(null)
                .map((_, index) => (
                  <VerticalCarouselSkeleton key={index} i={index} />
                ))
            : gameData.map(
                ({ id, poster, name, price, rating, soldOut }, i) => (
                  <VerticalCarouselCard
                    key={i}
                    id={id}
                    poster={poster}
                    name={name}
                    price={price}
                    rating={rating}
                    soldOut={soldOut}
                    i={i}
                  />
                )
              )}
        </div>
      </div>
    </section>
  );
};

export default VerticalCarousel;
