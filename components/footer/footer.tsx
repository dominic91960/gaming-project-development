import Link from "next/link";
import Image from "next/image";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import logo from "@/public/images/footer/logo.png";
import fb from "@/public/images/footer/facebook.png";
import x from "@/public/images/footer/x.png";
import ig from "@/public/images/footer/instagram.png";
import tt from "@/public/images/footer/tik-tok.png";
import copyright from "@/public/images/footer/copyright.png";
import paypal from "@/public/images/footer/paypal.png";
import visa from "@/public/images/footer/visa.png";
import mastercard from "@/public/images/footer/mastercard.png";
import skrill from "@/public/images/footer/skrill.png";

export default function Footer() {
  return (
    <section className="bg-[#0B0E13] text-white">
      <div className="container mx-auto font-primaryFont pt-[3.3%] w-full px-8 justify-between">
        <div
          className="bg-[#2D2E37] px-8 py-4 xl:px-16   flex items-center justify-between md:gap-20 mx-auto"
          style={{
            clipPath:
              "polygon(0% 0%, 98% 0%, 100% 20%, 100% 100%, 2% 100%, 0% 80%)",
          }}
        >
          <h2 className="text-[8px] md:text-md md:leading-10 lg:text-lg xl:text-2xl 2xl:text-3xl font-semibold uppercase">
            Subscribe Newsletter
          </h2>
          <form className="flex items-center gap-2 lg:gap-[2.5em] text-[7px] lg:text-[14px]">
            <Input
              type="email"
              placeholder="Email Address"
              className="text-white bg-[#0B0E13] border-none rounded-none px-[4px] py-[3px] h-fit  lg:w-[37ch] placeholder:text-white lg:py-[1.5em] ps-[1em] text-[7px] lg:text-[14px]"
            />
            <Button className="px-[4px] py-[3px] h-fit lg:px-[1.8em] lg:py-[1.4em] text-black bg-[#0BDB45] leading-none rounded-none hover:text-white hover:bg-[#108832] text-[7px] lg:text-[14px]">
              <p className="flex gap-[0.5em] font-bold items-center ">
                Subscribe <span className="text-xm lg:text-sm">&#10230;</span>
              </p>
            </Button>
          </form>
        </div>
        <div className="mt-[4.3%] flex flex-col xl:flex-row gap-6 xl:gap-[144px] text-center">
          <div className="flex flex-col text-center lg:text-left lg:justify-start">
            <div className="flex items-center justify-center">
              <Image src={logo} alt="Logo" className="w-[31.05px] lg:w-[117px]" />
              <h3 className="uppercase font-semibold text-sm lg:text-[36px] ps-[0.5em]">
                Logo
              </h3>
            </div>
            <p className="text-[7px] lg:text-[16px] mb-8">
              Your one-stop destination for unlocking the ultimate gaming
              experience. Our online store offers a wide range of game keys for
              PC, consoles, and popular gaming platforms at unbeatable prices.
            </p>
          </div>
          <div className="flex flex-row lg:flex-row space-x-10 justify-center">
            <ul className="uppercase text-[8px] lg:text-[18px] font-light lg:font-semibold flex-shrink-0">
              <h4 className="text-[11px] lg:text-[25px] font-semibold">Company</h4>
              <li className="mt-[0.8em]">
                <Link href="/">Products</Link>
              </li>
              <li className="mt-[0.8em]">
                <Link href="/">Blog</Link>
              </li>
              <li className="mt-[0.8em]">
                <Link href="/">About</Link>
              </li>
              <li className="mt-[0.8em]">
                <Link href="/">Contact</Link>
              </li>
            </ul>
            <ul className="uppercase text-[8px] lg:text-[18px] font-normal lg:font-semibold flex-shrink-0">
              <h4 className="text-[11px] lg:text-[25px] font-semibold">Categories</h4>
              <li className="mt-[0.8em]">
                <Link href="/">Games</Link>
              </li>
              <li className="mt-[0.8em]">
                <Link href="/">Gift cards</Link>
              </li>
              <li className="mt-[0.8em]">
                <Link href="/">E-money</Link>
              </li>
              <li className="mt-[0.8em]">
                <Link href="/">Pre orders</Link>
              </li>
            </ul>
          </div>
          <div className="uppercase text-[7px] lg:text-[18px] font-semibold flex-shrink-0">
            <h4 className="text-[15px] lg:text-[25px]">Follow us</h4>
            <ul className="flex mt-[0.8em] gap-[1.6em] justify-center">
              <li>
                <Link href="/">
                  <Image src={fb} alt="Link to Facebook" className="w-4" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Image src={x} alt="Link to X"  className="w-4"/>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Image src={ig} alt="Link to Instagram" className="w-4" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Image src={tt} alt="Link to TikTok" className="w-4" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-[2.7%] border-t-2 pt-[1.5%] pb-[2.5%] capitalize w-full flex flex-col lg:flex-row items-center lg:text-[15px] justify-between font-semibold text-[7px]">
          <div className="flex items-center gap-[1.6em]">
            <Image src={copyright} alt="Copyright" className="w-4 lg:w-8" />
            <p>Copyright {new Date().getFullYear()}. All rights reserved</p>
          </div>
          <div className="flex flex-row items-center gap-2 ">
            <div className="flex flex-row gap-2">
              <Image src={paypal} alt="PayPal" className="w-[10px] lg:w-6" />
              <Image src={visa} alt="Visa" className="w-[10px] lg:w-6"/>
              <Image src={mastercard} alt="Mastercard" className="w-[10px] lg:w-6"/>
              <Image src={skrill} alt="Skrill" className="w-[10px] lg:w-6" />
            </div>
            <div className="flex gap-2">
              <p>
                <Link href="/">Privacy policy</Link>
              </p>
              <p>|</p>
              <p>
                <Link href="/">Terms & conditions</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
