import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
export const ProtectedRoute = ({ children }) => {
    const { isAuth } = useAuth();
    if (!isAuth) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return children;
};
