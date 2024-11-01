import React from "react";

import { IoMdCart } from "react-icons/io";

import CartSidebar from "@/app/(home)/_components/shopping-cart-sidebar";

interface CartIconProps {
  length: number;
  handleClick: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ length, handleClick }) => {
  return (
    <div
      className="relative cursor-pointer hover:scale-[108%]"
      onClick={() => setTimeout(() => handleClick(), 300)}
    >
      {length > 0 && (
        <span className="absolute bottom-[16px] right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
          {length}
        </span>
      )}
      <CartSidebar>
        <IoMdCart />
      </CartSidebar>
    </div>
  );
};

export default CartIcon;
