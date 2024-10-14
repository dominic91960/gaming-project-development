// import { useState } from "react";
// import { AllCustomersNew } from "./columns";

// interface AddcustomersProps {
//   onAddcustomer: (newcustomer: AllCustomersNew) => void;
// }

// export default function Addcustomers({ onAddcustomer }: AddcustomersProps) {
//   const [name, setName] = useState("");
//   const [sku, setSku] = useState("");
//   const [stock, setStock] = useState("");
//   const [sellingPrice, setSellingPrice] = useState("");
//   const [regularPrice, setRegularPrice] = useState("");
//   const [status, setStatus] = useState("Public");
//   const [date, setDate] = useState("");
//   const [imageUrl, setImageUrl] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const newcustomer: AllCustomersNew = {
//       id: Math.random().toString(36).substr(2, 9),
//       imageUrl,
//       name,
//       sku,
//       stock,
//       selling_price: sellingPrice,
//       regular_price: regularPrice,
//       status,
//       date,
//     };

//     onAddcustomer(newcustomer);

//     setName("");
//     setSku("");
//     setStock("");
//     setSellingPrice("");
//     setRegularPrice("");
//     setStatus("Public");
//     setDate("");
//     setImageUrl("");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="mb-6 p-4 border rounded-md text-white"
//     >
//       <h2 className="text-xl font-semibold mb-4">Add New customer</h2>
//       <div className="mb-4">
//         <label className="block mb-1">customer Name</label>
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full p-2 border rounded text-black"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-1 text-white">SKU</label>
//         <input
//           type="text"
//           value={sku}
//           onChange={(e) => setSku(e.target.value)}
//           className="w-full p-2 border rounded text-black"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-1">Stock</label>
//         <input
//           type="text"
//           value={stock}
//           onChange={(e) => setStock(e.target.value)}
//           className="w-full p-2 border rounded text-black"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-1">Selling Price</label>
//         <input
//           type="text"
//           value={sellingPrice}
//           onChange={(e) => setSellingPrice(e.target.value)}
//           className="w-full p-2 border rounded text-black"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-1">Regular Price</label>
//         <input
//           type="text"
//           value={regularPrice}
//           onChange={(e) => setRegularPrice(e.target.value)}
//           className="w-full p-2 border rounded text-black"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-1">Status</label>
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="w-full p-2 border rounded text-black"
//         >
//           <option value="Public">Public</option>
//           <option value="Private">Private</option>
//           <option value="Archived">Archived</option>
//         </select>
//       </div>
//       <div className="mb-4">
//         <label className="block mb-1">Date</label>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           className="w-full p-2 border rounded text-black"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block mb-1">Image URL</label>
//         <input
//           type="text"
//           value={imageUrl}
//           onChange={(e) => setImageUrl(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Save customer
//       </button>
//     </form>
//   );
// }

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
      name: "Wukong",
      sku: "#w0342",
      stock: "In Stock",
      selling_price: "$40",
      regular_price: "$60",
      status: "Public",
      date: "23/05/2024",
    },
    {
      imageUrl: "/images/sample-pic.png",
      id: "728ed52g",
      name: "UFO 50",
      sku: "#u0343",
      stock: "In Stock",
      selling_price: "$40",
      regular_price: "$60",
      status: "Public",
      date: "23/05/2024",
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
      <h1 className="text-2xl font-bold mb-4">All customers</h1>

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
