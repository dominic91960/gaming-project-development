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
interface Category1 {
  name: string;
  description: string;
  image: string;
  level: any;
  parentId: string | null;
}

interface CategoryContextProps {
  categories: Category[];
  loading: boolean;
  deleteCategoriesById: (id: string) => void;
  addNewCategory: (data: Category1) => void;
  editCategory: any;
  setEditCategory: (editCategory: any) => void;
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
  const [editCategory, setEditCategory] = useState<any>({});

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
      showToast(
        false,
        error.response?.data?.message || "Failed to fetch categories"
      );
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  const deleteCategoriesById = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/categories/${id}`);
      if (res.status === 200) {
        toast.success("Category deleted successfully");
        // Update the categories state by removing the deleted category
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );
      } else if (res.status === 404) {
        toast.error("Category not found");
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  const addNewCategory = async (data: Category1) => {
    try {
      const res = await axiosInstance.post("/categories", data);
      if (res.status === 201) {
        toast.success("Category added successfully");
        await getAllCategories();
      } else {
        toast.error("Failed to add category");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category");
    } finally {
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        deleteCategoriesById,
        addNewCategory,
        setEditCategory,
        editCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
