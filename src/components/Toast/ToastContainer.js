import { jsx as _jsx } from "react/jsx-runtime";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { removeToast } from "../../store/slices/toastSlice";
import cls from "./Toast.module.scss";
export const ToastContainer = () => {
    const toasts = useSelector((state) => state.toast.list);
    const dispatch = useDispatch();
    useEffect(() => {
        toasts.forEach((t) => {
            if (t.duration) {
                const timer = setTimeout(() => dispatch(removeToast(t.id)), t.duration);
                return () => clearTimeout(timer);
            }
        });
    }, [toasts, dispatch]);
    return (_jsx("div", { className: cls.container, children: toasts.map((t) => (_jsx("div", { className: `${cls.toast} ${cls[t.type]}`, children: t.message }, t.id))) }));
};
