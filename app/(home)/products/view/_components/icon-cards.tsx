import React from "react";
import Image from "next/image";

import availability from "@/public/images/product/worldwide.png";
import digitalKey from "@/public/images/product/digital-key.png";

const IconCards: React.FC<{ platformImage: string; platformName: string }> = ({
  platformImage,
  platformName,
}) => {
  return (
    <menu className="flex justify-around gap-[2em] border-t border-t-[#999999] capitalize font-normal text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] text-center pt-[4em] mt-[4em] lg:text-left">
      {/* Card one */}
      <article className="w-fit flex flex-col items-center gap-[0.6em] lg:flex-row">
        <Image
          src={availability}
          alt="Availability"
          width={68}
          height={68}
          className="size-[3.3em]"
        />
        <div>
          <p className="font-bold text-[1.3em] uppercase">Global</p>
          <p className="opacity-70">Available in all regions worldwide</p>
        </div>
      </article>

      {/* Card two */}
      <article className="w-fit flex flex-col items-center gap-[0.6em] lg:flex-row">
        <Image
          src={platformImage}
          alt="Platform"
          width={68}
          height={68}
          className="size-[3.4em]"
        />
        <div>
          <p className="font-bold text-[1.3em] uppercase">{platformName}</p>
          <p className="font-normal capitalize">
            <span className="opacity-70">Activate/redeem on</span>
            &nbsp;
            {platformName}
          </p>
        </div>
      </article>

      {/* Card three */}
      <article className="w-fit flex flex-col items-center gap-[0.6em] lg:flex-row">
        <Image
          src={digitalKey}
          alt="Digital key"
          width={68}
          height={68}
          className="size-[3.4em]"
        />
        <div>
          <p className="font-bold text-[1.3em] uppercase">Digital keys</p>
          <p className="opacity-70">Instant delivery sent by email</p>
        </div>
      </article>
    </menu>
  );
};

export default IconCards;
