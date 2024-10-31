import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

import logo from "@/public/images/logo.png";

interface CategoryMenuState {
  isCategoryMenuOpen: boolean | undefined;
  isSubCategoryMenuOpen: boolean | undefined;
  isSuperSubCategoryMenuOpen: boolean | undefined;
}

interface CategoryMenuHeaderProps {
  categoryMenuStates: CategoryMenuState;
  setCategoryMenuStates: Dispatch<SetStateAction<CategoryMenuState>>;
  setIsMobileNavToggled: (value: SetStateAction<boolean>) => void;
}

const CategoryMenuHeader: React.FC<CategoryMenuHeaderProps> = ({
  categoryMenuStates,
  setCategoryMenuStates,
  setIsMobileNavToggled,
}) => {
  return (
    <div className="w-full h-[70px] flex items-center justify-between text-[24px]">
      {categoryMenuStates.isSuperSubCategoryMenuOpen ? (
        <button
          className="flex items-center gap-[0.2em] text-[0.8em]"
          onClick={() =>
            setCategoryMenuStates((prev) => ({
              ...prev,
              isSuperSubCategoryMenuOpen: false,
            }))
          }
        >
          <IoIosArrowBack />
          <h4>Platforms</h4>
        </button>
      ) : categoryMenuStates.isSubCategoryMenuOpen ? (
        <button
          className="flex items-center gap-[0.2em] text-[0.8em]"
          onClick={() =>
            setCategoryMenuStates((prev) => ({
              ...prev,
              isSubCategoryMenuOpen: false,
              isSuperSubCategoryMenuOpen: undefined,
            }))
          }
        >
          <IoIosArrowBack />
          <h4>PC Games</h4>
        </button>
      ) : categoryMenuStates.isCategoryMenuOpen ? (
        <Link
          href="/"
          className="flex items-center gap-[0.5em]"
          onClick={() =>
            setCategoryMenuStates({
              isCategoryMenuOpen: false,
              isSubCategoryMenuOpen: undefined,
              isSuperSubCategoryMenuOpen: undefined,
            })
          }
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
          setCategoryMenuStates((prev) => ({
            ...prev,
            isCategoryMenuOpen: false,
          }));

          setTimeout(() => {
            setCategoryMenuStates((prev) => ({
              ...prev,
              isSubCategoryMenuOpen: undefined,
              isSuperSubCategoryMenuOpen: undefined,
            }));
          }, 300);
        }}
      >
        <AiOutlineClose />
      </button>
    </div>
  );
};

export default CategoryMenuHeader;
