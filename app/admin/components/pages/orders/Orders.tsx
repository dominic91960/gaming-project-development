import { useState } from "react";
import { AllOrdersNew, columns } from "./columns";
import { DataTable } from "./data-table";
import Addorders from "./AddOrders";
import EditAllOrdersPopup from "./editOrdersPopup";
import OrderDetailPopup from "./OrderDetailPopup";
import { ColumnDef } from "@tanstack/react-table";

function getInitialData(): AllOrdersNew[] {
  return [
    {
      id: "728ed52f",
      order_id: "#254GF45",
      date: "23/05/2024",
      username: "SteveSmith",
      order_total: "$40",
      status: "Approved",
      items: [
        {
          productImage: "path/to/image1.jpg",
          productName: "Product 1",
          productCode: "P001",
          regularPrice: "$20", // Ensure it's a string
          quantity: 1,
          total: "$20", // Ensure it's a string
        },
        {
          productImage: "path/to/image2.jpg",
          productName: "Product 2",
          productCode: "P002",
          regularPrice: "$20", // Ensure it's a string
          quantity: 1,
          total: "$20", // Ensure it's a string
        },
      ],
    },

    {
      id: "728ed52f2",
      order_id: "#254GF96",
      date: "12/01/2022",
      username: "RickyPonting",
      order_total: "$40",
      status: "Rejected",
      items: [
        {
          productImage: "path/to/image3.jpg",
          productName: "Product 3",
          productCode: "P003",
          regularPrice: "$40", // Ensure it's a string
          quantity: 1,
          total: "$40", // Ensure it's a string
        },
      ],
    },
  ];
}

export default function AllOrders() {
  const [orders, setOrders] = useState<AllOrdersNew[]>(getInitialData());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<AllOrdersNew | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AllOrdersNew | null>(null);

  const handleViewOrder = (order: AllOrdersNew) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleAddOrder = (newOrder: AllOrdersNew) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  const handleDeleteOrder = (id: string) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  };

  const handleEditOrder = (order: AllOrdersNew) => {
    setEditingOrder(order);
    setIsEditModalOpen(true);
  };

  const handleSaveOrder = (updatedOrder: AllOrdersNew) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
    setIsEditModalOpen(false);
    setEditingOrder(null);
  };

  const actionColumn: ColumnDef<AllOrdersNew> = {
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
  };

  const columnsWithActions: ColumnDef<AllOrdersNew>[] = [
    ...columns,
    actionColumn,
  ];

  return (
    <div className="container mx-auto py-10 text-white">
      <h1 className="text-2xl font-bold mb-4 text-white">All Orders</h1>
      {/* Add Orders Component */}
      <Addorders onAddOrder={handleAddOrder} />
      {/* Data Table */}
      <DataTable columns={columnsWithActions} data={orders} />
      {/* Edit order Modal */}
      <EditAllOrdersPopup
        order={editingOrder}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveOrder}
      />

      {/* Order Details Popup */}
      {selectedOrder && (
        <OrderDetailPopup
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          customerName={selectedOrder.username} // Use username for customer name
          customerEmail={
            selectedOrder.username === "SteveSmith"
              ? "Steve@gmail.com"
              : "Ricky@gmail.com"
          }
          date={selectedOrder.date}
          items={selectedOrder.items} // Pass the order items correctly
        />
      )}
    </div>
  );
}
