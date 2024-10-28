import React from "react";
import Image from "next/image";

import summaryCardBorder from "@/public/images/dashboard/summary-card-border.png";

interface SummaryCardProps {
  icon: JSX.Element;
  title: string;
  value: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ icon, title, value }) => {
  return (
    <article className="flex items-center bg-[#0D6D49]/40 font-secondaryFont text-[7px] py-[0.8em] border border-[#0D6D49] rounded-sm sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-[11px] 2xl:text-[12px]">
      <div className="relative flex items-center justify-center text-[11px] mx-[1em] p-[0.6em] sm:text-[14px] md:text-[18px] lg:text-[22px] xl:text-[25px] 2xl:text-[26.4px]">
        <Image
          src={summaryCardBorder}
          alt="Summary card border"
          className="absolute top-0 left-0 size-full"
        />
        {icon}
      </div>
      <div className="leading-none">
        <p className="font-semibold text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] 2xl:text-[26px]">
          {title === "Total Earning" ? `$${value.toFixed(2)}` : value}
        </p>
        <h2 className="opacity-70 mt-[0.4em]">{title}</h2>
      </div>
    </article>
  );
};

export default SummaryCard;
