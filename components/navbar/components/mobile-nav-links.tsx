import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileNavLinksProps {
  setIsMobileNavToggled: Dispatch<SetStateAction<boolean>>;
}

const MobileNavLinks: React.FC<MobileNavLinksProps> = ({
  setIsMobileNavToggled,
}) => {
  const path = usePathname();

  return (
    <>
      <Link
        href="/"
        className={`hover:opacity-80 py-[1.1em] border-b border-b-[#8C8C8C] ${
          path === "/" ? "text-[#0BDB45]" : ""
        }`}
        onClick={() => setIsMobileNavToggled(false)}
      >
        Home
      </Link>
      <Link
        href="/shop-page"
        className={`hover:opacity-80 py-[1.1em] border-b border-b-[#8C8C8C] ${
          path.startsWith("/shop-page") ? "text-[#0BDB45]" : ""
        }`}
        onClick={() => setIsMobileNavToggled(false)}
      >
        Store
      </Link>
      <Link
        href="/about"
        className={`hover:opacity-80 py-[1.1em] border-b border-b-[#8C8C8C] ${
          path.startsWith("/about") ? "text-[#0BDB45]" : ""
        }`}
        onClick={() => setIsMobileNavToggled(false)}
      >
        About
      </Link>
      <Link
        href="/contact-us"
        className={`hover:opacity-80 py-[1.1em] border-b border-b-[#8C8C8C] ${
          path.startsWith("/contact-us") ? "text-[#0BDB45]" : ""
        }`}
        onClick={() => setIsMobileNavToggled(false)}
      >
        Contact
      </Link>
    </>
  );
};

export default MobileNavLinks;
