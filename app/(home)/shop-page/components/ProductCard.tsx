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
  // const [verifySession, setVerifySession] = useState<boolean>(false);
  const { addItem } = useCartContext();
  // const {
  //   addToWishlist,
  //   setReloadWishlist,
  //   updateWishListIds,
  //   removeFromWishlist,
  // } = useWishlistContext();

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

  // const handleWishlist = async (gameId: any): Promise<boolean> => {
  //   // const newWishlistItem = {
  //   //   id: gameId,
  //   //   image: cardImage,
  //   //   choiceType: "aaaaaa",
  //   //   title,
  //   //   price: sellingPrice,
  //   //   productType: "bbbbbb",
  //   // };

  //   return await addToWishlist(id);
  // };

  return (
    <div className="relative bg-[#10160e] w-min">
      {/* Wishlist Icon */}
      <div
        // onClick={() => handleWishlist(id)}
        className="absolute top-[1em] left-[1em] z-40"
      >
        {/* <div>
          {wishList ? (
            <IoHeartSharp
              className="text-[1.5em] cursor-pointer hover:scale-105 text-white"
              onClick={async () => {
                await removeFromWishlist(id);
                setIsWishlisted(false);
              }}
            />
          ) : (
            <IoHeartOutline
              className="text-[1.5em] cursor-pointer hover:scale-105 text-white"
              onClick={async () => {
                if (!verifySession) {
                  setAccessDeniedPopupOpen(true);
                  return;
                }
                const res = await handleWishlist(id);
                setIsWishlisted(res);
              }}
            />
          )}
        </div> */}
        <WishlistButton
          gameId={id}
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
            className="mb-4 w-[244px] h-[268px]"
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
          className="mb-1 w-[244px]"
          onClick={() => {
            router.push(`/products/view/?id=${id}`);
          }}
        >
          <h3 className="text-[18px] font-bold uppercase font-primaryFont line-clamp-2 h-[60px]">
            {title}
          </h3>
        </div>

        <div className="h-[1px] bg-[#666a65] mb-2"></div>
        <div className="flex items-center justify-between mb-2">
          {/* old code */}
          {/* <div className="flex gap-1 text-[#f29d38] bg-slate-600 h-[25px]">
            {Array.from({ length: rating }, (_, index) => (
              <IoIosStar key={index} className="text-[23px]" />
            ))}
          </div> */}

          {/* New code - if no rating added empty starts added */}
          <div className="flex gap-1 text-[#f29d38] h-[25px]">
            {rating > 0 ? (
              <>
                {/* Calculate the number of full and half stars */}
                {Array.from({ length: Math.floor(rating) }, (_, index) => (
                  <IoIosStar key={index} className="text-[23px]" />
                ))}
                {rating % 1 !== 0 && (
                  <IoIosStar className="text-[23px]" style={{ opacity: 0.5 }} />
                )}{" "}
                {/* Half star */}
                {Array.from({ length: 5 - Math.ceil(rating) }, (_, index) => (
                  <IoIosStarOutline key={index} className="text-[23px]" />
                ))}
              </>
            ) : (
              <div className="flex gap-1 text-[#f29d38]">
                {Array.from({ length: 5 }, (_, index) => (
                  <IoIosStarOutline
                    key={index}
                    className="text-[23px] text-[#f29d38]"
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
                className="w-[20px] h-[20px]"
                onClick={() => crateCart(id)}
              />
            </CartSidebar>
          )}
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className=" text-[#75F94C] text-[45px] font-semibold uppercase font-rajdhaniFont leading-none w-[180px]">
              ${sellingPrice}
            </p>
          </div>

          <div className="">
            <p className="line-through text-[#fff] text-[17px] font-normal uppercase font-rajdhani leading-none mb-2">
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
