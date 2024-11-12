import React from "react";

import Rating from "@/components/rating/rating";

const BestSellingSkeleton: React.FC<{ i: number }> = ({ i }) => {
  return (
    <article
      className={`${
        i > 11
          ? "hidden"
          : i > 8
          ? "hidden 2xl:block"
          : i > 5
          ? "hidden lg:block"
          : ""
      } relative w-[150px] sm:w-[200px] md:w-[240px] lg:w-[280px] xl:w-[300px] 2xl:w-[320px] z-10 animate-pulse`}
    >
      {/* Text area */}
      <div
        className="relative w-full h-fit bg-white/20 text-[12px] px-[0.8em] pt-[0.5em] pb-[0.2em] sm:text-[16px] md:text-[20px] md:px-[0.6em] md:pt-[0.35em] md:pb-[0.1em] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] z-10"
        style={{
          clipPath:
            "polygon(5% 0%, 96% 0%, 100% 13%, 100% 100%, 82% 100%, 77% 86%, 46% 86%, 41% 100%, 0% 100%, 0% 13%)",
        }}
      >
        {/* title */}
        <h4 className="font-bold uppercase line-clamp-1 text-transparent bg-white/40 leading-none mb-[0.3em] w-fit rounded">
          Vingame
        </h4>

        {/* desc */}
        <p className="text-[9px] font-normal uppercase line-clamp-1 text-transparent bg-white/40 sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] rounded">
          Your one-stop destination.
        </p>

        {/* Seperator */}
        <hr className="my-[0.2em]" />

        {/* Stars */}
        <div className="text-[8px] mt-[0.1em] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]">
          <Rating rating={0} />
        </div>

        {/* Rating text */}
        <p className="w-fit text-[8px] my-[0.3em] leading-none text-transparent bg-white/40 sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] rounded">
          0.0&nbsp;
          <span className="text-[7px] sm:text-[8px] md:text-[8.5px] lg:text-[9px] xl:text-[9.5px] 2xl:text-[10px]">
            Rating
          </span>
        </p>

        {/* Border */}
        <div
          className="w-full h-full absolute top-0 left-0 bg-white/40"
          style={{
            clipPath:
              "polygon(5% 0%, 96% 0%, 100% 13%, 100% 100%, 82% 100%, 77% 86%, 46% 86%, 41% 100%, 0% 100%, 0% 99%, 40.5% 99%, 45.7% 84.5%, 77.5% 84.5%, 82.5% 99%, 99.5% 99%,99.5% 13%, 96% 1.5%, 5% 1.5%, 0.5% 13%, 0.5% 99%, 0% 99%, 0% 13%)",
          }}
        ></div>
      </div>

      {/* Image area */}
      <div
        className="relative h-fit bg-white/20 flex items-start justify-center -translate-y-[14%]"
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
        ></div>
      </div>

      {/* Price */}
      <div
        className="absolute bottom-[5%] left-0 w-fit h-fit bg-white/20 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px]"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 80%, 90% 100%, 0% 100%)",
        }}
      >
        <div className="relative ps-[0.8em] pe-[1.2em] py-[0.5em] leading-none">
          {/* Origianl and discount price */}
          <p className="w-fit font-rajdhaniFont font-semibold leading-none text-transparent bg-white/40 my-[0.3em] text-[12px] sm:text-[16px] md:text-[20px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] rounded">
            $00.00 &nbsp;
          </p>

          <p className="w-fit text-[8px] font-normal line-through text-transparent bg-white/40 my-[0.3em] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[13px] rounded">
            $00.00
          </p>

          {/* Price border */}
          <div
            className="w-full h-full absolute left-0 top-0 bg-white/40"
            style={{
              clipPath:
                "polygon(0% 0%, 100% 0%, 100% 81%, 91% 100%, 0% 100%, 0% 98%, 90% 98%, 98.9% 80%, 98.9% 2%, 1% 2%, 1% 98%, 0% 98%)",
            }}
          ></div>
        </div>
      </div>
    </article>
  );
};

export default BestSellingSkeleton;
