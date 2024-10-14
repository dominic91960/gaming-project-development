import { useState } from "react";
import { AllCustomersNew } from "./columns";

interface AddCustomersProps {
  onAddCustomer: (newCustomer: AllCustomersNew) => void;
}

export default function AddCustomers({ onAddCustomer }: AddCustomersProps) {
  const [customer_name, setCustomer_name] = useState("");
  const [customer_id, setCustomer_id] = useState("");
  const [customer_username, setCustomer_username] = useState("");
  const [customer_country, setCustomer_country] = useState("");
  const [customer_phone, setCustomer_phone] = useState("");
  const [status, setStatus] = useState("Public");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCustomer: AllCustomersNew = {
      id: Math.random().toString(36).substr(2, 9),
      imageUrl,
      customer_name,
      customer_id,
      customer_username,
      customer_country: customer_country,
      customer_phone: customer_phone,
      status,
      date,
    };

    onAddCustomer(newCustomer);

    setCustomer_name("");
    setCustomer_id("");
    setCustomer_username("");
    setCustomer_country("");
    setCustomer_phone("");
    setStatus("Public");
    setDate("");
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
          value={customer_name}
          onChange={(e) => setCustomer_name(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-white">Customer ID</label>
        <input
          type="text"
          value={customer_id}
          onChange={(e) => setCustomer_id(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Customer Username</label>
        <input
          type="text"
          value={customer_username}
          onChange={(e) => setCustomer_username(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Country</label>
        <input
          type="text"
          value={customer_country}
          onChange={(e) => setCustomer_country(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Phone</label>
        <input
          type="text"
          value={customer_phone}
          onChange={(e) => setCustomer_phone(e.target.value)}
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
