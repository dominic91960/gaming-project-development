"use client";

import Image, { StaticImageData } from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface ImageCarouselProps {
  video: string;
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ video, images }) => {
  return (
    <Swiper
      slidesPerView={2}
      breakpoints={{
        768: {
          slidesPerView: 3,
        },
        1280: {
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
      <SwiperSlide>
        <div
          className="w-[160px] h-[90px] mx-auto bg-cover sm:w-[192px] sm:h-[108px] md:w-[224px] md:h-[126px] lg:w-[256px] lg:h-[144px] xl:w-[288px] xl:h-[162px] 2xl:w-[320px] 2xl:h-[180px]"
          style={{ backgroundImage: `url(${video})` }}
        ></div>
        {/* <Image
          src={video}
          alt="Thumbnail"
          className="w-[325px] h-[164px] mx-auto"
          width={325}
          height={164}
        /> */}
      </SwiperSlide>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div
            className="w-[160px] h-[90px] mx-auto bg-cover sm:w-[192px] sm:h-[108px] md:w-[224px] md:h-[126px] lg:w-[256px] lg:h-[144px] xl:w-[288px] xl:h-[162px] 2xl:w-[320px] 2xl:h-[180px]"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          {/* <Image
            src={image}
            alt="Screenshots"
            className="w-[325px] h-[164px] mx-auto"
            width={325}
            height={164}
          /> */}
        </SwiperSlide>
      ))}
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
    </Swiper>
  );
};

export default ImageCarousel;
