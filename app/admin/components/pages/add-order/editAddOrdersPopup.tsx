import React, { ChangeEvent } from "react";
import { AllAddOrdersNew } from "./columns";

interface EditAllAddordersPopupProps {
  addorder: AllAddOrdersNew | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedaddorder: AllAddOrdersNew) => void;
}

const EditAllAddodersPopup: React.FC<EditAllAddordersPopupProps> = ({
  addorder,
  isOpen,
  onClose,
  onSave,
}) => {
  const [editedaddorder, setEditedaddorder] =
    React.useState<AllAddOrdersNew | null>(addorder);

  React.useEffect(() => {
    setEditedaddorder(addorder);
  }, [addorder]);

  if (!isOpen || !editedaddorder) {
    return null;
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditedaddorder({
      ...editedaddorder,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedaddorder({
          ...editedaddorder,
          imageUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (editedaddorder) {
      onSave(editedaddorder);
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
            value={editedaddorder.addorder_name}
            onChange={handleInputChange}
            placeholder="customer Name"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="customer_id"
            value={editedaddorder.addorder_sku}
            onChange={handleInputChange}
            placeholder="customer_id"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="customer_username"
            value={editedaddorder.addorder_cost}
            onChange={handleInputChange}
            placeholder="Customer_username"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="customer_country"
            value={editedaddorder.addorder_quantity}
            onChange={handleInputChange}
            placeholder="Customer Country"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="customer_phone"
            value={editedaddorder.addorder_total}
            onChange={handleInputChange}
            placeholder="Customer Phone"
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

export default EditAllAddodersPopup;
