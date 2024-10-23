"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RecommendedGames from "./components/Recommended-games";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import ProductSearchBar from "@/components/product-search/product-search";
import coverPhoto from "@/public/images/shop/cover-photo-dark.jpg";
import { GoDotFill } from "react-icons/go";
import { MdOutlineNavigateNext } from "react-icons/md";

type CartItem = {
  id: number;
  image: string;
  choiceType: string;
  title: string;
  quantity: number;
  price: number;
  productType: string;
};

const initialCartItems: CartItem[] = [
  {
    id: 1,
    image: "/images/cart/itemImage1.png",
    choiceType: "Ultimate Choice",
    title: "Six-Sided Oracles (PC) Steam Key GLOBAL",
    quantity: 2,
    price: 299,
    productType: "Digital product",
  },
  {
    id: 2,
    image: "/images/cart/itemImage2.png",
    choiceType: "Best Choice",
    title: "Call of duty - Modern warfare",
    quantity: 5,
    price: 155,
    productType: "DVD Product",
  },
];

const SERVICE_FEE = 12;
const discountCodes: { [key: string]: number } = {
  "12345": 15,
  "11111": 30,
  "44444": 40,
};

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountApplied, setDiscountApplied] = useState<number>(0);
  const [discountMessage, setDiscountMessage] = useState<string>("");

  const handleQuantityChange = (id: number, newQuantity: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  const handleRemoveItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const lastPrice = totalPrice + SERVICE_FEE - discountApplied;

  const handleApplyDiscount = () => {
    if (discountCodes[discountCode]) {
      setDiscountApplied(discountCodes[discountCode]);
      setDiscountMessage("Discount added successfully");
    } else {
      setDiscountApplied(0);
      setDiscountMessage("Your discount code is incorrect");
    }
  };

  return (
    <div>
      <ProductSearchBar />
      <Navbar />
      <div className="bg-[#000000] h-full">
        <div className="relative">
          <Image
            src={coverPhoto}
            alt="shop page cover image"
            className="w-full h-full object-cover"
          />

          <div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container mx-auto flex items-center w-full backdrop-blur-md bg-white/30 space-x-4 py-2 px-8">
                <div className="flex items-center gap-1">
                  <GoDotFill className="text-[35px] text-[#0BDB45]" />
                  <p className="font-primaryFont text-[#0BDB45] text-[24px] font-medium">
                    Cart
                  </p>
                </div>

                <div className="h-1 w-full bg-[#0BDB45]"></div>

                <div className="flex items-center gap-1">
                  <GoDotFill className="text-[35px] text-[#fff]" />
                  <p className="font-primaryFont text-white text-[24px] font-medium">
                    Payment
                  </p>
                </div>

                <div className="h-1 w-full bg-white"></div>

                <div className="flex items-center gap-1">
                  <GoDotFill className="text-[35px] text-[#fff]" />
                  <p className="font-primaryFont text-white text-[24px] font-medium whitespace-nowrap">
                    Get Your Product
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full container mx-auto">
          <div className="grid grid-cols-12 gap-16 content-start">
            <div className="col-span-8">
              {cartItems.map((item) => (
                <div key={item.id} className="mb-12">
                  <div>
                    <div className="grid grid-cols-12 gap-6 px-6 py-2 border border-white bg-[#222222]">
                      <div className="col-span-3 p-2 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full rounded"
                        />
                      </div>

                      <div className="col-span-9 flex items-center w-full h-full">
                        <div className="w-full">
                          <div className="mb-4">
                            <div className="flex items-center justify-between">
                              <p className="font-primaryFont text-[16px] font-normal text-white border-b-2 border-[#676866] w-max mb-2">
                                {item.choiceType}
                              </p>

                              <div className="flex items-center justify-end gap-1">
                                <CiHeart className="text-[30px] text-white cursor-pointer" />
                                <MdDeleteForever
                                  className="text-[30px] text-white cursor-pointer"
                                  onClick={() => handleRemoveItem(item.id)}
                                />
                              </div>
                            </div>

                            <p className="font-primaryFont text-[20px] font-bold text-white">
                              {item.title}
                            </p>
                          </div>

                          <div className="grid grid-cols-2">
                            <div>
                              <div className="border-r-2 border-white">
                                <div className="flex items-center gap-2 mt-2 mb-5">
                                  <div className="flex items-center space-x-4">
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          item.id,
                                          item.quantity - 1
                                        )
                                      }
                                      className="text-white font-bold text-[18px] rounded"
                                      disabled={item.quantity <= 1}
                                    >
                                      -
                                    </button>
                                    <span className="text-xl text-white font-bold font-primaryFont">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          item.id,
                                          item.quantity + 1
                                        )
                                      }
                                      className="text-white font-bold text-[18px] rounded"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                                <p className="font-primaryFont text-[35px] font-bold text-[#75F94C] leading-none">
                                  ${item.price * item.quantity}
                                </p>
                              </div>
                            </div>

                            <div className="flex justify-end">
                              <div className="flex items-center gap-2 self-end">
                                <div className="h-6 w-6 rounded-full flex items-center justify-center border border-white">
                                  <p className="font-primaryFont text-[13px] font-medium text-white">
                                    ?
                                  </p>
                                </div>
                                <p className="font-primaryFont text-[16px] font-medium text-white">
                                  {item.productType}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ----------Summary Section--------------- */}

            <div className="col-span-4">
              <div className="bg-[#222222] border border-white p-6">
                <p className="font-primaryFont text-[36px] font-semibold text-white mb-2">
                  Summary
                </p>

                <div className="flex items-center justify-between">
                  <p className="font-primaryFont text-[20px] font-normal text-white mb-2">
                    {totalItems} Prodcuts
                  </p>
                  <p className="font-primaryFont text-[20px] font-bold text-white mb-2">
                    ${totalPrice}
                  </p>
                </div>

                <div className="flex items-center justify-between border-b-2 border-[#676866]">
                  <p className="font-primaryFont text-[20px] font-normal text-white mb-2">
                    Service fee
                  </p>
                  <p className="font-primaryFont text-[20px] font-bold text-white mb-2">
                    ${SERVICE_FEE}
                  </p>
                </div>

                <div className="flex items-center justify-between border-b-2 border-[#676866] py-3">
                  <p className="self-start font-primaryFont text-[20px] font-normal text-white mb-2">
                    Discount code :
                  </p>

                  <div>
                    <Input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Discount code"
                      className="w-max mb-3 text-white rounded-none"
                    />
                    <div className="flex items-center justify-end">
                      <div
                        className="bg-[#0BDB45] w-max px-4 py-1 text-[11px] text-black font-bold cursor-pointer"
                        onClick={handleApplyDiscount}
                      >
                        Add
                      </div>
                    </div>
                  </div>
                </div>

                {discountApplied > 0 && (
                  <div className="flex items-center justify-between border-b-2 border-[#676866] py-3">
                    <p className="font-primaryFont text-[20px] font-normal text-green-600">
                      Discount price
                    </p>
                    <p className="font-primaryFont text-[20px] font-normal text-green-600 mb-2">
                      -${discountApplied}
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-between py-3 mb-3">
                  <p className="font-primaryFont text-[32px] font-normal text-white mb-2">
                    Total :
                  </p>
                  <p className="font-primaryFont text-[36px] font-bold text-white mb-2">
                    ${lastPrice}
                  </p>
                </div>

                <Button
                  variant="gaming"
                  className="h-fit w-full text-[24px] text-black px-[1em] py-[0.5em]"
                >
                  Proceed to checkout
                </Button>

                {discountMessage && (
                  <p
                    className={`mt-2 ${
                      discountApplied > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {discountMessage}
                  </p>
                )}
              </div>
            </div>
          </div>

          <p className="font-primaryFont text-white text-[28px] font-medium mb-4 mt-16">
            Recommended based on the games you play
          </p>

          <div className="grid grid-cols-5 gap-4">
            <div>
              <RecommendedGames
                title="Amazing Game"
                price={49.99}
                oldPrice={59.99}
                rating={5}
                soldOut={false}
              />
            </div>
            <div>
              <RecommendedGames
                title="Amazing Game"
                price={49.99}
                oldPrice={59.99}
                rating={5}
                soldOut={false}
              />
            </div>
            <div>
              <RecommendedGames
                title="Amazing Game"
                price={49.99}
                oldPrice={59.99}
                rating={5}
                soldOut={false}
              />
            </div>
            <div>
              <RecommendedGames
                title="Amazing Game"
                price={49.99}
                oldPrice={59.99}
                rating={5}
                soldOut={false}
              />
            </div>
            <div>
              <RecommendedGames
                title="Amazing Game"
                price={49.99}
                oldPrice={59.99}
                rating={5}
                soldOut={false}
              />
            </div>
          </div>

          <div className="flex items-center justify-end mt-8 pb-16">
            <Button
              variant="gaming"
              className="h-fit w-max text-[24px] text-black px-[1em] py-1"
            >
              See More <MdOutlineNavigateNext />
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
