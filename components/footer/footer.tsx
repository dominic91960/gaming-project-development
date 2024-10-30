"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MdArrowRightAlt } from "react-icons/md";
import { FaFacebook, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { RiCopyrightFill } from "react-icons/ri";

import logo from "@/public/images/logo.png";
import paypal from "@/public/images/footer/paypal.png";
import visa from "@/public/images/footer/visa.png";
import mastercard from "@/public/images/footer/mastercard.png";
import skrill from "@/public/images/footer/skrill.png";
import "./footer.css";

export default function Footer() {
  const path = usePathname();

  return (
    <section className="bg-[#0B0E13] font-primaryFont text-white text-[9px] pt-[3em] pb-[2em] sm:text-[9px] md:text-[11px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
      {/* main container */}
      <div className="container mx-auto px-[36px]">
        {/* Newsletter div */}
        <div
          className="newsletter-div bg-[#2D2E37] flex items-center justify-center px-[11px] py-[1em] mb-[3em] sm:justify-between xl:mb-[4em]"
          style={{
            clipPath:
              "polygon(0% 0%, 98% 0%, 100% 20%, 100% 100%, 2% 100%, 0% 80%)",
          }}
        >
          {/* title */}
          <h2 className="hidden newsletter-title font-semibold uppercase sm:block sm:text-[14px] md:text-[18px] lg:text-[24px] xl:text-[28px] 2xl:text-[30px]">
            Subscribe Newsletter
          </h2>

          {/* form */}
          <form className="flex justify-around gap-x-[2em] sm:justify-normal">
            <Input
              type="email"
              placeholder="Email Address"
              className="newsletter-form-input w-[23ch] h-fit bg-[#0B0E13] text-[1em] px-[6px] py-[3px] border-none rounded-none"
            />
            <Button
              variant="gaming"
              className="newsletter-form-button h-fit text-[1em] px-[4px] py-[3px]"
            >
              Subscribe
              <MdArrowRightAlt className="size-[1.1em]" />
            </Button>
          </form>
        </div>

        {/* Container for logo and links */}
        <div className="flex flex-col xl:flex-row xl:justify-between xl:px-[2.75em] xl:mb-[2.73em]">
          {/* Logo and desc*/}
          <div className="mb-[2.86em] xl:mb-0">
            <div className="flex items-center justify-center gap-x-[1em] mb-[1.1em]">
              <Image src={logo} alt="Logo" className="size-[3.8em]" />
              <h3 className="font-semibold text-[1.7em]">VINGAME</h3>
            </div>
            <p className="text-center px-[2.86em] opacity-70 xl:w-[47ch] xl:text-left xl:px-0">
              Your one-stop destination for unlocking the ultimate gaming
              experience. Our online store offers a wide range of game keys for
              PC, consoles, and popular gaming platforms at unbeatable prices
            </p>
          </div>

          {/* Site links */}
          <div className="flex justify-around px-[2.86em] gap-x-[7em] mb-[2.86em] xl:mb-0">
            {/* Company list */}
            <ul className="uppercase text-[calc(1em+1px)]">
              <h4 className="font-medium text-[1.25em]">Company</h4>
              <li
                className={`w-fit mt-[0.8em] hover:opacity-90 ${
                  path === "/" ? "text-[#0BDB45]" : "opacity-70"
                }`}
              >
                <Link href="/">Home</Link>
              </li>
              <li
                className={`w-fit mt-[0.8em] hover:opacity-90 ${
                  path.startsWith("/shop-page")
                    ? "text-[#0BDB45]"
                    : "opacity-70"
                }`}
              >
                <Link href="/shop-page">Store</Link>
              </li>
              <li
                className={`w-fit mt-[0.8em] hover:opacity-90 ${
                  path.startsWith("/about") ? "text-[#0BDB45]" : "opacity-70"
                }`}
              >
                <Link href="/about">About</Link>
              </li>
              <li
                className={`w-fit mt-[0.8em] hover:opacity-90 ${
                  path.startsWith("/contact-us")
                    ? "text-[#0BDB45]"
                    : "opacity-70"
                }`}
              >
                <Link href="/contact-us">Contact</Link>
              </li>
            </ul>

            {/* Categories list */}
            <ul className="uppercase text-[calc(1em+1px)] flex flex-col items-start xl:items-start">
              <h4 className="font-medium text-[1.25em]">Categories</h4>
              <li className="w-fit mt-[0.8em] opacity-70 hover:opacity-90">
                <Link href="/">Games</Link>
              </li>
              <li className="w-fit mt-[0.8em] opacity-70 hover:opacity-90">
                <Link href="/">Gift cards</Link>
              </li>
              <li className="w-fit mt-[0.8em] opacity-70 hover:opacity-90">
                <Link href="/">E-money</Link>
              </li>
              <li className="w-fit mt-[0.8em] opacity-70 hover:opacity-90">
                <Link href="/">Pre orders</Link>
              </li>
            </ul>
          </div>

          {/* Social links */}
          <div className="flex flex-col items-center mb-[2.86em] xl:mb-0">
            <h4 className="font-semibold uppercase text-[1.25em]">Follow us</h4>
            <ul className="flex gap-x-[1.4em] mt-[0.8em] sm:gap-[1em]">
              <li className="w-fit hover:scale-110">
                <Link href="/">
                  <FaFacebook className="size-[2em] sm:size-[1.48em]" />
                </Link>
              </li>
              <li className="w-fit hover:scale-110">
                <Link href="/">
                  <FaXTwitter className="size-[2em] sm:size-[1.5em]" />
                </Link>
              </li>
              <li className="w-fit hover:scale-110">
                <Link href="/">
                  <IoLogoInstagram className="size-[2.1em] sm:size-[1.5em]" />
                </Link>
              </li>
              <li className="w-fit hover:scale-110">
                <Link href="/">
                  <FaTiktok className="size-[1.9em] sm:size-[1.5em]" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Seperator */}
      <div className="mb-[1.5em] sm:container sm:mx-auto sm:px-[36px]">
        <hr />
      </div>

      {/* Second container */}
      <div className="container mx-auto px-[36px] flex flex-col font-semibold sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-center gap-x-[0.7em] mb-[1.5em] sm:mb-0">
          <RiCopyrightFill className="size-[1.5em]" />
          <p>Copyright {new Date().getFullYear()}. All Rights Reserved.</p>
        </div>
        <div className="flex flex-col items-center justify-between gap-x-[1em] sm:flex-row sm:items-start sm:gap-x-[2em] px-[2.86em]">
          <div className="flex gap-x-[0.7em] sm:gap-x-[1em] sm:mb-0">
            <Image src={paypal} alt="PayPal" className="w-[1.9em]" />
            <Image src={visa} alt="Visa" className="w-[1.9em]" />
            <Image src={mastercard} alt="Mastercard" className="w-[1.9em]" />
            <Image src={skrill} alt="Skrill" className="w-[1.9em]" />
          </div>
          <div className="flex gap-[1em] mt-[1.4em] sm:mt-0">
            <p className="hover:opacity-80">
              <Link href="/">Privacy policy</Link>
            </p>
            <p className="hidden sm:block">|</p>
            <p className="hover:opacity-80">
              <Link href="/">Terms & conditions</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
