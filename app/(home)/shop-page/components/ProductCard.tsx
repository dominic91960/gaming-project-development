// components/ProductCard.tsx
import React from "react";

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  oldPrice?: string;
  rating: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  price,
  oldPrice,
  rating,
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <img src={image} alt={title} className="w-full rounded-md" />
      <div className="mt-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-400">Lorem ipsum dolor sit amet...</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-green-400 text-xl">{price}</span>
          {oldPrice && (
            <span className="line-through text-gray-500">{oldPrice}</span>
          )}
        </div>
        <div className="mt-2 flex items-center">
          {"⭐".repeat(rating)}
          {/* Creates stars based on rating */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
