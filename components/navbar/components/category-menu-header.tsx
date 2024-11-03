import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

import logo from "@/public/images/logo.png";

interface CategoryMenuState {
  isCategoryMenuOpen: boolean | undefined;
  isSubCategoryMenuOpen: boolean | undefined;
  isSuperSubCategoryMenuOpen: boolean | undefined;
}

interface CategoryMenuHeaderProps {
  selectedContent: {
    selectedSubCategory: string;
    selectedSuperSubCategory: string;
  };
  categoryMenuStates: CategoryMenuState;
  setCategoryMenuStates: Dispatch<SetStateAction<CategoryMenuState>>;
}

const CategoryMenuHeader: React.FC<CategoryMenuHeaderProps> = ({
  selectedContent,
  categoryMenuStates,
  setCategoryMenuStates,
}) => {
  const handleLogoClick = () => {
    setCategoryMenuStates({
      isCategoryMenuOpen: false,
      isSubCategoryMenuOpen: undefined,
      isSuperSubCategoryMenuOpen: undefined,
    });
  };

  const closeSubCategoryMenu = () => {
    setCategoryMenuStates((prev) => ({
      ...prev,
      isSubCategoryMenuOpen: false,
      isSuperSubCategoryMenuOpen: undefined,
    }));
  };

  const closeSuperSubCategoryMenu = () => {
    setCategoryMenuStates((prev) => ({
      ...prev,
      isSuperSubCategoryMenuOpen: false,
    }));
  };

  const onClose = () => {
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
  };

  let content = (
    <div className="w-full h-full flex items-center justify-center">
      <button
        className="flex items-center gap-[0.8em] translate-y-[0.2em]"
        onClick={handleLogoClick}
      >
        <Image src={logo} alt="VINGAME" className="w-auto h-[70px]" />
        <h4 className="font-semibold">VINGAME</h4>
      </button>
    </div>
  );

  if (categoryMenuStates.isSubCategoryMenuOpen)
    content = (
      <div className="w-full h-full flex flex-col justify-between font-bold capitalize">
        <div className="flex justify-between text-[0.8em] pt-[1em]">
          <button
            className="flex items-center gap-[0.2em]  capitalize hover:text-[#75F94C]"
            onClick={closeSubCategoryMenu}
          >
            <IoIosArrowBack />
          </button>

          <button className="hover:text-[#75F94C]" onClick={onClose}>
            <AiOutlineClose />
          </button>
        </div>

        <h4>{selectedContent.selectedSubCategory}</h4>
      </div>
    );

  if (categoryMenuStates.isSuperSubCategoryMenuOpen)
    content = (
      <div className="w-full h-full flex flex-col justify-between font-bold capitalize">
        <div className="flex justify-between text-[0.8em] pt-[1em]">
          <button
            className="flex items-center gap-[0.2em]  capitalize hover:text-[#75F94C]"
            onClick={closeSuperSubCategoryMenu}
          >
            <IoIosArrowBack />
          </button>

          <button className="hover:text-[#75F94C]" onClick={onClose}>
            <AiOutlineClose />
          </button>
        </div>

        <h4>{selectedContent.selectedSuperSubCategory}</h4>
      </div>
    );

  return (
    <div className="w-full h-[120px] text-[22px] border-b border-b-white/50 sm:text-[23px] md:text-[24px] lg:text-[25px] xl:text-[26px] 2xl:text-[28px]">
      {content}
    </div>
  );
};

export default CategoryMenuHeader;
