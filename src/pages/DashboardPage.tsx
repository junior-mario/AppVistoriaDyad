import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  
  // Dados de exemplo
  const stats = [
    { title: "Vistorias Pendentes", value: 5, icon: <AlertCircle className="text-yellow-500" /> },
    { title: "Vistorias Concluídas", value: 12, icon: <CheckCircle className="text-green-500" /> },
    { title: "Relatórios Gerados", value: 8, icon: <FileText className="text-blue-500" /> }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Painel de Vistorias</h1>
        <Button onClick={() => navigate("/nova-vistoria")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Vistoria
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Últimas Vistorias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 border-b">
                <div>
                  <h3 className="font-medium">Obra Residencial #{item}</h3>
                  <p className="text-sm text-gray-500">Av. Paulista, 100{item} - São Paulo/SP</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    Pendente
                  </span>
                  <Button variant="outline" size="sm">Ver Detalhes</Button>
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