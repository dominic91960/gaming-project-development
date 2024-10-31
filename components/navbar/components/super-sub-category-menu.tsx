import React from "react";
import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";

interface CategoryMenuState {
  isCategoryMenuOpen: boolean | undefined;
  isSubCategoryMenuOpen: boolean | undefined;
  isSuperSubCategoryMenuOpen: boolean | undefined;
}

interface SuperSubCategoryMenuProps {
  categories: {
    categoryName: string;
    platforms: string[];
    genres: string[];
  }[];

  selectedContent: {
    selectedSubCategory: string;
    selectedSuperSubCategory: string;
  };

  categoryMenuStates: CategoryMenuState;
}

const SuperSubCategoryMenu: React.FC<SuperSubCategoryMenuProps> = ({
  categories,
  selectedContent,
  categoryMenuStates,
}) => {
  const setDisplayContent = () => {
    if (!selectedContent.selectedSubCategory) return;

    const content = categories.filter(
      ({ categoryName }) => categoryName === selectedContent.selectedSubCategory
    )[0];

    const filteredContent =
      content[
        selectedContent.selectedSuperSubCategory as "platforms" | "genres"
      ];

    return filteredContent;
  };

  return (
    <ul
      className={`${
        categoryMenuStates.isSuperSubCategoryMenuOpen
          ? "animate-super-sub-category-menu"
          : categoryMenuStates.isSuperSubCategoryMenuOpen === false
          ? "reverse-animate-super-sub-category-menu"
          : "hidden"
      } absolute top-0 right-0 w-full h-full text-[22px] py-[1.4em] bg-[#0D0F10]`}
    >
      <ScrollArea className="w-full h-full">
        {setDisplayContent()?.map((superSubCategory, i) => (
          <Link key={i} href="/shop-page" className="hover:text-[#75F94C]">
            <li className="mb-[1.4em]">{superSubCategory}</li>
          </Link>
        ))}
      </ScrollArea>
    </ul>
  );
};

export default SuperSubCategoryMenu;
