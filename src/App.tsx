import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/DashboardPage";
import NovaVistoriaPage from "./pages/NovaVistoriaPage";
import VistoriaDetalhesPage from "./pages/VistoriaDetalhesPage";
import TodasVistoriasPage from "./pages/TodasVistoriasPage";
import ReportsPage from "./pages/ReportsPage";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/todas-vistorias" element={<TodasVistoriasPage />} />
              <Route path="/nova-vistoria" element={<NovaVistoriaPage />} />
              <Route path="/vistoria/:id" element={<VistoriaDetalhesPage />} />
              <Route path="/relatorios" element={<ReportsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;