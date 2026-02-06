import { useDispatch } from "react-redux";
import { addToast } from "../store/slices/toastSlice";

export const useToastError = () => {
  const dispatch = useDispatch();
  return (error: unknown) => {
    if (error instanceof Error) {
      dispatch(
        addToast({ message: error.message, type: "error", duration: 4000 }),
      );
    } else if (typeof error === "string") {
      dispatch(addToast({ message: error, type: "error", duration: 4000 }));
    } else {
      dispatch(
        addToast({
          message: "Неизвестная ошибка",
          type: "error",
          duration: 4000,
        }),
      );
    }
  };
};
