"use client";
import {
  Dispatch,
  SetStateAction,
  useState,
  useContext,
  useEffect,
} from "react";

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
import { useSidebar } from "@/context/SidebarContext";
import "./admin.css";

interface SidebarProps {
  onSelect: (content: string) => void;
  isMobileNavToggled: boolean | undefined;
  setIsMobileNavToggled: Dispatch<SetStateAction<boolean | undefined>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  onSelect,
  isMobileNavToggled,
  setIsMobileNavToggled,
}) => {
  const [isProductOpen, setProductOpen] = useState(false);
  const [isUsersOpen, setUsersOpen] = useState(false);

  const { selectedItem, setSelectedItem } = useSidebar();

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onSelect(item);
    setIsMobileNavToggled(false);
  };

  useEffect(() => {
    if (selectedItem) {
      handleItemClick(selectedItem);
    }
  }, [selectedItem]);

  return (
    <div
      className={`${
        isMobileNavToggled
          ? "animate-admin-menu"
          : isMobileNavToggled === false
          ? "reverse-animate-admin-menu"
          : "hidden xl:block"
      } absolute w-[16em] min-h-full bg-black/60 font-secondaryFont text-[12px] text-white pt-[2.5em] border-e border-[#0D6D49] z-50 xl:relative sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-base backdrop-blur-md`}
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
        <li>
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
          <ul
            className={`${
              isProductOpen ? "max-h-[30em]" : "max-h-0"
            } transition-all duration-500 overflow-hidden`}
          >
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
        <li>
          <SidebarButton
            itemArray={["all-users", "roles"]}
            selectedItem={selectedItem}
            isMenuOpen={isUsersOpen}
            setMenuOpen={setUsersOpen}
            buttonText="Users"
          >
            <FaUsers />
          </SidebarButton>
          <ul
            className={`${
              isUsersOpen ? "max-h-[30em]" : "max-h-0"
            } transition-all duration-500 overflow-hidden`}
          >
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

        {/* Coupons Section */}
        <button
          className={`flex justify-between items-center w-full py-[1em] px-[2.5em] mb-[1em] hover:opacity-80 ${
            selectedItem === "coupons"
              ? "bg-gradient-to-r from-black to-[#0D6D49]"
              : ""
          }`}
          onClick={() => handleItemClick("coupons")}
        >
          <div className="flex items-center gap-x-[0.7em]">
            <RiShieldStarFill />
            <span>Coupons</span>
          </div>
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
