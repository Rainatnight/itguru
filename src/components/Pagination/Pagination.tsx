import cls from "./Pagination.module.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface IProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (x: number) => void;
}

export const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: IProps) => {
  if (totalPages === 0) return null;

  // Определяем диапазон страниц для отображения (макс 5)
  let startPage = Math.max(currentPage - 2, 1);
  let endPage = startPage + 4;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - 4, 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className={cls.pagination}>
      <button
        className={`${cls.arrowButton} ${currentPage === 1 ? cls.disabled : ""}`}
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`${cls.pageButton} ${currentPage === page ? cls.activePage : ""}`}
        >
          {page}
        </button>
      ))}

      <button
        className={`${cls.arrowButton} ${currentPage === totalPages ? cls.disabled : ""}`}
        onClick={() =>
          currentPage < totalPages && setCurrentPage(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};
