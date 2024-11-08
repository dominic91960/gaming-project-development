"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { CiCircleCheck } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { GoDotFill } from "react-icons/go";
import Footer from "@/components/footer/footer";
import coverPhoto from "@/public/images/shop/cover-photo-dark.jpg";
import { useRouter, useSearchParams } from "next/navigation";
import axiosInstance from "@/axios/axiosInstance";
import jsPDF from "jspdf";
import "jspdf-autotable";

function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  interface Product {
    id: string;
    gameId: string;
    price: number;
    quantity: number;
    game: { displayName: string };
  }

  interface OrderDetails {
    subtotal: number;
    discount: number;
    totalAmount: number;
    createdAt: string;
    products: Product[];
  }

  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    subtotal: 0,
    discount: 0,
    totalAmount: 0,
    createdAt: "",
    products: [],
  });

  useEffect(() => {
    async function fetchOrderDetails() {
      if (orderId) {
        try {
          const response = await axiosInstance.get(`/orders/${orderId}`);
          const { subtotal, discount, totalAmount, createdAt, products } = response.data;
          setOrderDetails({ subtotal, discount, totalAmount, createdAt, products });
        } catch (error) {
          console.error("Failed to fetch order details:", error);
        }
      }
    }
    fetchOrderDetails();
  }, [orderId]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Title and header information
    doc.text("Invoice", 14, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${orderId}`, 14, 30);
    doc.text(`Date: ${new Date(orderDetails.createdAt).toLocaleDateString()}`, 14, 40);
    doc.text("Order Summary", 14, 50);

    // Table for products
    doc.autoTable({
      startY: 60,
      head: [["Product", "Quantity", "Unit Price", "Total"]],
      body: orderDetails.products.map((product) => [
        product.game.displayName,
        product.quantity,
        `$${product.price.toFixed(2)}`,
        `$${(product.price * product.quantity).toFixed(2)}`,
      ]),
    });

    // Summary of subtotal, discount, and total amount
    let finalY = doc.previousAutoTable.finalY || 60;
    doc.text(`Subtotal: $${(orderDetails.totalAmount + orderDetails.discount).toFixed(2)}`, 14, finalY + 10);
    if (orderDetails.discount > 0) {
      doc.text(`Discount: -$${orderDetails.discount.toFixed(2)}`, 14, finalY + 20);
    }
    doc.text(`Total: $${orderDetails.totalAmount.toFixed(2)}`, 14, finalY + 30);

    // Save the PDF
    const pdfName = `Invoice_${orderId}_${new Date().toISOString().split("T")[0]}.pdf`;
    doc.save(pdfName);
  };

  return (
    <section className="font-primaryFont text-white">
      <div className="relative">
        <Image
          src={coverPhoto}
          alt="shop page cover image"
          className="w-full h-full object-cover"
        />

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

            <div className="order-data text-xs xl:text-sm md:text-base lg:text-sm py-4 capitalize">
              {orderDetails.products.map((product) => (
                <div
                  key={product.id}
                  className="order-item flex justify-between py-2"
                >
                  <span className="flex-1 text-left">
                    <span className="flex-1 text-center ">
                      {product.quantity} x
                    </span>
                    {product.game.displayName}
                  </span>
                  <span className="flex-1 text-right">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-xs xl:text-sm md:text-base lg:text-sm py-4 capitalize">
              <div className="subtotal flex justify-between py-2">
                <p className="text-left">Subtotal</p>
                <p className="text-right">
                  ${(orderDetails.totalAmount + orderDetails.discount).toFixed(2)}
                </p>
              </div>

              {orderDetails.discount > 0 && (
                <div className="discount flex justify-between py-2">
                  <p className="text-left">Discount</p>
                  <p className="text-right">
                    - ${orderDetails.discount.toFixed(2)}
                  </p>
                </div>
              )}

              <hr className="my-2 border-gray-300" />

              <div className="total flex justify-between py-2 pb-4">
                <p className="text-left font-semibold">Total</p>
                <p className="text-right font-semibold">
                  ${orderDetails.totalAmount.toFixed(2)}
                </p>
              </div>

              <div className="date flex justify-between">
                <p className="text-left">Date</p>
                <p className="text-right">
                  {new Date(orderDetails.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4 mt-8">
              <Link href="/">
                <Button
                  variant="gaming"
                  className="text-[7px] xl:text-[16px] md:text-[10px] lg:text-[13px] w-full font-semibold h-3 md:h-6 lg:h-8"
                >
                  Return to Homepage
                </Button>
              </Link>
              <Button
                variant="gaming"
                onClick={handleDownloadPDF}
                className="text-[7px] xl:text-[16px] md:text-[10px] lg:text-[13px] w-full font-semibold h-3 md:h-6 lg:h-8"
              >
                Download Invoice
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default SuccessPage;
