import { useEffect, useState } from "react";
import { AllOrdersNew1, columns } from "./columns";
import { DataTable } from "./data-table";
import Addorders from "./AddOrders";
import EditAllOrdersPopup from "./editOrdersPopup";
import OrderDetailPopup from "./OrderDetailPopup";
import { ColumnDef } from "@tanstack/react-table";
import { useOrderContext } from "@/context/OrderContext";


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
  const [selectedOrder, setSelectedOrder] = useState<AllOrdersNew1 | null>(null);
  const { allOrders, loading } = useOrderContext();

  const handleViewOrder = (order: AllOrdersNew1) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  /* const handleAddOrder = (newOrder: AllOrdersNew1) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  const handleDeleteOrder = (id: string) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  }; */

  const handleEditOrder = (order: AllOrdersNew1) => {
    setEditingOrder(order);
    setIsEditModalOpen(true);
  };

  /* const handleSaveOrder = (updatedOrder: AllOrdersNew1) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
    setIsEditModalOpen(false);
    setEditingOrder(null);
  }; */

 /*  const actionColumn: ColumnDef<AllOrdersNew> = {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleDeleteOrder(row.original.id)}
        >
          Delete
        </button>

        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleViewOrder(row.original)}
        >
          View
        </button>
      </div>
    ),
  }; */

  /* const columnsWithActions: ColumnDef<AllOrdersNew>[] = [
    ...columns,
  ]; */

  return (
    <div className="container mx-auto py-10 text-white">
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
