// AddProducts.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";

interface NewProduct {
  imageUrl: string;
  name: string;
  sku: string;
  stock: string;
  selling_price: string;
  regular_price: string;
  status: string;
  date: string;
}

const AddProducts = () => {
  const [newProduct, setNewProduct] = useState<NewProduct>({
    imageUrl: "",
    name: "",
    sku: "",
    stock: "",
    selling_price: "",
    regular_price: "",
    status: "",
    date: "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prev) => ({
          ...prev,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save product and navigate back to the products list
    if (typeof window !== "undefined") {
      const products = JSON.parse(localStorage.getItem("products") || "[]");
      localStorage.setItem(
        "products",
        JSON.stringify([...products, newProduct])
      );
    }
    router.push("/products"); // Navigate back to the table page (adjust path accordingly)
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block"
          />
        </div>
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">SKU</label>
          <input
            type="text"
            name="sku"
            value={newProduct.sku}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Stock</label>
          <input
            type="text"
            name="stock"
            value={newProduct.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Selling Price</label>
          <input
            type="text"
            name="selling_price"
            value={newProduct.selling_price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Regular Price</label>
          <input
            type="text"
            name="regular_price"
            value={newProduct.regular_price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Status</label>
          <select
            name="status"
            value={newProduct.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Status</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={newProduct.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
