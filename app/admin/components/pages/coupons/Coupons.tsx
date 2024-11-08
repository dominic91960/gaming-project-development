import { useState } from "react";
import { AllCouponsNew, columns } from "./columns";
import { DataTable } from "./data-table";
import AddCoupons from "./AddCoupons";
import EditAllCouponsPopup from "./editCouponsPopup";
import { ColumnDef } from "@tanstack/react-table";
import { useCouponContext } from "@/context/CouponContext";
import { FaEye } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { IoTrash } from "react-icons/io5";

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
  // const [coupons, setCoupons] = useState<AllCouponsNew[]>([]);
  const [, setCoupons] = useState<AllCouponsNew[]>([]);
  const { allCoupons, deleteCouponById } = useCouponContext();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<AllCouponsNew | null>(
    null
  );

  const handleAddCoupon = (newCoupon: AllCouponsNew) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
    setIsAddModalOpen(false);
  };

  const handleViewCoupon = (coupon: AllCouponsNew) => {
    setIsEditable(false);
    setEditingCoupon(coupon);
    setIsEditModalOpen(true);
  };

  const handleEditCoupon = (coupon: AllCouponsNew) => {
    setIsEditable(true);
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

  const handleDeleteCoupon = (id: string) => {
    deleteCouponById(id);
  };

  const actionColumn: ColumnDef<AllCouponsNew> = {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <button
          className="hover:opacity-80 transition-opacity duration-100"
          onClick={() => handleViewCoupon(row.original)}
        >
          <FaEye />
        </button>

        <button
          className="hover:opacity-80 transition-opacity duration-100"
          onClick={() => handleEditCoupon(row.original)}
        >
          <LuPencilLine />
        </button>

        <button
          className="hover:opacity-80 transition-opacity duration-100"
          onClick={() => handleDeleteCoupon(row.original.id)}
        >
          <IoTrash />
        </button>
      </div>
    ),
  };

  const columnsWithActions: ColumnDef<AllCouponsNew>[] = [
    ...columns,
    actionColumn,
  ];

  return (
    <div className="container mx-auto min-h-full font-primaryFont text-[8px] sm:text-[12px] md:text-[16px] xl:text-[20px] 2xl:text-[24px] pt-[3.5em] md:p-[3.5em] pb-[1.5em] flex flex-col backdrop-blur-md text-white">
      <div className="pb-[2em] px-[36px]">
        <h1 className="font-bold text-[1.5em] leading-none text-white">
          All Coupons
        </h1>
        <p className="text-[0.9em] text-white md:text-[0.5em]">Coupons</p>
      </div>

      {/* Add coupons Component */}
      <AddCoupons
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCoupon={handleAddCoupon}
      />

      {/* Data Table */}
      <DataTable
        columns={columnsWithActions}
        data={allCoupons}
        handleClick={() => setIsAddModalOpen(true)}
      />

      {/* Edit coupon Modal */}
      <EditAllCouponsPopup
        coupon={editingCoupon}
        isOpen={isEditModalOpen}
        readOnly={!isEditable}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveCoupon}
      />
    </div>
  );
}
