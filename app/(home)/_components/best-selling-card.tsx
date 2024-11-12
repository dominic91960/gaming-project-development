import React from "react";
import { useRouter } from "next/navigation";

import Rating from "@/components/rating/rating";

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

const BestSellingCard: React.FC<{ game: Game; i: number }> = ({ game, i }) => {
  const router = useRouter();
  const {
    id,
    title,
    desc,
    discountPrice,
    originalPrice,
    poster,
    rating,
    stockStatus,
  } = { ...game };

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
      } relative w-[150px] cursor-pointer sm:w-[200px] md:w-[240px] lg:w-[280px] xl:w-[300px] 2xl:w-[320px] z-10 group`}
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
        <h4 className="font-bold uppercase line-clamp-1">{title}</h4>

        {/* desc */}
        <p className="text-[9px] font-normal uppercase line-clamp-1 sm:text-[11px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
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
          clipPath: "polygon(0% 0%, 100% 0%, 100% 80%, 90% 100%, 0% 100%)",
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
  );
};

export default BestSellingCard;
