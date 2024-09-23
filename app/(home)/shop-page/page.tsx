"use client"; // This line makes the component a Client Component
// components/ProductPage.tsx
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ProductCard from "./components/ProductCard";
import Pagination from "./components/Pagination";

// Sample product data
const products = [
  {
    id: 1,
    title: "WUKONG 1",
    image: "/wukong.jpg",
    price: "$299",
    oldPrice: "$399",
    rating: 5,
    category: "Racing",
  },
  {
    id: 2,
    title: "WUKONG 2",
    image: "/wukong.jpg",
    price: "$299",
    oldPrice: "$399",
    rating: 5,
    category: "Adventure",
  },
  {
    id: 3,
    title: "WUKONG 3",
    image: "/wukong.jpg",
    price: "$299",
    oldPrice: "$399",
    rating: 5,
    category: "Racing",
  },
  {
    id: 4,
    title: "WUKONG 4",
    image: "/wukong.jpg",
    price: "$299",
    oldPrice: "$399",
    rating: 5,
    category: "Racing",
  },
  {
    id: 5,
    title: "WUKONG 5",
    image: "/wukong.jpg",
    price: "$299",
    oldPrice: "$399",
    rating: 5,
    category: "Adventure",
  },
  {
    id: 6,
    title: "WUKONG 6",
    image: "/wukong.jpg",
    price: "$299",
    oldPrice: "$399",
    rating: 5,
    category: "Action",
  },
  {
    id: 7,
    title: "WUKONG 7",
    image: "/wukong.jpg",
    price: "$299",
    oldPrice: "$399",
    rating: 5,
    category: "Strategy",
  },
  {
    id: 8,
    title: "WUKONG 8",
    image: "/wukong.jpg",
    price: "$299",
    oldPrice: "$399",
    rating: 5,
    category: "Strategy",
  },
  {
    id: 9,
    title: "WUKONG 9",
    image: "/wukong.jpg",
    price: "$299",
    oldPrice: "$399",
    rating: 5,
    category: "Strategy",
  },
  {
    id: 10,
    title: "WUKONG 10",
    image: "/wukong.jpg",
    price: "$299",
    oldPrice: "$399",
    rating: 5,
    category: "Shooting",
  },
  {
    id: 11,
    title: "WUKONG 11",
    image: "/wukong.jpg",
    price: "$299",
    oldPrice: "$399",
    rating: 5,
    category: "Shooting",
  },
  {
    id: 12,
    title: "WUKONG 12",
    image: "/wukong.jpg",
    price: "$299",
    oldPrice: "$399",
    rating: 5,
    category: "Action",
  },
  {
    id: 13,
    title: "WUKONG 13",
    image: "/wukong.jpg",
    price: "$299",
    oldPrice: "$399",
    rating: 5,
    category: "Action",
  },
  {
    id: 14,
    title: "WUKONG 14",
    image: "/wukong.jpg",
    price: "$299",
    oldPrice: "$399",
    rating: 5,
    category: "Shooting",
  },
  {
    id: 15,
    title: "WUKONG 15",
    image: "/wukong.jpg",
    price: "$299",
    oldPrice: "$399",
    rating: 5,
    category: "Action",
  },
];

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const itemsPerPage = 12;

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Pagination logic to calculate the range of items to show based on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <Sidebar onCategoryChange={handleCategoryChange} />

      {/* Main Content */}
      <div className="w-3/4 p-4">
        {/* Search and Sort */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by token name"
            className="p-2 bg-gray-800 border border-gray-700 rounded"
          />
          <select className="p-2 bg-gray-800 border border-gray-700 rounded">
            <option>Sort by</option>
            <option>Price</option>
            <option>Rating</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
              rating={product.rating}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default ProductPage;
