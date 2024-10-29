"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/context/CartContext";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import toast from "react-hot-toast";
import axiosInstance from "@/axios/axiosInstance";

type CartItem = {
  id: number;
  image: string;
  choiceType: string;
  title: string;
  quantity: number;
  price: number;
  productType: string;
};

/* const initialCartItems: CartItem[] = [
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
]; */

const SERVICE_FEE = 12;
const discountCodes: { [key: string]: number } = {
  "12345": 15,
  "11111": 30,
  "44444": 40,
};

type CartSidebarProps = {
  children: React.ReactNode;
};

const CartSidebar: React.FC<CartSidebarProps> = ({ children }) => {
  // const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  /* const [discountCode, setDiscountCode] = useState<string>("");
  const [discountApplied, setDiscountApplied] = useState<number>(0);
  const [discountMessage, setDiscountMessage] = useState<string>(""); */

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
  const [tempDiscount, setTempDiscount] = useState<string>("");

  /* const handleQuantityChange = (id: number, newQuantity: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  }; */

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  /* const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ); */

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
        setTempDiscount(response.data.code);
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
    <Sheet>
      <SheetTrigger asChild>
        <Button>{children}</Button>
      </SheetTrigger>
      <SheetContent className="w-[550px] backdrop-blur-md bg-black/30">
        <SheetHeader>
          <SheetTitle className="text-white text-[24px] font-bold">
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        <div className="p-4">
          {cart.map((item) => (
            <div key={item.id} className="mb-4 flex border border-white p-2">
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
                className="rounded"
              />
              <div className="ml-4 flex flex-col justify-between w-full">
                <div className="flex justify-between">
                  <div>
                    <p className="text-white text-[14px]">{item.choiceType}</p>
                    <p className="text-white font-semibold text-[15px]">
                      {item.title}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <CiHeart className="text-white text-lg cursor-pointer" />
                    <MdDeleteForever
                      className="text-white text-lg cursor-pointer"
                      onClick={() => handleRemoveItem(item.id)}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                      className="text-white text-lg"
                    >
                      -
                    </button>
                    <span className="text-white">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="text-white text-lg"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-[#75F94C] font-bold">
                    ${item.price * item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-[#333333] rounded-lg">
            <p className="text-white text-lg font-semibold">Summary</p>
            <div className="flex justify-between mt-2 text-white">
              <span>{totalItems} Items</span>
              <span>${totalPrice}</span>
            </div>
            {/* <div className="flex justify-between text-white">
              <span>Service Fee</span>
              <span>${SERVICE_FEE}</span>
            </div> */}
            <div className="flex justify-between mt-2 text-white">
              <span>Discount</span>
              <span>${discountApplied}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-4 text-[#75F94C]">
              <span>Total</span>
              <span>${Math.max((lastPrice - totalDiscount), 0)}</span>
            </div>
          </div>
          {!(totalDiscount > 0) ? (
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
          )}

          <p className="text-white mt-2">{discountMessage}</p>
        </div>

        <SheetClose asChild>
          <Button className="mt-4">Proceed to Checkout</Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
