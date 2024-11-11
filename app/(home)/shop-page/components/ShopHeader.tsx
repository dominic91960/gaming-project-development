import React from "react";

import { FaMobileAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";

import bg from "@/public/images/products/bg.png";

const ShopHeader = () => {
  return (
    <div
      className="relative text-base font-bold leading-tight bg-cover bg-center pt-[2.875em] sm:text-[20px] md:text-[24px] lg:text-[30px] xl:text-[36px] 2xl:text-[40px]"
      style={{ backgroundImage: `url('${bg.src}')` }}
    >
      {/* Title */}
      <div className="text-[11px] font-medium w-fit mx-auto mb-[2.3em] text-center sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
        <p className="text-[#0BDB45] translate-y-[55%]">Home / Contact</p>
        <p
          className="font-bold text-[2em] border-[#0BDB45] border-[0.1em] px-[1em] py-[0.5em] uppercase text-white"
          style={{
            clipPath:
              "polygon(0% 0%, 15% 0%, 15% 5%, 85% 5%, 85% 0%, 100% 0%, 100% 100%, 65% 100%, 65% 95%, 35% 95%, 35% 100%, 0% 100%)",
          }}
        >
          Shop Page
        </p>
      </div>

      <p className="relative font-medium text-[10px] text-center mt-[2.8em]  sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] z-10 text-black">
        .
      </p>

      {/* Bottom gradient  */}
      <div className="w-full h-1/2 absolute bottom-0 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default ShopHeader;
