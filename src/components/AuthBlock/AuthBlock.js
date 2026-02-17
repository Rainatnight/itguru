import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import cls from "./AuthBlock.module.scss";
import { login } from "../../api/authAPi";
import { useToastError } from "../../hooks/useToastError";
import { useAuthSuccess } from "../../hooks/useAuthSuccess";
import { BsSoundwave } from "react-icons/bs";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { validate } from "./helpers/validate";
import { InputField } from "../InputField/InputField";
import { Link } from "react-router-dom";
export const AuthBlock = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState({});
    const handleChange = useCallback((name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    }, []);
    const handleRememberChange = useCallback((event) => setRemember(event.target.checked), []);
    const handleError = useToastError();
    const handleSuccess = useAuthSuccess(remember);
    const mutation = useMutation({
        mutationFn: login,
        onSuccess: handleSuccess,
        onError: handleError,
    });
    const isSubmitting = mutation.status === "pending";
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const validationErrors = validate(formData.username, formData.password);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            mutation.mutate(formData);
        }
    }, [formData, mutation]);
    return (_jsxs("div", { className: cls.wrap, children: [_jsx("div", { className: cls.icon, children: _jsx(BsSoundwave, { size: 30 }) }), _jsx("h1", { className: cls.title, children: "\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C!" }), _jsx("p", { className: cls.subtitle, children: "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044C" }), _jsxs("form", { className: cls.form, onSubmit: onSubmit, children: [_jsx(InputField, { name: "username", value: formData.username, setValue: (v) => handleChange("username", v), errors: errors, setErrors: setErrors, placeholder: "\u0418\u043C\u044F", type: "text" }), _jsx(InputField, { name: "password", value: formData.password, setValue: (v) => handleChange("password", v), errors: errors, setErrors: setErrors, placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C", type: "password" }), _jsx("div", { className: cls.checkbox, children: _jsx(FormControlLabel, { control: _jsx(Checkbox, { checked: remember, size: "small", onChange: handleRememberChange, sx: {
                                    color: "#999",
                                    "&.Mui-checked": { color: "blue" },
                                } }), label: "\u0417\u0430\u043F\u043E\u043C\u043D\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435" }) }), _jsx("button", { className: cls.button, disabled: isSubmitting, children: isSubmitting ? "Вход..." : "Войти" })] }), _jsx("div", { className: cls.divider, children: "\u0438\u043B\u0438" }), _jsxs("div", { className: cls.footer, children: ["\u041D\u0435\u0442 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430? ", _jsx(Link, { to: "/signup", children: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C" })] })] }));
};
