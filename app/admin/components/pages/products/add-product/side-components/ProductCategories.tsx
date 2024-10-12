import axiosInstance from "@/axios/axiosInstance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner/Spinner";

export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  level: number;
  parentId: string | null;
  children?: Category[];
};

const ProductCategories = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getAllCategoriesByObject();
  }, []);

  // show toast
  const showToast = (value: boolean, message: string) => {
    value ? toast.success(message) : toast.error(message);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getAllCategoriesByObject = async () => {
    setLoading(true); // Start spinner
    try {
      const response = await axiosInstance.get("/categories/object");
      setData(response.data); // Assuming the API returns the category structure
    } catch (error: any) {
      showToast(
        false,
        error.response?.data?.message || "Failed to fetch categories"
      );
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  const renderCategories = (categoryList: Category[]) => {
    return (
      <ul className="ml-4">
        {categoryList.map((category) => (
          <li key={category.id} className="mb-2">
            <input type="checkbox" className="mr-2" />
            {category.name}
            {category.children && category.children.length > 0 && renderCategories(category.children)}
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return <Spinner loading={loading} />;
  }

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
          {renderCategories(data)}
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
