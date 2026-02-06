import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import "./App.css";
import CatalogPage from "./pages/catalog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/catalog" element={<CatalogPage />} />
    </Routes>
  );
}

export default App;
