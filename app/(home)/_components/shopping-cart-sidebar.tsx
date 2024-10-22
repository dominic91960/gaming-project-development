"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CiHeart } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import Image from "next/image";
import cartImage from "../../../public/images/shopping-cart/cart-image-01.png";
export function ShoppingCartSidebar() {
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent className="w-[600px]">
        <SheetHeader>
          <SheetTitle className="font-primaryFont text-[17px] font-medium text-white">
            Shopping Cart
          </SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-12 gap-4 w-full bg-[#988] p-3">
          <div className="bg-[#ebeb27] w-full col-span-3">
            <Image src={cartImage} alt="cart-image" width={200} height={198} />
          </div>

          <div className="col-span-9 flex items-center w-full h-full">
            <div className="w-full">
              <div className="mb-2">
                <div className="flex items-center justify-end gap-2">
                  <CiHeart className="text-[20px] text-white cursor-pointer" />
                  <MdDeleteForever className="text-[20px] text-white cursor-pointer" />
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-primaryFont text-[10px] font-normal text-white border-b-2 border-[#676866] w-max mb-2">
                    Ultimate Choice
                  </p>
                </div>

                <p className="font-primaryFont text-[12px] font-bold text-white">
                  Six-Sided Oracles (PC) Steam Key GLOBAL
                </p>
              </div>

              <div className="grid grid-cols-2">
                <div>
                  <div className="border-r-2 border-[#676866]">
                    <div className="flex items-center space-x-4 mb-3">
                      <button
                        onClick={handleDecrement1}
                        className="text-white font-bold text-[12px]"
                      >
                        -
                      </button>
                      <p className="text-[12px] text-white font-bold font-primaryFont">
                        {count1}
                      </p>
                      <button
                        onClick={handleIncrement1}
                        className="text-white font-bold text-[12px]"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-primaryFont text-[20px] font-bold text-[#75F94C] leading-none">
                      $ 299
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="flex items-center gap-2 self-end">
                    <div className="h-4 w-4 rounded-full flex items-center justify-center border border-white">
                      <p className="font-primaryFont text-[8px] font-medium text-white">
                        ?
                      </p>
                    </div>
                    <p className="font-primaryFont text-[10px] font-medium text-white">
                      Digital Product
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            {/* <Button type="submit">Save changes</Button> */}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ShoppingCartSidebar;
