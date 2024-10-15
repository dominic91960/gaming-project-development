import { useState } from "react";
import { AllCustomersNew, columns } from "./columns";
import { DataTable } from "./data-table";
import Addcustomers from "./AddCustomers";
import EditAllcustomersPopup from "./EditCustomersPopup";
import { ColumnDef } from "@tanstack/react-table";
import { IoTrash } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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
      <div className="flex items-center justify-center gap-x-[1em] w-[6ch] lg:w-fit lg:gap-x-[0.5em]">
        <button
          className="hover:opacity-80 transition-opacity duration-100"
          onClick={() => handleEditcustomer(row.original)}
        >
          <LuPencilLine />
        </button>
        <button
          className="hover:opacity-80 transition-opacity duration-100"
          onClick={() => handleDeletecustomer(row.original.id)}
        >
          <IoTrash />
        </button>
      </div>
    ),
  };

  const columnsWithActions: ColumnDef<AllCustomersNew>[] = [
    ...columns,
    actionColumn,
  ];

  return (
    <div className="min-h-full font-primaryFont text-[8px] sm:text-[12px] md:text-[16px] xl:text-[20px] 2xl:text-[24px] pt-[3.5em] md:p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-[2px] text-white">
      <div className="pb-[2em] px-[36px]">
        <h1 className="font-bold text-[1.5em] leading-none text-white">
          All Customers
        </h1>
        <p className="text-[0.9em] text-white md:text-[0.5em]">Customer</p>
      </div>

      {/* Add customers Component */}
      {isAddModalOpen && (
        <Addcustomers
          onClose={() => setIsAddModalOpen(false)}
          onAddCustomer={handleAddcustomer}
        />
      )}

      {/* Data Table */}
      <DataTable
        handleClick={() => setIsAddModalOpen(true)}
        columns={columnsWithActions}
        data={customers}
      />

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
