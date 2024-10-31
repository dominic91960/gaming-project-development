import React, { SetStateAction } from "react";

interface MobileNavToggleProps {
  isMobileNavToggled: boolean;
  isCategoryMenuToggled: boolean | undefined;
  setIsCategoryMenuToggled: (
    value: SetStateAction<boolean | undefined>
  ) => void;
  setIsMobileNavToggled: (value: SetStateAction<boolean>) => void;
}

const MobileNavToggle: React.FC<MobileNavToggleProps> = ({
  isMobileNavToggled,
  isCategoryMenuToggled,
  setIsCategoryMenuToggled,
  setIsMobileNavToggled,
}) => {
  return (
    <button
      className={`${
        isMobileNavToggled ? "animate-toggle-button" : ""
      } relative h-4 w-6 transition-opacity duration-300 sm:hidden`}
      onClick={() => {
        if (isCategoryMenuToggled) {
          setIsCategoryMenuToggled(false);
          setTimeout(() => setIsMobileNavToggled((prev) => !prev), 600);
          return;
        }
        setIsMobileNavToggled((prev) => !prev);
      }}
    >
      <div className="absolute -mt-[0.5px] h-[1px] w-full rounded bg-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] transition-all duration-700 ease-in-out before:absolute before:left-0 before:h-[1px] before:w-full before:-translate-y-[6px] before:rounded before:bg-white before:transition-transform before:duration-700 before:ease-in-out after:absolute after:left-0 after:h-[1px] after:w-full after:translate-y-[6px] after:rounded after:bg-white after:transition-transform after:duration-700 after:ease-in-out"></div>
    </button>
  );
};

export default MobileNavToggle;
