import React, { Dispatch, SetStateAction } from "react";

interface CategoryMenuState {
  isCategoryMenuOpen: boolean | undefined;
  isSubCategoryMenuOpen: boolean | undefined;
  isSuperSubCategoryMenuOpen: boolean | undefined;
}

interface MobileCategoryToggleProps {
  isContentChanged: boolean;
  isMobileNavToggled: boolean;
  setIsMobileNavToggled: (value: SetStateAction<boolean>) => void;
  categoryMenuStates: CategoryMenuState;
  setCategoryMenuStates: Dispatch<SetStateAction<CategoryMenuState>>;
}

const MobileCategoryToggle: React.FC<MobileCategoryToggleProps> = ({
  isContentChanged,
  isMobileNavToggled,
  setIsMobileNavToggled,
  categoryMenuStates,
  setCategoryMenuStates,
}) => {
  const handleClick = () => {
    if (isMobileNavToggled) {
      setIsMobileNavToggled(false);
      setTimeout(() => {
        categoryMenuStates.isCategoryMenuOpen === undefined
          ? setCategoryMenuStates((prev) => ({
              ...prev,
              isCategoryMenuOpen: true,
            }))
          : setCategoryMenuStates((prev) => ({
              ...prev,
              isCategoryMenuOpen: !prev.isCategoryMenuOpen,
            }));
      }, 500);
      return;
    }
    categoryMenuStates.isCategoryMenuOpen === undefined
      ? setCategoryMenuStates((prev) => ({
          ...prev,
          isCategoryMenuOpen: true,
        }))
      : setCategoryMenuStates((prev) => ({
          ...prev,
          isCategoryMenuOpen: !prev.isCategoryMenuOpen,
        }));
  };

  return (
    <button
      className={`md:hidden absolute bottom-0 left-0 translate-y-[130%] bg-[#0B0E13] border border-[#0BDB45] border-l-0 flex items-center justify-center transition-all duration-700 text-[0.8em] sm:text-[0.9em] ease-in-out capitalize px-[1em] py-[0.5em] z-40 ${
        isContentChanged ? "size-[42px]" : "w-[14ch]"
      }`}
      onClick={handleClick}
    >
      <p className={isContentChanged ? "hidden" : "block animate-pulse"}>
        All categories
      </p>
      <p
        className={
          !isContentChanged ? "hidden" : "block text-[#0BDB45] text-[1.5em]"
        }
      >
        &#8942;
      </p>
    </button>
  );
};

export default MobileCategoryToggle;
