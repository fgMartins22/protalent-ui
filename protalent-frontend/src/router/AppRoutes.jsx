import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "../App";
import Curriculos from "../pages/Curriculos";
import CurriculoView from "../pages/CurriculoView";
import Buy from "../pages/Buy";
import Login from "../pages/Login";
import ParallaxTransition from "../components/ParallaxTransition";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN - primeira tela */}
        <Route path="/login" element={<Login />} />

        {/* Redireciona / para /login */}
        <Route path="/transition" element={<ParallaxTransition />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* SITE PRINCIPAL */}
        <Route path="/home" element={<App />} />

        {/* OUTRAS ROTAS */}
        <Route path="/curriculos" element={<Curriculos />} />
        <Route path="/curriculos/:id" element={<CurriculoView />} />
        <Route path="/buy" element={<Buy />} />

      </Routes>
    </BrowserRouter>
  );
}
