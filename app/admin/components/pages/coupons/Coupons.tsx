import { useState } from "react";
import { AllCouponsNew, columns } from "./columns";
import { DataTable } from "./data-table";
import AddCoupons from "./AddCoupons";
import EditAllCouponsPopup from "./editCouponsPopup";
import { ColumnDef } from "@tanstack/react-table";
import { useCouponContext } from "@/context/CouponContext";

/* function getInitialData(): AllCouponsNew[] {
  return [
    {
      id: "728ed52f",
      code: "254GF45",
      description: "It was popularised in the 1960s with...",
      discount: "$  05.00",
      type: "Fixed product discount",
      startDate: "23/05/2024",
      endDate: "12/06/2024",
    },
  ];
} */

export default function AllCoupons() {
  const [coupons, setCoupons] = useState<AllCouponsNew[]>([]);
  const { allCoupons, deleteCouponById } = useCouponContext();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<AllCouponsNew | null>(
    null
  );

  const handleAddCoupon = (newCoupon: AllCouponsNew) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  const handleDeleteCoupon = (id: string) => {
    deleteCouponById(id);
  };

  const handleEditCoupon = (coupon: AllCouponsNew) => {
    setEditingCoupon(coupon);
    setIsEditModalOpen(true);
  };

  const handleSaveCoupon = (updatedCoupon: AllCouponsNew) => {
    setCoupons((prevCoupons) =>
      prevCoupons.map((coupon) =>
        coupon.id === updatedCoupon.id ? updatedCoupon : coupon
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
          onClick={() => handleDeleteCoupon(row.original.id)}
        >
          Delete
        </button>

        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleEditCoupon(row.original)}
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
      <AddCoupons onAddCoupon={handleAddCoupon} />
      {/* Data Table */}
      <DataTable columns={columnsWithActions} data={allCoupons} />
      {/* Edit coupon Modal */}
      <EditAllCouponsPopup
        coupon={editingCoupon}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveCoupon}
      />
    </div>
  );
}
