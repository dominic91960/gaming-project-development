import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { IoMdPerson } from "react-icons/io";

const ProfileIcon = () => {
  const path = usePathname();
  return (
    <Link
      href="/sign-in"
      className={`hover:scale-110 ${
        path.startsWith("/sign") ? "text-[#0BDB45]" : ""
      }`}
    >
      <IoMdPerson />
    </Link>
  );
};

export default ProfileIcon;
