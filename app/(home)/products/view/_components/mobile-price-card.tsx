import React from "react";

import { Button } from "@/components/ui/button";
import { PiWarningCircleLight } from "react-icons/pi";
import { IoIosCart, IoMdHeartEmpty } from "react-icons/io";

import CartSidebar from "@/app/(home)/_components/shopping-cart-sidebar";

interface MobilePriceCardProps {
  title: string;
  discountPrice: number;
  originalPrice: number;
  discountPercentage: string;
  handleBuy: () => void;
  handleAddToCart: () => void;
}

const MobilePriceCard: React.FC<MobilePriceCardProps> = ({
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
      className=" bg-white/5 px-[1.6em] py-[2.7em] mt-[0.6em] mb-[1.6em] backdrop-blur-[2px] text-[15px] sm:hidden"
      style={{
        borderImage: "linear-gradient(to bottom, transparent, #999999) 1",
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      {/* Game title */}
      <h3 className="uppercase font-bold text-[1.3em] border-b">{title}</h3>

      {/* Price */}
      <div className="flex text-[2em] font-bold mt-[0.3em]">
        <p className="">$ {productPrice.toFixed(2)}</p>
        <div className="flex items-center text-[0.35em] font-medium ps-[0.7em] gap-x-[0.2em]">
          <PiWarningCircleLight className="size-[1.25em]" />
          <p className="opacity-70">Price is not final</p>
        </div>
      </div>

      {/* Discount percentage (if any) */}
      {discountPrice > 0 && discountPrice < originalPrice && (
        <p className="font-semibold flex items-center">
          <span className="line-through opacity-70">
            $ {originalPrice.toFixed(2)}
          </span>
          <span className="font-medium text-[0.8em] text-[#0BDB45] ">
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
          className="h-[2em] text-[1em] me-[0.3em] px-[1em] py-0 font-semibold flex-grow"
        >
          Buy now
        </Button>
        <button className="size-[2em] hover:opacity-80 border flex items-center justify-center me-[0.3em]">
          <IoMdHeartEmpty className="text-[1em]" />
        </button>

        <CartSidebar>
          <button className="size-[2em] hover:opacity-80 border flex items-center justify-center">
            <IoIosCart className="text-[1em]" onClick={handleAddToCart} />
          </button>
        </CartSidebar>
      </div>
    </menu>
  );
};

export default MobilePriceCard;
