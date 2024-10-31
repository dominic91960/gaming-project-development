import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";

import logo from "@/public/images/logo.png";

interface MobileLogoProps {
  setIsMobileNavToggled: Dispatch<SetStateAction<boolean>>;
}

const MobileLogo: React.FC<MobileLogoProps> = ({ setIsMobileNavToggled }) => {
  return (
    <Link
      href="/"
      className="sm:hidden"
      onClick={() => setIsMobileNavToggled(false)}
    >
      <Image src={logo} alt="Logo" className="w-[2em]" />
    </Link>
  );
};

export default MobileLogo;
