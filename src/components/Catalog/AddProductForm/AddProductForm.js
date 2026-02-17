import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { InputField } from "../../InputField/InputField";
import cls from "./AddProductForm.module.scss";
export const AddProductForm = ({ onSuccess }) => {
    const [values, setValues] = useState({
        name: "",
        price: "",
        vendor: "",
        article: "",
    });
    const [errors, setErrors] = useState({});
    const submit = (e) => {
        e.preventDefault();
        const nextErrors = {};
        if (!values.name)
            nextErrors.name = "Обязательное поле";
        if (!values.price)
            nextErrors.price = "Обязательное поле";
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0)
            return;
        onSuccess?.();
    };
    return (_jsxs("form", { className: cls.form, onSubmit: (e) => {
            submit(e);
        }, children: [_jsx("h3", { className: cls.title, children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0437\u0438\u0446\u0438\u044E" }), _jsx(InputField, { name: "name", value: values.name, setValue: (v) => setValues((p) => ({ ...p, name: v })), errors: errors, setErrors: setErrors, placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435" }), _jsx(InputField, { name: "price", value: values.price, setValue: (v) => setValues((p) => ({ ...p, price: v })), errors: errors, setErrors: setErrors, placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0446\u0435\u043D\u0443" }), _jsx(InputField, { name: "vendor", value: values.vendor, setValue: (v) => setValues((p) => ({ ...p, vendor: v })), errors: errors, setErrors: setErrors, placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0435\u043D\u0434\u043E\u0440\u0430" }), _jsx(InputField, { name: "article", value: values.article, setValue: (v) => setValues((p) => ({ ...p, article: v })), errors: errors, setErrors: setErrors, placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0430\u0440\u0442\u0438\u043A\u0443\u043B" }), _jsx("div", { className: cls.actions, children: _jsx("button", { type: "submit", children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" }) })] }));
};
