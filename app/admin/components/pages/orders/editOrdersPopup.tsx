import React, { ChangeEvent } from "react";
import { AllOrdersNew1 } from "./columns";

interface EditAllOrdersPopupProps {
  order: any | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedorder: any) => void;
}

const EditAllOrdersPopup: React.FC<EditAllOrdersPopupProps> = ({
  order,
  isOpen,
  onClose,
  onSave,
}) => {
  const [editedorder, setEditedorder] = React.useState<any | null>(
    order
  );

  React.useEffect(() => {
    setEditedorder(order);
  }, [order]);

  if (!isOpen || !editedorder) {
    return null;
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditedorder({
      ...editedorder,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    if (editedorder) {
      onSave(editedorder);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Edit customer</h2>
        <form>
          <input
            type="text"
            name="order_id"
            value={editedorder.order_id}
            onChange={handleInputChange}
            placeholder="customer Name"
            className="w-full mb-2 p-2 border rounded"
          />

          <input
            type="text"
            name="username"
            value={editedorder.username}
            onChange={handleInputChange}
            placeholder="username"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="order_total"
            value={editedorder.order_total}
            onChange={handleInputChange}
            placeholder="Customer Country"
            className="w-full mb-2 p-2 border rounded"
          />

          <select
            name="status"
            value={editedorder.status}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
          >
            <option value="Public">Pending</option>
            <option value="Private">Completed</option>
          </select>

          <input
            type="date"
            name="date"
            value={editedorder.date}
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

export default EditAllOrdersPopup;
