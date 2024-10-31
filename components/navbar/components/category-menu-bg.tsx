import React, { Dispatch, SetStateAction } from "react";

interface CategoryMenuState {
  isCategoryMenuOpen: boolean | undefined;
  isSubCategoryMenuOpen: boolean | undefined;
  isSuperSubCategoryMenuOpen: boolean | undefined;
}

interface CategoryMenuBgProps {
  categoryMenuStates: CategoryMenuState;
  setCategoryMenuStates: Dispatch<SetStateAction<CategoryMenuState>>;
}

const CategoryMenuBg: React.FC<CategoryMenuBgProps> = ({
  categoryMenuStates,
  setCategoryMenuStates,
}) => {
  return (
    <div
      className={`${
        categoryMenuStates.isCategoryMenuOpen ? "block" : "hidden"
      } fixed top-0 left-0 z-50 w-full h-full bg-black/30`}
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
    ></div>
  );
};

export default CategoryMenuBg;
