import { useState } from "react";
import { AllCouponsNew } from "./columns";

interface AddCouponsProps {
  onAddCoupon: (newCoupon: AllCouponsNew) => void;
}

export default function AddCoupons({ onAddCoupon }: AddCouponsProps) {
  const [coupon_code, setCoupon_code] = useState("");
  const [coupon_description, setCoupon_description] = useState("");
  const [coupon_discount, setCoupon_discount] = useState("");

  const [coupon_type, setType] = useState("Public");
  const [coupon_start_date, setCoupon_start_date] = useState("");
  const [coupon_end_date, setCoupon_end_date] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCoupon: AllCouponsNew = {
      id: Math.random().toString(36).substr(2, 9),

      coupon_code,
      coupon_description,
      coupon_discount,

      coupon_type,
      coupon_start_date,
      coupon_end_date,
    };

    onAddCoupon(newCoupon);

    setCoupon_code("");
    setCoupon_description("");
    setCoupon_discount("");

    setType("Public");
    setCoupon_start_date("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 border rounded-md text-white"
    >
      <h2 className="text-xl font-semibold mb-4">Add New Coupon</h2>
      <div className="mb-4">
        <label className="block mb-1">Coupon Code</label>
        <input
          type="text"
          value={coupon_code}
          onChange={(e) => setCoupon_code(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-white">Coupon Description</label>
        <input
          type="text"
          value={coupon_description}
          onChange={(e) => setCoupon_description(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Discount</label>
        <input
          type="text"
          value={coupon_discount}
          onChange={(e) => setCoupon_discount(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Type</label>
        <select
          value={coupon_type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded text-black"
        >
          <option value="Option1">option 01</option>
          <option value="Option2">option 02</option>
          <option value="Option3">option 03</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Coupon Start Date</label>
        <input
          type="date"
          value={coupon_start_date}
          onChange={(e) => setCoupon_start_date(e.target.value)}
          className="w-full p-2 border rounded text-black"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save Coupon
      </button>
    </form>
  );
}
