import React from "react";
import Link from "next/link";

import { FaFacebook, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";

const SocialLinks = () => {
  return (
    <ul className="flex justify-center gap-x-[2em] text-[9px] mt-[2.5em] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
      <li className="w-fit hover:scale-110">
        <Link href="/">
          <FaFacebook className="size-[2em] sm:size-[1.48em]" />
        </Link>
      </li>
      <li className="w-fit hover:scale-110">
        <Link href="/">
          <FaXTwitter className="size-[2em] sm:size-[1.5em]" />
        </Link>
      </li>
      <li className="w-fit hover:scale-110">
        <Link href="/">
          <IoLogoInstagram className="size-[2.1em] sm:size-[1.5em]" />
        </Link>
      </li>
      <li className="w-fit hover:scale-110">
        <Link href="/">
          <FaTiktok className="size-[1.9em] sm:size-[1.5em]" />
        </Link>
      </li>
    </ul>
  );
};

export default SocialLinks;
