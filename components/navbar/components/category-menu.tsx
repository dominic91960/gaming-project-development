import React, { ReactNode, SetStateAction } from "react";

import { IoIosArrowForward } from "react-icons/io";

interface CategoryMenuProps {
  categories: {
    categoryName: string;
    platforms: string[];
    genres: string[];
  }[];
  isSubCategoryMenuToggled: boolean | undefined;
  setIsSubCategoryMenuToggled: (
    value: SetStateAction<boolean | undefined>
  ) => void;
  children: ReactNode;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  categories,
  isSubCategoryMenuToggled,
  setIsSubCategoryMenuToggled,
  children,
}) => {
  return (
    <ul className="relative w-full h-[calc(100%-70px)] text-[18px] bg-red-500">
      {categories.map(({ categoryName }, i) => (
        <button
          key={i}
          className="w-full flex items-center justify-between gap-[0.2em]"
          onClick={() => {
            isSubCategoryMenuToggled === undefined
              ? setIsSubCategoryMenuToggled(true)
              : setIsSubCategoryMenuToggled((prev) => !prev);
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
