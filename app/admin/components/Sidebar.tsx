"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-5">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul>
        {/* Dashboard Section */}
        <li className="mb-2">
          <button
            className="flex justify-between w-full py-2 px-4 hover:bg-gray-700"
            onClick={() => setDashboardOpen(!isDashboardOpen)}
          >
            <span>Dashboard</span>
            {isDashboardOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isDashboardOpen && (
            <ul className="ml-4">
              <li
                className={`py-1 px-4 hover:bg-gray-700 cursor-pointer ${
                  selectedItem === "dashboard-item1" ? "text-[#0BDB45]" : ""
                }`}
                onClick={() => handleItemClick("dashboard-item1")}
              >
                Dashboard Item
              </li>
              <li
                className={`py-1 px-4 hover:bg-gray-700 cursor-pointer ${
                  selectedItem === "user-details" ? "text-[#0BDB45]" : ""
                }`}
                onClick={() => handleItemClick("user-details")}
              >
                User Details
              </li>
            </ul>
          )}
        </li>

        {/* Product Section */}
        <li className="mb-2">
          <button
            className="flex justify-between w-full py-2 px-4 hover:bg-gray-700"
            onClick={() => setProductOpen(!isProductOpen)}
          >
            <span>Product</span>
            {isProductOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isProductOpen && (
            <ul className="ml-4">
              <li
                className={`py-1 px-4 hover:bg-gray-700 cursor-pointer ${
                  selectedItem === "all-products" ? "text-[#0BDB45]" : ""
                }`}
                onClick={() => handleItemClick("all-products")}
              >
                All Products
              </li>
              <li
                className={`py-1 px-4 hover:bg-gray-700 cursor-pointer ${
                  selectedItem === "add-new" ? "text-[#0BDB45]" : ""
                }`}
                onClick={() => handleItemClick("add-new")}
              >
                Add New
              </li>
              <li
                className={`py-1 px-4 hover:bg-gray-700 cursor-pointer ${
                  selectedItem === "categories" ? "text-[#0BDB45]" : ""
                }`}
                onClick={() => handleItemClick("categories")}
              >
                Categories
              </li>
              <li
                className={`py-1 px-4 hover:bg-gray-700 cursor-pointer ${
                  selectedItem === "tags" ? "text-[#0BDB45]" : ""
                }`}
                onClick={() => handleItemClick("tags")}
              >
                Tags
              </li>
              <li
                className={`py-1 px-4 hover:bg-gray-700 cursor-pointer ${
                  selectedItem === "brands" ? "text-[#0BDB45]" : ""
                }`}
                onClick={() => handleItemClick("brands")}
              >
                Brands
              </li>
            </ul>
          )}
        </li>

        {/* Customers Section */}
        <li className="mb-2">
          <button
            className={`w-full py-2 px-4 hover:bg-gray-700 ${
              selectedItem === "customers" ? "text-[#0BDB45]" : ""
            }`}
            onClick={() => handleItemClick("customers")}
          >
            Customers
          </button>
        </li>

        {/* Users Section */}
        <li className="mb-2">
          <button
            className="flex justify-between w-full py-2 px-4 hover:bg-gray-700"
            onClick={() => setUsersOpen(!isUsersOpen)}
          >
            <span>Users</span>
            {isUsersOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {isUsersOpen && (
            <ul className="ml-4">
              <li
                className={`py-1 px-4 hover:bg-gray-700 cursor-pointer ${
                  selectedItem === "all-users" ? "text-[#0BDB45]" : ""
                }`}
                onClick={() => handleItemClick("all-users")}
              >
                All Users
              </li>
              <li
                className={`py-1 px-4 hover:bg-gray-700 cursor-pointer ${
                  selectedItem === "role" ? "text-[#0BDB45]" : ""
                }`}
                onClick={() => handleItemClick("role")}
              >
                Role
              </li>
              <li
                className={`py-1 px-4 hover:bg-gray-700 cursor-pointer ${
                  selectedItem === "profile" ? "text-[#0BDB45]" : ""
                }`}
                onClick={() => handleItemClick("profile")}
              >
                Profile
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
