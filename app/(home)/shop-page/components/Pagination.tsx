// components/Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="mt-8 flex justify-center space-x-2">
      <button
        className={`px-3 py-1 ${
          currentPage === 1 ? "bg-gray-600" : "bg-gray-800"
        } rounded`}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={`px-3 py-1 ${
            currentPage === index + 1 ? "bg-blue-600" : "bg-gray-800"
          } rounded`}
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={`px-3 py-1 ${
          currentPage === totalPages ? "bg-gray-600" : "bg-gray-800"
        } rounded`}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
