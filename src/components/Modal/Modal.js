import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import cls from "./Modal.module.scss";
export const Modal = ({ children, onClose }) => {
    useEffect(() => {
        const onEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", onEsc);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onEsc);
            document.body.style.overflow = "";
        };
    }, [onClose]);
    return createPortal(_jsx("div", { className: cls.overlay, onClick: onClose, children: _jsx("div", { className: cls.modal, onClick: (e) => e.stopPropagation(), children: children }) }), document.body);
};
