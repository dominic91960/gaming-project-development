import React, { ReactNode, SetStateAction } from "react";

interface SubCategoryMenuProps {
  isSubCategoryMenuToggled: boolean | undefined;
  isSuperSubCategoryMenuToggled: boolean | undefined;
  setIsSuperSubCategoryMenuToggled: (
    value: SetStateAction<boolean | undefined>
  ) => void;
  children: ReactNode;
}

const SubCategoryMenu: React.FC<SubCategoryMenuProps> = ({
  isSubCategoryMenuToggled,
  isSuperSubCategoryMenuToggled,
  setIsSuperSubCategoryMenuToggled,
  children,
}) => {
  return (
    <ul
      className={`${
        isSubCategoryMenuToggled
          ? "animate-sub-category-menu"
          : isSubCategoryMenuToggled === false
          ? "reverse-animate-sub-category-menu"
          : "hidden"
      } absolute top-0 right-0 w-full h-full bg-yellow-500`}
    >
      <button
        onClick={() => {
          isSuperSubCategoryMenuToggled === undefined
            ? setIsSuperSubCategoryMenuToggled(true)
            : setIsSuperSubCategoryMenuToggled((prev) => !prev);
        }}
      >
        open super sub
      </button>

      {children}
    </ul>
  );
};

export default SubCategoryMenu;
