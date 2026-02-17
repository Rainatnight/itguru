import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MdFilterList } from "react-icons/md";
import { AiOutlineSync } from "react-icons/ai";
import { Products } from "./Products/Products";
import { useCallback, useState } from "react";
import { Modal } from "../../Modal/Modal";
import { AddProductForm } from "../AddProductForm/AddProductForm";
import { addToast } from "../../../store/slices/toastSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/thunks/productsThunks";
import { setCurrentPage, setSortOrder, } from "../../../store/slices/productsSlice";
import cls from "./BottomBlock.module.scss";
export const BottomBlock = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [sortMenu, setSortMenu] = useState(false);
    const sortOrder = useSelector((state) => state.products.sortOrder);
    const dispatch = useDispatch();
    const close = useCallback(() => setIsOpen(false), []);
    const onSuccess = useCallback(() => {
        setIsOpen(false);
        dispatch(addToast({ message: "Успешно", type: "success", duration: 4000 }));
    }, [dispatch]);
    const applySort = useCallback((order, e) => {
        e.stopPropagation();
        dispatch(setSortOrder(order));
        setSortMenu(false);
        dispatch(setCurrentPage(1));
        dispatch(fetchProducts());
    }, [dispatch]);
    const toggleSortMenu = useCallback(() => setSortMenu((prev) => !prev), []);
    const refresh = useCallback(() => {
        setSortMenu(false);
        dispatch(setSortOrder(null));
        dispatch(setCurrentPage(1));
        dispatch(fetchProducts());
    }, [dispatch]);
    return (_jsxs("div", { className: cls.block, children: [_jsxs("div", { className: cls.topRow, children: [_jsx("h2", { className: cls.title, children: "\u0412\u0441\u0435 \u043F\u043E\u0437\u0438\u0446\u0438\u0438" }), _jsxs("div", { className: cls.actions, children: [_jsx("div", { className: cls.iconWrap, children: _jsx(AiOutlineSync, { size: 20, onClick: refresh }) }), _jsxs("div", { className: cls.iconWrap, onClick: toggleSortMenu, children: [_jsx(MdFilterList, { size: 20, color: sortOrder ? "blue" : "grey" }), sortMenu && (_jsxs("div", { className: cls.sortMenu, children: [_jsx("div", { onClick: (e) => applySort("asc", e), className: sortOrder === "asc" ? cls.activeOption : "", children: "\u0426\u0435\u043D\u0430 \u2191" }), _jsx("div", { onClick: (e) => applySort("desc", e), className: sortOrder === "desc" ? cls.activeOption : "", children: "\u0426\u0435\u043D\u0430 \u2193" }), _jsx("div", { onClick: (e) => applySort(null, e), className: sortOrder === null ? cls.activeOption : "", children: "\u0421\u0431\u0440\u043E\u0441" })] }))] }), _jsx("button", { className: cls.addButton, onClick: () => setIsOpen(true), children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C" })] })] }), isOpen && (_jsx(Modal, { onClose: close, children: _jsx(AddProductForm, { onSuccess: onSuccess }) })), _jsx(Products, {})] }));
};
