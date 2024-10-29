"use client";
import React from "react";
import Image from "next/image";
import gameCard from "@/public/images/shop/game-card.png";
import { IoIosStar } from "react-icons/io";
import { useRouter } from "next/navigation";

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
  return (
    <div
      onClick={() => {
        console.log("clicked");
        router.push(`/products/view/?id=${id}`);
      }}
      className="border border-[#666a65] p-3  text-white relative w-full bg-[#10160e] cursor-pointer"
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

      <div className="flex items-center mb-1">
        <h3 className="text-[18px] font-bold uppercase font-primaryFont line-clamp-2">
          {title}
        </h3>
      </div>

      <div className="h-[1px] bg-[#666a65] mb-2"></div>
      <div className="flex gap-1 text-[#f29d38]">
        {Array.from({ length: rating }, (_, index) => (
          <IoIosStar key={index} className="text-[23px]" />
        ))}
      </div>

      <div className="flex items-center gap-6">
        <p className=" text-[#75F94C] text-[45px] font-bold uppercase !font-rajdhani">
          ${sellingPrice}
        </p>
        <p className="line-through text-[#fff] text-[16px] font-normal uppercase font-rajdhani">
          ${price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
