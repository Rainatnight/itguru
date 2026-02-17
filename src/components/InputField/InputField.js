import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { MdLockOutline } from "react-icons/md";
import cls from "./InputField.module.scss";
import { FiEdit, FiTag, FiTruck, FiHash, FiMail, FiEyeOff, FiX, FiEye, } from "react-icons/fi";
const leftIcons = {
    username: _jsx(FiMail, { size: 24, className: cls.icon }),
    password: _jsx(MdLockOutline, { size: 24, className: cls.icon }),
    name: _jsx(FiEdit, { size: 24, className: cls.icon }),
    price: _jsx(FiTag, { size: 24, className: cls.icon }),
    vendor: _jsx(FiTruck, { size: 24, className: cls.icon }),
    article: _jsx(FiHash, { size: 24, className: cls.icon }),
};
const labels = {
    username: "Имя",
    password: "Пароль",
    name: "Наименование",
    price: "Цена",
    vendor: "Вендор",
    article: "Артикул",
};
export const InputField = ({ errors, setErrors, value, setValue, placeholder, type = "text", name, }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = React.useCallback((e) => {
        setValue(e.target.value);
        setErrors((prev) => ({ ...prev, [name]: "" }));
    }, [name, setValue, setErrors]);
    const togglePassword = React.useCallback(() => setShowPassword((prev) => !prev), []);
    const clearInput = React.useCallback(() => setValue(""), [setValue]);
    const inputType = name === "password" && showPassword ? "text" : type;
    const RightIconMemo = React.useMemo(() => {
        if (name !== "password" && value)
            return _jsx(FiX, { size: 20, className: cls.rightIcon, onClick: clearInput });
        if (name === "password")
            return showPassword ? (_jsx(FiEyeOff, { size: 20, className: cls.rightIcon, onClick: togglePassword })) : (_jsx(FiEye, { size: 20, className: cls.rightIcon, onClick: togglePassword }));
        return null;
    }, [name, value, showPassword]);
    return (_jsxs("div", { className: cls.inputWrap, children: [_jsxs("div", { className: cls.labelErrorRow, children: [_jsx("span", { className: cls.label, children: labels[name] }), _jsx("span", { className: cls.error, children: errors?.[name] || "\u00A0" })] }), _jsxs("div", { className: cls.inputInner, children: [leftIcons[name], _jsx("input", { className: cls.input, type: inputType, placeholder: placeholder, value: value, onChange: handleChange }), RightIconMemo] })] }));
};
