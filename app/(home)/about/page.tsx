"use client";

import React from "react";

import { IoGameController } from "react-icons/io5";
import { BsFillPostcardHeartFill } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";
import { LiaAngleRightSolid } from "react-icons/lia";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import FeedbackCard from "./_components/feedback-card";
import Footer from "@/components/footer/footer";

import bg from "@/public/images/products/bg.png";

import chloeA from "@/public/images/about/chloe-a.png";
import danielR from "@/public/images/about/daniel-r.png";
import samanthaV from "@/public/images/about/samantha-v.png";
import liamK from "@/public/images/about/liam-k.png";
import victorT from "@/public/images/about/victor-t.png";
import ethanW from "@/public/images/about/ethan-w.png";
import oliviaP from "@/public/images/about/olivia-p.png";
import LucasB from "@/public/images/about/lucas-b.png";

const cardTrioData = [
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

const whatWeDoData = [
  {
    icon: <IoGameController />,
    cardTitle: ["What we", "Do"],
    cardText: "It was popularised in the 1960s with the",
  },
  {
    icon: <IoGameController />,
    cardTitle: ["What we", "Do"],
    cardText:
      "It was popularised in the 1960s with the It was popularised iIt was popularised in the 1960s with the",
  },
  {
    icon: <IoGameController />,
    cardTitle: ["What we", "Do"],
    cardText:
      "It was popularised in the 1960s with the It was popularised iIt was popularised in the 1960s with the",
  },
  {
    icon: <IoGameController />,
    cardTitle: ["What we", "Do"],
    cardText: "It was popularised in the 1960s with the",
  },
];

const reviews = [
  {
    avatar: chloeA,
    fullname: "Chloe A.",
    content:
      "I was impressed by the speedy delivery and the easy purchase process. Great site for anyone looking for instant game keys at great prices.y",
    date: "May 11,2024",
    rating: 5,
  },
  {
    avatar: danielR,
    fullname: "Daniel R.",
    content:
      "It’s a relief to have a site I can rely on. The prices are unbeatable, and I never have to worry about waiting for my keys. Love it!",
    date: "Feb 14,2024",
    rating: 4,
  },
  {
    avatar: samanthaV,
    fullname: "Samantha V.",
    content:
      "The site is super easy to navigate, and my key arrived immediately after purchase. I’ve already recommended it to my friends!",
    date: "Aug 20,2024",
    rating: 5,
  },
  {
    avatar: liamK,
    fullname: "Liam K.",
    content:
      "Fast, affordable, and dependable. This site always has what I need, and I’ve never had an issue with any purchase. Truly the best!",
    date: "Sep 01,2024",
    rating: 5,
  },
  {
    avatar: victorT,
    fullname: "Victor T.",
    content:
      "Absolutely love this site! The deals are fantastic, and the keys always arrive within seconds. It’s now my go-to for all gaming needs.",
    date: "Apr 22,2024",
    rating: 4,
  },
  {
    avatar: ethanW,
    fullname: "Ethan W.",
    content:
      "Fast, reliable, and secure. I got my key right away, and it worked perfectly. I couldn’t be happier with my experience here!",
    date: "Jun 09,2024",
    rating: 5,
  },
  {
    avatar: oliviaP,
    fullname: "Olivia P.",
    content:
      "I’ve bought several keys from this site, and it’s flawless every time. Easy checkout, great prices, and instant delivery can’t ask for more!",
    date: "Jun 10,2024",
    rating: 5,
  },
  {
    avatar: LucasB,
    fullname: "Lucas B.",
    content:
      "The process couldn’t be simpler! I received my key in seconds, and everything worked smoothly. Highly recommended for any gamer.",
    date: "Jun 17,2024",
    rating: 5,
  },
];

function AboutPage() {
  return (
    <>
      {/* <ProductSearchBar />
      <Navbar /> */}
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

        <div className="bg-gradient-to-b from-black from-0% via-transparent via-20% to-black to-80%">
          {/* Container for the rest of the content */}
          <div className="container mx-auto px-[36px]">
            {/* Card trio */}
            <div className="pt-[5.625em] flex flex-col items-center gap-[2em] font-semibold text-[12px] sm:flex-row sm:justify-around sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px]">
              {cardTrioData.map(({ icon, cardTitle, cardText }, i) => (
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

            {/* Services */}
            <div className="mt-[7.5em] grid gap-[2em] text-[10px] sm:grid-cols-2 sm:text-[12px] md:text-[16px] lg:text-[20px] xl:text-[22px] xl:gap-[5em] 2xl:text-[24px] 2xl:gap-[7.5em]">
              {/* Text div */}
              <div className="my-auto">
                <h3 className="font-light ">Our services</h3>
                <h2 className="w-[14ch] font-extrabold text-[2em] capitalize border-b border-b-[#057424] sm:w-full">
                  What we <span className="text-[#0BDB45]">do</span>.
                </h2>
                <p className="text-justify text-[0.7em] mt-[1.5em]">
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum.
                </p>
                <p className="text-justify text-[0.7em] mt-[1.5em]">
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum.desktop publishing software like Aldus
                  PageMaker including versions of Lorem Ipsum. with desktop
                  publishing software like Aldus PageMaker including versions of
                  Lorem Ipsum.desktop publishing software like Aldus PageMaker
                  including versions of Lorem Ipsum.
                </p>
                <Button
                  variant="gaming"
                  className="text-[0.9em] px-[2em] py-[0.5em] h-fit mt-[1.5em] sm:text-[0.8em]"
                >
                  See More <LiaAngleRightSolid />
                </Button>
              </div>

              {/* Card div */}
              <div className="grid grid-cols-2 grid-rows-2 gap-[1.8em]">
                {whatWeDoData.map(({ icon, cardTitle, cardText }, i) => (
                  <article
                    key={i}
                    className={`${
                      i % 2 === 0
                        ? "bg-gradient-to-t from-white/20 to-transparent"
                        : "bg-gradient-to-b from-white/20 to-transparent"
                    } border flex flex-col items-center text-center px-[1.6em] py-[1.1em]`}
                    style={{
                      borderImage:
                        i % 2 === 0
                          ? "linear-gradient(to top, transparent, #75F94C) 1"
                          : "linear-gradient(to bottom, transparent, #75F94C) 1",
                    }}
                  >
                    <div className="text-[3.4em] text-[#0BDB45]">{icon}</div>
                    <h4 className="font-bold my-[0.5em]">
                      {cardTitle[0]}{" "}
                      <span className="text-[#0BDB45]">{cardTitle[1]}</span>
                    </h4>
                    <p className="text-[0.7em] sm:text-[0.5em]">{cardText}</p>
                  </article>
                ))}
              </div>
            </div>

            {/* Client feedback */}
            <div className="mt-[4.5em] pb-[3em] text-[16px] sm:text-[20px] md:text-[24px] lg:text-[30px] xl:text-[36px] 2xl:text-[40px]">
              <h2 className="capitalize font-bold mb-[1.5em]">
                Our Client Feedback
              </h2>
              <Swiper
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                  1536: {
                    slidesPerView: 4,
                  },
                }}
                spaceBetween={30}
                loop
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {reviews.map(
                  ({ avatar, fullname, content, date, rating }, i) => (
                    <SwiperSlide key={i}>
                      <FeedbackCard
                        avatar={avatar}
                        fullname={fullname}
                        content={content}
                        date={date}
                        rating={rating}
                      />
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <Footer />

      <style>{`
          .swiper {
            width: 100%;
            padding-top: 5px;
            padding-bottom: 35px;
          }
          
          .swiper-slide {
            width: fit-content;
          }
          
          .swiper-pagination-bullet {
            background-color: #0BDB45;
          }

          .swiper-pagination-bullet-active {
            width: 10px;
            height: 10px;
          }
        `}</style>
    </>
  );
}

export default AboutPage;
