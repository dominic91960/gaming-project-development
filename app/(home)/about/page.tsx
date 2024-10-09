import React from "react";
import Image from "next/image";

import ProductSearchBar from "@/components/product-search/product-search";
import Footer from "@/components/footer/footer";
import bg from "@/public/images/products/bg.png";

function AboutPage() {
  return (
    <>
      <ProductSearchBar />
      <section className="bg-[#051301] font-primaryFont text-white">
        {/* Header */}
        <div
          className="relative text-base font-bold leading-tight bg-cover bg-center pt-[2.875em] sm:text-[20px] md:text-[24px] lg:text-[30px] xl:text-[36px] 2xl:text-[40px]"
          style={{ backgroundImage: `url('${bg.src}')` }}
        >
          {/* Header text container */}
          <div className="relative container mx-auto px-[36px] z-10">
            <h3 className="text-[0.5em] uppercase font-medium mb-[1em]">
              About gamespire
            </h3>

            <h2 className="mb-[0.6em]">
              Your one-stop shop for <br /> online entertainment
            </h2>

            <p className="text-[calc(0.5em+1px)] font-normal">
              Let&apos;s discover the joy of gaming together! <br /> Whether on
              PC, consoles, we have your back with the <br /> best products at
              affordable prices
            </p>

            <hr className="border-t-[#057424] mt-[1.5em]" />
          </div>

          {/* Bottom gradient  */}
          <div className="w-full h-1/2 absolute bottom-0 bg-gradient-to-t from-black to-transparent"></div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default AboutPage;
