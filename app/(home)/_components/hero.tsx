import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import IconBar from "./icon-bar";
import bg from "@/public/images/home/home-background.png";
import mainCharacterImage from "@/public/images/home/home-page-main-character.png";

const Hero = () => {
  return (
    <section
      className="relative bg-black bg-cover font-primaryFont text-white overflow-x-hidden"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      {/* container */}
      <div className="container mx-auto px-[36px] leading-none">
        {/* Another container to center the content in mobile screens*/}
        <div className="relative w-[375px] mx-auto pb-[91px] sm:w-full sm:pb-[140px] md:pb-[190px] lg:pb-[240px] xl:pb-[270px] 2xl:pb-[290px]">
          {/* Title */}
          <h2 className="bg-gradient-to-b from-white to-[#999999] bg-clip-text font-bold text-[40px] text-transparent uppercase mt-[0.9em] sm:text-[55px] md:text-[70px] lg:text-[90px] xl:text-[110px] 2xl:text-[125px]">
            Black myth
          </h2>
          <h1 className="bg-gradient-to-b from-white to-[#999999] bg-clip-text font-bold text-[48px] text-transparent uppercase sm:text-[68px] md:text-[88px] lg:text-[108px] xl:text-[128px] 2xl:text-[142px]">
            Wukong
          </h1>

          {/* Seperator */}
          <hr className="text-[48px] w-[8ch] mt-[0.15em] sm:text-[68px] md:text-[88px] lg:text-[108px] xl:text-[128px] 2xl:text-[142px]" />

          {/* Desc */}
          <p className="w-[37ch] my-[1.5em] font-medium text-[8px] sm:w-[46ch] sm:text-[9px] md:text-[10px] lg:w-[55ch] lg:text-[11px] xl:text-[12px] 2xl:text-[14px]">
            Black Myth: Wukong is an action RPG rooted in Chinese mythology. You
            shall set out as the Destined One to venture into the challenges and
            marvels ahead, to uncover the obscured truth beneath the veil of a
            glorious legend from the past.
          </p>

          {/* Call to action */}
          <Button
            variant="gaming"
            className="h-fit text-[9px] text-black px-[1em] py-[0.5em] uppercase sm:text-[12px] md:text-[15px] lg:text-[20px] xl:text-[24px] 2xl:text-[27px]"
          >
            Buy now
          </Button>

          {/* Hero image */}
          <div className="absolute bottom-0 left-[48px] w-[375px] z-10 sm:left-[50px] sm:w-full sm:h-[350px] md:left-[60px] md:h-[450px] lg:left-[100px] lg:h-[570px] xl:left-[150px] xl:h-[700px] 2xl:left-[180px] 2xl:h-[777px]">
            <Image
              src={mainCharacterImage}
              alt="Hero"
              className="w-auto h-full"
            />
          </div>
        </div>
      </div>

      {/* Iconbar */}
      <IconBar />

      {/* Bottom gradient */}
      {/* Bottom gradient */}
      <div className="absolute bottom-0 w-full h-2/5 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
};

export default Hero;
