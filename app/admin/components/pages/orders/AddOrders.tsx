import { useState } from "react";
import { AllOrdersNew1 } from "./columns";

interface AddOrdersProps {
  onAddOrder: (newOrder: AllOrdersNew1) => void;
}

export default function AddOrders({ onAddOrder }: AddOrdersProps) {
  const [order_id, setOrder_id] = useState("");
  const [date, setDate] = useState("");
  const [username, setusername] = useState("");
  const [order_total, setOrder_total] = useState("");
  const [status, setStatus] = useState("Public");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrder: AllOrdersNew1 = {
      id: Math.random().toString(36).substr(2, 9),
      order_id,
      username,
      order_total: order_total,
      status,
      date,
      items: [],
    };

    onAddOrder(newOrder);

    setOrder_id("");
    setDate("");
    setusername("");
    setOrder_total("");
    setStatus("Public");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 border rounded-md text-white"
    >
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <div className="mb-4">
        <label className="block mb-1">Order ID</label>
        <input
          type="text"
          value={order_id}
          onChange={(e) => setOrder_id(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
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
        <label className="block mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Total</label>
        <input
          type="text"
          value={order_total}
          onChange={(e) => setOrder_total(e.target.value)}
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
          <option value="Public">Pending</option>
          <option value="Private">Completed</option>
        </select>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save Order
      </button>
    </form>
  );
}
