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
    <section className="bg-[#0B0E13]">
      <div className="container mx-auto font-primaryFont pt-[3.3%]">
        <div
          className="bg-[#2D2E37] px-[7%] py-[2%] flex items-center justify-between"
          style={{
            clipPath:
              "polygon(0% 0%, 98% 0%, 100% 20%, 100% 100%, 2% 100%, 0% 80%)",
          }}
        >
          <h2 className="text-[36px] font-semibold uppercase">
            Subscribe newsletter
          </h2>
          <form className="flex items-center gap-[2.5em] text-[14px]">
            <Input
              type="email"
              placeholder="Email Address"
              className="text-white bg-[#0B0E13] border-none rounded-none w-[37ch] placeholder:text-white py-[1.5em] ps-[1em]"
            />
            <Button className=" px-[1.8em] py-[1.4em] text-black bg-[#0BDB45] leading-none rounded-none hover:text-white">
              <p className="flex gap-[1em] font-bold items-center">
                Subscribe <span className="text-[1.4em]">&#10230;</span>
              </p>
            </Button>
          </form>
        </div>
        <div className="mt-[4.3%] flex gap-[144px]">
          <div>
            <div className="flex items-center">
              <Image src={logo} alt="Logo" />
              <h3 className="uppercase font-semibold text-[36px] ps-[0.5em]">
                Logo
              </h3>
            </div>
            <p>
              Your one-stop destination for unlocking the ultimate gaming
              experience. Our online store offers a wide range of game keys for
              PC, consoles, and popular gaming platforms at unbeatable prices.
            </p>
          </div>
          <ul className="uppercase text-[18px] font-semibold flex-shrink-0">
            <h4 className="text-[25px]">Company</h4>
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
          <ul className="uppercase text-[18px] font-semibold flex-shrink-0">
            <h4 className="text-[25px]">Categories</h4>
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
            <li className="mt-[0.8em]">
              <Link href="/">Steam</Link>
            </li>
          </ul>
          <div className="uppercase text-[18px] font-semibold flex-shrink-0">
            <h4 className="text-[25px]">Follow us</h4>
            <ul className="flex mt-[0.8em] gap-[1.6em]">
              <li>
                <Link href="/">
                  <Image src={fb} alt="Link to Facebook" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Image src={x} alt="Link to X" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Image src={ig} alt="Link to Instagram" />
                </Link>
              </li>
              <li>
                <Link href="/">
                  <Image src={tt} alt="Link to TikTok" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-[2.7%] border-t-2 pt-[1.5%] pb-[2.5%] capitalize flex items-center text-[15px] justify-between font-semibold">
          <div className="flex items-center gap-[1.6em]">
            <Image src={copyright} alt="Copyright" />
            <p>Copyright {new Date().getFullYear()}. All rights reserved</p>
          </div>
          <div className="flex items-center gap-[2.8em]">
            <div className="flex gap-[1.8em]">
              <Image src={paypal} alt="PayPal" />
              <Image src={visa} alt="Visa" />
              <Image src={mastercard} alt="Mastercard" />
              <Image src={skrill} alt="Skrill" />
            </div>
            <div className="flex gap-[1.7em]">
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
