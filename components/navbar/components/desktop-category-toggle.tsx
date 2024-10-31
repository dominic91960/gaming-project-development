import React, { Dispatch, SetStateAction } from "react";

interface CategoryMenuState {
  isCategoryMenuOpen: boolean | undefined;
  isSubCategoryMenuOpen: boolean | undefined;
  isSuperSubCategoryMenuOpen: boolean | undefined;
}

interface DesktopCategoryToggleProps {
  categoryMenuStates: CategoryMenuState;
  setCategoryMenuStates: Dispatch<SetStateAction<CategoryMenuState>>;
}

const DesktopCategoryToggle: React.FC<DesktopCategoryToggleProps> = ({
  categoryMenuStates,
  setCategoryMenuStates,
}) => {
  return (
    <button
      className="font-semibold capitalize bg-[#23262B] hidden flex-shrink-0 md:flex md:items-center md:gap-[0.4em] px-[0.8em] py-[0.4em] hover:scale-[102%]"
      onClick={() => {
        if (categoryMenuStates.isCategoryMenuOpen === undefined) {
          return setCategoryMenuStates((prev) => ({
            ...prev,
            isCategoryMenuOpen: true,
          }));
        }
        setCategoryMenuStates((prev) => ({
          ...prev,
          isCategoryMenuOpen: !prev.isCategoryMenuOpen,
        }));
      }}
    >
      <div className="space-y-[0.2em] pe-[0.1em]">
        <div className="w-[1.2em] h-0.5 bg-white"></div>
        <div className="w-[0.8em] h-0.5 bg-white"></div>
        <div className="w-[1.2em] h-0.5 bg-white"></div>
      </div>
      <h4>All categories</h4>
    </button>
  );
};

export default DesktopCategoryToggle;
