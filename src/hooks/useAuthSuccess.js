import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToast } from "../store/slices/toastSlice";
export const useAuthSuccess = (remember) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (data) => {
        if (remember)
            localStorage.setItem("token", data.accessToken);
        else
            sessionStorage.setItem("token", data.accessToken);
        dispatch(addToast({
            message: "Вход выполнен успешно",
            type: "success",
            duration: 3000,
        }));
        navigate("/catalog", { replace: true });
    };
};
