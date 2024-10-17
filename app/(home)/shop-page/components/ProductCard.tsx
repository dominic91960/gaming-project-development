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
    <div className="border border-gray-700 p-4 bg-gray-900 text-white relative">
      {soldOut && (
        <div className="absolute top-0 right-0 bg-red-600 text-white text-xs p-1">
          SOLD OUT
        </div>
      )}

      <Image src={gameCard} alt="Ghost" className="mb-4" />

      <h3 className="text-lg font-bold">{title}</h3>
      <div className="flex gap-1 text-[#f29d38]">
        {Array.from({ length: rating }, (_, index) => (
          <IoIosStar key={index} />
        ))}
      </div>
      <p className="text-green-500">${price}</p>
      <p className="text-gray-500 line-through">${oldPrice}</p>
    </div>
  );
};

export default ProductCard;
