import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockVistorias } from "../data/mockVistorias";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DashboardPage = () => {
  const navigate = useNavigate();
  
  const stats = {
    pendentes: mockVistorias.filter(v => v.status === "Pendente").length,
    concluidas: mockVistorias.filter(v => v.status === "Concluída").length,
    total: mockVistorias.length
  };

  const ultimasVistorias = mockVistorias.slice(0, 3);

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Concluída":
        return "bg-green-100 text-green-800 border-green-200";
      case "Em Andamento":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pendente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Painel de Vistorias</h1>
        <Button onClick={() => navigate("/nova-vistoria")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Vistoria
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Vistorias Pendentes</CardTitle>
            <AlertCircle className="text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendentes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Vistorias Concluídas</CardTitle>
            <CheckCircle className="text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.concluidas}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total de Vistorias</CardTitle>
            <FileText className="text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Últimas Vistorias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ultimasVistorias.map((vistoria) => (
              <div key={vistoria.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                <div>
                  <h3 className="font-medium">{vistoria.obra}</h3>
                  <p className="text-sm text-gray-500">{vistoria.endereco}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className={cn("hover:bg-opacity-80", getStatusClasses(vistoria.status))}>
                    {vistoria.status}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/vistoria/${vistoria.id}`)}>
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;