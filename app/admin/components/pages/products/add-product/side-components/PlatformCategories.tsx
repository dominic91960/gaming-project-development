import { useState } from "react";

const PlatformCategories = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-green-700 p-4 rounded-md max-w-xs">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <h2 className="text-white font-semibold">Platform Categories</h2>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-40 mt-2" : "max-h-0"
        }`}
      >
        <h3 className="text-white text-sm mb-2">All Platform</h3>
        <div
          className={`bg-black border border-gray-600 rounded-md p-2 ${
            isOpen ? "max-h-32 overflow-y-auto" : "hidden"
          }`}
        >
          <ul className="text-white text-sm space-y-2">
            {[
              "Steam games",
              "Ubisoft",
              "Origins games",
              "Epic games",
              "Gog games",
              "Xbox Live",
              "Upcoming games",
            ].map((brand) => (
              <li key={brand} className="flex items-center">
                <input type="checkbox" className="mr-2" />
                {brand}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center mt-2"></div>
      </div>

      <a href="#" className="text-green-500 text-sm mt-2 inline-block">
        Add new platform
      </a>
    </div>
  );
};

export default PlatformCategories;
