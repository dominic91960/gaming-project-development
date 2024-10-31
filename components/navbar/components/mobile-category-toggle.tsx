import React, { SetStateAction } from "react";

interface MobileCategoryToggleProps {
  isContentChanged: boolean;
  isMobileNavToggled: boolean;
  setIsMobileNavToggled: (value: SetStateAction<boolean>) => void;
  isCategoryMenuToggled: boolean | undefined;
  setIsCategoryMenuToggled: (
    value: SetStateAction<boolean | undefined>
  ) => void;
}

const MobileCategoryToggle: React.FC<MobileCategoryToggleProps> = ({
  isContentChanged,
  isMobileNavToggled,
  setIsMobileNavToggled,
  isCategoryMenuToggled,
  setIsCategoryMenuToggled,
}) => {
  const handleClick = () => {
    if (isMobileNavToggled) {
      setIsMobileNavToggled(false);
      setTimeout(() => {
        isCategoryMenuToggled === undefined
          ? setIsCategoryMenuToggled(true)
          : setIsCategoryMenuToggled((prev) => !prev);
      }, 500);
      return;
    }
    isCategoryMenuToggled === undefined
      ? setIsCategoryMenuToggled(true)
      : setIsCategoryMenuToggled((prev) => !prev);
  };

  return (
    <button
      className={`md:hidden absolute bottom-0 left-0 translate-y-[130%] bg-[#0BDB45] flex items-center justify-center transition-all duration-700 text-[0.8em] sm:text-[0.9em] ease-in-out capitalize px-[1em] py-[0.5em] z-40 ${
        isContentChanged ? "w-[1ch]" : "w-[14ch]"
      }`}
      onClick={handleClick}
    >
      <p className={isContentChanged ? "hidden" : "block"}>All categories</p>
      <p className={!isContentChanged ? "hidden" : "block"}>&#8942;</p>
    </button>
  );
};

export default MobileCategoryToggle;
