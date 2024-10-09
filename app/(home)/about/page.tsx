import React from "react";
import Image from "next/image";

import { IoGameController } from "react-icons/io5";
import { BsFillPostcardHeartFill } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";

import ProductSearchBar from "@/components/product-search/product-search";
import Footer from "@/components/footer/footer";
import bg from "@/public/images/products/bg.png";

const cardTrio = [
  {
    icon: <IoGameController />,
    cardTitle: "Games",
    cardText:
      "Let's discover the joy of gaming together! Whether on PC, consoles, we have your back",
  },
  {
    icon: <BsFillPostcardHeartFill />,
    cardTitle: "Gift Cards",
    cardText:
      "Let's discover the joy of gaming together! Whether on PC, consoles, we have your back",
  },
  {
    icon: <GiPayMoney />,
    cardTitle: "Top-Ups",
    cardText:
      "Let's discover the joy of gaming together! Whether on PC, consoles, we have your back",
  },
];

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

        {/* Container for the rest of the content */}
        <div className="container mx-auto px-[36px]">
          {/* Card trio */}
          <div className="flex flex-col items-center gap-[2em] font-semibold text-[12px] my-[2em] sm:flex-row sm:justify-around sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[15.5px] 2xl:text-[16px]">
            {cardTrio.map(({ icon, cardTitle, cardText }, i) => (
              <article
                key={cardTitle}
                className={`flex ${
                  i % 2 !== 0 ? "flex-row-reverse" : ""
                } items-center gap-x-[0.7em] sm:max-w-[22ch] sm:flex-col sm:text-center`}
              >
                <div className="text-[3em] text-[#0BDB45]">{icon}</div>
                <div>
                  <h4 className="capitalize mb-[0.1em] sm:my-[1em]">
                    {cardTitle}
                  </h4>
                  <p className="font-normal text-[0.7em]">{cardText}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
}

export default AboutPage;
