import Image from "next/image";

import { Button } from "@/components/ui/button";
import SwiperCarousel from "../_components/swiper-carousel";
import Footer from "@/components/footer/footer";

import mainCharacterImage from "../../../public/images/home/home-page-main-character.png";
import "../_components/home.css";
import Catalog from "../_components/catalog";
import VerticalCarousel from "../_components/verticle-carousel";
import IconBar from "../_components/icon-bar";
import ContactBar from "@/app/contact-bar/contact-bar";
import ProductSearchBar from "@/components/product-search/product-search";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <>
      <ContactBar />
      <ProductSearchBar />
      <Navbar />
      <div className="background-home-div relative bg-black h-max">
        <div className="mx-auto container">
          <div className="absolute ">
            <Image
              src={mainCharacterImage}
              alt="Main Character"
              height={1070}
            />
          </div>

          <div className="pt-[125px] pl-[65px]">
            <p className="font-primaryFont text-[130px] font-medium text-white leading-none">
              BLACK MYTH
            </p>
            <p className="font-primaryFont  text-[149px] font-bold text-white leading-none">
              WUKONG
            </p>
            <div className="h-1 w-[1000px] bg-white mt-8"></div>
            <p className="text-white font-primaryFont font-semibold text-[16px] w-[600px] leading-tight mt-6 mb-8">
              Black Myth: Wukong is an action RPG rooted in Chinese mythology.
              You shall set out as the Destined One to venture into the
              challenges and marvels ahead, to uncover the obscured truth
              beneath the veil of a glorious legend from the past.
            </p>

            <Button className="bg-[#FB5A00] px-12 text-[30px] font-primaryFont font-medium py-8">
              Buy Now
            </Button>
          </div>
        </div>

        <div className="reduce-background-brightness"></div>
      </div>
      <IconBar />
      <SwiperCarousel />
      <Catalog />
      <VerticalCarousel />
      <Footer />
    </>
  );
}
