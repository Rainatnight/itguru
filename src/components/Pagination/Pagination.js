import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cls from "./Pagination.module.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
export const Pagination = ({ totalPages, currentPage, setCurrentPage, }) => {
    if (totalPages === 0)
        return null;
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
    return (_jsxs("div", { className: cls.pagination, children: [_jsx("button", { className: `${cls.arrowButton} ${currentPage === 1 ? cls.disabled : ""}`, onClick: () => currentPage > 1 && setCurrentPage(currentPage - 1), disabled: currentPage === 1, children: _jsx(FaChevronLeft, {}) }), pages.map((page) => (_jsx("button", { onClick: () => setCurrentPage(page), className: `${cls.pageButton} ${currentPage === page ? cls.activePage : ""}`, children: page }, page))), _jsx("button", { className: `${cls.arrowButton} ${currentPage === totalPages ? cls.disabled : ""}`, onClick: () => currentPage < totalPages && setCurrentPage(currentPage + 1), disabled: currentPage === totalPages, children: _jsx(FaChevronRight, {}) })] }));
};
