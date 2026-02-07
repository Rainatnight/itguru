import { useDispatch } from "react-redux";
import type { AuthResponse } from "../api/authAPi";
import { useNavigate } from "react-router-dom";
import { addToast } from "../store/slices/toastSlice";

export const useAuthSuccess = (remember: boolean) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (data: AuthResponse) => {
    if (remember) localStorage.setItem("token", data.accessToken);
    else sessionStorage.setItem("token", data.accessToken);

    dispatch(
      addToast({
        message: "Вход выполнен успешно",
        type: "success",
        duration: 3000,
      }),
    );
    navigate("/catalog", { replace: true });
  };
};
