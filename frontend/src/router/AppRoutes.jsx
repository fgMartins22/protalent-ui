import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "../App";
import Curriculos from "../pages/Curriculos";
import CurriculoView from "../pages/CurriculoView";
import Buy from "../pages/Buy";
import Login from "../pages/Login";
import Perfil from "../pages/Perfil";
import Premium from "../pages/Premium";
import Linkedin from "../pages/Linkedin";
import Carta from "../pages/Carta";
import Consultoria from "../pages/Consultoria";
import NotFound from "../pages/NotFound";
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

        {/* CURRÍCULOS */}
        <Route path="/curriculos" element={<Curriculos />} />
        <Route path="/curriculos/:id" element={<CurriculoView />} />

        {/* PERFIL */}
        <Route path="/perfil" element={<Perfil />} />

        {/* PREMIUM / COMPRA */}
        <Route path="/premium" element={<Premium />} />
        <Route path="/buy" element={<Buy />} />

        {/* SERVIÇOS */}
        <Route path="/linkedin" element={<Linkedin />} />
        <Route path="/carta" element={<Carta />} />
        <Route path="/consultoria" element={<Consultoria />} />
        <Route path="/consult" element={<Consultoria />} />

        {/* CATCH-ALL - página não encontrada */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
