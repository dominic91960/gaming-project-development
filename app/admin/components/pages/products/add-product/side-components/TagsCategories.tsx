import { useEffect, useState } from "react";
import axiosInstance from "@/axios/axiosInstance";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useSidebar } from "@/context/SidebarContext";

interface Tags {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface TagsCategoriesProps {
  tagIds: string[];
  setTagIds: (tags: string[]) => void;
  readOnly?: boolean; // Add this line
}

const TagsCategories = ({
  tagIds,
  setTagIds,
  readOnly = false,
}: TagsCategoriesProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [tags, setTags] = useState<Tags[]>([]);
  const { setSelectedItem } = useSidebar();

  // show toast
  const showToast = (value: boolean, message: string) => {
    value ? toast.success(message) : toast.error(message);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  const getAllBrands = async () => {
    setLoading(true); // Start spinner
    try {
      const response = await axiosInstance.get("/tags");
      setTags(response.data);
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

  const handleCheckboxChange = (tagId: string) => {
    if (readOnly) return; // Prevent interaction in read-only mode
    if (tagIds.includes(tagId)) {
      setTagIds(tagIds.filter((id) => id !== tagId));
    } else {
      setTagIds([...tagIds, tagId]);
    }
  };

  return (
    <div className="bg-black/40 mb-[2.8em] px-[2em] py-[1em] border border-[#0D6D49] rounded-sm backdrop-blur-[2px]">
      <div
        className="flex justify-between items-center cursor-pointer text-[1.2em] mb-[0.1em] hover:opacity-85"
        onClick={toggleDropdown}
      >
        <p className="select-none">Tags Categories</p>
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
        <p className="text-[1.1em] mb-[0.5em]">All Tags</p>

        <ScrollArea className="h-[20em] px-2 py-2 border border-[#606060] rounded-sm mb-[0.9em] lg:h-[10em]">
          <ul>
            {tags.map((tag) => (
              <li
                key={tag.id}
                className="w-fit flex items-center gap-x-[0.3em] mb-5 hover:opacity-85 lg:text-[12px] xl:mb-[1em]"
              >
                <Checkbox
                  id={tag.id}
                  className="bg-transparent border-[#606060] rounded-[2px] data-[state=checked]:bg-inherit data-[state=checked]:text-[#00FFA1]"
                  checked={tagIds.includes(tag.id)}
                  onCheckedChange={() => handleCheckboxChange(tag.id)}
                  disabled={readOnly} // Disable interaction in read-only mode
                />
                <label
                  htmlFor={tag.id}
                  className="cursor-pointer capitalize select-none"
                >
                  {tag.name}
                </label>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
      <div
        className="text-[#0BDB45] hover:opacity-85"
        onClick={() => setSelectedItem("tags")}
      >
        Add new tag
      </div>
    </div>
  );
};

export default TagsCategories;
