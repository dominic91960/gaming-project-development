import axiosInstance from "@/axios/axiosInstance";
import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import toast from "react-hot-toast";

export type AllCouponsNew = {
  id: string;
  code: string;
  discount: string;
  type: string;
  startDate: string;
  endDate: string;
  description: string;
};

interface NewCoupon {
  code: string;
  discount: string;
  type: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface CouponContextProps {
  allCoupons: AllCouponsNew[];
  loading: boolean;
  getAllCoupons: (page: number, search: string) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  totalPages: number;
  setTotalPages: (totalPages: number) => void;
  setSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
  reloadCoupons: boolean;
  setReloadCoupons: React.Dispatch<React.SetStateAction<boolean>>;
  addNewCoupon: (
    newCoupon: NewCoupon,
    callback: () => void
  ) => Promise<AllCouponsNew | null>;
  saveCoupon: (
    data: any,
    callback: () => void
  ) => Promise<AllCouponsNew | null>;
  deleteCouponById: (id: string) => void;
}

const CouponContext = createContext<CouponContextProps | undefined>(undefined);

export const useCouponContext = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error("useCouponContext must be used within a CouponProvider");
  }
  return context;
};

export const CouponProvider = ({ children }: { children: ReactNode }) => {
  const [allCoupons, setAllCoupons] = useState<AllCouponsNew[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [reloadCoupons, setReloadCoupons] = useState<boolean>(false);

  useEffect(() => {
    getAllCoupons(1);
  }, []);

  // Show toast
  const showToast = (value: boolean, message: string) => {
    value ? toast.success(message) : toast.error(message);
  };

  const addNewCoupon = async (newCoupon: NewCoupon, callback: () => void) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/coupons", newCoupon);
      const createdCoupon = response.data;
      getAllCoupons(1);

      // Add new coupon to allCoupons
      setAllCoupons((prevCoupons) => [...prevCoupons, createdCoupon]);

      // Show success toast
      showToast(true, "Coupon added successfully.");
      callback();

      return createdCoupon;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to add coupon.";
      console.error("Failed to add coupon:", errorMessage);
      showToast(false, errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAllCoupons = async (page: number, search?: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `coupons?page=${page}&search=${search || ""}&limit=10`
      );
      const { coupons, totalPages } = response.data;
      setAllCoupons(coupons || []);
      setTotalPages(totalPages);

      showToast(true, "Coupons fetched successfully.");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch coupons.";
      showToast(false, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteCouponById = async (id: string) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/coupons/${id}`);

      // Remove coupon from state
      setAllCoupons(allCoupons.filter((coupon) => coupon.id !== id));

      showToast(true, "Coupon deleted successfully.");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete coupon.";
      showToast(false, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Save the coupon after editing
  const saveCoupon = async (data: any, callback: () => void) => {
    setLoading(true);
    const updatedFormData = {
      code: data.code,
      discount: data.discount,
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
      description: data.description,
    };

    try {
      const response = await axiosInstance.patch(`/coupons/${data.id}`, updatedFormData);
      const updatedCoupon = response.data;

      // Update coupon in the state
      setAllCoupons((prevCoupons) =>
        prevCoupons.map((coupon) =>
          coupon.id === updatedCoupon.id ? updatedCoupon : coupon
        )
      );

      // Show success toast
      showToast(true, "Coupon updated successfully.");
      callback();
      getAllCoupons(1);

      return updatedCoupon;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to update coupon.";
      showToast(false, errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CouponContext.Provider
      value={{
        allCoupons,
        loading,
        getAllCoupons,
        currentPage,
        setCurrentPage,
        setSearchTerm,
        searchTerm,
        totalPages,
        setTotalPages,
        reloadCoupons,
        setReloadCoupons,
        addNewCoupon,
        saveCoupon,
        deleteCouponById,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};
