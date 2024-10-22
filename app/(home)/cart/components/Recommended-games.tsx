import React from "react";
import Image from "next/image";
import gameCard from "@/public/images/shop/game-card.png";
import { IoIosStar } from "react-icons/io";
interface RecommendedGamesProps {
  title: string;
  price: number;
  oldPrice: number;
  rating: number;
  soldOut?: boolean;
}

const RecommendedGames: React.FC<RecommendedGamesProps> = ({
  title,
  price,
  oldPrice,
  rating,
  soldOut,
}) => {
  return (
    <div className="border border-white p-4  text-white relative w-full bg-[#10160e]">
      {soldOut && (
        <div className="absolute top-0 right-0  backdrop-blur-sm bg-black/30 text-white p-1 h-full w-full flex items-center justify-center">
          <div className="flex items-center justify-center">
            <p className="text-[#FF374E] text-center font-primaryFont font-bold text-[25px]">
              SOLD OUT
            </p>
          </div>
        </div>
      )}
      <Image src={gameCard} alt="Ghost" className="mb-4" />
      <div className="flex items-center mb-1">
        <h3 className="text-[24px] font-bold uppercase font-primaryFont">
          {title}
        </h3>
      </div>

      <div className="h-[1px] bg-white mb-2"></div>
      <div className="flex gap-1 text-[#f29d38]">
        {Array.from({ length: rating }, (_, index) => (
          <IoIosStar key={index} className="text-[23px]" />
        ))}
      </div>

      <div className="flex items-center gap-6">
        <p className=" text-[#75F94C] text-[45px] font-bold uppercase font-primaryFont">
          ${price}
        </p>
        <p className="line-through text-[#fff] text-[16px] font-normal uppercase font-primaryFont">
          ${oldPrice}
        </p>
      </div>
    </div>
  );
};

export default RecommendedGames;
