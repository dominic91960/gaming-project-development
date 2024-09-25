"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import favorite from "@/public/images/navbar/favorite.png";
import cart from "@/public/images/navbar/cart.png";
import profile from "@/public/images/navbar/profile.png";
import "./navbar.css";

export default function Navbar() {
  const path = usePathname();
  const [isCategoryMenuToggled, setIsCategoryMenuToggled] = useState(false);
  const [isMobileNavToggled, setIsMobileNavToggled] = useState(false);
  return (
    <section className="bg-[#0D0F10] font-primaryFont text-white sm:border-b-[#8C8C8C] sm:border-b relative">
      <div className="container mx-auto flex border-b-[#8C8C8C] border-b justify-between sm:border-none sm:pe-[4%]">
        {/* Categories button */}
        <button
          className="font-semibold text-[15px] capitalize bg-[#23262B] flex items-center gap-[0.4em] px-[0.8em] py-[0.4em] my-[0.5em]"
          onClick={() => setIsCategoryMenuToggled((prev) => !prev)}
        >
          <div className="space-y-[0.2em] pe-[0.1em]">
            <div className="w-[1.2em] h-0.5 bg-white"></div>
            <div className="w-[0.8em] h-0.5 bg-white"></div>
            <div className="w-[1.2em] h-0.5 bg-white"></div>
          </div>
          <h4>All categories</h4>
        </button>
        <div className="flex items-center font-semibold text-[15px] gap-x-[50px] md:gap-x-[96px] lg:gap-x-[115px] xl:gap-x-[130px] 2xl:gap-x-[144px]">
          {/* Desktop Navbar */}
          <nav className="hidden sm:flex uppercase gap-x-[20px] md:gap-x-[45px] lg:gap-x-[55px] xl:gap-x-[62px] 2xl:gap-x-[68px]">
            <Link
              href="/products"
              className={path.startsWith("/products") ? "text-[#0BDB45]" : ""}
            >
              Store
            </Link>
            <Link
              href="/about"
              className={path.startsWith("/about") ? "text-[#0BDB45]" : ""}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={path.startsWith("/contact") ? "text-[#0BDB45]" : ""}
            >
              Contact
            </Link>
          </nav>
          {/* Icons */}
          <div className="flex gap-x-[15px] md:gap-x-[27px]">
            <Link href="/">
              <Image src={favorite} alt="Favorites" />
            </Link>
            <Link href="/">
              <Image src={cart} alt="Cart" />
            </Link>
            <Link href="/">
              <Image src={profile} alt="Profile" />
            </Link>
          </div>
          {/* Toggle button */}
          <button
            className={`${
              isMobileNavToggled ? "animate-toggle-button" : ""
            } relative h-4 w-6 transition-opacity duration-300 sm:hidden`}
            onClick={() => setIsMobileNavToggled((prev) => !prev)}
          >
            <div className="absolute -mt-[0.5px] h-[1px] w-full rounded bg-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] transition-all duration-700 ease-in-out before:absolute before:left-0 before:h-[1px] before:w-full before:-translate-y-[6px] before:rounded before:bg-white before:transition-transform before:duration-700 before:ease-in-out after:absolute after:left-0 after:h-[1px] after:w-full after:translate-y-[6px] after:rounded after:bg-white after:transition-transform after:duration-700 after:ease-in-out"></div>
          </button>
        </div>
      </div>
      {/* Mobile Navbar */}
      <nav
        className={`${
          isMobileNavToggled ? "flex flex-col gap-y-[2em] sm:hidden" : "hidden"
        } bg-[#0D0F10] origin-top animate-open-menu container mx-auto font-semibold text-[15px] uppercase py-[2em]`}
      >
        <Link
          href="/products"
          className={path.startsWith("/products") ? "text-[#0BDB45]" : ""}
        >
          Store
        </Link>
        <Link
          href="/about"
          className={path.startsWith("/about") ? "text-[#0BDB45]" : ""}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={path.startsWith("/contact") ? "text-[#0BDB45]" : ""}
        >
          Contact
        </Link>
      </nav>
      {/* Categories Menu */}
      <nav
        className={`${
          isCategoryMenuToggled
            ? "animate-category-menu"
            : "reverse-animate-category-menu"
        } origin-left absolute z-10 w-full sm:w-[400px] bg-[#0D0F10] border border-[#75F94C] font-semibold text-[18px] p-[2em]`}
      >
        <div className="flex justify-between items-center text-[22px]">
          <h3 className="font-medium">Gamespire</h3>
          <button
            className="text-[#0BDB45] hover:scale-105"
            onClick={() => setIsCategoryMenuToggled((prev) => !prev)}
          >
            &#10006;
          </button>
        </div>
      </nav>
    </section>
  );
}
