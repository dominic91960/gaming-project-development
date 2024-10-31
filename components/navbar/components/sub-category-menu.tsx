import React, { Dispatch, ReactNode, SetStateAction } from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface CategoryMenuState {
  isCategoryMenuOpen: boolean | undefined;
  isSubCategoryMenuOpen: boolean | undefined;
  isSuperSubCategoryMenuOpen: boolean | undefined;
}

interface SubCategoryMenuProps {
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

const SubCategoryMenu: React.FC<SubCategoryMenuProps> = ({
  categoryMenuStates,
  setCategoryMenuStates,
  setSelectedContent,
  children,
}) => {
  return (
    <ul
      className={`${
        categoryMenuStates.isSubCategoryMenuOpen
          ? "animate-sub-category-menu"
          : categoryMenuStates.isSubCategoryMenuOpen === false
          ? "reverse-animate-sub-category-menu"
          : "hidden"
      } absolute top-0 right-0 w-full h-full flex-col gap-[1.4em] py-[1.4em] bg-[#0D0F10]`}
    >
      <li className="hover:text-[#75F94C] cursor-pointer">
        <Link href="/shop-page">
          <span className="w-full">All offers</span>
        </Link>
      </li>

      <li className="hover:text-[#75F94C] cursor-pointer">
        <Link href="/shop-page">
          <span className="w-full">Games</span>
        </Link>
      </li>

      <li className="hover:text-[#75F94C] cursor-pointer">
        <Link href="/shop-page">
          <span className="w-full">Popular games</span>
        </Link>
      </li>

      <li className="hover:text-[#75F94C] cursor-pointer">
        <Link href="/shop-page">
          <span className="w-full">Latest games</span>
        </Link>
      </li>

      {["platforms", "genres"].map((subCategory, i) => (
        <button
          key={i}
          className="w-full flex items-center justify-between gap-[0.2em] capitalize hover:text-[#75F94C]"
          onClick={() => {
            setSelectedContent((prev) => ({
              ...prev,
              selectedSuperSubCategory: subCategory,
            }));

            categoryMenuStates.isSuperSubCategoryMenuOpen === undefined
              ? setCategoryMenuStates((prev) => ({
                  ...prev,
                  isSuperSubCategoryMenuOpen: true,
                }))
              : setCategoryMenuStates((prev) => ({
                  ...prev,
                  isSuperSubCategoryMenuOpen: !prev.isSuperSubCategoryMenuOpen,
                }));
          }}
        >
          <h4>{subCategory}</h4>
          <IoIosArrowForward />
        </button>
      ))}

      {children}
    </ul>
  );
};

export default SubCategoryMenu;
