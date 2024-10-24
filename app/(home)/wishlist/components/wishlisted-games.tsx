import React from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import ProductCard from "@/components/product-card/product-card";

interface WishlistedGamesProps {
  displayedProducts: {
    poster: string;
    name: string;
    desc: string;
    rating: number;
    originalPrice: number;
    discountPrice: number;
  }[];
  productsPerPage: number;
  totalPages: number;
  setCurrentPage: (value: React.SetStateAction<number>) => void;
  currentPage: number;
}

const WishlistedGames: React.FC<WishlistedGamesProps> = ({
  displayedProducts,
  productsPerPage,
  totalPages,
  setCurrentPage,
  currentPage,
}) => {
  return (
    <>
      <div
        className={`flex ${
          displayedProducts.length < productsPerPage
            ? "gap-x-[1em]"
            : "justify-around"
        }`}
      >
        {displayedProducts.map(
          (
            { poster, name, desc, rating, originalPrice, discountPrice },
            index
          ) => (
            <ProductCard
              key={index}
              poster={poster}
              name={name}
              desc={desc}
              rating={rating}
              originalPrice={originalPrice}
              discountPrice={discountPrice}
            />
          )
        )}
      </div>
      <div
        className={`${
          totalPages < 2 ? "hidden" : ""
        } flex justify-center gap-x-[1em] mt-[1.8em] text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]`}
      >
        <button
          className="hover:text-[#45F882] disabled:hover:text-white disabled:opacity-70"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          <IoIosArrowBack />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`${
              i + 1 === currentPage ? "text-[#45F882]" : ""
            } hover:opacity-80`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="hover:text-[#45F882] disabled:hover:text-white disabled:opacity-70"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </>
  );
};

export default WishlistedGames;
