import React from "react";
import Image from "next/image";
import gameCard from "@/public/images/shop/game-card.png";
import { IoIosStar } from "react-icons/io";
interface ProductCardProps {
  title: string;
  price: number;
  oldPrice: number;
  rating: number;
  soldOut?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  oldPrice,
  rating,
  soldOut,
}) => {
  return (
    <div className="border border-white p-4  text-white relative w-max">
      {soldOut && (
        <div className="absolute top-0 right-0 bg-red-600 text-white text-xs p-1">
          SOLD OUT
        </div>
      )}
      <Image src={gameCard} alt="Ghost" className="mb-4" />
      <div className="flex items-center mb-1">
        <h3 className="text-[24px] font-bold uppercase font-primaryFont">
          {title}
        </h3>
      </div>

      <div className="h-[1px] bg-white mb-2"></div>
      <div className="flex gap-1 text-[#f29d38]">
        {Array.from({ length: rating }, (_, index) => (
          <IoIosStar key={index} className="text-[23px]" />
        ))}
      </div>

      <div className="flex items-center gap-6">
        <p className=" text-[#75F94C] text-[45px] font-bold uppercase font-primaryFont">
          ${price}
        </p>
        <p className="line-through text-[#fff] text-[16px] font-normal uppercase font-primaryFont">
          ${oldPrice}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
