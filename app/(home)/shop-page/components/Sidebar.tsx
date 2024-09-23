// components/Sidebar.tsx
import React, { useState } from "react";

interface SidebarProps {
  onCategoryChange: (category: string | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCategoryChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    onCategoryChange(category);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-1/4 bg-gray-800 p-4">
      <h2 className="text-xl mb-4">Categories</h2>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="w-full text-left flex justify-between items-center p-2 bg-gray-700 rounded"
        >
          {selectedCategory ? selectedCategory : "Select Category"}
          <span>{isDropdownOpen ? "▲" : "▼"}</span>
        </button>
        {isDropdownOpen && (
          <ul className="absolute left-0 w-full mt-2 bg-gray-700 rounded shadow-lg">
            <li
              className="p-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => handleCategorySelect(null)}
            >
              All
            </li>
            <li
              className="p-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => handleCategorySelect("Racing")}
            >
              Racing
            </li>
            <li
              className="p-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => handleCategorySelect("Shooting")}
            >
              Shooting
            </li>
            <li
              className="p-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => handleCategorySelect("Adventure")}
            >
              Adventure
            </li>
            <li
              className="p-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => handleCategorySelect("Action")}
            >
              Action
            </li>
            <li
              className="p-2 hover:bg-gray-600 cursor-pointer"
              onClick={() => handleCategorySelect("Strategy")}
            >
              Strategy
            </li>
          </ul>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl mb-4">Price</h2>
        <input type="range" min="0" max="110" className="w-full" />
      </div>

      <div className="mt-6">
        <h2 className="text-xl mb-4">Rating</h2>
        <div className="flex items-center space-x-1">
          <span>⭐⭐⭐⭐⭐</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
