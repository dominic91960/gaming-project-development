import React from "react";

interface SuperSubCategoryMenuProps {
  isSuperSubCategoryMenuToggled: boolean | undefined;
}

const SuperSubCategoryMenu: React.FC<SuperSubCategoryMenuProps> = ({
  isSuperSubCategoryMenuToggled,
}) => {
  return (
    <ul
      className={`${
        isSuperSubCategoryMenuToggled
          ? "animate-super-sub-category-menu"
          : isSuperSubCategoryMenuToggled === false
          ? "reverse-animate-super-sub-category-menu"
          : "hidden"
      } absolute top-0 right-0 w-full h-full bg-blue-500`}
    >
      <button>item</button>
    </ul>
  );
};

export default SuperSubCategoryMenu;
