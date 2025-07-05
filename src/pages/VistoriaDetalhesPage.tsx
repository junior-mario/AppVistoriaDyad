import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Download, Printer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VistoriaDetalhesPage = () => {
  const { id } = useParams();
  
  // Dados de exemplo
  const vistoria = {
    id: id,
    obra: "Residencial Solaris",
    endereco: "Av. Paulista, 1000 - São Paulo/SP",
    responsavel: "Eng. Carlos Silva",
    data: "15/05/2024",
    status: "Concluída",
    observacoes: "A obra apresenta bom andamento com pequenos ajustes necessários na parte elétrica.",
    itens: [
      { categoria: "Estrutural", item: "Fundações", status: "Aprovado" },
      { categoria: "Hidráulica", item: "Tubulações", status: "Aprovado" },
      { categoria: "Elétrica", item: "Instalações", status: "Pendente" },
      { categoria: "Acabamentos", item: "Pisos", status: "Aprovado" }
    ]
  };

  const generatePDF = () => {
    // Lógica para gerar PDF
    alert("Relatório PDF gerado com sucesso!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Vistoria #{id}</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={generatePDF}>
            <FileText className="mr-2 h-4 w-4" /> Gerar Relatório
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" /> Imprimir
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Detalhes da Vistoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex">
                <div className="w-1/3 font-medium">Obra:</div>
                <div>{vistoria.obra}</div>
              </div>
              <div className="flex">
                <div className="w-1/3 font-medium">Endereço:</div>
                <div>{vistoria.endereco}</div>
              </div>
              <div className="flex">
                <div className="w-1/3 font-medium">Responsável:</div>
                <div>{vistoria.responsavel}</div>
              </div>
              <div className="flex">
                <div className="w-1/3 font-medium">Data:</div>
                <div>{vistoria.data}</div>
              </div>
              <div className="flex">
                <div className="w-1/3 font-medium">Status:</div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    vistoria.status === "Concluída" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {vistoria.status}
                  </span>
                </div>
              </div>
              <div className="flex">
                <div className="w-1/3 font-medium">Observações:</div>
                <div className="text-gray-600">{vistoria.observacoes}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Itens Verificados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vistoria.itens.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 border-b">
                  <div>
                    <div className="font-medium">{item.item}</div>
                    <div className="text-sm text-gray-500">{item.categoria}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    item.status === "Aprovado" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registro Fotográfico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                <div className="p-3">
                  <p className="text-sm text-gray-600">Fundações - Setor {item}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VistoriaDetalhesPage;