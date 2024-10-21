import { useState } from "react";
import { AllCouponsNew, columns } from "./columns";
import { DataTable } from "./data-table";
import AddCoupons from "./AddCoupons";
import EditAllcouponsPopup from "./editCouponsPopup";
import { ColumnDef } from "@tanstack/react-table";

function getInitialData(): AllCouponsNew[] {
  return [
    {
      id: "728ed52f",
      coupon_code: "Wukong",
      coupon_description: "#w0342",
      coupon_discount: "In Stock",
      coupon_type: "Public",
      coupon_start_date: "23/05/2024",
      coupon_end_date: "23/05/2024",
    },
    {
      id: "728ed52g",
      coupon_code: "UFO 50",
      coupon_description: "#u0343",
      coupon_discount: "In Stock",

      coupon_type: "Public",
      coupon_start_date: "23/05/2024",
      coupon_end_date: "23/05/2024",
    },
  ];
}

export default function AllCoupons() {
  const [coupons, setcoupons] = useState<AllCouponsNew[]>(getInitialData());

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<AllCouponsNew | null>(
    null
  );

  const handleAddcoupon = (newcoupon: AllCouponsNew) => {
    setcoupons((prevcoupons) => [...prevcoupons, newcoupon]);
  };

  const handleDeletecoupon = (id: string) => {
    setcoupons((prevcoupons) =>
      prevcoupons.filter((coupon) => coupon.id !== id)
    );
  };

  const handleEditcoupon = (coupon: AllCouponsNew) => {
    setEditingCoupon(coupon);
    setIsEditModalOpen(true);
  };

  const handleSavecoupon = (updatedcoupon: AllCouponsNew) => {
    setcoupons((prevcoupons) =>
      prevcoupons.map((coupon) =>
        coupon.id === updatedcoupon.id ? updatedcoupon : coupon
      )
    );
    setIsEditModalOpen(false);
    setEditingCoupon(null);
  };

  const actionColumn: ColumnDef<AllCouponsNew> = {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={() => handleDeletecoupon(row.original.id)}
        >
          Delete
        </button>

        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleEditcoupon(row.original)}
        >
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
      <h1 className="text-2xl font-bold mb-4 text-white">All coupons</h1>
      {/* Add coupons Component */}
      <AddCoupons onAddCoupon={handleAddcoupon} />
      {/* Data Table */}
      <DataTable columns={columnsWithActions} data={coupons} />
      {/* Edit coupon Modal */}
      <EditAllcouponsPopup
        coupon={editingCoupon}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSavecoupon}
      />
    </div>
  );
}
