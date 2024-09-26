"use client";
import { useState } from "react";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import SidebarLink from "./SidebarLink";
import SidebarButton from "./SidebarButton";

interface SidebarProps {
  onSelect: (content: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const [isDashboardOpen, setDashboardOpen] = useState(false);
  const [isProductOpen, setProductOpen] = useState(false);
  const [isUsersOpen, setUsersOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    onSelect(item);
  };
  const openDashboard = () => {
    setDashboardOpen((prev) => !prev);
    setProductOpen(false);
    setUsersOpen(false);
  };
  const openProduct = () => {
    setDashboardOpen(false);
    setProductOpen((prev) => !prev);
    setUsersOpen(false);
  };
  const openUsers = () => {
    setDashboardOpen(false);
    setProductOpen(false);
    setUsersOpen((prev) => !prev);
  };

  return (
    <div className="w-64 bg-black/60 font-secondaryFont text-white h-screen pt-[2.5em] border border-[#0D6D49]">
      <ul>
        {/* Dashboard Section */}
        <li className="mb-[1em]">
          <SidebarButton
            itemArray={["dashboard-item1", "user-details"]}
            selectedItem={selectedItem}
            isMenuOpen={isDashboardOpen}
            setMenuOpen={openDashboard}
            buttonText="Dashboard"
          >
            <BsFillGrid1X2Fill />
          </SidebarButton>
          {isDashboardOpen && (
            <ul>
              <SidebarLink
                selectedItem={selectedItem}
                itemName="dashboard-item1"
                handleItemClick={handleItemClick}
              >
                <BsFillGrid1X2Fill />
              </SidebarLink>
              <SidebarLink
                selectedItem={selectedItem}
                itemName="user-details"
                handleItemClick={handleItemClick}
              >
                <BsFillGrid1X2Fill />
              </SidebarLink>
            </ul>
          )}
        </li>

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
            setMenuOpen={openProduct}
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
            setMenuOpen={openUsers}
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
                itemName="role"
                handleItemClick={handleItemClick}
              >
                <BsFillGrid1X2Fill />
              </SidebarLink>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
