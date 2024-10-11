import { useState } from "react";

type Category = {
  name: string;
  subCategories?: Category[];
};

const categories: Category[] = [
  {
    name: "PC games",
    subCategories: [
      {
        name: "Games",
      },
      {
        name: "sss",
        subCategories: [
          {
            name: "Games",
          },
        ],
      },
    ],
  },
];

const ProductCategories = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const renderCategories = (categoryList: Category[]) => {
    return (
      <ul className="ml-4">
        {categoryList.map((category, index) => (
          <li key={index} className="mb-2">
            <input type="checkbox" className="mr-2" />
            {category.name}
            {category.subCategories && renderCategories(category.subCategories)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="border border-green-700 p-4 rounded-md max-w-xs">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <h2 className="text-white font-semibold">Product categories</h2>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-64 mt-2" : "max-h-0 overflow-hidden"
        }`}
      >
        <h3 className="text-white text-sm mb-2">All categories</h3>
        <div
          className={`bg-black border border-gray-600 rounded-md p-2 ${
            isOpen ? "max-h-48 overflow-y-auto" : "hidden"
          }`}
        >
          {renderCategories(categories)}
        </div>
        <div className="text-center mt-2">
          <button className="text-white text-sm mt-2" onClick={toggleDropdown}>
            ▲
          </button>
        </div>
      </div>

      <a href="#" className="text-green-500 text-sm mt-2 inline-block">
        Add new category
      </a>
    </div>
  );
};

export default ProductCategories;
