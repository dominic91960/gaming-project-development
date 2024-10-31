import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { IoMdHeartEmpty } from "react-icons/io";

const WishlistIcon = () => {
  const path = usePathname();

  return (
    <Link
      href="/wishlist"
      className={`hover:scale-110 ${
        path.startsWith("/wishlist") ? "text-[#0BDB45]" : ""
      }`}
    >
      <IoMdHeartEmpty />
    </Link>
  );
};

export default WishlistIcon;
