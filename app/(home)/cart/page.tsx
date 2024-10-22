"use client";
import { useState } from "react";
import Image from "next/image";
import cartImage from "../../../public/images/cart/cart-image-01.png";
import { CiHeart } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RecommendedGames from "./components/Recommended-games";
import { MdOutlineNavigateNext } from "react-icons/md";
import ProductSearchBar from "@/components/product-search/product-search";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import coverPhoto from "@/public/images/shop/cover-photo-dark.jpg";
import { GoDotFill } from "react-icons/go";

const Cart = () => {
  const [count1, setCount1] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);

  const handleIncrement1 = () => {
    setCount1(count1 + 1);
  };

  const handleDecrement1 = () => {
    if (count1 > 0) {
      setCount1(count1 - 1);
    }
  };

  const handleIncrement2 = () => {
    setCount2(count2 + 1);
  };

  const handleDecrement2 = () => {
    if (count1 > 0) {
      setCount2(count2 - 1);
    }
  };

  return (
    <div className="bg-[#000000]">
      <ProductSearchBar />
      <Navbar />

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

      <div className="container mx-auto h-full">
        <p className="font-primaryFont text-white text-[28px] font-medium mb-4">
          My Cart
        </p>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 flex flex-col justify-between">
            <div className="grid grid-cols-12 gap-2 border border-white bg-[#222222] p-4">
              <div className="col-span-3 flex items-center justify-center">
                <Image
                  src={cartImage}
                  alt="cart-image"
                  width={200}
                  height={198}
                />
              </div>

              <div className="col-span-9 flex items-center w-full h-full">
                <div className="w-full">
                  <div className="mb-4">
                    <div className="flex items-center justify-end gap-2">
                      <CiHeart className="text-[25px] text-white cursor-pointer" />
                      <MdDeleteForever className="text-[25px] text-white cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-primaryFont text-[16px] font-normal text-white border-b-2 border-[#676866] w-max mb-2">
                        Ultimate Choice
                      </p>
                    </div>

                    <p className="font-primaryFont text-[20px] font-bold text-white">
                      Six-Sided Oracles (PC) Steam Key GLOBAL
                    </p>
                  </div>

                  <div className="grid grid-cols-2">
                    <div>
                      <div className="border-r-2 border-[#676866]">
                        <div className="flex items-center space-x-4 mb-6">
                          <button
                            onClick={handleDecrement1}
                            className="text-white font-bold text-[18px]"
                          >
                            -
                          </button>
                          <p className="text-xl text-white font-bold font-primaryFont">
                            {count1}
                          </p>
                          <button
                            onClick={handleIncrement1}
                            className="text-white font-bold text-[18px]"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-primaryFont text-[35px] font-bold text-[#75F94C] leading-none">
                          $ 299
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
                          Digital Product
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------------------------------------------------------------------------------- */}

            <div className="grid grid-cols-12 gap-2 border border-white bg-[#222222] p-4">
              <div className="col-span-3 flex items-center justify-center">
                <Image
                  src={cartImage}
                  alt="cart-image"
                  width={200}
                  height={198}
                />
              </div>

              <div className="col-span-9 flex items-center w-full h-full">
                <div className="w-full">
                  <div className="mb-4">
                    <div className="flex items-center justify-end gap-2">
                      <CiHeart className="text-[25px] text-white" />
                      <MdDeleteForever className="text-[25px] text-white" />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-primaryFont text-[16px] font-normal text-white border-b-2 border-[#676866] w-max mb-2">
                        Ultimate Choice
                      </p>
                    </div>

                    <p className="font-primaryFont text-[20px] font-bold text-white">
                      Six-Sided Oracles (PC) Steam Key GLOBAL
                    </p>
                  </div>

                  <div className="grid grid-cols-2">
                    <div>
                      <div className="border-r-2 border-[#676866]">
                        <div className="flex items-center space-x-4 mb-6">
                          <button
                            onClick={handleDecrement2}
                            className="text-white font-bold text-[18px] rounded"
                          >
                            -
                          </button>
                          <span className="text-xl text-white font-bold font-primaryFont">
                            {count2}
                          </span>
                          <button
                            onClick={handleIncrement2}
                            className="text-white font-bold text-[18px] rounded"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-primaryFont text-[35px] font-bold text-[#75F94C] leading-none">
                          $ 299
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
                          Digital Product
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------------------sumarry section---------------------------------------------- */}
          <div className="bg-[#29ee33] col-span-4">
            <div className="bg-[#222222] border border-white p-6">
              <p className="font-primaryFont text-[36px] font-semibold text-white mb-2">
                Summary
              </p>

              <div className="flex items-center justify-between">
                <p className="font-primaryFont text-[20px] font-normal text-white mb-2">
                  2 Prodcuts
                </p>
                <p className="font-primaryFont text-[20px] font-bold text-white mb-2">
                  $ 78.34
                </p>
              </div>

              <div className="flex items-center justify-between border-b-2 border-[#676866]">
                <p className="font-primaryFont text-[20px] font-normal text-white mb-2">
                  Service fee
                </p>
                <p className="font-primaryFont text-[20px] font-bold text-white mb-2">
                  $ 3.04
                </p>
              </div>

              <div className="flex items-center justify-between border-b-2 border-[#676866] py-3">
                <p className="font-primaryFont text-[20px] font-normal text-white mb-2 self-start">
                  Discount code :
                </p>

                <div>
                  <Input
                    type="text"
                    placeholder="Discount code"
                    className="w-max mb-3 rounded-none"
                  />
                  <div className="flex items-center justify-end">
                    <div className="bg-[#0BDB45] w-max px-4 py-1 text-[11px] text-black font-bold cursor-pointer">
                      Add
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-b-2 border-[#676866] py-3">
                <p className="font-primaryFont text-[20px] font-normal text-white">
                  Discount price
                </p>
                <p className="font-primaryFont text-[20px] font-normal text-white mb-2">
                  - $ 8.34
                </p>
              </div>

              <div className="flex items-center justify-between py-3 mb-3">
                <p className="font-primaryFont text-[32px] font-normal text-white mb-2">
                  Total :
                </p>
                <p className="font-primaryFont text-[36px] font-bold text-white mb-2">
                  $ 76.23
                </p>
              </div>

              <Button
                variant="gaming"
                className="h-fit w-full text-[24px] text-black px-[1em] py-[0.5em]"
              >
                Proceed to checkout
              </Button>
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
            {" "}
            <RecommendedGames
              title="Amazing Game"
              price={49.99}
              oldPrice={59.99}
              rating={5}
              soldOut={false}
            />
          </div>
          <div>
            {" "}
            <RecommendedGames
              title="Amazing Game"
              price={49.99}
              oldPrice={59.99}
              rating={5}
              soldOut={false}
            />
          </div>
          <div>
            {" "}
            <RecommendedGames
              title="Amazing Game"
              price={49.99}
              oldPrice={59.99}
              rating={5}
              soldOut={false}
            />
          </div>
          <div>
            {" "}
            <RecommendedGames
              title="Amazing Game"
              price={49.99}
              oldPrice={59.99}
              rating={5}
              soldOut={false}
            />
          </div>
        </div>

        <div className="flex items-center justify-end mt-6">
          <Button
            variant="gaming"
            className="h-fit w-max text-[24px] text-black px-[1em] py-1"
          >
            See More <MdOutlineNavigateNext />
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
