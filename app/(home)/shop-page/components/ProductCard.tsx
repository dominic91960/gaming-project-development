"use client";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import gameCard from "@/public/images/shop/game-card.png";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

import cartIcon from "../../../../public/images/cart/cart-icon.png";
import CartSidebar from "../../_components/shopping-cart-sidebar";
import { useCartContext } from "@/context/CartContext";
import { useWishlistContext } from "@/context/WishListContext";
import { set } from "date-fns";
import axios from "axios";
import AccessDeniedModal from "@/components/access-denied-modal/AccessDeniedModal";
import WishlistButton from "@/components/product-card/WishlistButton";
interface Game {
  id: string;
  title: string;
  price: number;
  sellingPrice: number;
  rating: number;
  soldOut: boolean;
  cardImage: string;
  wishList: boolean;
  verifySession: boolean;
}

type CartItem = {
  id: number;
  image: string;
  choiceType: string;
  title: string;
  quantity: number;
  price: number;
  productType: string;
};

const ProductCard: React.FC<Game> = ({
  id,
  title,
  sellingPrice,
  price,
  rating,
  soldOut,
  cardImage,
  wishList,
  verifySession,
}) => {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [accessDenidedPopupOpen, setAccessDeniedPopupOpen] = useState(false);

  const { addItem } = useCartContext();

  const crateCart = (gameId: any) => {
    const newCardItem: CartItem = {
      id: gameId,
      image: cardImage,
      choiceType: "aaaaaa",
      title,
      quantity: 1,
      price: sellingPrice,
      productType: "bbbbbb",
    };

    addItem(newCardItem);
  };

  return (
    <div className="relative bg-[#10160e] sm:w-min">
      {/* Wishlist Icon */}
      <div className="absolute top-[0.8em] left-[0.8em] sm:text-[24px] text-[20px] z-40">
        <WishlistButton
          gameId={id}
          showText={false}
          // wishList={wishList}
          // verifySession={verifySession}
        />
      </div>

      <div className="border border-[#666a65] p-3  text-white relative w-full  cursor-pointer">
        <div className="flex items-center justify-center relative">
          <img
            src={cardImage}
            onClick={() => {
              router.push(`/products/view/?id=${id}`);
            }}
            alt="Game Card"
            // className="mb-4 sm:w-[244px] sm:h-[268px] w-[154px] h-[158px]"
            className="mb-4 w-[154px] h-[158px] sm:w-[244px] sm:h-[268px] object-cover"
          />

          {soldOut && (
            <div className="absolute top-0 right-0  backdrop-blur-sm bg-black/30 text-white p-1 h-full w-full flex items-center justify-center">
              <div className="flex items-center justify-center">
                <p className="text-[#FF374E] text-center font-primaryFont font-bold text-[25px]">
                  SOLD OUT
                </p>
              </div>
            </div>
          )}
        </div>

        <div
          className="mb-1 sm:w-[244px] w-[136px]"
          onClick={() => {
            router.push(`/products/view/?id=${id}`);
          }}
        >
          <h3 className="sm:text-[18px] text-[10px] font-bold uppercase font-primaryFont line-clamp-2 sm:h-[60px] h-[50px]">
            {title}
          </h3>
        </div>

        <div className="h-[1px] bg-[#666a65] mb-2"></div>

        <div className="flex items-center justify-between mb-2">
          {/* New code - if no rating added empty starts added */}
          <div className="flex gap-1 text-[#f29d38] h-[25px]">
            {rating > 0 ? (
              <>
                {/* Calculate the number of full and half stars */}
                {Array.from({ length: Math.floor(rating) }, (_, index) => (
                  <IoIosStar
                    key={index}
                    className="sm:text-[23px] text-[16px]"
                  />
                ))}
                {rating % 1 !== 0 && (
                  <IoIosStar
                    className="sm:text-[23px] text-[16px]"
                    style={{ opacity: 0.5 }}
                  />
                )}{" "}
                {/* Half star */}
                {Array.from({ length: 5 - Math.ceil(rating) }, (_, index) => (
                  <IoIosStarOutline
                    key={index}
                    className="sm:text-[23px] text-[16px]"
                  />
                ))}
              </>
            ) : (
              <div className="flex gap-1 text-[#f29d38]">
                {Array.from({ length: 5 }, (_, index) => (
                  <IoIosStarOutline
                    key={index}
                    className="sm:text-[23px] text-[16px] text-[#f29d38]"
                  />
                ))}
              </div>
            )}
          </div>
          {!soldOut && (
            <CartSidebar>
              <Image
                src={cartIcon}
                alt="Not found background"
                className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]"
                onClick={() => crateCart(id)}
              />
            </CartSidebar>
          )}
        </div>

        <div className="flex items-end justify-between">
          <div className="">
            <p className=" text-[#75F94C] sm:text-[45px] text-[24px] font-semibold uppercase font-rajdhaniFont leading-none sm:w-[180px]">
              ${sellingPrice}
            </p>
          </div>

          <div className="">
            <p className="line-through text-[#fff] sm:text-[17px] text-[12px] font-normal uppercase font-rajdhani leading-none mb-2">
              ${price}
            </p>
          </div>
        </div>
      </div>

      {accessDenidedPopupOpen && (
        <AccessDeniedModal
          open={accessDenidedPopupOpen}
          setIsOpen={setAccessDeniedPopupOpen}
        />
      )}
    </div>
  );
};

export default ProductCard;
