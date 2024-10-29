"use client";

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
        600: {
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
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      <SwiperSlide>
        <div
          className="w-[160px] h-[90px] mx-auto bg-cover sm:w-[192px] sm:h-[108px] md:w-[224px] md:h-[126px] lg:w-[256px] lg:h-[144px] xl:w-[288px] xl:h-[162px] 2xl:w-[320px] 2xl:h-[180px]"
          style={{ backgroundImage: `url(${video})` }}
        ></div>
      </SwiperSlide>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div
            className="w-[160px] h-[90px] mx-auto bg-cover sm:w-[192px] sm:h-[108px] md:w-[224px] md:h-[126px] lg:w-[256px] lg:h-[144px] xl:w-[288px] xl:h-[162px] 2xl:w-[320px] 2xl:h-[180px]"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
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
            border-radius: 0px;
            background-color: #FFF;
            width: 20px;
            height: 2px;
          }

          .swiper-pagination-bullet-active {
            background-color: #0BDB45;
            height: 3px;
          }

          @media (min-width: 640px) {
            .swiper {
              padding-bottom: 42px;
            }

            .swiper-pagination-bullet {
              width: 28px;
            }  
          }

          @media (min-width: 768px) {
            .swiper {
              padding-bottom: 48px;
            }

            .swiper-pagination-bullet {
              width: 35px;
            }  
          }

          @media (min-width: 1024px) {
            .swiper {
              padding-bottom: 55px;
            }

            .swiper-pagination-bullet {
              width: 40px;
            }  
          }

          @media (min-width: 1280px) {
            .swiper {
              padding-bottom: 60px;
            }

            .swiper-pagination-bullet {
              width: 45px;
            }  
          }

          @media (min-width: 1536px) {
            .swiper {
              padding-bottom: 65px;
            }

            .swiper-pagination-bullet {
              width: 50px;
            }  
          }
        `}</style>
    </Swiper>
  );
};

export default ImageCarousel;
