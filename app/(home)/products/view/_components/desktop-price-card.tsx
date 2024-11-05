import React from "react";

import { Button } from "@/components/ui/button";
import { PiWarningCircleLight } from "react-icons/pi";
import { IoIosCart, IoMdHeartEmpty } from "react-icons/io";

import CartSidebar from "@/app/(home)/_components/shopping-cart-sidebar";

interface DesktopPriceCardProps {
  title: string;
  discountPrice: number;
  originalPrice: number;
  discountPercentage: string;
  handleBuy: () => void;
  handleAddToCart: () => void;
}

const DesktopPriceCard: React.FC<DesktopPriceCardProps> = ({
  title,
  discountPrice,
  originalPrice,
  discountPercentage,
  handleBuy,
  handleAddToCart,
}) => {
  let productPrice = originalPrice;
  if (discountPrice > 0 && discountPrice < originalPrice)
    productPrice = discountPrice;

  return (
    <menu
      className="absolute bottom-0 right-0 bg-black/50 px-[1.6em] py-[2.7em] backdrop-blur-md z-10"
      style={{
        borderImage: "linear-gradient(to bottom, transparent, #999999) 1",
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      {/* Game title */}
      <h3 className="max-w-[20ch] uppercase font-bold text-[1.2em] border-b">
        {title}
      </h3>

      {/* Price */}
      <div className="flex text-[1.8em] font-bold mt-[0.3em]">
        <p className="">$ {productPrice.toFixed(2)}</p>
        <div className="flex items-center text-[0.33em] font-medium ps-[0.7em] gap-x-[0.2em]">
          <PiWarningCircleLight className="size-[1.22em]" />
          <p className="opacity-70">Price is not final</p>
        </div>
      </div>

      {/* Discount percentage (if any) */}
      {discountPrice > 0 && discountPrice < originalPrice && (
        <p className="font-semibold flex items-center">
          <span className="line-through opacity-70">
            $ {originalPrice.toFixed(2)}
          </span>
          <span className="font-medium text-[0.7em] text-[#0BDB45] ">
            &nbsp;Save&nbsp;
            {discountPercentage}%
          </span>
        </p>
      )}

      {/* Buy, wishlist and add to cart */}
      <div className="flex mt-[0.5em]">
        <Button
          variant="gaming"
          onClick={handleBuy}
          className="h-[2em] text-[0.9em] me-[0.3em] px-[1em] py-0 font-semibold flex-grow"
        >
          Buy now
        </Button>

        <button className="size-[1.8em] hover:opacity-80 border flex items-center justify-center me-[0.3em]">
          <IoMdHeartEmpty className="text-[1em]" />
        </button>

        <CartSidebar>
          <button
            className="size-[1.8em] hover:opacity-80 border flex items-center justify-center"
            onClick={handleAddToCart}
          >
            <IoIosCart className="text-[1em]" />
          </button>
        </CartSidebar>
      </div>
    </menu>
  );
};

export default DesktopPriceCard;
