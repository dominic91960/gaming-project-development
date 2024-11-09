import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import GameCard from "./GameCard";

interface Game {
  poster: string;
  name: string;
  discountPrice: number;
  originalPrice: number;
  rating: number;
}

interface TopGamesProps {
  games: any | null;
}

const TopGames: React.FC<TopGamesProps> = ({ games }) => {
  // Check if games data is available
  if (!games || games.length === 0) {
    return (
      <div className="text-center text-white">No top games available.</div>
    ); // Display fallback message if no games
  }

  return (
    <div className="w-full bg-black/40 text-[11px] my-[2em] p-[1em] border border-[#0D6D49] rounded-sm sm:text-[14px] md:text-[17px] md:mb-0 md:mt-[16px] lg:mt-[18px] xl:mt-[22px] 2xl:mt-[24px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px]">
      <h2 className="font-bold mb-[0.8em]">Top Games</h2>

      <Swiper
        slidesPerView={4}
        slidesPerGroup={4}
        breakpoints={{
          640: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          1536: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        loop
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {games.map((game: any) => (
          <SwiperSlide key={game.id}>
            <GameCard
              poster={game.cardImage}
              name={game.displayName}
              discountPrice={game.sellingPrice}
              originalPrice={game.regularPrice}
              rating={game.averageRating}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
          .swiper {
            padding-bottom: 45px;
          }
          
          .swiper-slide {
            width: fit-content;
            height: 100%;
          }
          
          .swiper-pagination-bullet {
            width: 30px;
            background-color: #00FFA1;
            border-radius: 4px;
          }

          .swiper-pagination-bullet-active {
            width: 40px;
            box-shadow: 0px 0px 3px #00FFA1;
          }

          @media (min-width: 1536px) {
            .swiper-pagination-bullet {
              width: 70px;
            }

            .swiper-pagination-bullet-active {
              width: 100px;
            }
          }
        `}</style>
    </div>
  );
};

export default TopGames;
