import axiosInstance from "@/axios/axiosInstance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Platforms {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface PlatformCategoriesProps {
  platform: string;
  setPlatform: (value: string) => void;
}

const PlatformCategories = ({ platform, setPlatform }: PlatformCategoriesProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [platforms, setPlatforms] = useState<Platforms[]>([]);

  // show toast
  const showToast = (value: boolean, message: string) => {
    value ? toast.success(message) : toast.error(message);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getAllPlatforms();
  }, []);

  const getAllPlatforms = async () => {
    setLoading(true); // Start spinner
    try {
      const response = await axiosInstance.get("/platforms");
      setPlatforms(response.data);
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
            {platforms.map((platformItem) => (
              <li key={platformItem.id} className="flex items-center">
                <input
                  type="radio"
                  className="mr-2"
                  checked={platform === platformItem.id}
                  onChange={() => setPlatform(platformItem.id)}
                />
                {platformItem.name}
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
