import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { IoMdHeartEmpty } from "react-icons/io";

interface WishlistIconProps {
  handleClick: () => void;
}

const WishlistIcon: React.FC<WishlistIconProps> = ({ handleClick }) => {
  const path = usePathname();

  return (
    <Link
      href="/wishlist"
      className={`hover:scale-110 ${
        path.startsWith("/wishlist") ? "text-[#0BDB45]" : ""
      }`}
      onClick={handleClick}
    >
      <IoMdHeartEmpty />
    </Link>
  );
};

export default WishlistIcon;
