import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <h1 className="text-5xl font-bold mb-4 text-gray-800">Sistema de Vistoria de Obras</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Gerencie, execute e documente suas vistorias de forma eficiente e centralizada.
      </p>
      <Link to="/dashboard">
        <Button size="lg">Acessar o Painel</Button>
      </Link>
    </div>
  );
};

export default Index;