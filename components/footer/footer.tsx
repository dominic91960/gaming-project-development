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
    <section className="bg-[#0B0E13] font-primaryFont text-white text-[7px] py-[2em]">
      {/* main container */}
      <div className="container mx-auto px-[36px]">
        {/* Logo and desc*/}
        <div className="mb-[2.86em]">
          <div className="flex items-center justify-center gap-x-[1em] mb-[1.1em]">
            <Image src={logo} alt="Logo" className="size-[4.45em]" />
            <h3 className="font-semibold text-[1.7em]">LOGO</h3>
          </div>
          <p className="text-center px-[2.86em]">
            Your one-stop destination for unlocking the ultimate gaming
            experience. Our online store offers a wide range of game keys for
            PC, consoles, and popular gaming platforms at unbeatable prices
          </p>
        </div>

        {/* Site links */}
        <div className="flex justify-center gap-x-[7em] mb-[2.86em]">
          {/* Company list */}
          <ul className="uppercase text-[calc(1em+1px)]">
            <h4 className="font-medium text-[1.5em]">Company</h4>
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

          {/* Categories list */}
          <ul className="uppercase text-[calc(1em+1px)] text-right">
            <h4 className="font-medium text-[1.25em]">Categories</h4>
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

        {/* Social links */}
        <div className="flex flex-col items-center mb-[2.86em]">
          <h4 className="font-semibold uppercase text-[2.1em]">Follow us</h4>
          <ul className="flex gap-x-[1.4em] mt-[0.8em]">
            <li>
              <Link href="/">
                <Image src={fb} alt="Facebook" className="size-[2em]" />
              </Link>
            </li>
            <li>
              <Link href="/">
                <Image src={x} alt="X" className="size-[2em]" />
              </Link>
            </li>
            <li>
              <Link href="/">
                <Image src={ig} alt="Instagram" className="size-[2em]" />
              </Link>
            </li>
            <li>
              <Link href="/">
                <Image src={tt} alt="TikTok" className="size-[2em]" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Seperator */}
      <hr className="mb-[1.5em]" />

      {/* Second container */}
      <div className="container mx-auto px-[36px] flex flex-col font-semibold">
        <div className="flex items-center justify-center gap-x-[0.7em] leading-[0] mb-[1.5em]">
          <Image src={copyright} alt="Copyright" className="size-[1.5em]" />
          <p>Copyright {new Date().getFullYear()}. All rights reserved</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-x-[1em]">
          <div className="flex flex-row gap-x-[0.7em] mb-[1.5em]">
            <Image src={paypal} alt="PayPal" className="w-[1.9em]" />
            <Image src={visa} alt="Visa" className="w-[1.9em]" />
            <Image src={mastercard} alt="Mastercard" className="w-[1.9em]" />
            <Image src={skrill} alt="Skrill" className="w-[1.9em]" />
          </div>
          <div className="flex gap-[1em]">
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
    </section>
  );
}

{
  /* Newsletter div */
}
{
  /* <div
  className="bg-[#2D2E37] flex items-center justify-between px-[2em] py-[1em]"
  style={{
    clipPath: "polygon(0% 0%, 98% 0%, 100% 20%, 100% 100%, 2% 100%, 0% 80%)",
  }}
> */
}
{
  /* title */
}
{
  /* <h2 className="font-semibold text-[calc(1em+1px)] uppercase">
    Subscribe Newsletter
  </h2> */
}

{
  /* form */
}
{
  /* <form className="flex gap-x-[calc(1em-1px)]">
    <Input
      type="email"
      placeholder="Email Address"
      className="w-[23ch] h-fit bg-[#0B0E13] text-[1em] px-[6px] py-[0.5em] border-none rounded-none"
    />
    <Button variant="gaming" className="h-fit text-[1em] px-[4px] py-[0.5em]">
      Subscribe
    </Button>
  </form>
</div>; */
}
