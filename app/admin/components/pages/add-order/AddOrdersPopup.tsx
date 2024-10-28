import { useState } from "react";
import { AllAddOrdersNew } from "./columns";

interface AddAddordersProps {
  onAddAddorder: (newAddorder: AllAddOrdersNew) => void;
}

export default function AddAddorders({ onAddAddorder }: AddAddordersProps) {
  const [addorder_name, setAddorder_name] = useState("");
  const [addorder_sku, setAddorder_sku] = useState("");
  const [addorder_cost, setAddorder_cost] = useState("");
  const [addorder_quantity, setAddorder_quantity] = useState("");
  const [addorder_total, setAddorder_total] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAddorder: AllAddOrdersNew = {
      id: Math.random().toString(36).substr(2, 9),
      imageUrl,
      addorder_name,
      addorder_sku,
      addorder_cost,
      addorder_quantity: addorder_quantity,
      addorder_total: addorder_total,
    };

    onAddAddorder(newAddorder);

    setAddorder_name("");
    setAddorder_sku("");
    setAddorder_cost("");
    setAddorder_quantity("");
    setAddorder_total("");

    setImageUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 border rounded-md text-white"
    >
      <h2 className="text-xl font-semibold mb-4">Add New Customer</h2>
      <div className="mb-4">
        <label className="block mb-1">Customer Name</label>
        <input
          type="text"
          value={addorder_name}
          onChange={(e) => setAddorder_name(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-white">Customer ID</label>
        <input
          type="text"
          value={addorder_sku}
          onChange={(e) => setAddorder_sku(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Customer Username</label>
        <input
          type="text"
          value={addorder_cost}
          onChange={(e) => setAddorder_cost(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Country</label>
        <input
          type="text"
          value={addorder_quantity}
          onChange={(e) => setAddorder_quantity(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Phone</label>
        <input
          type="text"
          value={addorder_total}
          onChange={(e) => setAddorder_total(e.target.value)}
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
