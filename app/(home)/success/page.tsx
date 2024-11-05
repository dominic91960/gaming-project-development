import Image from "next/image";
import Link from "next/link";

import { IoIosArrowForward } from "react-icons/io";
import { CiCircleCheck } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

import Footer from "@/components/footer/footer";
import bgImage from "@/public/images/404/bg.png";

function SuccessPage() {
  return (
    <section className="font-primaryFont text-white">
      <div className="relative w-full h-[162px] md:h-80 lg:h-[420px] xl:h-[420px] 2xl:h-[420px] px-8">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100 z-10"></div>

        <Image
          src={bgImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="w-full h-full z-0"
        />

        {/* Title */}
        <div className="mx-auto absolute items-center justify-center inset-0 pt-[75px] md:pt-52 lg:pt-72 z-20">
          <div className="flex justify-between items-center px-px">
            {/* For large and extra large screens */}
            <div className="hidden mx-auto md:flex container items-center justify-around text-white px-16 md:px-8 lg:px-16 py-6 gap-x-5 xl:gap-x-10">
              {/* Cart */}
              <div className="flex items-center flex-1 gap-x-2">
                <div className="flex items-center">
                  <FaCircle className="text-white lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-5 2xl:h-5" />
                  <p className="ml-2 lg:text-base xl:text-xl 2xl:text-xl">
                    Cart
                  </p>
                </div>
                <div className="border-t-[3px] border-white w-full ml-2"></div>
              </div>

              {/* Payment */}
              <div className="flex items-center flex-1 gap-x-2">
                <div className="flex items-center">
                  <FaCircle className="text-white lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-5 2xl:h-5" />
                  <p className="ml-2 text-white lg:text-base xl:text-xl 2xl:text-xl">
                    Payment
                  </p>
                </div>
                <div className="border-t-[3px] border-white w-full ml-2"></div>
              </div>

              {/* Get Your Product */}
              <div className="flex items-center flex-1 gap-x-2">
                <div className="flex items-center">
                  <FaCircle className="text-[#0BDB45] lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-5 2xl:h-5" />
                  <p className="ml-2 text-[#0BDB45] lg:text-base xl:text-xl 2xl:text-xl whitespace-nowrap">
                    Get Product
                  </p>
                </div>
                <div className="border-t-[3px] border-[#0BDB45] w-full ml-2"></div>
              </div>
            </div>

            {/* For mobile and medium screens */}
            <div className="md:hidden flex w-60 sm:w-96 pt-8 mx-auto items-center justify-around text-white">
              <div className="flex items-center">
                <div className="flex flex-col items-center gap-y-2">
                  <FaCircle className="text-white w-3 h-3" />
                  <p className="ml-1 text-xs md:text-sm">Cart</p>
                </div>
              </div>

              <IoIosArrowForward className="ml-1 w-5 h-5" />

              <div className="flex flex-col items-center gap-y-2">
                <FaCircle className="text-white w-3 h-3" />
                <p className="ml-1 text-white text-xs md:text-sm">Payment</p>
              </div>

              <IoIosArrowForward className="ml-1 w-5 h-5" />

              <div className="flex flex-col items-center gap-y-2">
                <FaCircle className="text-[#0BDB45] w-3 h-3" />
                <p className="ml-1 text-[#0BDB45] text-xs md:text-sm whitespace-nowrap">
                  Get Product
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative bg-[#051301]">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent opacity-100 z-0"></div>

        <div className="flex flex-col justify-center items-center mx-auto z-10 h-full pt-[32px] pb-[12%] relative">
          <CiCircleCheck
            color="#0BDB45"
            className="h-[36px] w-[36px] md:h-[45px] md:w-[45px] lg:h-[84px] lg:w-[84px]"
          />
          <h1 className="font-medium text-[13px] md:text-[24px] lg:text-[30px] xl:text-[32px] py-[0.5em]">
            Payment Successful!
          </h1>
          <h3 className="capitalize text-[10px] xl:text-[24px] md:text-[15px] lg:text-[20px] font-light pb-[1em]">
            thank you for your purchase. your order is being processed.
          </h3>
          <div className="border-[0.5px] lg:border-[1px] border-[#0BDB45] p-[1em] max-w-[200px] md:w-[326px] lg:w-[417px] xl:w-[500px] md:max-w-full w-full">
            <h2 className="font-semibold text-[11px] xl:text-[25px] md:text-[15px] lg:text-[20px]">
              Order Summary
            </h2>
            <div className="text-[7px]/5 xl:text-[15px]/8 md:text-[10px]/5 lg:text-[12px]/7 py-[1em] capitalize">
              <div className="flex flex-row justify-between mx-auto">
                <p>Subtotal</p>
                <p>$99.00</p>
              </div>
              <div className="flex flex-row justify-between mx-auto">
                <p>Discount</p>
                <p>$5.00</p>
              </div>
              <hr />

              <div className="flex flex-row justify-between mx-auto pb-[2em]">
                <p>total</p>
                <p>$99.00</p>
              </div>
              <div className="flex flex-row justify-between mx-auto">
                <p>Date</p>
                <p>october 12, 2024</p>
              </div>
            </div>

            <Link href="/">
              <Button
                variant="gaming"
                className="text-[7px] xl:text-[16px] md:text-[10px] lg:text-[13px] w-full mx-auto justify-center font-semibold h-3 md:h-6 lg:h-8 mt-[5em] md:mt-[8em]"
              >
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-100 z-0"></div>
      </div>
      <Footer />
    </section>
  );
}

export default SuccessPage;
