"use client";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { CiSearch } from "react-icons/ci";
import { GrNext, GrPrevious } from "react-icons/gr";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="w-max p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[15px] font-normal font-primaryFont text-white">
          result found: 23
        </p>

        <div className="flex items-center gap-4">
          <div className="border p-2 rounded-none flex items-center gap-x-[0.75em] w-full">
            <CiSearch className="text-[20px] text-white" />
            <input
              placeholder="Search by token name"
              className="bg-transparent outline-none border-y-0 border-e-0 border-s rounded-none px-[1em] w-full text-white "
            />
          </div>

          <div className="bg-[#666666]">
            <Select>
              <SelectTrigger className="w-[180px] rounded-none border-none">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Title Here</SelectLabel>
                  <SelectItem value="option1">option 1</SelectItem>
                  <SelectItem value="option2">option 2</SelectItem>
                  <SelectItem value="option3">option 3</SelectItem>
                  <SelectItem value="option4">option 4</SelectItem>
                  <SelectItem value="option5">option 5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {currentProducts.map((_, index) => (
          <ProductCard
            key={index}
            title="Greed Fall"
            price={299}
            oldPrice={399}
            rating={5}
            soldOut={startIndex + index === 5} // Example of marking one item as sold out
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 text-white rounded disabled:opacity-50"
        >
          <GrPrevious />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => changePage(i + 1)}
            className={`px-4 py-2 mx-1 rounded ${
              currentPage === i + 1
                ? " text-[#45F882] font-primaryFont font-semibold"
                : "text-white font-primaryFont font-semibold"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 text-white rounded disabled:opacity-50"
        >
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default ContentGrid;
