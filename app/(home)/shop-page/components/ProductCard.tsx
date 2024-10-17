import React from "react";

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
      <img src="/greedfall.jpg" alt={title} className="mb-4" />
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-green-500">${price}</p>
      <p className="text-gray-500 line-through">${oldPrice}</p>
      <div className="mt-2">{"⭐".repeat(rating)}</div>
    </div>
  );
};

export default ProductCard;
