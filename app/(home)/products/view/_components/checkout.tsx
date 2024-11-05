import React from "react";
import Image from "next/image";

import lock from "@/public/images/product/lock.png";
import paypal from "@/public/images/product/paypal.png";
import visa from "@/public/images/product/visa.png";
import mastercard from "@/public/images/product/mastercard.png";
import skrill from "@/public/images/product/skrill.png";

const Checkout = () => {
  return (
    <div className="text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] pt-[4em]">
      <h3 className="font-semibold text-[1.2em] capitalize">
        Checkout guaranteed
      </h3>
      <div className="bg-white/5 p-[2em] mt-[2em]">
        <div className="flex justify-between items-center text-[1.2em] font-medium">
          <p>Payment method</p>
          <Image
            src={lock}
            alt="Payment secured"
            className="w-[25px] sm:w-[30px] md:w-[35px] lg:w-[40px] xl:w-[42px] 2xl:w-[45px]"
          />
        </div>
        <div className="flex gap-x-[1em] my-[2em]">
          <Image
            src={paypal}
            alt="Paypal"
            className="w-[20px] sm:w-[24px] md:w-[28px] lg:w-[30px] xl:w-[32px] 2xl:w-[36px]"
          />
          <Image
            src={visa}
            alt="Visa"
            className="w-[20px] sm:w-[24px] md:w-[28px] lg:w-[30px] xl:w-[32px] 2xl:w-[36px]"
          />
          <Image
            src={mastercard}
            alt="Mastercard"
            className="w-[20px] sm:w-[24px] md:w-[28px] lg:w-[30px] xl:w-[32px] 2xl:w-[36px]"
          />
          <Image
            src={skrill}
            alt="Skrill"
            className="w-[20px] sm:w-[24px] md:w-[28px] lg:w-[30px] xl:w-[32px] 2xl:w-[36px]"
          />
        </div>
        <p className="opacity-70">
          Your payment information is processed securely. We do not store credit
          card details nor have access to your credit card information.
        </p>
      </div>
    </div>
  );
};

export default Checkout;
