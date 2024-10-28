import StarRating from "@/app/(home)/_components/star-rating";
import Image from "next/image";
import React from "react";

interface GameCardProps {
  poster: string;
  name: string;
  discountPrice: number;
  originalPrice: number;
  rating: number;
  description: string;
}

const GameCard: React.FC<GameCardProps> = ({
  poster,
  name,
  description,
  discountPrice,
  originalPrice,
  rating,
}) => {
  return (
    <article
      className="w-fit h-full p-[0.25em] text-[8px] border sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[15px] 2xl:text-[15.2px]"
      style={{
        borderImage: `linear-gradient(to top, #00FFA1 0%, black 100%) 1`,
      }}
    >
      <Image
        src={poster}
        alt={name}
        width={150}
        height={150}
        className="size-[60px] sm:size-[80px] md:size-[100px] lg:size-[120px] xl:size-[140px] 2xl:size-[150px]"
      />

      <h3 className="font-bold mt-[0.5em] w-[11ch] overflow-hidden text-nowrap text-ellipsis">
        {name}
      </h3>

      <div className="hidden h-[4em] text-[4px] md:flex items-center overflow-hidden">
        <p>{description}</p>
      </div>

      <hr className="opacity-50 mt-[0.2em]" />

      <div className="flex items-baseline gap-[0.3em] text-[9px] mt-[0.4em] sm:text-[11px] md:text-[13px] lg:text-[15px] lg:mt-[0.3em] xl:text-[18px] 2xl:text-[20px]">
        <p className="font-semibold text-[#00FFA1]">${discountPrice}</p>

        <p className="text-[7px] line-through 2xl:text-[10px]">
          ${originalPrice}
        </p>
      </div>

      <div className="text-[6px] text-[#f29d38] mb-[0.8em] sm:text-[7px] md:text-[8px] lg:text-[9px] xl:text-[10px] 2xl:text-[10px]">
        <StarRating rating={Math.round(rating)} />
      </div>
    </article>
  );
};

export default GameCard;
