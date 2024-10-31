import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DesktopNavLinks = () => {
  const path = usePathname();

  return (
    <nav className="hidden sm:flex sm:gap-x-[1.5em] lg:gap-x-[2.5em] xl:gap-x-[3.5em] font-semibold uppercase">
      <Link
        href="/"
        className={`hover:opacity-80 ${path === "/" ? "text-[#0BDB45]" : ""}`}
      >
        Home
      </Link>
      <Link
        href="/shop-page"
        className={`hover:opacity-80 ${
          path.startsWith("/shop-page") ? "text-[#0BDB45]" : ""
        }`}
      >
        Store
      </Link>
      <Link
        href="/about"
        className={`hover:opacity-80 ${
          path.startsWith("/about") ? "text-[#0BDB45]" : ""
        }`}
      >
        About
      </Link>
      <Link
        href="/contact-us"
        className={`hover:opacity-80 ${
          path.startsWith("/contact-us") ? "text-[#0BDB45]" : ""
        }`}
      >
        Contact
      </Link>
    </nav>
  );
};

export default DesktopNavLinks;
