import React from "react";

import Rating from "@/components/rating/rating";

const VerticalCarouselSkeleton: React.FC<{ i: number }> = ({ i }) => {
  return (
    <article
      className={`vertical-carousel-box vertical-carousel-box-${i} bg-white/20 animate-pulse ${
        i === 3 ? "hidden min-[550px]:block" : i === 4 ? "hidden xl:block" : ""
      }`}
    >
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center z-10">
        <h3 className="font-rajdhaniFont font-bold text-[26px] text-[#0BDB45] -translate-y-[1.5em] sm:text-[28px] md:text-[30px] lg:text-[32px] xl:text-[34px] 2xl:text-[36px]">
          LOADING
        </h3>
      </div>
      <div className="vertical-carousel-box-content w-full h-full flex flex-col items-end justify-end text-right p-[1em]">
        <h3 className="font-bold text-[#75F94C] uppercase opacity-0">
          Vingame
        </h3>
        <p className="font-semibold text-[2em] uppercase leading-none font-rajdhaniFont opacity-0">
          $00.00
        </p>
        <p className="text-[0.5em] opacity-0">
          <Rating rating={0} />
        </p>
        <p className="font-medium text-[7px] sm:text-[8px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px] opacity-0">
          Unrated
        </p>
        <hr className="w-full mt-[0.2em]" />
      </div>
    </article>
  );
};

export default VerticalCarouselSkeleton;
