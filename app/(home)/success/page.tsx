import Image from "next/image";
import Link from "next/link";

import { IoIosArrowForward } from "react-icons/io";
import { CiCircleCheck } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { GoDotFill } from "react-icons/go";
import Footer from "@/components/footer/footer";
import bgImage from "@/public/images/404/bg.png";
import coverPhoto from "@/public/images/shop/cover-photo-dark.jpg";
function SuccessPage() {
  return (
    <section className="font-primaryFont text-white">
      <div className="relative">
        <Image
          src={coverPhoto}
          alt="shop page cover image"
          className="w-full h-full object-cover"
        />

        <div className="">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto flex items-center w-full space-x-4 py-2 px-8">
              <div className="flex items-center gap-1">
                <GoDotFill className="text-[35px] text-[#fff]" />
                <p className="font-primaryFont text-white text-[24px] font-medium">
                  Cart
                </p>
              </div>

              <div className="h-1 w-full bg-white"></div>

              <div className="flex items-center gap-1">
                <GoDotFill className="text-[35px] text-[#fff]" />
                <p className="font-primaryFont text-[#fff] text-[24px] font-medium">
                  Payment
                </p>
              </div>

              <div className="h-1 w-full bg-[#fff]"></div>

              <div className="flex items-center gap-1">
                <GoDotFill className="text-[35px] text-[#0BDB45]" />
                <p className="font-primaryFont text-[#0BDB45] text-[24px] font-medium whitespace-nowrap">
                  Get Your Product
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
