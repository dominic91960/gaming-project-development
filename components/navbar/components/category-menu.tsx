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
  children: ReactNode;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({
  categories,
  categoryMenuStates,
  setCategoryMenuStates,
  children,
}) => {
  return (
    <ul className="relative w-full h-[calc(100%-70px)] text-[18px] bg-red-500">
      {categories.map(({ categoryName }, i) => (
        <button
          key={i}
          className="w-full flex items-center justify-between gap-[0.2em]"
          onClick={() => {
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
