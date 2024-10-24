import React from "react";

import { columns } from "./order-columns";
import { DataTable } from "./order-data-table";
import { IoClose } from "react-icons/io5";

interface TransactionActionProps {
  orderId: string;
  products: {
    productId: string;
    poster: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  subTotal: number;
  coupon: number;
  orderTotal: number;
  onClose: () => void;
}

const TransactionAction: React.FC<TransactionActionProps> = ({
  orderId,
  products,
  subTotal,
  coupon,
  orderTotal,
  onClose,
}) => {
  return (
    <aside
      className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center px-[36px] backdrop-blur-md z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-fit h-fit bg-gradient-to-tr from-black to-[#007147] text-[8px] text-white border rounded-none p-[1.5em] z-10 sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px] overflow-auto"
        style={{
          borderImage: "linear-gradient(to bottom, #19D38E, #0D6D49) 1",
        }}
      >
        <div className="flex justify-between text-[1.125em] pb-[1em] border-b border-b-[#0D6D49]">
          {/* Order no */}
          <h4 className="font-bold">Order No {orderId}</h4>

          {/* Close button */}
          <IoClose
            className="text-[1.3em] text-[#00FFA1] cursor-pointer hover:scale-110"
            onClick={onClose}
          />
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
      </div>
    </aside>
  );
};

export default TransactionAction;
