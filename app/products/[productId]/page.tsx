import Image from "next/image";

import { PiWarningCircleLight } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import StarRating from "@/app/(home)/_components/star-rating";

import bg from "@/public/images/product/bg.png";
import paypal from "@/public/images/product/paypal-logo.png";
import wishlist from "@/public/images/product/wishlist.png";
import cart from "@/public/images/product/cart.png";
import video from "@/public/images/product/video.png";
import imgOne from "@/public/images/product/image-one.png";
import imgTwo from "@/public/images/product/image-two.png";
import imgThree from "@/public/images/product/image-three.png";

const gameData = {
  title: "Star wars: outlaws",
  fullTitle: "STAR WARS: OUTLAWS (PC) Steam Key Global",
  originalPrice: 39.99,
  discountPrice: 20.99,
  //   discountPrice: null,
  rating: 4,
  languages: ["English", "Japanese", "Russian", "French", "Chinese"],
  os: "windows",
  platform: "ubisoft",
  video: video,
  images: [imgOne, imgTwo, imgThree],
  requirements: {
    minimum: {
      os: "WINDOWS 10 / 11 WITH DIRECTX 12",
      cpu: "INTEL® CORE™ i7-8700K, AMD RYZEN™ 5 3600",
      graphics:
        "GEFORCE® GTX 1660 · 6GB, AMD RX 5600 XT · 6GB, INTEL® ARC A750 · 8GB (REBAR ON)",
      ram: "16 GB (dual-channel mode)",
      storage: "65 GB SSD",
      resolution: "1080p / 30 Fps / Low Preset with Upscaler Set to Quality",
    },
    recommended: {
      os: "WINDOWS 10 / 11 WITH DIRECTX 12",
      cpu: "INTEL® CORE™ i7-8700K, AMD RYZEN™ 5 3600",
      graphics:
        "GEFORCE® GTX 1660 · 6GB, AMD RX 5600 XT · 6GB, INTEL® ARC A750 · 8GB (REBAR ON)",
      ram: "16 GB (dual-channel mode)",
      storage: "65 GB SSD",
      resolution: "1080p / 30 Fps / Low Preset with Upscaler Set to Quality",
    },
    high: {
      os: "WINDOWS 10 / 11 WITH DIRECTX 12",
      cpu: "INTEL® CORE™ i7-8700K, AMD RYZEN™ 5 3600",
      graphics:
        "GEFORCE® GTX 1660 · 6GB, AMD RX 5600 XT · 6GB, INTEL® ARC A750 · 8GB (REBAR ON)",
      ram: "16 GB (dual-channel mode)",
      storage: "65 GB SSD",
      resolution: "1080p / 30 Fps / Low Preset with Upscaler Set to Quality",
    },
  },
};

export default function page() {
  const calDiscountPercentage = () => {
    const discount = (gameData.discountPrice / gameData.originalPrice) * 100;
    return discount.toFixed(2);
  };

  return (
    <section className="bg-[#051301] font-primaryFont">
      <div className="relative">
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent"></div>
        <Image src={bg} alt="Image background" />
        <div className="absolute -bottom-[25%] left-0 right-0 container mx-auto flex justify-end">
          {/* Price card */}
          <div
            className="bg-black/50 px-[2.7%] py-[4.2%] backdrop-blur-md"
            style={{
              borderImage: "linear-gradient(to bottom, transparent, #999999) 1",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
          >
            <h3 className="uppercase font-bold text-[32px] border-b">
              {gameData.title}
            </h3>
            <div className="flex text-[48px] font-bold mt-[0.3em]">
              <p className="">
                $ {gameData.discountPrice || gameData.originalPrice}
              </p>
              <div className="flex items-center text-base font-medium ps-[0.7em] gap-x-[0.2em]">
                <PiWarningCircleLight className="size-5" />
                <p className="opacity-70">Price is not final</p>
              </div>
            </div>
            {gameData.discountPrice && (
              <p className="font-semibold text-[24px] flex items-center">
                <span className="line-through opacity-70">
                  $ {gameData.originalPrice}
                </span>
                <span className="font-medium text-[20px] text-[#0BDB45] ">
                  &nbsp;Save&nbsp;
                  {calDiscountPercentage()}%
                </span>
              </p>
            )}
            <Button
              variant="secondary"
              className="rounded-none w-full mt-[3%] mb-[6%]"
            >
              <Image src={paypal} alt="Paypal logo" />
            </Button>
            <div className="flex gap-x-[3%]">
              <Button className="rounded-none bg-[#0BDB45] text-[25px] font-semibold text-black hover:text-white flex-grow">
                Buy now
              </Button>
              <button className="flex-shrink-0 hover:opacity-80">
                <Image src={wishlist} alt="Add to wishlist" />
              </button>
              <button className="flex-shrink-0 hover:opacity-80">
                <Image src={cart} alt="Add to cart" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="h-[1000px]"
        style={{
          background:
            "linear-gradient(to bottom, black, transparent, transparent, black)",
        }}
      >
        <div className=" container mx-auto text-[20px]">
          <h2 className="font-bold text-[32px]">{gameData.fullTitle}</h2>

          <div className="flex items-center gap-x-[16px] leading-none mt-[0.2em]">
            {/* Rating */}
            <div className="text-[#f29d38] -translate-y-[10%]">
              <StarRating rating={gameData.rating} />
            </div>
            <p>{gameData.rating}/5</p>
            <div className="w-[1px] self-stretch bg-white"></div>
            {/* Languages */}
            <div className="flex">
              <p>
                {gameData.languages[0]}
                {gameData.languages.length > 1 && (
                  <span> & {gameData.languages.length - 1} more</span>
                )}
              </p>
            </div>
            <div className="w-[1px] self-stretch bg-white"></div>
            {/* OS */}
            <div>
              <Image
                src={`/images/product/${gameData.os}.png`}
                alt={gameData.os}
                width={23}
                height={23}
              />
            </div>
            <div className="w-[1px] self-stretch bg-white"></div>
            {/* Platform */}
            <div>
              <Image
                src={`/images/product/${gameData.platform}.png`}
                alt={gameData.platform}
                width={23}
                height={23}
              />
            </div>
            <div className="w-[1px] self-stretch bg-white"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
