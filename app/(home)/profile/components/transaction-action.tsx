import React from "react";
import Image, { StaticImageData } from "next/image";

import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Transaction } from "./transaction-columns";
import { FaEye } from "react-icons/fa";

interface TransactionActionProps {
  row: Row<Transaction>;
  products: {
    productId: string;
    poster: StaticImageData;
    name: string;
    price: number;
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
          className="h-fit text-[1em] px-[0.6em] py-[0.6em] rounded-sm"
        >
          <FaEye />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-fit bg-gradient-to-tr from-black to-[#00945D] text-white border border-t-0 rounded-none p-[1.5em]"
        style={{
          borderImage: "linear-gradient(to bottom, #0D6D49, #19D38E) 1",
        }}
      >
        {/* Order no */}
        <h4>Order No {row.original.orderId}</h4>

        {/* Ordered products */}
        {products.map(({ productId, poster, name, price }, index) => (
          <div key={index} className="flex justify-between">
            <Image src={poster} alt={name} className="size-[20px]" />
            <p>{name}</p>
            <p>{productId}</p>
            <p>${price}</p>
          </div>
        ))}

        {/* Order subtotal */}
        <p>Items Subtotal: ${subTotal}</p>

        {/* Coupons */}
        <p>Coupon: ${coupon}</p>

        {/* Order total */}
        <p>Order Total: ${orderTotal}</p>
      </PopoverContent>
    </Popover>
  );
};

export default TransactionAction;
