import { useState } from "react";
import { AllOrdersNew, columns } from "./columns";
import { DataTable } from "./data-table";
import Addorders from "./AddOrders";
import EditAllOrdersPopup from "./editOrdersPopup";
import { ColumnDef } from "@tanstack/react-table";

function getInitialData(): AllOrdersNew[] {
  return [
    {
      imageUrl: "/images/sample-pic.png",
      id: "728ed52f",
      customer_name: "Wukong",
      customer_id: "#w0342",
      customer_username: "In Stock",
      customer_country: "$40",
      customer_phone: "$60",
      status: "Public",
      date: "23/05/2024",
    },
    {
      imageUrl: "/images/sample-pic.png",
      id: "728ed52g",
      customer_name: "UFO 50",
      customer_id: "#u0343",
      customer_username: "In Stock",
      customer_country: "$40",
      customer_phone: "$60",
      status: "Public",
      date: "23/05/2024",
    },
  ];
}

export default function Allorders() {
  const [orders, setorders] = useState<AllOrdersNew[]>(getInitialData());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingorder, setEditingorder] = useState<AllOrdersNew | null>(null);

  const handleAddorder = (neworder: AllOrdersNew) => {
    setorders((prevorders) => [...prevorders, neworder]);
  };

  const handleDeleteorder = (id: string) => {
    setorders((prevorders) => prevorders.filter((order) => order.id !== id));
  };

  const handleEditorder = (order: AllOrdersNew) => {
    setEditingorder(order);
    setIsEditModalOpen(true);
  };

  const handleSaveorder = (updatedorder: AllOrdersNew) => {
    setorders((prevorders) =>
      prevorders.map((order) =>
        order.id === updatedorder.id ? updatedorder : order
      )
    );
    setIsEditModalOpen(false);
    setEditingorder(null);
  };

  const actionColumn: ColumnDef<AllOrdersNew> = {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleDeleteorder(row.original.id)}
        >
          Delete
        </button>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleEditorder(row.original)}
        >
          Edit
        </button>
      </div>
    ),
  };

  const columnsWithActions: ColumnDef<AllOrdersNew>[] = [
    ...columns,
    actionColumn,
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">All customers</h1>
      {/* Add customers Component */}
      <Addorders onAddOrder={handleAddorder} />
      {/* Data Table */}
      <DataTable columns={columnsWithActions} data={orders} />
      {/* Edit customer Modal */}

      <EditAllOrdersPopup
        order={editingorder}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveorder}
      />
    </div>
  );
}
