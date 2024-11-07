import React, { ChangeEvent } from "react";
import { AllCouponsNew } from "./columns";

interface EditAllCouponsPopupProps {
  coupon: AllCouponsNew | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedcoupon: AllCouponsNew) => void;
}

const EditAllCouponsPopup: React.FC<EditAllCouponsPopupProps> = ({
  coupon,
  isOpen,
  onClose,
  onSave,
}) => {
  const [editedcoupon, setEditedcoupon] = React.useState<AllCouponsNew | null>(
    coupon
  );

  React.useEffect(() => {
    if (coupon) {
      setEditedcoupon({
        ...coupon,
        startDate: coupon.startDate ? new Date(coupon.startDate).toISOString().split("T")[0] : "",
        endDate: coupon.endDate ? new Date(coupon.endDate).toISOString().split("T")[0] : "",
      });
    }
  }, [coupon]);

  if (!isOpen || !editedcoupon) {
    return null;
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedcoupon({
      ...editedcoupon,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (editedcoupon) {
      // Ensure the startDate and endDate are in the correct format before passing to onSave
      const updatedCoupon = {
        ...editedcoupon,
        startDate: editedcoupon.startDate ? new Date(editedcoupon.startDate).toISOString() : null,
        endDate: editedcoupon.endDate ? new Date(editedcoupon.endDate).toISOString() : null,
      };
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Edit coupon</h2>
        <form>
          <input
            type="text"
            name="code"
            value={editedcoupon.code}
            onChange={handleInputChange}
            placeholder="Coupon Name"
            className="w-full mb-2 p-2 border rounded"
          />

          <input
            type="text"
            name="description"
            value={editedcoupon.description}
            onChange={handleInputChange}
            placeholder="Coupon Description"
            className="w-full mb-2 p-2 border rounded"
          />

          <input
            type="text"
            name="discount"
            value={editedcoupon.discount}
            onChange={handleInputChange}
            placeholder="Coupon Discount"
            className="w-full mb-2 p-2 border rounded"
          />

          <select
            name="type"
            value={editedcoupon.type}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
          >
            <option value="Fixed_product_discount">Fixed product discount</option>
            <option value="Percentage_discount">Percentage discount</option>
          </select>

          <input
            type="date"
            name="startDate"
            value={editedcoupon.startDate}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
          />

          <input
            type="date"
            name="endDate"
            value={editedcoupon.endDate}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAllCouponsPopup;
