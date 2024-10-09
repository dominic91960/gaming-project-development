import React, { ChangeEvent } from "react";
import { AllProductsNew } from "./columns";

interface EditAllProductsPopupProps {
  product: AllProductsNew | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProduct: AllProductsNew) => void;
}

const EditAllProductsPopup: React.FC<EditAllProductsPopupProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
}) => {
  const [editedProduct, setEditedProduct] =
    React.useState<AllProductsNew | null>(product);

  React.useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  if (!isOpen || !editedProduct) {
    return null;
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditedProduct({
      ...editedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProduct({
          ...editedProduct,
          imageUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (editedProduct) {
      onSave(editedProduct);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form>
          <input
            type="text"
            name="name"
            value={editedProduct.name}
            onChange={handleInputChange}
            placeholder="Product Name"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="sku"
            value={editedProduct.sku}
            onChange={handleInputChange}
            placeholder="SKU"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="stock"
            value={editedProduct.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="selling_price"
            value={editedProduct.selling_price}
            onChange={handleInputChange}
            placeholder="Selling Price"
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            name="regular_price"
            value={editedProduct.regular_price}
            onChange={handleInputChange}
            placeholder="Regular Price"
            className="w-full mb-2 p-2 border rounded"
          />
          <select
            name="status"
            value={editedProduct.status}
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
            value={editedProduct.date}
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

export default EditAllProductsPopup;
