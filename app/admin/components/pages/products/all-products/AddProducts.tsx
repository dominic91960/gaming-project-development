// add-products/AddProducts.tsx
import { useState } from "react";
import { AllProductsNew } from "../all-products/columns";

interface AddProductsProps {
  onAddProduct: (newProduct: AllProductsNew) => void;
}

export default function AddProducts({ onAddProduct }: AddProductsProps) {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [status, setStatus] = useState("Public");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: AllProductsNew = {
      id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
      imageUrl,
      name,
      sku,
      stock,
      selling_price: sellingPrice,
      regular_price: regularPrice,
      status,
      date,
    };

    onAddProduct(newProduct);

    // Clear the form fields after submission
    setName("");
    setSku("");
    setStock("");
    setSellingPrice("");
    setRegularPrice("");
    setStatus("Public");
    setDate("");
    setImageUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 border rounded-md text-white"
    >
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <div className="mb-4">
        <label className="block mb-1">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-white">SKU</label>
        <input
          type="text"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Stock</label>
        <input
          type="text"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Selling Price</label>
        <input
          type="text"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Regular Price</label>
        <input
          type="text"
          value={regularPrice}
          onChange={(e) => setRegularPrice(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded text-black"
        >
          <option value="Public">Public</option>
          <option value="Private">Private</option>
          <option value="Archived">Archived</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Image URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save Product
      </button>
    </form>
  );
}
