"use client";
import React, { useState } from "react";
import ProductCard from "./ProductCard";

const ContentGrid: React.FC = () => {
  // Mock data: 50 products for demonstration
  const totalProducts = [...Array(20)];
  const productsPerPage = 12;
  const totalPages = Math.ceil(totalProducts.length / productsPerPage);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Get the products for the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = totalProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Function to change pages
  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-3/4 p-4">
      <div className="grid grid-cols-4 gap-4">
        {currentProducts.map((_, index) => (
          <ProductCard
            key={index}
            title="Greed Fall"
            price={299}
            oldPrice={399}
            rating={5}
            soldOut={startIndex + index === 7} // Example of marking one item as sold out
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => changePage(i + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === i + 1
                ? "bg-green-500 text-white"
                : "bg-gray-700 text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ContentGrid;
