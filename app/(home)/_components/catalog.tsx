import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LiaAngleRightSolid } from "react-icons/lia";

import bg from "@/public/images/home/catalog/background.jpg";
import character from "@/public/images/home/catalog/character.webp";
import "./catalog.css";

const Catalog = () => {
  return (
    <section
      className="relative bg-black bg-cover bg-center font-primaryFont text-white overflow-hidden"
      style={{ backgroundImage: `url(${bg.src})` }}
    >
      {/* Top gradient */}
      <div className="absolute top-0 w-full h-2/5 bg-gradient-to-b from-black to-transparent"></div>

      {/* Character image */}
      <div className="hidden relative container mx-auto px-[36px] z-10 sm:block sm:h-[500px] md:h-[650px] lg:h-[800px] xl:h-[925px] 2xl:h-[1050px] overflow-visible">
        <Image
          src={character}
          alt="Ghost"
          className="h-full w-auto absolute bottom-0 right-[30%] xl:right-[25%]"
        />
      </div>

      {/* Container */}
      <div className="relative container mx-auto px-[36px] sm:absolute sm:top-0 sm:bottom-0 sm:left-0 sm:right-0 sm:flex sm:items-center sm:justify-end">
        {/* Character image */}
        <div className="absolute bottom-0 right-[36px] -translate-x-[100px] min-[460px]:-translate-x-[130px] sm:hidden">
          <Image src={character} alt="Ghost" className="w-auto max-h-[400px]" />
        </div>

        {/* Flex container for text */}
        <div className="relative flex flex-col items-end text-right z-20 py-[54px] sm:py-0">
          {/* Title */}
          <h2 className="font-bold italic text-[36px] uppercase leading-none sm:text-[48px] md:text-[60px] lg:text-[72px] xl:text-[84px] 2xl:text-[96px]">
            Explore our <br /> catalogue
          </h2>

          {/* Underline */}
          <div className="animate-underline w-[10ch] h-px bg-white mt-[0.2em] mb-[0.75em] text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] xl:text-[84px] 2xl:text-[96px]"></div>

          {/* Paragraph one */}
          <p className="w-[25ch] font-light text-[9px] mb-[1.5em] sm:w-[19ch] sm:text-[14px] md:text-[18px] lg:text-[22px] xl:text-[25px] 2xl:text-[28px]">
            There are thousands of games waiting for you to explore. Browse by
            genre, features, price, and more to find your next favorite game.
          </p>

          {/* Paragraph two */}
          <p className="w-[18ch] font-light text-[9px] mb-[1.5em] sm:w-[26ch] sm:text-[14px] md:text-[18px] lg:text-[22px] xl:text-[25px] 2xl:text-[28px]">
            There are thousands of games waiting for you to explore. Browse by
            genre, features, price, and more to find your next favorite game.
          </p>

          {/* View all games button */}
          <Link href="/shop-page">
            <Button
              variant="gaming"
              className="h-fit text-[7px] capitalize px-[2.26em] py-[0.5em] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]"
            >
              View all games <LiaAngleRightSolid />
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 w-full h-2/5 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  );
};

export default Catalog;
