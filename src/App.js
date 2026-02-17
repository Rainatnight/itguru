import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import CatalogPage from "./pages/catalog";
import "./App";
import { ToastContainer } from "./components/Toast/ToastContainer";
import VitePage from "./pages/vite";
function App() {
    return (_jsxs(_Fragment, { children: [_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(AuthPage, {}) }), _jsx(Route, { path: "/vite", element: _jsx(VitePage, {}) }), _jsx(Route, { path: "/catalog", element: _jsx(ProtectedRoute, { children: _jsx(CatalogPage, {}) }) })] }), _jsx(ToastContainer, {})] }));
}
export default App;
