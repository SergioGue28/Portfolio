import React from "react";
import Styles from "../../styles/components/Pagination/PaginationProject.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationProject: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={Styles.paginationContainer}>
      <button
        className={Styles.paginationButton}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Atras
      </button>
      <span className={Styles.paginationText}>
        Pagina {currentPage} de {totalPages}
      </span>
      <button
        className={Styles.paginationButton}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
};

export default PaginationProject;
