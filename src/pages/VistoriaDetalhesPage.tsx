import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Download, Printer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// Mock data - em produção viria da API
const mockVistorias = [
  {
    id: "123",
    obra: "Residencial Solaris",
    endereco: "Av. Paulista, 1000 - São Paulo/SP",
    responsavel: "Eng. Carlos Silva",
    data: "15/05/2024",
    status: "Concluída",
    observacoesGerais: "A obra apresenta bom andamento com pequenos ajustes necessários na parte elétrica.",
    itensEstrutural: [
      { nome: "Fundações", status: "Aprovado", observacoes: "Todas as fundações estão dentro dos padrões" },
      { nome: "Pilares", status: "Aprovado", observacoes: "Pilares bem alinhados e com resistência adequada" }
    ],
    itensHidraulica: [
      { nome: "Tubulações", status: "Aprovado", observacoes: "Tubulações bem instaladas e vedadas" },
      { nome: "Pontos de Água", status: "Reprovado", observacoes: "Vazamento no ponto da cozinha" }
    ],
    itensEletrica: [
      { nome: "Quadro de Distribuição", status: "Aprovado", observacoes: "Organização e proteções adequadas" },
      { nome: "Tomadas e Interruptores", status: "Pendente", observacoes: "Necessário testar todas as tomadas" }
    ],
    photos: [
      { caption: "Fundações - Setor A", location: { lat: -23.5505, lng: -46.6333 }, timestamp: "2024-05-15T10:30:00" },
      { caption: "Tubulações - Banheiro", location: { lat: -23.5506, lng: -46.6334 }, timestamp: "2024-05-15T11:15:00" }
    ]
  }
];

const VistoriaDetalhesPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  // Buscar vistoria pelo ID (em produção seria uma chamada à API)
  const vistoria = mockVistorias.find(v => v.id === id);

  if (!vistoria) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800">Vistoria não encontrada</h1>
        <p className="text-gray-600 mt-4">A vistoria com ID {id} não foi encontrada.</p>
      </div>
    );
  }

  const generatePDF = () => {
    // Simulação de geração de PDF
    toast({
      title: "Relatório gerado",
      description: "O relatório em PDF foi gerado com sucesso!",
    });
  };

  const exportData = () => {
    // Simulação de exportação de dados
    toast({
      title: "Dados exportados",
      description: "Os dados da vistoria foram exportados com sucesso!",
    });
  };

  const printPage = () => {
    // Simulação de impressão
    toast({
      title: "Impressão iniciada",
      description: "A página está sendo preparada para impressão...",
    });
    setTimeout(() => window.print(), 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Vistoria #{vistoria.id}</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={generatePDF}>
            <FileText className="mr-2 h-4 w-4" /> Gerar Relatório
          </Button>
          <Button variant="outline" onClick={exportData}>
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
          <Button variant="outline" onClick={printPage}>
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
                <div className="text-gray-600">{vistoria.observacoesGerais}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo dos Itens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Estrutural</h3>
                <div className="space-y-2">
                  {vistoria.itensEstrutural.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.nome}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.status === "Aprovado" 
                          ? "bg-green-100 text-green-800" 
                          : item.status === "Reprovado"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Hidráulica</h3>
                <div className="space-y-2">
                  {vistoria.itensHidraulica.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.nome}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.status === "Aprovado" 
                          ? "bg-green-100 text-green-800" 
                          : item.status === "Reprovado"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Elétrica</h3>
                <div className="space-y-2">
                  {vistoria.itensEletrica.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.nome}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.status === "Aprovado" 
                          ? "bg-green-100 text-green-800" 
                          : item.status === "Reprovado"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Detalhes dos Itens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Itens Estruturais</h3>
                <div className="space-y-4">
                  {vistoria.itensEstrutural.map((item, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{item.nome}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          item.status === "Aprovado" 
                            ? "bg-green-100 text-green-800" 
                            : item.status === "Reprovado"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{item.observacoes}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Itens Hidráulicos</h3>
                <div className="space-y-4">
                  {vistoria.itensHidraulica.map((item, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{item.nome}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          item.status === "Aprovado" 
                            ? "bg-green-100 text-green-800" 
                            : item.status === "Reprovado"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{item.observacoes}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Itens Elétricos</h3>
                <div className="space-y-4">
                  {vistoria.itensEletrica.map((item, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{item.nome}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs ${
                          item.status === "Aprovado" 
                            ? "bg-green-100 text-green-800" 
                            : item.status === "Reprovado"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{item.observacoes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Registro Fotográfico</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vistoria.photos.map((photo, index) => (
                <div key={index} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                  <div className="p-3">
                    <h4 className="font-medium">{photo.caption}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Local: {photo.location.lat.toFixed(4)}, {photo.location.lng.toFixed(4)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(photo.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VistoriaDetalhesPage;