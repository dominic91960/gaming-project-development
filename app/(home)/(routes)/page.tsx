import Image from "next/image";

import { Button } from "@/components/ui/button";

import ContactBar from "@/app/contact-bar/contact-bar";
import ProductSearchBar from "@/components/product-search/product-search";
import Navbar from "@/components/navbar/navbar";
import IconBar from "../_components/icon-bar";
import SwiperCarousel from "../_components/swiper-carousel";
import BestSelling from "../_components/best-selling";
import Catalog from "../_components/catalog";
import VerticalCarousel from "../_components/verticle-carousel";
import Footer from "@/components/footer/footer";

import mainCharacterImage from "../../../public/images/home/home-page-main-character.png";
import "../_components/home.css";

export default function Home() {
  return (
    <>
      {/* <ContactBar /> */}
      <ProductSearchBar />
      <Navbar />
      {/* <div className="background-home-div relative bg-black h-max">
        <div className="mx-auto container relative">
          <Image
            src={mainCharacterImage}
            alt="Main Character"
            height={1070}
            className="relative z-10 top-20 left-20 lg:z-40"
          />

          <div className="absolute 2xl:top-0 2xl:left-0 text-[150px]  leading-[0] mt-[0.8em] z-20 mx-8 -top-24 md:top-0">
            <p className="font-primaryFont font-medium text-[40px] md:text-6xl lg:text-7xl xl:text-[110px] 2xl:text-[0.85em] text-white leading-none">
              BLACK MYTH
            </p>
            <p className="font-primaryFont font-bold md:text-7xl lg:text-8xl xl:text-[140px] 2xl:text-[1.2em] text-white leading-none text-4xl">
              WUKONG
            </p>
            <div className="h-0.5 xl:h-1 w-48 md:w-80 lg:w-96 2xl:w-3/4 bg-white mt-[0.2em]"></div>
            <p className="text-white font-primaryFont font-semibold text-[7px] md:text-sm lg:text-base 2xl:text-[0.11em] w-[40ch] md:w-[40ch] 2xl:w-[55ch] leading-tight mt-[1.5em]">
              Black Myth: Wukong is an action RPG rooted in Chinese mythology.
              You shall set out as the Destined One to venture into the
              challenges and marvels ahead, to uncover the obscured truth
              beneath the veil of a glorious legend from the past.
            </p>
            <Button
              variant="gaming"
              className="relative text-xs mt-[1.5em] lg:mt-[4em] px-[1em] py-[1em] font-primaryFont font-semibold uppercase h-fit md:w-32 lg:w-40 2xl:w-60 z-10"
            >
              <p className="z-10 lg:text-lg">Buy Now</p>
            </Button>
          </div>
        </div>
        <div className="reduce-background-brightness"></div>
        <div className="absolute bottom-0 w-full h-[400px] bg-gradient-to-t from-black via-black to-transparent"></div>
        <IconBar />
      </div> */}
      <SwiperCarousel />
      <BestSelling />
      {/* <Catalog /> */}
      {/* <VerticalCarousel /> */}
      <Footer />
    </>
  );
}
