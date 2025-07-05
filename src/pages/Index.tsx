import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecionar para o dashboard após 2 segundos
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Sistema de Vistoria de Obras</h1>
        <p className="text-xl text-gray-600">
          Carregando seu painel de controle...
        </p>
      </div>
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;