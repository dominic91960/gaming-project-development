"use client";
import { useState } from "react";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import SidebarLink from "./SidebarLink";
import SidebarButton from "./SidebarButton";

interface SidebarProps {
  onSelect: (content: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const [isProductOpen, setProductOpen] = useState(false);
  const [isUsersOpen, setUsersOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onSelect(item);
  };

  return (
    <div className="w-64 bg-black/60 font-secondaryFont text-white h-screen pt-[2.5em] border-t border-e border-[#0D6D49]">
      <ul>
        {/* Dashboard Section */}
        <button
          className={`flex justify-between items-center w-full py-[1em] px-[2.5em] mb-[1em] hover:bg-gradient-to-r from-black to-[#0D6D49] ${
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
            ]}
            selectedItem={selectedItem}
            isMenuOpen={isProductOpen}
            setMenuOpen={setProductOpen}
            buttonText="Products"
          >
            <BsFillGrid1X2Fill />
          </SidebarButton>
          {isProductOpen && (
            <ul>
              <SidebarLink
                selectedItem={selectedItem}
                itemName="all-products"
                handleItemClick={handleItemClick}
              >
                <BsFillGrid1X2Fill />
              </SidebarLink>
              <SidebarLink
                selectedItem={selectedItem}
                itemName="add-new"
                handleItemClick={handleItemClick}
              >
                <BsFillGrid1X2Fill />
              </SidebarLink>
              <SidebarLink
                selectedItem={selectedItem}
                itemName="categories"
                handleItemClick={handleItemClick}
              >
                <BsFillGrid1X2Fill />
              </SidebarLink>
              <SidebarLink
                selectedItem={selectedItem}
                itemName="tags"
                handleItemClick={handleItemClick}
              >
                <BsFillGrid1X2Fill />
              </SidebarLink>
              <SidebarLink
                selectedItem={selectedItem}
                itemName="brands"
                handleItemClick={handleItemClick}
              >
                <BsFillGrid1X2Fill />
              </SidebarLink>
              <SidebarLink
                selectedItem={selectedItem}
                itemName="platforms"
                handleItemClick={handleItemClick}
              >
                <BsFillGrid1X2Fill />
              </SidebarLink>
            </ul>
          )}
        </li>

        {/* Customers Section */}
        <li className="mb-[1em]">
          <button
            className={`flex justify-between items-center w-full py-[1em] px-[2.5em] mb-[1em] hover:bg-gradient-to-r from-black to-[#0D6D49] ${
              selectedItem === "customers"
                ? "bg-gradient-to-r from-black to-[#0D6D49]"
                : ""
            }`}
            onClick={() => handleItemClick("customers")}
          >
            <div className="flex items-center gap-x-[0.7em]">
              <BsFillGrid1X2Fill />
              <span>Customers</span>
            </div>
          </button>
        </li>

        {/* Users Section */}
        <li className="mb-[1em]">
          <SidebarButton
            itemArray={["all-users", "role"]}
            selectedItem={selectedItem}
            isMenuOpen={isUsersOpen}
            setMenuOpen={setUsersOpen}
            buttonText="Users"
          >
            <BsFillGrid1X2Fill />
          </SidebarButton>
          {isUsersOpen && (
            <ul>
              <SidebarLink
                selectedItem={selectedItem}
                itemName="all-users"
                handleItemClick={handleItemClick}
              >
                <BsFillGrid1X2Fill />
              </SidebarLink>
              <SidebarLink
                selectedItem={selectedItem}
                itemName="roles"
                handleItemClick={handleItemClick}
              >
                <BsFillGrid1X2Fill />
              </SidebarLink>
            </ul>
          )}
        </li>

        {/* Orders Section */}
        <button
          className={`flex justify-between items-center w-full py-[1em] px-[2.5em] mb-[1em] hover:bg-gradient-to-r from-black to-[#0D6D49] ${
            selectedItem === "orders"
              ? "bg-gradient-to-r from-black to-[#0D6D49]"
              : ""
          }`}
          onClick={() => handleItemClick("orders")}
        >
          <div className="flex items-center gap-x-[0.7em]">
            <BsFillGrid1X2Fill />
            <span>Orders</span>
          </div>
        </button>

        {/* Reviews Section */}
        <button
          className={`flex justify-between items-center w-full py-[1em] px-[2.5em] mb-[1em] hover:bg-gradient-to-r from-black to-[#0D6D49] ${
            selectedItem === "reviews"
              ? "bg-gradient-to-r from-black to-[#0D6D49]"
              : ""
          }`}
          onClick={() => handleItemClick("reviews")}
        >
          <div className="flex items-center gap-x-[0.7em]">
            <BsFillGrid1X2Fill />
            <span>Reviews</span>
          </div>
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
