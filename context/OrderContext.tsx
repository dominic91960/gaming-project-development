import axiosInstance from "@/axios/axiosInstance";
import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import toast from "react-hot-toast";

interface OrderItem {
  productImage: string;
  productName: string;
  productCode: string;
  regularPrice: number;
  quantity: number;
  total: number;
}

interface AllOrdersNew {
  id: string;
  order_id: string;
  username: string;
  totalAmount: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
}
interface AllOrdersNew {
  id: string;
  order_id: string;
  username: string;
  totalAmount: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

interface OrderContextProps {
  allOrders: AllOrdersNew[];
  loading: boolean;
  getAllOrders: (page: number, search: string) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  totalPages: number;
  setTotalPages: (totalPages: number) => void;
  setSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
  deleteOrderById: (id: string) => void;
  updateOrderStatusById: (id: string, status: string) => void;
  reloadOrders: boolean;
  setReloadOrders: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [allOrders, setAllOrders] = useState<AllOrdersNew[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [reloadOrders, setReloadOrders] = useState<boolean>(false);

  // show toast
  const showToast = (value: boolean, message: string) => {
    value ? toast.success(message) : toast.error(message);
  };

  const getAllOrders = async (page: number, search?: string) => {
    setLoading(true); // Start loading spinner
    try {
      const response = await axiosInstance.get(
        `orders?page=${page}&search=${search}&limit=10`
      );
      const { orders, totalPages } = response.data;
      setAllOrders(orders || []);
      setTotalPages(totalPages);

      showToast(true, "Orders fetched successfully.");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch orders.";
      showToast(false, errorMessage);
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  const deleteOrderById = async (id: string) => {
    try {
      await axiosInstance.delete(`orders/${id}`);
      setCurrentPage(1);
      setAllOrders(allOrders.filter((order) => order.id != id));
    } catch (error) {
    }
  };

  const updateOrderStatusById = async (id: string, status: string) => {
    try {
      const response = await axiosInstance.patch(`orders/${id}/${status}`);

    } catch (error) {}
  };

  return (
    <OrderContext.Provider
      value={{
        allOrders,
        loading,
        getAllOrders,
        currentPage,
        setCurrentPage,
        setSearchTerm,
        searchTerm,
        totalPages,
        setTotalPages,
        deleteOrderById,
        updateOrderStatusById,
        reloadOrders,
        setReloadOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
