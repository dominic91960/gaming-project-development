import { useState } from "react";
import { AllAddOrdersNew, columns } from "./columns";
import { DataTable } from "./data-table";
import Addorders from "./AddOrdersPopup";
import EditAlladdordersPopup from "./editAddOrdersPopup";
import { ColumnDef } from "@tanstack/react-table";
import AddOrderInputs from "./Addorder-inputs";

function getInitialData(): AllAddOrdersNew[] {
  return [
    {
      imageUrl: "/images/sample-pic.png",
      id: "728ed52f",
      addorder_name: "Wukong",
      addorder_sku: "#w0342",
      addorder_cost: "In Stock",
      addorder_quantity: "$40",
      addorder_total: "$60",
    },
  ];
}

export default function Alladdorders() {
  const [addorders, setaddorders] = useState<AllAddOrdersNew[]>(
    getInitialData()
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingaddorder, setEditingaddorder] =
    useState<AllAddOrdersNew | null>(null);

  const handleAddaddorder = (newaddorders: AllAddOrdersNew) => {
    setaddorders((prevaddorders) => [...prevaddorders, newaddorders]);
  };

  const handleDeleteaddorder = (id: string) => {
    setaddorders((prevaddorders) =>
      prevaddorders.filter((addorder) => addorder.id !== id)
    );
  };

  const handleEditaddorder = (addorder: AllAddOrdersNew) => {
    setEditingaddorder(addorder);
    setIsEditModalOpen(true);
  };

  const handleSaveaddorder = (updatedaddorder: AllAddOrdersNew) => {
    setaddorders((prevaddorders) =>
      prevaddorders.map((addorder) =>
        addorder.id === updatedaddorder.id ? updatedaddorder : addorder
      )
    );
    setIsEditModalOpen(false);
    setEditingaddorder(null);
  };

  const actionColumn: ColumnDef<AllAddOrdersNew> = {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleDeleteaddorder(row.original.id)}
        >
          Delete
        </button>
        {/* <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleEditaddorder(row.original)}
        >
          Edit
        </button> */}
      </div>
    ),
  };

  const columnsWithActions: ColumnDef<AllAddOrdersNew>[] = [
    ...columns,
    actionColumn,
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Add Orders</h1>

      {/* Add customers Component */}

      <Addorders onAddAddorder={handleAddaddorder} />

      {/* Add Order Inputs */}
      <AddOrderInputs />

      {/* Data Table */}
      <DataTable columns={columnsWithActions} data={addorders} />

      {/* Edit customer Modal */}
      <EditAlladdordersPopup
        addorder={editingaddorder}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveaddorder}
      />
    </div>
  );
}
