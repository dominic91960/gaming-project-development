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
      centeredSlides={true}
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
        <Image src={video} alt="Thumbnail" className="mx-auto" width={500} height={300} />
      </SwiperSlide>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image src={image} alt="Screenshots" className="mx-auto" width={500} height={300} />
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
