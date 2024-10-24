import React, { ChangeEvent } from "react";
import { AllOrdersNew } from "./columns";

interface EditAllOrdersPopupProps {
  order: AllOrdersNew | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedorder: AllOrdersNew) => void;
}

const EditAllOrdersPopup: React.FC<EditAllOrdersPopupProps> = ({
  order,
  isOpen,
  onClose,
  onSave,
}) => {
  const [editedorder, setEditedorder] = React.useState<AllOrdersNew | null>(
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedorder({
          ...editedorder,
          imageUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
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
            name="customer_name"
            value={editedorder.customer_name}
            onChange={handleInputChange}
            placeholder="customer Name"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="customer_id"
            value={editedorder.customer_id}
            onChange={handleInputChange}
            placeholder="customer_id"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="customer_username"
            value={editedorder.customer_username}
            onChange={handleInputChange}
            placeholder="Customer_username"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="customer_country"
            value={editedorder.customer_country}
            onChange={handleInputChange}
            placeholder="Customer Country"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="customer_phone"
            value={editedorder.customer_phone}
            onChange={handleInputChange}
            placeholder="Customer Phone"
            className="w-full mb-2 p-2 border rounded"
          />
          <select
            name="status"
            value={editedorder.status}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
            <option value="Archived">Archived</option>
          </select>
          <input
            type="date"
            name="date"
            value={editedorder.date}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mb-4 p-2"
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
