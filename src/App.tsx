import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import CatalogPage from "./pages/catalog";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route
        path="/catalog"
        element={
          <ProtectedRoute>
            <CatalogPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
