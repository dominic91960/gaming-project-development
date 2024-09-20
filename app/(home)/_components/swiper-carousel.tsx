"use client";

import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const SwiperCarousel = () => {
  const [bg, setBg] = useState("");
  const [bullet, setBullet] = useState("");

  const handleSlideChange = (swiper: { realIndex: number }) => {
    const realIndex = swiper.realIndex;
    const bgColors = [
      "bg-[url('../public/images/swiper-carousel/bg-one.png')]",
      "bg-[url('../public/images/swiper-carousel/bg-two.png')]",
      "bg-[url('../public/images/swiper-carousel/bg-three.png')]",
      "bg-[url('../public/images/swiper-carousel/bg-four.png')]",
    ];
    const bulletColors = ["#FFF", "#FF8200", "#FA00FF", "#5CE1E6"];

    setBg(bgColors[realIndex]);
    setBullet(bulletColors[realIndex]);
  };

  return (
    <section className={`transition-all duration-1000 ease-in-out ${bg}`}>
      <div className="container mx-auto">
        <Swiper
          modules={[EffectCoverflow, Pagination, Autoplay]}
          speed={1500}
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 70,
            stretch: 40,
            depth: 400,
            modifier: 1,
            scale: 0.8,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          autoplay={{ disableOnInteraction: false, pauseOnMouseEnter: true }}
          onSlideChange={handleSlideChange}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="h-[600px] w-full bg-neutral-800"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-[600px] w-full bg-red-950"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-[600px] w-full bg-purple-950"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-[600px] w-full bg-emerald-900"></div>
          </SwiperSlide>
        </Swiper>
        <style>{`
          .swiper {
            width: 100%;
            padding-top: 50px;
            padding-bottom: 50px;
          }
          
          .swiper-slide {
            width: 50%;
          }
          
          .swiper-pagination-bullet {
            background-color: ${bullet};
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 1s;
          }

          .swiper-pagination-bullet-active {
            scale: 1.8;
          }
        `}</style>
      </div>
    </section>
  );
};

export default SwiperCarousel;
