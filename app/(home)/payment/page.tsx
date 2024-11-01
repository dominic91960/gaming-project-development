"use client";
import { FaCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import cardBgOne from "../../../public/images/payment/bg.png";
import ProductSearchBar from "@/components/product-search/product-search";
// import { montserrat } from "@/lib/fonts";
import Footer from "@/components/footer/footer";
import BillingDetailsForm from "./Billing-Details";
import OrderDetails from "./OrderDetails";
import { useCartContext } from "@/context/CartContext";
// import OrderDetails from "@/components/billing/OrderDetails";

function BillingPage() {
  const {
    cart,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    totalItems,
    setDiscount,
    totalDiscount,
    discountData,
    proceedCheckout,
  } = useCartContext();
  return (
    // <div className={montserrat.className}>
    <div>
      <ProductSearchBar />
      {/* <Navbar /> */}
      <div className="relative w-full h-[162px] md:h-80 lg:h-[420px] xl:h-[420px] 2xl:h-[420px] px-8">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-100 z-10"></div>

        <Image
          src={cardBgOne}
          alt="Not found background"
          layout="fill"
          objectFit="cover"
          className="w-full h-full z-0"
        />
        {/* Title */}
        <div className="mx-auto absolute items-center justify-center inset-0 pt-[75px] md:pt-52 lg:pt-72 z-20">
          <div className="flex justify-between items-center px-px">
            {/* For large and extra large screens */}
            <div className="hidden mx-auto md:flex container items-center justify-around text-white bg-white bg-opacity-20 px-16 md:px-8 lg:px-16 py-6 gap-x-5 xl:gap-x-10">
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
                  <FaCircle className="text-[#0BDB45] lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-5 2xl:h-5" />
                  <p className="ml-2 text-[#0BDB45] lg:text-base xl:text-xl 2xl:text-xl">
                    Payment
                  </p>
                </div>
                <div className="border-t-[3px] border-[#0BDB45] w-full ml-2"></div>
              </div>
              {/* Get Your Product */}
              <div className="flex items-center flex-1 gap-x-2">
                <div className="flex items-center">
                  <FaCircle className="text-white lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-5 2xl:h-5" />
                  <p className="ml-2 lg:text-base xl:text-xl 2xl:text-xl whitespace-nowrap">
                    Get Product
                  </p>
                </div>
                <div className="border-t-[3px] border-white w-full ml-2"></div>
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
                <FaCircle className="text-[#0BDB45] w-3 h-3" />
                <p className="ml-1 text-[#0BDB45] text-xs md:text-sm">
                  Payment
                </p>
              </div>

              <IoIosArrowForward className="ml-1 w-5 h-5" />

              <div className="flex flex-col items-center gap-y-2">
                <FaCircle className="text-white w-3 h-3" />
                <p className="ml-1 text-xs md:text-sm whitespace-nowrap">
                  Get Product
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-[#051301]">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent opacity-100"></div>
        <div className="flex flex-col md:flex-row gap-6 xl:gap-28 lg:px-16 mx-auto container px-[2em] md:px-0 py-[1em]">
          <BillingDetailsForm />
          {/* <OrderDetails /> */}
          <OrderDetails cart={cart} totalDiscount={totalDiscount} totalPrice={totalPrice} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-100"></div>
      </div>

      <Footer />
    </div>
  );
}

export default BillingPage;
