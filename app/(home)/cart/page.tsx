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
import { useCartContext } from "@/context/CartContext";
import axiosInstance from "@/axios/axiosInstance";
import toast from "react-hot-toast";

const SERVICE_FEE = 12;

const Cart: React.FC = () => {
  const {
    cart,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    createOrder,
    totalPrice,
    totalItems,
    setDiscount,
    totalDiscount,
    discountData,
  } = useCartContext(); // Access cart data from context
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountApplied, setDiscountApplied] = useState<number>(0);
  const [discountMessage, setDiscountMessage] = useState<string>("");

  const [tempDiscount, setTempDiscount] =useState<string>("")

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  const lastPrice = totalPrice;

  const handleApplyDiscount = async () => {
    try {
      const response = await axiosInstance.post("/coupons/validateCoupon", {
        code: discountCode,
      });

      if (response.data && response.data.discount) {
        setDiscountMessage("Discount added successfully");
        // Clear the previous discount
        setDiscountApplied(0);
        setTempDiscount(response.data.code)
        setDiscount({
          code: response.data.code,
          discount: response.data.discount,
          id: response.data.id,
          type: response.data.type,
        });

        // Update applied discount
        setDiscountApplied(response.data.discount);      
        toast.success("Discount applied successfully");
      } else {
        setDiscountMessage("Your discount code is invalid");
        toast.error("Invalid discount code");
      }
    } catch (error) {
      setDiscountMessage("Your discount code is incorrect");
      toast.error("Your discount code is incorrect");
    }
  };

  const removeCoupon = () => {
    setDiscount({
      code: "",
      discount: 0,
      id: "",
      type: "",
    });
  };

  return (
    <div>
      {/* <ProductSearchBar /> */}
      {/* <Navbar /> */}
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
              {cart.map((item) => (
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
                                      onClick={() => decreaseQuantity(item.id)}
                                      className="text-white font-bold text-[18px] rounded"
                                      disabled={item.quantity <= 1}
                                    >
                                      -
                                    </button>
                                    <span className="text-xl text-white font-bold font-primaryFont">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() => increaseQuantity(item.id)}
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
                    {totalItems} Products
                  </p>
                  <p className="font-primaryFont text-[20px] font-bold text-white mb-2">
                    ${totalPrice}
                  </p>
                </div>

                {/* <div className="flex items-center justify-between border-b-2 border-[#676866]">
                  <p className="font-primaryFont text-[20px] font-normal text-white mb-2">
                    Service fee
                  </p>
                  <p className="font-primaryFont text-[20px] font-bold text-white mb-2">
                    ${SERVICE_FEE}
                  </p>
                </div> */}

                <div className="flex items-center justify-between border-b-2 border-[#676866] py-3">
                  <p className="self-start font-primaryFont text-[20px] font-normal text-white mb-2">
                    Discount code :
                  </p>

                  <div>
                    {!(totalDiscount > 0) ? (
                      <div>
                        <Input
                          type="text"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          className="bg-transparent border border-white text-white"
                        />
                        <Button
                          onClick={handleApplyDiscount}
                          className="bg-transparent text-white"
                        >
                          Apply
                        </Button>
                      </div>
                    ) : (
                      <div className="bg-red-400 rounded-3xl px-2 flex justify-between items-center h-6 w-24  mb-2">
                        <span className="text-white pt-1">
                          {discountData.code}
                        </span>
                        <span
                          className="text-white cursor-pointer"
                          onClick={removeCoupon}
                        >
                          x
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="font-primaryFont text-[16px] font-normal text-white mb-4">
                  {discountMessage}
                </p>

                {totalDiscount > 0 && (
                  <div className="flex items-center justify-between border-b-2 border-[#676866]">
                    <p className="font-primaryFont text-[20px] font-normal text-white mb-2">
                      Discount
                    </p>
                    <p className="font-primaryFont text-[20px] font-bold text-white mb-2">
                      - ${Math.max(totalDiscount, 0)}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <p className="font-primaryFont text-[24px] font-bold text-white mb-2">
                    Total
                  </p>
                  <p className="font-primaryFont text-[30px] font-bold text-[#75F94C] mb-2">
                    ${Math.max((lastPrice - totalDiscount), 0)}
                  </p>
                </div>

                <div className="w-full flex justify-center">
                  <Button
                    className="bg-[#75F94C] text-white text-[22px] font-bold font-primaryFont rounded-none px-8"
                    onClick={() => {
                      // Ensure discountCode is defined before creating the order
                      if (discountCode) {
                        createOrder(discountCode);
                      } else {
                        toast.error(
                          "Please enter a valid discount code before proceeding."
                        );
                      }
                    }}
                  >
                    Proceed to checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <RecommendedGames /> */}
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
