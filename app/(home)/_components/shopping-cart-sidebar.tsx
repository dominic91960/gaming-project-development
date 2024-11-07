"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import cartIcon from "../../../public/images/cart-sidebar/Favorite Cart.png";

import emptyCartIcon from "../../../public/images/cart-sidebar/emptycart 1.png";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { CiHeart } from "react-icons/ci";

import { useToast } from "@/context/ToastContext";
import { useCartContext } from "@/context/CartContext";
import cartIcon from "../../../public/images/cart-sidebar/Favorite Cart.png";
import "./shopping-cart-sidebar.css";

// type CartItem = {
//   id: number;
//   image: string;
//   choiceType: string;
//   title: string;
//   quantity: number;
//   price: number;
//   productType: string;
// };

type CartSidebarProps = {
  children: React.ReactNode;
};

const CartSidebar: React.FC<CartSidebarProps> = ({ children }) => {
  const addToast = useToast();
  const {
    cart,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    totalItems,
    setDiscount,
    totalDiscount,
    discountData,
    proceedCheckout,
  } = useCartContext(); // Access cart data from context

  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountApplied, setDiscountApplied] = useState<number>(0);
  // const [tempDiscount, setTempDiscount] = useState<string>("");
  const [, setTempDiscount] = useState<string>("");
  const router = useRouter();
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
    <>
      <Sheet>
        <div className="relative z-[999]"></div>
        <SheetTrigger asChild>{children}</SheetTrigger>
        {/* <SheetContent className="w-[550px] backdrop-blur-lg backdrop-opacity-70 bg-[#05130166]"> */}
        <SheetContent className="w-[550px]  shopping-cart-sidebar-main-div">
          <SheetHeader className="border-b-[1px] border-white pb-4 mb-12">
            <div className="flex items-center gap-2">
              <SheetTitle className="font-primaryFont text-white text-[17px] font-medium">
                Shopping Cart
              </SheetTitle>

              {totalItems > 0 && (
                <div className="bg-[#0BDB45] font-primaryFont text-black text-[12px] font-medium h-5 w-5 rounded-full flex justify-center items-center">
                  {totalItems}
                </div>
              )}

              <Image
                src={cartIcon}
                alt="Not found background"
                className="w-[20px] h-[20px]"
              />
            </div>
          </SheetHeader>

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

                <SheetClose asChild>
                  <Link href="/shop-page">
                    <div className="flex items-center justify-center mt-8">
                      <Button className=" bg-[#0BDB45] hover:bg-[#0BDB45] rounded-none w-[200px] h-[35px]">
                        <p className="font-primaryFont text-[15px] font-semibold text-black">
                          Browse Deals
                        </p>
                      </Button>
                    </div>
                  </Link>
                </SheetClose>
              </div>
            ) : (
              <div>
                <div className="relative">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="mb-4 flex border border-white p-3 shopping-cart-sidebar-card-item"
                    >
                      {/* <Image
                  src={item.image}
                  alt={item.title}
                  className="w-[100px] h-[100px]"
                /> */}

                      <div className="relative w-[130px] h-[100px]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex gap-2 items-center absolute top-3 right-3">
                        <CiHeart className="text-white text-lg cursor-pointer" />
                        <MdDeleteForever
                          className="text-white text-lg cursor-pointer"
                          onClick={() => handleRemoveItem(item.id)}
                        />
                      </div>

                      <div className="ml-4 flex flex-col justify-between w-full">
                        <div className="flex justify-between">
                          <div>
                            {/* <p className="text-white text-[14px]">{item.choiceType}</p> */}
                            <p className="text-white text-[14px] border-b-[1px] border-white w-max mb-1">
                              Ultimate Choice
                            </p>
                            <p className="text-white font-semibold text-[15px] mb-1">
                              {item.title}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <button
                                onClick={() => decreaseQuantity(item.id)}
                                disabled={item.quantity <= 1}
                                className="text-white text-lg"
                              >
                                <p className="font-primaryFont text-[#fff] font-black text-[12px]">
                                  <FaMinus />
                                </p>
                              </button>

                              <span className="font-primaryFont text-[#fff] font-medium text-[12px]">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() => increaseQuantity(item.id)}
                                className=""
                              >
                                <p className="font-primaryFont text-[#fff] font-black text-[12px] ">
                                  <FaPlus />
                                </p>
                              </button>
                            </div>

                            <p className="text-[#75F94C] text-[25px] font-semibold font-rajdhaniFont leading-none">
                              $
                              {Math.max(item.price * item.quantity, 0).toFixed(
                                2
                              )}
                            </p>
                          </div>

                          <div className="bg-[#797e7a] h-full w-[2px]"> </div>
                          <div className="flex items-center gap-2 self-end">
                            <div className="h-4 w-4 rounded-full flex items-center justify-center border border-white">
                              <p className="font-primaryFont text-[10px]  font-medium text-white">
                                ?
                              </p>
                            </div>

                            <p className="font-primaryFont text-[10px] font-medium text-white">
                              {/* {item.productType} */}
                              Digital Product
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="mt-6 p-4 rounded-lg">
                    {/* <p className="text-white text-lg font-semibold">Summary</p> */}
                    <div className="flex justify-between mt-2 text-white mb-3">
                      {/* <span>{totalItems} Items</span> */}
                      <p className="font-primaryFont text-[17px] font-normal text-white">
                        Subtotal
                      </p>
                      <p className="font-primaryFont text-[17px] font-normal text-white">
                        ${Math.max(totalPrice, 0).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between ">
                      <div className="self-start">
                        <p className="font-primaryFont text-[17px] font-normal text-white">
                          Discount Code
                        </p>
                      </div>

                      {!(totalDiscount > 0) ? (
                        <div className="">
                          <Input
                            type="text"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            className="border-white text-white rounded-none h-[25px] mb-2"
                          />

                          <div className="flex items-center justify-end ">
                            <Button
                              onClick={handleApplyDiscount}
                              className="bg-[#0BDB45] font-primaryFont text-[12px] hover:bg-[#0BDB45]  rounded-none text-black font-semibold h-6"
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {" "}
                          <div className=" bg-[#fff] rounded-none px-2 flex justify-between items-center h-[30px] w-24  mb-2">
                            <p className="font-primaryFont text-black font-semibold">
                              {discountData.code}
                            </p>
                            <span
                              className="text-black cursor-pointer"
                              onClick={removeCoupon}
                            >
                              x
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* {totalDiscount > 0 && (
                  <p
                    className={`font-primaryFont text-[16px] font-medium mt-0 mb-2 ${messageColor}`}
                  >
                    {discountMessage}
                  </p>
                )} */}

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
                      <div className="">
                        {errorMessage && (
                          <p className="font-primaryFont text-[16px] font-medium mt-0 mb-2 text-[#ff4d4d]">
                            {errorMessage}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* <div className="flex justify-between text-white">
                <span>Service Fee</span>
                <span>${SERVICE_FEE}</span>
              </div> */}

                    {totalDiscount > 0 && (
                      <div className="flex justify-between mt-2 text-white">
                        <p className="font-primaryFont text-[17px] font-normal text-white">
                          Discount Price
                        </p>
                        <p className="font-primaryFont text-[17px] font-normal text-white">
                          - ${discountApplied}
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between text-lg font-bold mt-4 text-[#75F94C] border-t-[2px] border-dotted border-white pt-2">
                      <p className="font-primaryFont text-[17px] font-normal text-white">
                        Total
                      </p>
                      <p className="font-primaryFont text-[17px] font-normal text-white">
                        ${Math.max(lastPrice - totalDiscount, 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* {!(totalDiscount > 0) ? (
              <div className="mt-4 flex">
                <Input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="mr-2 border-white text-white"
                />
                <Button onClick={handleApplyDiscount}>Apply</Button>
              </div>
            ) : (
              <div className=" mt-2 bg-red-400 rounded-3xl px-2 flex justify-between items-center h-6 w-24  mb-2">
                <span className="text-white pt-1">{discountData.code}</span>
                <span
                  className="text-white cursor-pointer"
                  onClick={removeCoupon}
                >
                  x
                </span>
              </div>
            )} */}

                  {/* <p className="text-white mt-2">{discountMessage}</p> */}
                </div>
                <div>
                  <SheetClose asChild>
                    <div className="flex flex-col items-center gap-4">
                      <Button
                        variant="gaming"
                        className="mt-4 w-[200px]"
                        onClick={() => {
                          proceedCheckout();
                          // Ensure discountCode is defined before creating the order
                          /* if (discountCode) {
                  proceedCheckout(discountCode);
                } else {
                  toast.error(
                    "Please enter a valid discount code before proceeding."
                  );
                } */
                        }}
                      >
                        <p className="font-primaryFont text-[15px] font-semibold text-black">
                          Proceed to Checkout
                        </p>
                      </Button>
                      <Button
                        variant={"outline"}
                        className="rounded-none bg-white w-[200px]"
                        onClick={() => {
                          router.push("/cart");
                        }}
                      >
                        <p className="font-primaryFont text-[15px] font-semibold text-black">
                          View Cart
                        </p>
                      </Button>
                    </div>
                  </SheetClose>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartSidebar;
