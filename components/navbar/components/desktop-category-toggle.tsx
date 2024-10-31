import React, { SetStateAction } from "react";

interface DesktopCategoryToggleProps {
  isCategoryMenuToggled: boolean | undefined;
  setIsCategoryMenuToggled: (
    value: SetStateAction<boolean | undefined>
  ) => void;
}

const DesktopCategoryToggle: React.FC<DesktopCategoryToggleProps> = ({
  isCategoryMenuToggled,
  setIsCategoryMenuToggled,
}) => {
  return (
    <button
      className="font-semibold capitalize bg-[#23262B] hidden flex-shrink-0 md:flex md:items-center md:gap-[0.4em] px-[0.8em] py-[0.4em] hover:scale-[102%]"
      onClick={() => {
        if (isCategoryMenuToggled === undefined) {
          return setIsCategoryMenuToggled(true);
        }
        setIsCategoryMenuToggled((prev) => !prev);
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
