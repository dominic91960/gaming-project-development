"use client";
import React, { useState } from "react";
import Image from "next/image";
import gameCard from "@/public/images/shop/game-card.png";
import { IoIosStar } from "react-icons/io";
import { useRouter } from "next/navigation";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

import cartIcon from "../../../../public/images/cart/cart-icon.png";
interface Game {
  id: number;
  title: string;
  price: number;
  sellingPrice: number;
  rating: number;
  soldOut: boolean;
  cardImage: string;
}

const ProductCard: React.FC<Game> = ({
  id,
  title,
  sellingPrice,
  price,
  rating,
  soldOut,
  cardImage,
}) => {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  return (
    <div className="relative bg-[#10160e] w-min">
      {/* Wishlist Icon */}
      <div className="absolute top-[1em] left-[1em] z-40">
        <div>
          {isWishlisted ? (
            <IoHeartSharp
              className="text-[1.5em] cursor-pointer hover:scale-105 text-white"
              onClick={() => setIsWishlisted(false)}
            />
          ) : (
            <IoHeartOutline
              className="text-[1.5em] cursor-pointer hover:scale-105 text-white"
              onClick={() => setIsWishlisted(true)}
            />
          )}
        </div>
      </div>

      <div
        onClick={() => {
          console.log("clicked");
          router.push(`/products/view/?id=${id}`);
        }}
        className="border border-[#666a65] p-3  text-white relative w-full  cursor-pointer"
      >
        {soldOut && (
          <div className="absolute top-0 right-0  backdrop-blur-sm bg-black/30 text-white p-1 h-full w-full flex items-center justify-center">
            <div className="flex items-center justify-center">
              <p className="text-[#FF374E] text-center font-primaryFont font-bold text-[25px]">
                SOLD OUT
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center">
          <img
            src={cardImage}
            alt="Game Card"
            className="mb-4 w-[244px] h-[268px]"
          />
        </div>

        <div className="mb-1 w-[244px]">
          <h3 className="text-[18px] font-bold uppercase font-primaryFont line-clamp-2 h-[60px]">
            {title}
          </h3>
        </div>

        <div className="h-[1px] bg-[#666a65] mb-2"></div>
        <div className="flex gap-1 text-[#f29d38] mb-2">
          {Array.from({ length: rating }, (_, index) => (
            <IoIosStar key={index} className="text-[23px]" />
          ))}
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className=" text-[#75F94C] text-[45px] font-semibold uppercase font-rajdhaniFont leading-none w-[180px]">
              ${sellingPrice}
            </p>
          </div>

          <div className="w-full flex justify-end">
            <div className="">
              <div className="flex justify-end mb-2">
                <Image
                  src={cartIcon}
                  alt="Not found background"
                  className="w-[20px] h-[20px]"
                />
              </div>

              <p className="line-through text-[#fff] text-[17px] font-normal uppercase font-rajdhani">
                ${price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
