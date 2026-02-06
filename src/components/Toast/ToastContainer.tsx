import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import type { RootState } from "../../store";
import { removeToast, type Toast } from "../../store/slices/toastSlice";
import cls from "./Toast.module.scss";

export const ToastContainer = () => {
  const toasts = useSelector((state: RootState) => state.toast.list);
  const dispatch = useDispatch();

  useEffect(() => {
    toasts.forEach((t) => {
      if (t.duration) {
        const timer = setTimeout(() => dispatch(removeToast(t.id)), t.duration);
        return () => clearTimeout(timer);
      }
    });
  }, [toasts, dispatch]);

  return (
    <div className={cls.container}>
      {toasts.map((t: Toast) => (
        <div key={t.id} className={`${cls.toast} ${cls[t.type]}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
};
