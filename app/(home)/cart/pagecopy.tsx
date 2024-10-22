"use client";
import { useState } from "react";
import Image from "next/image";
import cartImage from "../../../public/images/cart/cart-image-01.png";
import { CiHeart } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="bg-[#000000] h-full">
      <div className="h-full container mx-auto">
        {/* <div className="grid grid-cols-12 gap-2 p-6 border border-white bg-[#222222]">
      <div className="col-span-3 p-2 flex items-center justify-center">
        <Image src={cartImage} alt="cart-image" width={200} height={198} />
      </div>

      <div className="col-span-9">
        <div className="bg-[#222222]">
          <div className="flex items-center justify-end gap-1">
            <CiHeart className="text-[30px] text-white" />
            <MdDeleteForever className="text-[30px] text-white" />
          </div>
          <div className="mb-4">
            <p className="font-primaryFont text-[16px] font-normal text-white border-b-2 border-[#676866] w-max mb-2">
              Ultimate Choice
            </p>
            <p className="font-primaryFont text-[20px] font-bold text-white">
              Six-Sided Oracles (PC) Steam Key GLOBAL
            </p>
          </div>

          <div className="grid grid-cols-2">
            <div>
              <div className="border-r-2 border-white">
                <div className="flex items-center space-x-4 mb-6">
                  <button
                    onClick={handleDecrement}
                    className="text-white font-bold text-[18px] rounded"
                  >
                    -
                  </button>
                  <span className="text-xl text-white font-bold font-primaryFont">
                    {count}
                  </span>
                  <button
                    onClick={handleIncrement}
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
    </div> */}

        {/* summary section starts here */}

        {/* <div className="bg-[#222222] border border-white p-6">
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

      <div className="flex items-center justify-between border-b-2 border-[#676866]">
        <p className="font-primaryFont text-[20px] font-normal text-white mb-2">
          Discount code :
        </p>
        <Input type="text" placeholder="Discount code" />
      </div>

      <div className="flex items-center justify-between border-b-2 border-[#676866]">
        <p className="font-primaryFont text-[20px] font-normal text-white mb-2">
          Discount price
        </p>
        <p className="font-primaryFont text-[20px] font-normal text-white mb-2">
          - $ 8.34
        </p>
      </div>

      <div className="flex items-center justify-between">
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
    </div> */}

        <div className="grid grid-cols-12 gap-4">
          <div className="bg-[#29acee] col-span-8">
            <div className="grid grid-cols-12 gap-2 px-6 border border-white bg-[#222222]">
              <div className="col-span-3 p-2 flex items-center justify-center">
                <Image
                  src={cartImage}
                  alt="cart-image"
                  width={200}
                  height={198}
                />
              </div>

              <div className="col-span-9 bg-[#eb2cb2] flex items-center w-max h-full">
                <div className="">
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <p className="font-primaryFont text-[16px] font-normal text-white border-b-2 border-[#676866] w-max mb-2">
                        Ultimate Choice
                      </p>

                      <div className="flex items-center justify-end gap-1">
                        <CiHeart className="text-[30px] text-white" />
                        <MdDeleteForever className="text-[30px] text-white" />
                      </div>
                    </div>

                    <p className="font-primaryFont text-[20px] font-bold text-white">
                      Six-Sided Oracles (PC) Steam Key GLOBAL
                    </p>
                  </div>

                  <div className="grid grid-cols-2 bg-slate-500">
                    <div>
                      <div className="border-r-2 border-white">
                        <div className="flex items-center space-x-4 mb-6">
                          <button
                            onClick={handleDecrement}
                            className="text-white font-bold text-[18px] rounded"
                          >
                            -
                          </button>
                          <span className="text-xl text-white font-bold font-primaryFont">
                            {count}
                          </span>
                          <button
                            onClick={handleIncrement}
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

            {/* ---------------------------------------------------------------------------------------------------------------------------------- */}
          </div>

          {/* <div className="bg-[#29ee33] col-span-4">
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
                <p className="font-primaryFont text-[20px] font-normal text-white mb-2">
                  Discount code :
                </p>

                <div>
                  <Input
                    type="text"
                    placeholder="Discount code"
                    className="w-max mb-3"
                  />
                  <div className="flex items-center justify-end">
                    <div className="bg-[#0BDB45] w-max px-4 py-1 text-[11px] text-black font-bold">
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
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
