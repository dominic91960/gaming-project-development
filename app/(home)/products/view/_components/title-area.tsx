import React, { useState } from "react";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { FaPlaystation, FaWindows, FaXbox } from "react-icons/fa";
import Rating from "@/components/rating/rating";

interface TitleAreaProps {
  fullTitle: string;
  rating: number;
  languages: string;
  os: string | undefined;
  brand: string;
  tags: string[];
}

const TitleArea: React.FC<TitleAreaProps> = ({
  fullTitle,
  rating,
  languages,
  os,
  brand,
  tags,
}) => {
  const [isLanguageTooltipOpen, setIsLanguageTooltipOpen] = useState(false);

  let icon = <FaWindows />;
  if (os === "xbox") icon = <FaXbox />;
  if (os === "playstation") icon = <FaPlaystation />;

  return (
    <div>
      {/* Full title */}
      <h2 className="font-bold pt-[1em] sm:pt-[0.8em] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[27px] 2xl:text-[29px] sm:max-w-[19ch] md:max-w-[21ch] lg:max-w-[29ch] xl:max-w-[38ch] 2xl:max-w-[46ch]">
        {fullTitle}
      </h2>

      {/* Product info */}
      <div className="flex items-center text-[10px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] gap-x-[0.8em] leading-normal mt-[0.2em] mb-[0.6em]">
        {/* Rating */}
        <div className="-translate-y-[10%]">
          <Rating
            rating={Math.round(rating)}
            activeColor="[#f29d38]"
            inactiveColor="white/25"
          />
        </div>
        <p>{rating}/5</p>
        <div className="w-[1px] self-stretch bg-white"></div>

        {/* Languages */}
        <div className="flex">
          <TooltipProvider delayDuration={0}>
            <Tooltip
              open={isLanguageTooltipOpen}
              onOpenChange={setIsLanguageTooltipOpen}
            >
              <TooltipTrigger
                className="text-[1em]"
                onTouchStart={() => setIsLanguageTooltipOpen(true)}
                onTouchEnd={() => setIsLanguageTooltipOpen(false)}
                asChild
              >
                <button className="select-none flex gap-x-[0.5ch]">
                  <p className="max-w-[8ch] text-nowrap overflow-hidden text-ellipsis">
                    {languages.split(",")[0]}
                  </p>
                  {languages.split(",").length > 1 && (
                    <p>
                      &&nbsp;
                      {languages.split(",").length - 1}
                      &nbsp;more
                    </p>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent
                className="rounded-none bg-black/80 text-white backdrop-blur-sm"
                style={{
                  borderImage:
                    "linear-gradient(to bottom, transparent, #999999) 1",
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <p className="text-[13px] py-[0.4em] font-bold border-b">
                  Available Languages
                </p>
                {languages.split(",").map((language) => (
                  <p key={language} className="text-[13px] py-[0.4em]">
                    {language}
                  </p>
                ))}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="w-[1px] self-stretch bg-white"></div>

        {/* OS */}
        <div className="size-[1.15em] flex items-center justify-center">
          {icon}
        </div>
        <div className="w-[1px] self-stretch bg-white"></div>

        {/* brand */}
        <div className="size-[1.15em] flex items-center justify-center">
          <Image
            src={`/images/product/developed-by/${brand}.png`}
            alt={brand}
            width={23}
            height={23}
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-[1em] mt-[1em] text-[8px] sm:text-[9px] md:text-[10px] lg:text-[12px] xl:text-[13px] 2xl:text-[14px] font-semibold text-center sm:w-[40ch] md:w-[49ch] lg:w-[67ch] xl:w-[87ch] 2xl:w-[102ch]">
        {tags.map((tag) => (
          <div
            key={tag}
            className="bg-[#3B3B3B] flex items-center justify-center"
          >
            <p className="px-[1em] py-[0.3em]">{tag}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleArea;
