import { useEffect } from "react";
import cls from "./Toast.module.scss";

export type ToastType = "success" | "error" | "info";

export interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast = ({
  id,
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return <div className={`${cls.toast} ${cls[type]}`}>{message}</div>;
};
