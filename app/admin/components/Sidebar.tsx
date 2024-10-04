"use client";
import { Dispatch, SetStateAction, useState } from "react";

import { BsFillGrid1X2Fill } from "react-icons/bs";
import {
  FaBoxArchive,
  FaBoxesPacking,
  FaSquarePlus,
  FaUser,
  FaUsers,
} from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoPricetagsSharp, IoPricetagSharp } from "react-icons/io5";
import { FaLaptop, FaShoppingBag } from "react-icons/fa";
import { TiSpanner } from "react-icons/ti";
import { RiShieldStarFill } from "react-icons/ri";

import SidebarLink from "./SidebarLink";
import SidebarButton from "./SidebarButton";

interface SidebarProps {
  onSelect: (content: string) => void;
  isMobileNavToggled: boolean;
  setIsMobileNavToggled: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  onSelect,
  isMobileNavToggled,
  setIsMobileNavToggled,
}) => {
  const [isProductOpen, setProductOpen] = useState(false);
  const [isUsersOpen, setUsersOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onSelect(item);
  };

  return (
    <div
      className={`${
        isMobileNavToggled ? "block" : "hidden sm:block"
      } relative w-[16em] bg-black/60 font-secondaryFont text-[12px] text-white min-h-screen pt-[2.5em] border-t border-e border-[#0D6D49] z-50`}
    >
      <ul>
        {/* Dashboard Section */}
        <button
          className={`flex justify-between items-center w-full py-[1em] px-[2.5em] mb-[1em] hover:opacity-80 ${
            selectedItem === "dashboard"
              ? "bg-gradient-to-r from-black to-[#0D6D49]"
              : ""
          }`}
          onClick={() => handleItemClick("dashboard")}
        >
          <div className="flex items-center gap-x-[0.7em]">
            <BsFillGrid1X2Fill />
            <span>Dashboard</span>
          </div>
        </button>

        {/* Product Section */}
        <li className="mb-[1em]">
          <SidebarButton
            itemArray={[
              "all-products",
              "add-new",
              "categories",
              "tags",
              "brands",
              "platforms",
            ]}
            selectedItem={selectedItem}
            isMenuOpen={isProductOpen}
            setMenuOpen={setProductOpen}
            buttonText="Products"
          >
            <FaBoxArchive />
          </SidebarButton>
          {isProductOpen && (
            <ul>
              <SidebarLink
                selectedItem={selectedItem}
                itemName="all-products"
                handleItemClick={handleItemClick}
              >
                <FaBoxesPacking />
              </SidebarLink>
              <SidebarLink
                selectedItem={selectedItem}
                itemName="add-new"
                handleItemClick={handleItemClick}
              >
                <FaSquarePlus />
              </SidebarLink>
              <SidebarLink
                selectedItem={selectedItem}
                itemName="categories"
                handleItemClick={handleItemClick}
              >
                <BiSolidCategoryAlt />
              </SidebarLink>
              <SidebarLink
                selectedItem={selectedItem}
                itemName="tags"
                handleItemClick={handleItemClick}
              >
                <IoPricetagsSharp />
              </SidebarLink>
              <SidebarLink
                selectedItem={selectedItem}
                itemName="brands"
                handleItemClick={handleItemClick}
              >
                <IoPricetagSharp />
              </SidebarLink>
              <SidebarLink
                selectedItem={selectedItem}
                itemName="platforms"
                handleItemClick={handleItemClick}
              >
                <FaLaptop />
              </SidebarLink>
            </ul>
          )}
        </li>

        {/* Customers Section */}
        <li className="mb-[1em]">
          <button
            className={`flex justify-between items-center w-full py-[1em] px-[2.5em] mb-[1em] hover:opacity-80 ${
              selectedItem === "customers"
                ? "bg-gradient-to-r from-black to-[#0D6D49]"
                : ""
            }`}
            onClick={() => handleItemClick("customers")}
          >
            <div className="flex items-center gap-x-[0.7em]">
              <FaUser />
              <span>Customer</span>
            </div>
          </button>
        </li>

        {/* Users Section */}
        <li className="mb-[1em]">
          <SidebarButton
            itemArray={["all-users", "roles"]}
            selectedItem={selectedItem}
            isMenuOpen={isUsersOpen}
            setMenuOpen={setUsersOpen}
            buttonText="Users"
          >
            <FaUsers />
          </SidebarButton>
          {isUsersOpen && (
            <ul>
              <SidebarLink
                selectedItem={selectedItem}
                itemName="all-users"
                handleItemClick={handleItemClick}
              >
                <FaUsers />
              </SidebarLink>
              <SidebarLink
                selectedItem={selectedItem}
                itemName="roles"
                handleItemClick={handleItemClick}
              >
                <TiSpanner />
              </SidebarLink>
            </ul>
          )}
        </li>

        {/* Orders Section */}
        <button
          className={`flex justify-between items-center w-full py-[1em] px-[2.5em] mb-[1em] hover:opacity-80 ${
            selectedItem === "orders"
              ? "bg-gradient-to-r from-black to-[#0D6D49]"
              : ""
          }`}
          onClick={() => handleItemClick("orders")}
        >
          <div className="flex items-center gap-x-[0.7em]">
            <FaShoppingBag />
            <span>Orders</span>
          </div>
        </button>

        {/* Reviews Section */}
        <button
          className={`flex justify-between items-center w-full py-[1em] px-[2.5em] mb-[1em] hover:opacity-80 ${
            selectedItem === "reviews"
              ? "bg-gradient-to-r from-black to-[#0D6D49]"
              : ""
          }`}
          onClick={() => handleItemClick("reviews")}
        >
          <div className="flex items-center gap-x-[0.7em]">
            <RiShieldStarFill />
            <span>Reviews</span>
          </div>
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
