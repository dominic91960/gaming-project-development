import React, { SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

import logo from "@/public/images/logo.png";

interface CategoryMenuHeaderProps {
  isSuperSubCategoryMenuToggled: boolean | undefined;
  setIsSuperSubCategoryMenuToggled: (
    value: SetStateAction<boolean | undefined>
  ) => void;

  isSubCategoryMenuToggled: boolean | undefined;
  setIsSubCategoryMenuToggled: (
    value: SetStateAction<boolean | undefined>
  ) => void;

  isCategoryMenuToggled: boolean | undefined;
  setIsCategoryMenuToggled: (
    value: SetStateAction<boolean | undefined>
  ) => void;

  setIsMobileNavToggled: (value: SetStateAction<boolean>) => void;
}

const CategoryMenuHeader: React.FC<CategoryMenuHeaderProps> = ({
  isSuperSubCategoryMenuToggled,
  setIsSuperSubCategoryMenuToggled,
  isSubCategoryMenuToggled,
  setIsSubCategoryMenuToggled,
  isCategoryMenuToggled,
  setIsCategoryMenuToggled,
  setIsMobileNavToggled,
}) => {
  return (
    <div className="w-full h-[70px] flex items-center justify-between text-[24px]">
      {isSuperSubCategoryMenuToggled ? (
        <button
          className="flex items-center gap-[0.2em] text-[0.8em]"
          onClick={() => setIsSuperSubCategoryMenuToggled(false)}
        >
          <IoIosArrowBack />
          <h4>Platforms</h4>
        </button>
      ) : isSubCategoryMenuToggled ? (
        <button
          className="flex items-center gap-[0.2em] text-[0.8em]"
          onClick={() => {
            setIsSubCategoryMenuToggled(false);
            setIsSuperSubCategoryMenuToggled(undefined);
          }}
        >
          <IoIosArrowBack />
          <h4>PC Games</h4>
        </button>
      ) : isCategoryMenuToggled ? (
        <Link
          href="/"
          className="flex items-center gap-[0.5em]"
          onClick={() => {
            setIsCategoryMenuToggled(false);
            setIsSubCategoryMenuToggled(undefined);
            setIsSuperSubCategoryMenuToggled(undefined);
          }}
        >
          <Link href="/" onClick={() => setIsMobileNavToggled(false)}>
            <Image src={logo} alt="VINGAME" className="w-[30px]" />
          </Link>
          <h4 className="font-semibold">VINGAME</h4>
        </Link>
      ) : (
        ""
      )}
      <button
        className="hover:opacity-80 text-[#75F94C]"
        onClick={() => {
          setIsCategoryMenuToggled(false);
          setTimeout(() => {
            setIsSubCategoryMenuToggled(undefined);
            setIsSuperSubCategoryMenuToggled(undefined);
          }, 300);
        }}
      >
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default CategoryMenuHeader;
