"use client";
import { FaCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import coverPhoto from "@/public/images/shop/cover-photo-dark.jpg";
import cardBgOne from "../../../public/images/payment/bg.png";
// import ProductSearchBar from "@/components/product-search/product-search";
// import { montserrat } from "@/lib/fonts";
import Footer from "@/components/footer/footer";
import BillingDetailsForm from "./Billing-Details";
import OrderDetails from "./OrderDetails";
import { useCartContext } from "@/context/CartContext";
import { useRef } from "react";
import { GoDotFill } from "react-icons/go";
// import OrderDetails from "@/components/billing/OrderDetails";
interface BillingDetailsFormRef {
  submitForm: () => void;
}

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

  const formRef = useRef<BillingDetailsFormRef>(null);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submitForm(); // Trigger submit in BillingDetailsForm
    }
  };

  return (
    // <div className={montserrat.className}>
    <div>
      {/* <ProductSearchBar /> */}
      {/* <Navbar /> */}
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
                <GoDotFill className="text-[35px] text-[#0BDB45]" />
                <p className="font-primaryFont text-[#0BDB45] text-[24px] font-medium">
                  Payment
                </p>
              </div>

              <div className="h-1 w-full bg-[#0BDB45]"></div>

              <div className="flex items-center gap-1">
                <GoDotFill className="text-[35px] text-[#fff]" />
                <p className="font-primaryFont text-white text-[24px] font-medium whitespace-nowrap">
                  Get Your Product
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button
        onClick={handleSubmit}
        className="mt-4 bg-[#0BDB45] text-black px-4 py-2 rounded"
      >
        Submit Form from Parent
      </button> */}
      <div className="relative bg-[#051301]">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent opacity-100"></div>
        <div className="flex flex-col md:flex-row gap-6 xl:gap-28 lg:px-16 mx-auto container px-[2em] md:px-0 py-[1em]">
          <BillingDetailsForm ref={formRef} />

          {/* <OrderDetails /> */}
          <OrderDetails
            cart={cart}
            totalDiscount={totalDiscount}
            totalPrice={totalPrice}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-100"></div>
      </div>
      <Footer />
    </div>
  );
}

export default BillingPage;
