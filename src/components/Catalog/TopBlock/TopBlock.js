import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import { FaGlobe } from "react-icons/fa";
import { FiBell, FiMail, FiSliders } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setCurrentPage, setSearch } from "../../../store/slices/productsSlice";
import cls from "./TopBlock.module.scss";
export const TopBlock = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const debounceTime = 500;
    const handleChange = useCallback((e) => {
        setInputValue(e.target.value);
    }, []);
    // Дебаунс
    useEffect(() => {
        const handler = setTimeout(() => {
            dispatch(setCurrentPage(1));
            dispatch(setSearch(inputValue));
        }, debounceTime);
        return () => clearTimeout(handler);
    }, [inputValue, dispatch]);
    return (_jsxs("div", { className: cls.block, children: [_jsx("h2", { className: cls.title, children: "\u0422\u043E\u0432\u0430\u0440\u044B" }), _jsx("div", { className: cls.inputWrap, children: _jsx("input", { className: cls.input, type: "text", placeholder: "\u041F\u043E\u0438\u0441\u043A \u0442\u043E\u0432\u0430\u0440\u043E\u0432...", value: inputValue, onChange: handleChange }) }), _jsxs("div", { className: cls.right, children: [_jsx("div", { className: cls.divider }), _jsxs("div", { className: cls.icons, children: [_jsx(FaGlobe, { size: 24 }), _jsx(FiBell, { size: 24 }), _jsx(FiMail, { size: 24 }), _jsx(FiSliders, { size: 24 })] })] })] }));
};
