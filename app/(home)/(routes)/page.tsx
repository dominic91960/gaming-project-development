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
            className="relative z-10"
          />

          <div className="absolute top-0 left-0 text-[150px] leading-[0] mt-[0.8em]">
            <p className="font-primaryFont font-medium text-[0.85em] text-white leading-none">
              BLACK MYTH
            </p>
            <p className="font-primaryFont font-bold text-white leading-none">
              WUKONG
            </p>
            <div className="h-1 w-[12ch] bg-white mt-[0.2em]"></div>
            <p className="text-white font-primaryFont font-semibold text-[0.11em] w-[55ch] leading-tight mt-[1.5em]">
              Black Myth: Wukong is an action RPG rooted in Chinese mythology.
              You shall set out as the Destined One to venture into the
              challenges and marvels ahead, to uncover the obscured truth
              beneath the veil of a glorious legend from the past.
            </p>
            <Button
              variant="gaming"
              className="relative text-[0.2em] mt-[1.5em] px-[1em] py-[1em] font-primaryFont font-semibold uppercase h-fit z-10"
            >
              <p className="z-10">Buy Now</p>
            </Button>
          </div>
        </div>
        <div className="reduce-background-brightness"></div>
        <div className="absolute bottom-0 w-full h-[400px] bg-gradient-to-t from-black via-black to-transparent"></div>
        <IconBar />
      </div> */}
      <SwiperCarousel />
      {/* <BestSelling /> */}
      <Catalog />
      {/* <VerticalCarousel /> */}
      <Footer />
    </>
  );
}
