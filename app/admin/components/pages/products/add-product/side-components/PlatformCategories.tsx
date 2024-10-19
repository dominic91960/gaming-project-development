import { useEffect, useState } from "react";

import axiosInstance from "@/axios/axiosInstance";
import toast from "react-hot-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

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

const PlatformCategories = ({
  platform,
  setPlatform,
}: PlatformCategoriesProps) => {
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
    <div className="bg-black/40 mb-[2.8em] px-[2em] py-[1em] border border-[#0D6D49] rounded-sm backdrop-blur-[2px]">
      <div
        className="flex justify-between items-center cursor-pointer text-[1.2em] mb-[0.1em] hover:opacity-85"
        onClick={toggleDropdown}
      >
        <p className="select-none">Platform Categories</p>
        <button type="button">
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>
      <hr className="border-t-[#606060] mb-[0.6em]" />

      <div
        className={`${
          isOpen ? "h-[23em] lg:h-[13em]" : "h-0"
        } overflow-clip transition-all duration-500`}
      >
        <p className="text-[1.1em] mb-[0.5em]">All Platforms</p>

        <ScrollArea className="h-[20em] px-2 py-2 border border-[#606060] rounded-sm mb-[0.9em] lg:h-[10em]">
          <RadioGroup onValueChange={(value: string) => setPlatform(value)}>
            {platforms.map((platformItem) => (
              <div
                key={platformItem.id}
                className="w-fit flex items-center gap-x-[0.3em] mb-5 hover:opacity-85 lg:text-[12px] xl:mb-[1em]"
              >
                <RadioGroupItem value={platformItem.id} id={platformItem.id} />
                <label
                  htmlFor={platformItem.id}
                  className="cursor-pointer select-none"
                >
                  {platformItem.name}
                </label>
              </div>
            ))}
          </RadioGroup>
        </ScrollArea>
      </div>

      <a href="#" className="text-[#0BDB45] hover:opacity-85">
        Add new platform
      </a>
    </div>
  );
};

export default PlatformCategories;
