// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { CiHeart } from "react-icons/ci";
// import { MdDeleteForever } from "react-icons/md";
// import { useState } from "react";
// import Image from "next/image";
// import cartImage from "../../../public/images/shopping-cart/cart-image-01.png";
// export function ShoppingCartSidebar() {
//   const [count1, setCount1] = useState<number>(0);
//   const [count2, setCount2] = useState<number>(0);

//   const handleIncrement1 = () => {
//     setCount1(count1 + 1);
//   };

//   const handleDecrement1 = () => {
//     if (count1 > 0) {
//       setCount1(count1 - 1);
//     }
//   };

//   const handleIncrement2 = () => {
//     setCount2(count2 + 1);
//   };

//   const handleDecrement2 = () => {
//     if (count1 > 0) {
//       setCount2(count2 - 1);
//     }
//   };
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="outline">Open</Button>
//       </SheetTrigger>
//       <SheetContent className="w-[600px]">
//         <SheetHeader>
//           <SheetTitle className="font-primaryFont text-[17px] font-medium text-white">
//             Shopping Cart
//           </SheetTitle>
//         </SheetHeader>
//         <div className="grid grid-cols-12 gap-4 w-full bg-[#988] p-3">
//           <div className="bg-[#ebeb27] w-full col-span-3">
//             <Image src={cartImage} alt="cart-image" width={200} height={198} />
//           </div>

//           <div className="col-span-9 flex items-center w-full h-full">
//             <div className="w-full">
//               <div className="mb-2">
//                 <div className="flex items-center justify-end gap-2">
//                   <CiHeart className="text-[20px] text-white cursor-pointer" />
//                   <MdDeleteForever className="text-[20px] text-white cursor-pointer" />
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <p className="font-primaryFont text-[10px] font-normal text-white border-b-2 border-[#676866] w-max mb-2">
//                     Ultimate Choice
//                   </p>
//                 </div>

//                 <p className="font-primaryFont text-[12px] font-bold text-white">
//                   Six-Sided Oracles (PC) Steam Key GLOBAL
//                 </p>
//               </div>

//               <div className="grid grid-cols-2">
//                 <div>
//                   <div className="border-r-2 border-[#676866]">
//                     <div className="flex items-center space-x-4 mb-3">
//                       <button
//                         onClick={handleDecrement1}
//                         className="text-white font-bold text-[12px]"
//                       >
//                         -
//                       </button>
//                       <p className="text-[12px] text-white font-bold font-primaryFont">
//                         {count1}
//                       </p>
//                       <button
//                         onClick={handleIncrement1}
//                         className="text-white font-bold text-[12px]"
//                       >
//                         +
//                       </button>
//                     </div>
//                     <p className="font-primaryFont text-[20px] font-bold text-[#75F94C] leading-none">
//                       $ 299
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex justify-end">
//                   <div className="flex items-center gap-2 self-end">
//                     <div className="h-4 w-4 rounded-full flex items-center justify-center border border-white">
//                       <p className="font-primaryFont text-[8px] font-medium text-white">
//                         ?
//                       </p>
//                     </div>
//                     <p className="font-primaryFont text-[10px] font-medium text-white">
//                       Digital Product
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <SheetFooter>
//           <SheetClose asChild>
//             {/* <Button type="submit">Save changes</Button> */}
//           </SheetClose>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   );
// }

// export default ShoppingCartSidebar;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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

const CartSidebar: React.FC = () => {
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Cart</Button>
      </SheetTrigger>
      <SheetContent className="w-[550px] backdrop-blur-md bg-black/30">
        <SheetHeader>
          <SheetTitle className="text-white text-[24px] font-bold">
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        <div className="p-4">
          {cartItems.map((item) => (
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
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="text-white text-lg"
                    >
                      -
                    </button>
                    <span className="text-white">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
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
            <div className="flex justify-between text-white">
              <span>Service Fee</span>
              <span>${SERVICE_FEE}</span>
            </div>
            <div className="flex justify-between mt-2 text-white">
              <span>Discount</span>
              <span>${discountApplied}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-4 text-[#75F94C]">
              <span>Total</span>
              <span>${lastPrice}</span>
            </div>
          </div>

          <div className="mt-4 flex">
            <Input
              placeholder="Discount Code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="mr-2"
            />
            <Button onClick={handleApplyDiscount}>Apply</Button>
          </div>
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
