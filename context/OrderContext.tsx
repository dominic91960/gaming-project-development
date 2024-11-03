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

interface OrderContextProps {
  allOrders: AllOrdersNew[];
  loading: boolean;
  getAllOrders:() => void;
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
  const [loading, setLoading] = useState<boolean>(false); // Track loading state

  // show toast
  const showToast = (value: boolean, message: string) => {
    value ? toast.success(message) : toast.error(message);
  };

  const getAllOrders = async () => {
    try {
      const response = await axiosInstance.get("/orders");
      setAllOrders(response.data)

      showToast(true, response.data.message);
    } catch (error: any) {
      showToast(false, error.response.data.message);
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  // Fetch orders from the backend on mount
  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ allOrders, loading, getAllOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
