import Link from "next/link";
import React, { Dispatch, ReactNode, SetStateAction } from "react";

import { IoIosArrowForward } from "react-icons/io";

interface CategoryMenuState {
  isCategoryMenuOpen: boolean | undefined;
  isSubCategoryMenuOpen: boolean | undefined;
  isSuperSubCategoryMenuOpen: boolean | undefined;
}

interface CategoryMenuProps {
  categories: {
    categoryName: string;
    platforms: string[];
    genres: string[];
  }[];

  categoryMenuStates: CategoryMenuState;
  setCategoryMenuStates: Dispatch<SetStateAction<CategoryMenuState>>;

  setSelectedContent: Dispatch<
    SetStateAction<{
      selectedSubCategory: string;
      selectedSuperSubCategory: string;
    }>
  >;

  children: ReactNode;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  categories,
  categoryMenuStates,
  setCategoryMenuStates,
  setSelectedContent,
  children,
}) => {
  return (
    <ul className="relative w-full h-[calc(100%-150px)] flex flex-col gap-[1.4em] text-[22px] py-[1.4em] bg-[#0D0F10]">
      <Link href="/shop-page" className="hover:text-[#75F94C]">
        <li>All offers</li>
      </Link>

      <Link href="/shop-page" className="hover:text-[#75F94C]">
        <li>Popular games</li>
      </Link>

      <Link href="/shop-page" className="hover:text-[#75F94C]">
        <li>Latest games</li>
      </Link>

      {categories.map(({ categoryName }, i) => (
        <button
          key={i}
          className="w-full flex items-center justify-between gap-[0.2em] hover:text-[#75F94C]"
          onClick={() => {
            setSelectedContent((prev) => ({
              ...prev,
              selectedSubCategory: categoryName,
            }));

            categoryMenuStates.isSubCategoryMenuOpen === undefined
              ? setCategoryMenuStates((prev) => ({
                  ...prev,
                  isSubCategoryMenuOpen: true,
                }))
              : setCategoryMenuStates((prev) => ({
                  ...prev,
                  isSubCategoryMenuOpen: !prev.isSubCategoryMenuOpen,
                }));
          }}
        >
          <h4>{categoryName}</h4>
          <IoIosArrowForward />
        </button>
      ))}

      {children}
    </ul>
  );
};

export default CategoryMenu;
