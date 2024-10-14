import axiosInstance from "@/axios/axiosInstance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Brands {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface BrandCategoriesProps {
  brand: string;
  setBrand: (brand: string) => void;
}

const BrandCategories = ({ brand, setBrand }: BrandCategoriesProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [brands, setBrands] = useState<Brands[]>([]);

  // show toast
  const showToast = (value: boolean, message: string) => {
    value ? toast.success(message) : toast.error(message);
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  const getAllBrands = async () => {
    setLoading(true); // Start spinner
    try {
      const response = await axiosInstance.get("/brands");
      setBrands(response.data);
      // showToast(true, "Categories fetched successfully"); // You can enable this toast if needed
    } catch (error: any) {
      showToast(
        false,
        error.response?.data?.message || "Failed to fetch categories"
      );
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleBrandSelect = (selectedBrand: string) => {
    setBrand(selectedBrand);
  };

  return (
    <div className="border border-green-700 p-4 rounded-md max-w-xs">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <h2 className="text-white font-semibold">Brand Categories</h2>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-40 mt-2" : "max-h-0"
        }`}
      >
        <h3 className="text-white text-sm mb-2">All brands</h3>
        <div
          className={`bg-black border border-gray-600 rounded-md p-2 ${
            isOpen ? "max-h-32 overflow-y-auto" : "hidden"
          }`}
        >
          <ul className="text-white text-sm space-y-2">
            {brands.map((brandItem) => (
              <li key={brandItem.id} className="flex items-center">
                <input
                  type="radio"
                  name="brand"
                  className="mr-2"
                  checked={brand === brandItem.name}
                  onChange={() => handleBrandSelect(brandItem.id)}
                />
                {brandItem.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center mt-2"></div>
      </div>

      <a href="#" className="text-green-500 text-sm mt-2 inline-block">
        Add new brand
      </a>
    </div>
  );
};

export default BrandCategories;
