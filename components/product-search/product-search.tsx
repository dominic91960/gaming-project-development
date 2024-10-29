import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import logo from "../../public/images/home/logo.png";

const ProductSearchBar = () => {
  return (
    <div className="relative bg-[#0B0E13] border-b border-[#8C8C8C] font-primaryFont text-[13px] xl:text-[14px] text-white z-50">
      <div className="container h-[62px] mx-auto px-[36px] py-[1em] flex items-center justify-between sm:h-[68px] sm:py-[0.1em] xl:h-[73px]">
        <Link href="/" className="hidden sm:block sm:size-[5em]">
          <Image src={logo} alt="Logo" />
        </Link>

        <div className="bg-[#23262B] flex items-center w-full sm:w-[50ch]">
          <Input
            placeholder="Search your products..."
            className="text-[1em] rounded-none border-none px-[1em] py-[0.5em] h-fit"
          />
          <Button
            type="submit"
            variant="gaming"
            className="text-[1em] mx-[0.3em] my-[0.4em] px-[1em] py-[0.2em] h-fit"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductSearchBar;
