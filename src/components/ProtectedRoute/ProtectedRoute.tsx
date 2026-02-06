import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { JSX } from "react";

type Props = {
  children: JSX.Element;
};

export const ProtectedRoute = ({ children }: Props) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
};
