"use client";

import Image, { StaticImageData } from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface ImageCarouselProps {
  video: StaticImageData;
  images: StaticImageData[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ video, images }) => {
  return (
    <Swiper
      slidesPerView={"auto"}
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
        <Image src={video} alt="Thumbnail" />
      </SwiperSlide>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image src={image} alt="Screenshots" />
        </SwiperSlide>
      ))}
      <style>{`
          .swiper {
            width: 100%;
            padding-top: 80px;
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
