import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import cls from "./Toast.module.scss";
export const Toast = ({ id, message, type = "info", duration = 3000, onClose, }) => {
    useEffect(() => {
        const timer = setTimeout(() => onClose(id), duration);
        return () => clearTimeout(timer);
    }, [id, duration, onClose]);
    return _jsx("div", { className: `${cls.toast} ${cls[type]}`, children: message });
};
