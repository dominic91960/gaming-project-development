"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AllOrdersNew1, columns } from "./columns";
import { DataTable } from "./data-table";
import Addorders from "./AddOrders";
import EditAllOrdersPopup from "./editOrdersPopup";
import OrderDetailPopup from "./OrderDetailPopup";
import { ColumnDef } from "@tanstack/react-table";
import { useOrderContext } from "@/context/OrderContext";
import { IoClose } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axiosInstance from "@/axios/axiosInstance";
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
  const { allOrders, loading } = useOrderContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

      // Clear selected file and reset the input field
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error", error);
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="container mx-auto py-10 text-white">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="gaming"
            className="w-[200px]"
            onClick={() => setIsDialogOpen(true)}
          >
            Click Here
          </Button>
        </DialogTrigger>

        <DialogContent className="w-[425px] bg-gradient-to-tr from-black from-15% to-[#0D6D49] p-[3em] rounded-md border border-[#19D38E] sm:w-auto">
          <div className="fixed inset-0 bg-black/80 flex justify-center items-center w-full">
            <div className="relative w-max bg-gradient-to-tr from-black from-15% to-[#0D6D49] p-[3em] rounded-md border border-[#19D38E]">
              <button
                className="absolute top-[1em] right-[1em] text-[#00FFA1] text-[1.4em] hover:opacity-80 transition-opacity duration-100"
                onClick={() => setIsDialogOpen(false)}
              >
                <IoClose />
              </button>

              <h2 className="font-bold text-[1.5em] pb-[0.6em] border-b border-b-[#0D6D49] text-white mb-6">
                Upload CSV File
              </h2>

              <form className="border border-[#0D6D49] rounded-md p-6">
                <p className="font-primaryFont text-white text-[13px] font-medium mb-2">
                  Upload CSV
                </p>

                <div className="flex flex-col items-start justify-start border border-gray-500 rounded-md mb-4 w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex items-center cursor-pointer"
                  >
                    <span className="bg-gray-800 text-white py-2 px-4 rounded-l-md">
                      Browse
                    </span>
                    <input
                      ref={fileInputRef}
                      id="file-upload"
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <div className="border-l border-gray-700  text-gray-400 py-2 px-4 rounded-r-md">
                      {selectedFile
                        ? selectedFile.name
                        : "Select a CSV file to upload"}
                    </div>
                  </label>
                </div>

                <div className="mb-8">
                  <p className="font-primaryFont text-white text-[13px] font-medium mb-2">
                    Or upload from URL
                  </p>
                  <Input
                    placeholder="Add file URL"
                    className="border border-gray-500"
                  />
                </div>

                <div className="flex gap-6 items-center justify-between">
                  <p className="font-primaryFont text-white text-[13px] font-medium mb-2 w-max">
                    Please review and ensure that all the details you have
                    entered are correct before submitting.
                  </p>
                  <Button
                    type="button"
                    onClick={handleUpload}
                    className="bg-[#00FFA1] text-black font-primaryFont text-[13px] font-semibold h-[30px]"
                  >
                    UPLOAD
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <h1 className="text-2xl font-bold mb-4 text-white">All Orders</h1>
      {/* Add Orders Component */}
      {/* <Addorders onAddOrder={handleAddOrder} /> */}
      {/* Data Table */}
      <DataTable columns={columns} data={allOrders} />
      {/* Edit order Modal */}
      {/* <EditAllOrdersPopup
        order={editingOrder}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveOrder}
      /> */}

      {/* Order Details Popup */}
      {/* {selectedOrder && (
       <OrderDetailPopup
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          customerName={selectedOrder.username}
          customerEmail={
            selectedOrder.username === "SteveSmith"
              ? "Steve@gmail.com"
              : "Ricky@gmail.com"
          }
          date={selectedOrder.createdAt}
          items={selectedOrder.items}
          order_id= {selectedOrder.order_id}
        />
      )} */}
    </div>
  );
}
