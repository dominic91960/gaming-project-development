import React from "react";

interface CategoryMenuState {
  isCategoryMenuOpen: boolean | undefined;
  isSubCategoryMenuOpen: boolean | undefined;
  isSuperSubCategoryMenuOpen: boolean | undefined;
}

interface SuperSubCategoryMenuProps {
  categoryMenuStates: CategoryMenuState;
}

const SuperSubCategoryMenu: React.FC<SuperSubCategoryMenuProps> = ({
  categoryMenuStates,
}) => {
  return (
    <ul
      className={`${
        categoryMenuStates.isSuperSubCategoryMenuOpen
          ? "animate-super-sub-category-menu"
          : categoryMenuStates.isSuperSubCategoryMenuOpen === false
          ? "reverse-animate-super-sub-category-menu"
          : "hidden"
      } absolute top-0 right-0 w-full h-full bg-blue-500`}
    >
      <button>item</button>
    </ul>
  );
};

export default SuperSubCategoryMenu;
