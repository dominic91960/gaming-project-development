import React, { Dispatch, ReactNode, SetStateAction } from "react";

interface CategoryMenuState {
  isCategoryMenuOpen: boolean | undefined;
  isSubCategoryMenuOpen: boolean | undefined;
  isSuperSubCategoryMenuOpen: boolean | undefined;
}

interface SubCategoryMenuProps {
  categoryMenuStates: CategoryMenuState;
  setCategoryMenuStates: Dispatch<SetStateAction<CategoryMenuState>>;
  children: ReactNode;
}

const SubCategoryMenu: React.FC<SubCategoryMenuProps> = ({
  categoryMenuStates,
  setCategoryMenuStates,
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
      } absolute top-0 right-0 w-full h-full bg-yellow-500`}
    >
      <button
        onClick={() => {
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
        open super sub
      </button>

      {children}
    </ul>
  );
};

export default SubCategoryMenu;
