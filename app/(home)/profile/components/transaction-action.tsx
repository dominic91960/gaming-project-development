import React from "react";
import { StaticImageData } from "next/image";

import { columns } from "./order-columns";
import { DataTable } from "./order-data-table";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Transaction } from "./transaction-columns";
import { FaEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface TransactionActionProps {
  row: Row<Transaction>;
  products: {
    productId: string;
    poster: StaticImageData;
    name: string;
    price: number;
    quantity: number;
  }[];
  subTotal: number;
  coupon: number;
  orderTotal: number;
}

const TransactionAction: React.FC<TransactionActionProps> = ({
  row,
  products,
  subTotal,
  coupon,
  orderTotal,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="h-fit text-[8px] px-[0.6em] py-[0.6em] rounded-sm sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
        >
          <FaEye />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-fit bg-gradient-to-tr from-black to-[#007147] text-[8px] text-white border rounded-none p-[1.5em] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]"
        style={{
          borderImage: "linear-gradient(to bottom, #19D38E, #0D6D49) 1",
        }}
      >
        <div className="flex justify-between pb-[1em] border-b border-b-[#0D6D49]">
          {/* Order no */}
          <h4 className="font-bold">Order No {row.original.orderId}</h4>

          {/* Close button */}
          <IoClose className="text-[1.3em] text-[#00FFA1] cursor-pointer hover:scale-110" />
        </div>

        {/* Ordered products */}
        <DataTable columns={columns} data={products} />
        <hr className="border-t-[#0D6D49] my-[1em]" />

        {/* Order subtotal */}
        <p className="text-right">Items Subtotal: ${subTotal}</p>

        {/* Coupons */}
        <p className="text-right">
          <span className="text-[#0BDB45]">Coupon:</span> ${coupon}
        </p>
        <hr className="w-[25ch] opacity-50 ms-auto mt-[0.5em] mb-[0.7em]" />

        {/* Order total */}
        <p className="text-right">Order Total: ${orderTotal}</p>
        <hr className="border-t-[#0D6D49] mt-[1em]" />
      </PopoverContent>
    </Popover>
  );
};

export default TransactionAction;
