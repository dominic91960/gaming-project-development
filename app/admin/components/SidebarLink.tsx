import React, { ReactNode } from "react";

interface SidebarLinkProps {
  selectedItem: string;
  itemName: string;
  handleItemClick: (item: string) => void;
  children: ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  selectedItem,
  itemName,
  handleItemClick,
  children,
}) => {
  return (
    <li
      className={`flex justify-between items-center py-[1em] ps-[3.4em] mb-[1em] hover:opacity-80 cursor-pointer ${
        selectedItem === itemName
          ? "bg-gradient-to-r from-black to-[#0D6D49]"
          : ""
      }`}
      onClick={() => handleItemClick(itemName)}
    >
      <div className="flex items-center gap-x-[0.7em] capitalize">
        {children}
        <span>{`${itemName.split("-")[0]} ${
          itemName.split("-")[1] || ""
        }`}</span>
      </div>
    </li>
  );
};

export default SidebarLink;
