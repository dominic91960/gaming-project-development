import Link from "next/link";
import React, { Dispatch, ReactNode, SetStateAction } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
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
    <ScrollArea className="w-full h-[calc(100%-150px)]" type="auto">
      <ul className="relative w-full h-full flex flex-col gap-[1.4em] text-[16px] py-[1.4em] bg-[#0D0F10] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] 2xl:text-[22px]">
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
            className="w-full flex items-center justify-between gap-[0.2em] pe-[0.5em] hover:text-[#75F94C]"
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
    </ScrollArea>
  );
};

export default CategoryMenu;
