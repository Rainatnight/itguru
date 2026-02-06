import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";

import CatalogPage from "./pages/catalog";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/catalog" element={<CatalogPage />} />
    </Routes>
  );
}

export default App;
