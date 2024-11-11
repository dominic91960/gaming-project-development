"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "@/axios/axiosInstance";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useToast } from "@/context/ToastContext";
import { useCartContext } from "@/context/CartContext";
import coverPhoto from "@/public/images/shop/cover-photo-dark.jpg";
import Footer from "@/components/footer/footer";
import emptyCartIcon from "../../../public/images/cart/emptycart 1.png";
import RecommendedGames from "./components/Recommended-games";
import WishlistButton from "@/components/product-card/WishlistButton";

const Cart: React.FC = () => {
  const addToast = useToast();
  const {
    cart,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    // createOrder,
    totalPrice,
    totalItems,
    setDiscount,
    totalDiscount,
    discountData,
    proceedCheckout,
  } = useCartContext(); // Access cart data from context
  const [discountCode, setDiscountCode] = useState<string>("");
  // const [discountApplied, setDiscountApplied] = useState<number>(0);
  // const [tempDiscount, setTempDiscount] = useState<string>("");
  const [, setDiscountApplied] = useState<number>(0);
  const [, setTempDiscount] = useState<string>("");

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  const lastPrice = totalPrice;

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleApplyDiscount = async () => {
    try {
      const response = await axiosInstance.post("/coupons/validateCoupon", {
        code: discountCode,
      });

      // if (response.data && response.data.discount) {
      //   setDiscountMessage("Discount added successfully");
      //   // Clear the previous discount
      //   setDiscountApplied(0);
      //   setTempDiscount(response.data.code);
      //   setDiscount({
      //     code: response.data.code,
      //     discount: response.data.discount,
      //     id: response.data.id,
      //     type: response.data.type,
      //   });
      if (response.data && response.data.discount) {
        setSuccessMessage("Discount added successfully");
        addToast("Discount added successfully", "success");
        setErrorMessage("");

        setDiscountApplied(0);
        setTempDiscount(response.data.code);
        setDiscount({
          code: response.data.code,
          discount: response.data.discount,
          id: response.data.id,
          type: response.data.type,
        });

        // Update applied discount
        setDiscountApplied(response.data.discount);
      } else {
        setSuccessMessage("");
        setErrorMessage("Your discount code is invalid");
        addToast("Your discount code is invalid", "error");
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Your discount code is incorrect");
      addToast("Your discount code is incorrect", "error");
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

          <div className="">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container mx-auto flex items-center w-full space-x-4 py-2 px-8">
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

        <div className="h-full container mx-auto 2xl:px-6 xl:px-8 lg:px-4 mb-16">
          {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

          <div>
            {totalItems === 0 ? (
              <div>
                <div className="flex items-center justify-center">
                  <Image
                    src={emptyCartIcon}
                    alt="Empty car icon"
                    className="w-[202px] h-[156px] mb-3"
                  />
                </div>

                <p className="font-primaryFont text-[22px] font-medium text-white text-center mb-4">
                  Your cart is empty.
                </p>

                <p className="font-primaryFont text-[14px] font-normal text-white text-center">
                  Or
                  <Link href="/sign-in">
                    <span className="text-[#45F882] mx-1">sign in</span>
                  </Link>
                  to check if there’s something in it already!
                </p>

                <Link href="/shop-page">
                  <div className="flex items-center justify-center mt-8">
                    <Button className=" bg-[#0BDB45] hover:bg-[#0BDB45] rounded-none w-[200px] h-[35px]">
                      <p className="font-primaryFont text-[15px] font-semibold text-black">
                        Browse Deals
                      </p>
                    </Button>
                  </div>
                </Link>
              </div>
            ) : (
              <div>
                {" "}
                <div className="grid grid-cols-12 gap-16 content-start">
                  <div className="col-span-8">
                    {cart.map((item) => (
                      <div key={item.id} className="mb-12">
                        <div>
                          <div className="grid grid-cols-12 gap-6 px-3 py-3 border border-[#666a65] bg-[#222222] relative">
                            <div className="col-span-3">
                              <Image
                                src={item.image}
                                alt={item.title}
                                className="2xl:w-[220px] 2xl:h-[220px] xl:w-[175px] xl:h-[175px] lg:w-[135px] lg:h-[135px] md:w-[35px] md:h-[135px] rounded-none"
                                width={220}
                                height={220}
                              />
                            </div>

                            <div className="flex items-center justify-end gap-1 absolute top-3 right-3">
                              <WishlistButton gameId={item.id.toString()} showText={false} />
                              {/* <CiHeart className="text-[30px] text-white cursor-pointer" /> */}
                              <MdDeleteForever
                                className="text-[30px] text-white cursor-pointer"
                                onClick={() => handleRemoveItem(item.id)}
                              />
                            </div>

                            <div className="col-span-9 flex items-center w-full h-full">
                              <div className="w-full">
                                <div className="2xl:mb-6 xl:mb-4 lg:mb-2">
                                  <div className="flex items-center justify-between">
                                    <p className="font-primaryFont text-[16px] font-normal text-white border-b-2 border-[#676866] w-max mb-2">
                                      Ultimate Choice
                                    </p>
                                  </div>

                                  <p className="font-primaryFont 2xl:text-[20px] xl:text-[20px] lg:text-[16px] font-bold text-white">
                                    {item.title}
                                  </p>
                                </div>

                                <div className="grid grid-cols-2">
                                  <div>
                                    <div className="border-r-2 border-[#666a65]">
                                      <div className="flex items-center gap-2 2xl:mb-6 xl:mb-4 lg:mb-2">
                                        <div className="flex items-center space-x-8">
                                          <button
                                            onClick={() =>
                                              decreaseQuantity(item.id)
                                            }
                                            className=""
                                            disabled={item.quantity <= 1}
                                          >
                                            <p className="font-primaryFont text-white font-bold 2xl:text-[18px] xl:text-[18px] lg:text-[14px]">
                                              <FaMinus />
                                            </p>
                                          </button>

                                          <p className="2xl:text-[18px] xl:text-[18px] lg:text-[14px] text-white font-bold font-primaryFont">
                                            {item.quantity}
                                          </p>

                                          <button
                                            onClick={() =>
                                              increaseQuantity(item.id)
                                            }
                                            className=""
                                          >
                                            <p className="font-primaryFont text-white font-black 2xl:text-[18px] xl:text-[18px] lg:text-[14px]">
                                              <FaPlus />
                                            </p>
                                          </button>
                                        </div>
                                      </div>

                                      <p className=" text-[#75F94C] 2xl:text-[45px] xl:text-[35px] lg:text-[25px] font-semibold uppercase font-rajdhaniFont leading-none w-[180px]">
                                        $
                                        {Math.max(
                                          item.price * item.quantity,
                                          0
                                        ).toFixed(2)}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex justify-end">
                                    <div className="flex items-center gap-2 self-end">
                                      <div className="2xl:h-6 2xl:w-6 xl:h-6 xl:w-5 lg:h-5 lg:w-5  rounded-full flex items-center justify-center border border-white">
                                        <p className="font-primaryFont 2xl:text-[13px] xl:text-[13px] lg:text-[11px] font-medium text-white">
                                          ?
                                        </p>
                                      </div>
                                      <p className="font-primaryFont 2xl:text-[16px] xl:text-[16px] lg:text-[14px] font-medium text-white">
                                        Digital Product
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
                    <div className="bg-[#222222] border border-[#676866] p-6">
                      <p className="font-primaryFont 2xl:text-[36px] xl:text-[32px] lg:text-[28px]  font-semibold text-white mb-2">
                        Summary
                      </p>

                      <div className="flex items-center justify-between  border-b-[1px] border-[#676866] mb-4 pb-4">
                        <p className="font-primaryFont 2xl:text-[20px] xl:text-[18px] lg:text-[18px] font-normal text-white mb-2">
                          {totalItems} Products
                        </p>
                        <p className="font-primaryFont 2xl:text-[20px] xl:text-[16px] lg:text-[16px] font-bold text-white mb-2">
                          ${Math.max(totalPrice, 0).toFixed(2)}
                        </p>
                      </div>

                      <div className="border-b-[1px] border-[#676866]">
                        <div className="flex items-center justify-between pb-4">
                          <p className="self-start font-primaryFont 2xl:text-[20px] xl:text-[18px] lg:text-[14px]  font-normal text-white mb-2">
                            Discount code :
                          </p>
                          <div>
                            {!(totalDiscount > 0) ? (
                              <div>
                                <Input
                                  type="text"
                                  value={discountCode}
                                  onChange={(e) =>
                                    setDiscountCode(e.target.value)
                                  }
                                  placeholder="Discount Code"
                                  className="bg-transparent border border-[#676866] text-white rounded-none 2xl:h-[30px] xl:h-[30px] lg:h-[25px] 2xl:w-full xl:w-[130px] lg:w-[110px] mb-3"
                                />

                                <div className="flex items-center justify-end">
                                  <Button
                                    onClick={handleApplyDiscount}
                                    className="bg-[#0BDB45] hover:bg-[#0BDB45] rounded-none h-[25px] text-black font-primaryFont font-medium"
                                  >
                                    Add
                                  </Button>{" "}
                                </div>
                              </div>
                            ) : (
                              <div className="bg-white rounded-none px-2 flex justify-between items-center 2xl:h-[30px] 2xl:w-[150px] xl:h-[30px] xl:w-[130px] lg:h-[25px] lg:w-[100px] ">
                                <span className="text-black pt-1 font-primaryFont font-semibold">
                                  {discountData.code}
                                </span>
                                <span
                                  className="text-black cursor-pointer"
                                  onClick={removeCoupon}
                                >
                                  x
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {totalDiscount > 0 && (
                          <div>
                            {successMessage && (
                              <p className="font-primaryFont text-[16px] font-medium mt-0 mb-2 text-[#3edf6e]">
                                {successMessage}
                              </p>
                            )}
                          </div>
                        )}

                        <div>
                          <div className="border-b-[1px] border-[#676866]">
                            {errorMessage && (
                              <p className="font-primaryFont text-[16px] font-medium mt-0 mb-2 text-[#ff4d4d]">
                                {errorMessage}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {totalDiscount > 0 && (
                        <div className="flex items-center justify-between border-b-[1px] border-[#676866] py-2">
                          <p className="font-primaryFont 2xl:text-[20px] xl:text-[18px] lg:text-[18px] font-normal text-white">
                            Discount
                          </p>
                          <p className="font-primaryFont 2xl:text-[20px] xl:text-[18px] lg:text-[18px] font-bold text-white">
                            - ${Math.max(totalDiscount, 0).toFixed(2)}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-5 mt-2">
                        <p className="font-primaryFont 2xl:text-[24px] xl:text-[22px] lg:text-[18px] font-normal text-white">
                          Total
                        </p>
                        <p className="font-primaryFont 2xl:text-[30px] xl:text-[28px] lg:text-[20px] font-bold text-white">
                          ${Math.max(lastPrice - totalDiscount, 0).toFixed(2)}
                        </p>
                      </div>

                      <div className="w-full flex justify-center">
                        <Button
                          className=" text-black 2xl:text-[24px] xl:text-[22px] lg:text-[18px] font-semibold font-primaryFont rounded-none px-8 w-full"
                          variant="gaming"
                          onClick={() => {
                            proceedCheckout();
                          }}
                        >
                          Proceed To Checkout
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>{" "}
              </div>
            )}
          </div>

          {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Cart;
