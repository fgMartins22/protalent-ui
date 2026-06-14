import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "../App";
import Curriculos from "../pages/Curriculos";
import CurriculoView from "../pages/CurriculoView";
import Buy from "../pages/Buy";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import RecuperarSenha from "../pages/RecuperarSenha";
import Perfil from "../pages/Perfil";
import Premium from "../pages/Premium";
import Linkedin from "../pages/Linkedin";
import Carta from "../pages/Carta";
import Consultoria from "../pages/Consultoria";
import NotFound from "../pages/NotFound";
import { ProtectedRoute, PublicOnlyRoute } from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Raiz → login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Públicas (somente deslogado) */}
        <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path="/cadastro" element={<PublicOnlyRoute><Cadastro /></PublicOnlyRoute>} />
        <Route path="/recuperar-senha" element={<PublicOnlyRoute><RecuperarSenha /></PublicOnlyRoute>} />

        {/* Privadas (exigem login) */}
        <Route path="/home" element={<ProtectedRoute><App /></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
        <Route path="/curriculos" element={<ProtectedRoute><Curriculos /></ProtectedRoute>} />
        <Route path="/curriculos/:id" element={<ProtectedRoute><CurriculoView /></ProtectedRoute>} />
        <Route path="/premium" element={<ProtectedRoute><Premium /></ProtectedRoute>} />
        <Route path="/buy" element={<ProtectedRoute><Buy /></ProtectedRoute>} />
        <Route path="/linkedin" element={<ProtectedRoute><Linkedin /></ProtectedRoute>} />
        <Route path="/carta" element={<ProtectedRoute><Carta /></ProtectedRoute>} />
        <Route path="/consultoria" element={<ProtectedRoute><Consultoria /></ProtectedRoute>} />
        <Route path="/consult" element={<ProtectedRoute><Consultoria /></ProtectedRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
