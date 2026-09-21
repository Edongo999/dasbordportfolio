import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  return (
    <div className="flex justify-center items-center gap-3 mt-8 mb-6">
      {/* Bouton précédent */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-all duration-200
          ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-black"
          }`}
      >
        <ChevronLeft size={18} /> Précédent
      </button>

      {/* Numéros de page */}
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
              ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Bouton suivant */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-all duration-200
          ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-black"
          }`}
      >
        Suivant <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
