// const AllCoupons = () => {
//   return <div>This is coupons</div>;
// };

// export default AllCoupons;

import { useState } from "react";
import { AllCouponsNew, columns } from "./columns";
import { DataTable } from "./data-table";
import AddCoupons from "./AddCoupons";

import { ColumnDef } from "@tanstack/react-table";

function getInitialData(): AllCouponsNew[] {
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

export default function AllCoupons() {
  const [coupons, setcoupons] = useState<AllCouponsNew[]>(getInitialData());

  const handleAddcustomer = (newcustomer: AllCouponsNew) => {
    setcoupons((prevcoupons) => [...prevcoupons, newcustomer]);
  };

  const handleDeletecustomer = (id: string) => {
    setcoupons((prevcoupons) =>
      prevcoupons.filter((customer) => customer.id !== id)
    );
  };

  const actionColumn: ColumnDef<AllCouponsNew> = {
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
        <button className="bg-blue-500 text-white px-2 py-1 rounded">
          Edit
        </button>
      </div>
    ),
  };

  const columnsWithActions: ColumnDef<AllCouponsNew>[] = [
    ...columns,
    actionColumn,
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">All coupons</h1>

      {/* Add coupons Component */}

      <AddCoupons onAddCustomer={handleAddcustomer} />

      {/* Data Table */}
      <DataTable columns={columnsWithActions} data={coupons} />
    </div>
  );
}
