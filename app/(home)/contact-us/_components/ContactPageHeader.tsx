import React from "react";

import { FaMobileAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";

import bg from "@/public/images/products/bg.png";

const ContactPageHeader = () => {
  return (
    <div
      className="relative text-base font-bold leading-tight bg-cover bg-center pt-[2.875em] sm:text-[20px] md:text-[24px] lg:text-[30px] xl:text-[36px] 2xl:text-[40px]"
      style={{ backgroundImage: `url('${bg.src}')` }}
    >
      {/* Title */}
      <div className="text-[11px] font-medium w-fit mx-auto mb-[2.3em] text-center sm:text-[12px] md:text-[13px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
        <p className="text-[#0BDB45] translate-y-[55%]">Home/Contact</p>
        <p
          className="font-bold text-[2em] border-[#0BDB45] border-[0.1em] px-[1em] py-[0.5em] uppercase"
          style={{
            clipPath:
              "polygon(0% 0%, 15% 0%, 15% 5%, 85% 5%, 85% 0%, 100% 0%, 100% 100%, 65% 100%, 65% 95%, 35% 95%, 35% 100%, 0% 100%)",
          }}
        >
          Contact page
        </p>
      </div>

      <p className="relative font-medium text-[10px] text-center mt-[2.8em] mb-[1.4em] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px] z-10">
        Get in touch with us!
      </p>

      <div className="relative container mx-auto px-[36px] z-10">
        <div className="flex justify-between sm:w-[90%] sm:mx-auto lg:w-[80%] xl:w-[75%] 2xl:w-[70%]">
          <div className="flex flex-col items-center text-center">
            <FaMobileAlt className="size-[22px] text-[#0BDB45] sm:size-[27px] md:size-[32px] lg:size-[37px] xl:size-[40px] 2xl:size-[43px]" />
            <h6 className="font-medium text-[8px] mt-[0.5em] mb-[0.1em] sm:text-[11px] md:text-[14px] lg:text-[17px] xl:text-[19px] 2xl:text-[21px]">
              Phone
            </h6>
            <p className="w-[20ch] font-normal text-[7px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]">
              +94 765463214
            </p>
          </div>

          <div className="hidden w-px h-10 bg-white lg:block lg:h-[95px] xl:h-[105px] 2xl:h-[125px]"></div>

          <div className="flex flex-col items-center text-center">
            <FaLocationDot className="size-[22px] text-[#0BDB45] sm:size-[27px] md:size-[32px] lg:size-[37px] xl:size-[40px] 2xl:size-[43px]" />
            <h6 className="font-medium text-[8px] mt-[0.5em] mb-[0.1em] sm:text-[11px] md:text-[14px] lg:text-[17px] xl:text-[19px] 2xl:text-[21px]">
              Address
            </h6>
            <p className="w-[20ch] font-normal text-[7px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]">
              132, My Street, Kingston, New York 12401.
            </p>
          </div>

          <div className="hidden w-px h-10 bg-white lg:block lg:h-[95px] xl:h-[105px] 2xl:h-[125px]"></div>

          <div className="flex flex-col items-center text-center">
            <LuMail className="size-[22px] text-[#0BDB45] sm:size-[27px] md:size-[32px] lg:size-[37px] xl:size-[40px] 2xl:size-[43px]" />
            <h6 className="font-medium text-[8px] mt-[0.5em] mb-[0.1em] sm:text-[11px] md:text-[14px] lg:text-[17px] xl:text-[19px] 2xl:text-[21px]">
              E-mail
            </h6>
            <p className="w-[20ch] font-normal text-[7px] overflow-hidden text-ellipsis sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px]">
              vingame@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient  */}
      <div className="w-full h-1/2 absolute bottom-0 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export default ContactPageHeader;
