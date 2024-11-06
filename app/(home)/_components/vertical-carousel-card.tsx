import React, { useState } from "react";
import Link from "next/link";

import Rating from "@/components/rating/rating";

interface VerticalCarouselCardProps {
  id: string;
  poster: string;
  name: string;
  price: number;
  rating: number;
  soldOut: boolean;
  i: number;
}

const VerticalCarouselCard: React.FC<VerticalCarouselCardProps> = ({
  id,
  poster,
  name,
  price,
  rating,
  soldOut,
  i,
}) => {
  const [isNameShown, setIsNameShown] = useState(false);

  const showTitle = () => setTimeout(() => setIsNameShown(true), 400);
  const hideTitle = () => setIsNameShown(false);

  return (
    <article
      className={`vertical-carousel-box vertical-carousel-box-${i} ${
        i === 3 ? "hidden min-[550px]:block" : i === 4 ? "hidden xl:block" : ""
      }`}
      style={{ backgroundImage: `url(${poster})` }}
    >
      <Link href={`/products/view/?id=${id}`}>
        {soldOut && (
          <div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/60 text-center z-10"
            onMouseEnter={showTitle}
            onFocus={showTitle}
            onMouseLeave={hideTitle}
            onBlur={hideTitle}
          >
            <h3 className="font-rajdhaniFont font-bold text-[26px] text-[#FF374E] -translate-y-[1.5em] sm:text-[28px] md:text-[30px] lg:text-[32px] xl:text-[34px] 2xl:text-[36px]">
              SOLD OUT
            </h3>
          </div>
        )}
        <div
          className="vertical-carousel-box-content w-full h-full bg-gradient-to-b from-black via-transparent to-black flex flex-col items-end justify-end text-right p-[1em]"
          onMouseEnter={showTitle}
          onFocus={showTitle}
          onMouseLeave={hideTitle}
          onBlur={hideTitle}
        >
          <h3
            className={`font-bold text-[#75F94C] uppercase ${
              isNameShown ? "block" : "hidden"
            }`}
          >
            {name}
          </h3>
          <p className="font-semibold text-[2em] uppercase leading-none font-rajdhaniFont">
            ${price.toFixed(2)}
          </p>
          <p className="text-[0.5em]">
            <Rating
              rating={Math.round(rating)}
              activeColor="[#f29d38]"
              inactiveColor="white/25"
            />
          </p>
          <p className="font-medium text-[7px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]">
            {rating > 0 ? "Rating" : "Unrated"}
          </p>
          <hr className="w-full mt-[0.2em]" />
        </div>
      </Link>
    </article>
  );
};

export default VerticalCarouselCard;
