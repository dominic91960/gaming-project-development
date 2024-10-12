import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosInstance from "@/axios/axiosInstance";
import toast from "react-hot-toast";

interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  level: number;
}

interface CategoryContextProps {
  categories: Category[];
  loading: boolean; // Expose loading state to manage spinner outside
}

const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext must be used within a CategoryProvider"
    );
  }
  return context;
};

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Track loading state

  // show toast
  const showToast = (value: boolean, message: string) => {
    value ? toast.success(message) : toast.error(message);
  };

  // Fetch categories from the backend on mount
  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    setLoading(true); // Start spinner
    try {
      const response = await axiosInstance.get("/categories/nested");
      const processedData: Category[] = response.data.map((item: any) => {
        let name = item.name;
        if (item.level === 2) {
          name = "- " + name;
        } else if (item.level === 3) {
          name = "- - " + name;
        } else if (item.level === 4) {
          name = "- - - " + name;
        }
        return {
          id: item.id,
          name: name,
          description: item.description,
          imageUrl: item.image?.url || "/images/sample-pic.png", // Fallback to sample image
          level: item.level, // Return the level field
        };
      });
      setCategories(processedData);
      // showToast(true, "Categories fetched successfully"); // You can enable this toast if needed
    } catch (error: any) {
      showToast(false, error.response?.data?.message || "Failed to fetch categories");
    } finally {
      setLoading(false); // Stop spinner
    }
  };
  

  return (
    <CategoryContext.Provider value={{ categories, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};
