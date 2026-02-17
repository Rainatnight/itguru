import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PiDotsThreeCircle } from "react-icons/pi";
import { Pagination } from "../../../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../../store/thunks/productsThunks";
import { setCurrentPage } from "../../../../store/slices/productsSlice";
import cls from "./Products.module.scss";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
const itemsPerPage = 5;
export const Products = () => {
    const [chosenElements, setChosenElements] = useState([]);
    const dispatch = useDispatch();
    const { items: products, total: totalProducts, loading, currentPage, search, sortOrder, } = useSelector((state) => state.products);
    const handlePageChange = useCallback((page) => dispatch(setCurrentPage(page)), [dispatch]);
    const toggleChosenElement = useCallback((id) => {
        setChosenElements((prev) => prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id]);
    }, []);
    const totalPages = useMemo(() => Math.ceil(totalProducts / itemsPerPage), [totalProducts]);
    const skeletons = useMemo(() => Array.from({ length: itemsPerPage }), []);
    useEffect(() => {
        dispatch(fetchProducts()).unwrap().catch(console.error);
    }, [currentPage, dispatch, search, sortOrder]);
    return (_jsxs("div", { className: cls.container, children: [_jsxs("div", { className: cls.tableWrapper, children: [_jsxs("div", { className: cls.header, children: [_jsx("div", {}), _jsx("div", { children: "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435" }), _jsx("div", { children: "\u0412\u0435\u043D\u0434\u043E\u0440" }), _jsx("div", { children: "\u0410\u0440\u0442\u0438\u043A\u0443\u043B" }), _jsx("div", { children: "\u041E\u0446\u0435\u043D\u043A\u0430" }), _jsx("div", { children: "\u0426\u0435\u043D\u0430, \u20BD" }), _jsx("div", { children: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E" }), _jsx("div", { children: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F" })] }), loading ? (skeletons.map((_, index) => (_jsx("div", { className: `${cls.row} ${cls.skeletonRow}` }, index)))) : products.length ? (products.map((product) => (_jsxs("div", { className: `${cls.row} ${chosenElements.includes(String(product.id)) ? cls.selected : ""}`, children: [_jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: chosenElements.includes(String(product.id)), size: "small", onChange: () => toggleChosenElement(String(product.id)), sx: {
                                        color: "#999",
                                        "&.Mui-checked": { color: "blue" },
                                    } }), label: "" }), _jsxs("div", { className: cls.cellTitle, children: [_jsx("div", { className: cls.imagePlaceholder }), _jsxs("div", { className: cls.textWrapper, children: [_jsx("div", { className: cls.titleText, title: product.title, children: product.title.length > 25
                                                    ? product.title.slice(0, 25) + "..."
                                                    : product.title }), _jsx("div", { className: cls.categoryText, children: product.category.charAt(0).toUpperCase() +
                                                    product.category.slice(1) })] })] }), _jsx("div", { className: cls.cell, children: product.brand || "-" }), _jsx("div", { className: cls.cell, children: product.sku }), _jsxs("div", { className: cls.cell, children: [_jsx("span", { style: { color: product.rating < 3 ? "red" : "inherit" }, children: product.rating.toFixed(1) }), _jsx("span", { children: "/5" })] }), _jsxs("div", { className: cls.cell, children: [Math.floor(product.price).toLocaleString("ru-RU"), _jsx("span", { className: cls.cents, children: ",00 \u20BD" })] }), _jsx("div", { className: cls.cell, children: product.stock }), _jsxs("div", { className: `${cls.cell} ${cls.actions}`, children: [_jsx("button", { className: cls.addButton, children: "+" }), _jsx(PiDotsThreeCircle, { size: 30 })] })] }, product.id)))) : (_jsx("div", { className: cls.notFound, children: "\u041D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E" }))] }), _jsx(Pagination, { totalPages: totalPages, currentPage: currentPage, setCurrentPage: handlePageChange })] }));
};
