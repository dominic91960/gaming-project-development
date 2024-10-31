import React from "react";
import { usePathname } from "next/navigation";

import { IoMdHeartEmpty } from "react-icons/io";

interface WishlistIconProps {
  handleClick: () => void;
}

const WishlistIcon: React.FC<WishlistIconProps> = ({ handleClick }) => {
  const path = usePathname();

  return (
    <IoMdHeartEmpty
      className={`hover:scale-110 cursor-pointer ${
        path.startsWith("/wishlist") ? "text-[#0BDB45]" : ""
      }`}
      onClick={handleClick}
    />
  );
};

export default WishlistIcon;
