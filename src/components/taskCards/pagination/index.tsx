// src/components/tasks/Pagination.tsx
import React from "react";

const Pagination: React.FC<{
  totalItems: number;
  tasksPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}> = ({ totalItems, tasksPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / tasksPerPage);

  return (
    <div className="pagination flex justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn bg-gray-600 text-white"
      >
        Previous
      </button>
      <span>{currentPage}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn bg-gray-600 text-white"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
