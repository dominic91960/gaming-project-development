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
    setEditedcoupon(coupon);
  }, [coupon]);

  if (!isOpen || !editedcoupon) {
    return null;
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditedcoupon({
      ...editedcoupon,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (editedcoupon) {
      onSave(editedcoupon);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Edit coupon</h2>
        <form>
          <input
            type="text"
            name="coupon_code"
            value={editedcoupon.coupon_code}
            onChange={handleInputChange}
            placeholder="coupon Name"
            className="w-full mb-2 p-2 border rounded"
          />

          <input
            type="text"
            name="coupon_description"
            value={editedcoupon.coupon_description}
            onChange={handleInputChange}
            placeholder="coupon_id"
            className="w-full mb-2 p-2 border rounded"
          />

          <input
            type="text"
            name="coupon_discount"
            value={editedcoupon.coupon_discount}
            onChange={handleInputChange}
            placeholder="coupon_username"
            className="w-full mb-2 p-2 border rounded"
          />

          <select
            name="status"
            value={editedcoupon.coupon_type}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
          >
            <option value="Option1">option 01</option>
            <option value="Option2">option 02</option>
            <option value="Option3">option 03</option>
          </select>

          <input
            type="date"
            name="date"
            value={editedcoupon.coupon_start_date}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
          />

          <input
            type="date"
            name="date"
            value={editedcoupon.coupon_end_date}
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
              OK
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAllCouponsPopup;
