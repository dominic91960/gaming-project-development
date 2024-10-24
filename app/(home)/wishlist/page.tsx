import React from "react";
import Image from "next/image";

import { MdVerified } from "react-icons/md";

import ProductSearchBar from "@/components/product-search/product-search";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import samplePic from "@/public/images/sample-pic.png";

const profile = {
  profileImage: samplePic.src,
  name: "Lahiru Rathnayake",
};

export default function page() {
  return (
    <>
      <ProductSearchBar />
      <Navbar />
      <section className="bg-[#051301] font-primaryFont text-white">
        <div className="bg-gradient-to-b from-black to-transparent">
          {/* Container for the rest of the content */}
          <div className="container mx-auto px-[36px] pb-[20px] 2xl:pb-[80px]">
            {/* Profile details */}
            <div className="flex items-center gap-[0.5em] text-[8px] pt-[4em] mb-[2em] sm:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px]">
              <div className="relative size-[20px] sm:size-[35px] md:size-[50px] lg:size-[65px] xl:size-[80px] 2xl:size-[100px]">
                <Image
                  src={profile.profileImage}
                  alt={profile.name}
                  className="w-full rounded-full"
                  fill
                />
              </div>
              <h4 className="font-bold">{profile.name}</h4>
              <MdVerified className="text-[#0BDB45]" />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
