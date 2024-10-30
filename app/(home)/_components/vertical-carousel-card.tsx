import React, { useState } from "react";
import StarRating from "./star-rating";

interface VerticalCarouselCardProps {
  poster: string;
  name: string;
  price: number;
  rating: number;
  i: number;
}

const VerticalCarouselCard: React.FC<VerticalCarouselCardProps> = ({
  poster,
  name,
  price,
  rating,
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
      <div
        className="vertical-carousel-box-content w-full h-full bg-gradient-to-b from-black via-transparent to-black flex flex-col items-end justify-end text-right p-[1em]"
        onMouseEnter={showTitle}
        onFocus={showTitle}
        onMouseLeave={hideTitle}
        onBlur={hideTitle}
      >
        {/* <h3 className="font-bold text-[#75F94C] uppercase w-[8ch] overflow-hidden text-ellipsis"> */}
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
        <p
          className={`text-[0.5em]  ${
            rating > 0 ? "text-[#f29d38]" : "text-white/25"
          }`}
        >
          {rating > 0 ? (
            <StarRating rating={rating} />
          ) : (
            <StarRating rating={5} />
          )}
        </p>
        <p className="font-medium text-[7px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]">
          {rating > 0 ? "Rating" : "Unrated"}
        </p>
        <hr className="w-full mt-[0.2em]" />
      </div>
    </article>
  );
};

export default VerticalCarouselCard;
