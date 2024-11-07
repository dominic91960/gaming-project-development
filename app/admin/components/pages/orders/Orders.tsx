"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AllOrdersNew1, columns } from "./columns";
import { DataTable } from "./data-table";
import { useOrderContext } from "@/context/OrderContext";
import axiosInstance from "@/axios/axiosInstance";
import { useToast } from "@/context/ToastContext";
// const fileInputRef = useRef<HTMLInputElement | null>(null);

const COUPON_VALUE = 10; // Static coupon value of $10

// Calculates total price for each item based on regular price and quantity
function calculateItemsWithTotal(
  items: {
    regularPrice: number;
    quantity: number;
    productImage: string;
    productName: string;
    productCode: string;
  }[]
) {
  return items.map((item) => ({
    ...item,
    total: item.regularPrice * item.quantity,
  }));
}

// Calculates the final order total for an array of items with an applied discount
function calculateOrderTotal(
  items: { regularPrice: number; quantity: number }[]
) {
  const subtotal = items.reduce(
    (acc, item) => acc + item.regularPrice * item.quantity,
    0
  );
  return subtotal - COUPON_VALUE;
}

export default function AllOrders() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<AllOrdersNew1 | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AllOrdersNew1 | null>(
    null
  );
  const { allOrders, loading, setReloadOrders } = useOrderContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addToast = useToast();

  const handleViewOrder = (order: AllOrdersNew1) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleEditOrder = (order: AllOrdersNew1) => {
    setEditingOrder(order);
    setIsEditModalOpen(true);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log("File changed", e.target.files);
    // e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
    // e.preventDefault();
  };
  const handleUpload = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent page reload

    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axiosInstance.post("/manual-orders/upload", formData);
      console.log("Upload response", res);

      if (res.status === 201) {
        addToast("File uploaded successfully", "success");
      }else{
        console.log("Upload failed", res.data.message);
        console.log("Upload failed", res.data.error);
        // addToast("File upload failed", "error");
        throw new Error("Upload failed");
      }
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.response?.data?.error || "File upload failed";
      console.error("Upload error", error);
      addToast(errorMessage, "error");
    } finally {
    setReloadOrders(prev => !prev);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="container min-h-full font-primaryFont text-[8px] sm:text-[12px] md:text-[16px] xl:text-[20px] 2xl:text-[24px] pt-[3.5em] md:p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-md text-white">
      <div className="pb-[2em] px-[36px]">
        <h1 className="font-bold text-[1.5em] leading-none text-white">
          All Orders
        </h1>
        <p className="text-[0.9em] text-white md:text-[0.5em]">Orders</p>
      </div>
      <DataTable
        columns={columns}
        data={allOrders}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
        selectedFile={selectedFile}
        handleUpload={handleUpload}
      />
    </div>
  );
}
