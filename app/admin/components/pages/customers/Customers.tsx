import { useState } from "react";
import { AllCustomersNew, columns } from "./columns";
import { DataTable } from "./data-table";
import Addcustomers from "./AddCustomers";
import EditAllcustomersPopup from "./EditCustomersPopup";
import { ColumnDef } from "@tanstack/react-table";

function getInitialData(): AllCustomersNew[] {
  return [
    {
      imageUrl: "/images/sample-pic.png",
      id: "728ed52f",
      customer_name: "Wukong",
      customer_id: "#w0342",
      customer_username: "In Stock",
      customer_country: "$40",
      customer_phone: "$60",
    },
  ];
}

export default function Allcustomers() {
  const [customers, setcustomers] = useState<AllCustomersNew[]>(
    getInitialData()
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingcustomer, setEditingcustomer] =
    useState<AllCustomersNew | null>(null);

  const handleAddcustomer = (newcustomer: AllCustomersNew) => {
    setcustomers((prevcustomers) => [...prevcustomers, newcustomer]);
  };

  const handleDeletecustomer = (id: string) => {
    setcustomers((prevcustomers) =>
      prevcustomers.filter((customer) => customer.id !== id)
    );
  };

  const handleEditcustomer = (customer: AllCustomersNew) => {
    setEditingcustomer(customer);
    setIsEditModalOpen(true);
  };

  const handleSavecustomer = (updatedcustomer: AllCustomersNew) => {
    setcustomers((prevcustomers) =>
      prevcustomers.map((customer) =>
        customer.id === updatedcustomer.id ? updatedcustomer : customer
      )
    );
    setIsEditModalOpen(false);
    setEditingcustomer(null);
  };

  const actionColumn: ColumnDef<AllCustomersNew> = {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleDeletecustomer(row.original.id)}
        >
          Delete
        </button>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleEditcustomer(row.original)}
        >
          Edit
        </button>
      </div>
    ),
  };

  const columnsWithActions: ColumnDef<AllCustomersNew>[] = [
    ...columns,
    actionColumn,
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4 text-white">All customers</h1>

      {/* Add customers Component */}

      <Addcustomers onAddCustomer={handleAddcustomer} />

      {/* Data Table */}
      <DataTable columns={columnsWithActions} data={customers} />

      {/* Edit customer Modal */}
      <EditAllcustomersPopup
        customer={editingcustomer}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSavecustomer}
      />
    </div>
  );
}
