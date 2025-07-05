import { useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Download, Printer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const VistoriaDetalhesPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { toast } = useToast();
  
  // In a real app, you'd fetch this by ID. Here we get it from navigation state.
  const vistoria = location.state?.vistoria;

  if (!vistoria) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Erro</h1>
        <p className="text-gray-600 mt-2">Dados da vistoria não encontrados. Por favor, inicie uma nova vistoria.</p>
      </div>
    );
  }

  const printPage = () => {
    toast({ title: "Preparando para impressão..." });
    setTimeout(() => window.print(), 500);
  };

  const renderStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (status === "Aprovado") return <span className={`${baseClasses} bg-green-100 text-green-800`}>Aprovado</span>;
    if (status === "Reprovado") return <span className={`${baseClasses} bg-red-100 text-red-800`}>Reprovado</span>;
    return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Pendente</span>;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Detalhes da Vistoria</h1>
        <div className="flex space-x-2">
          <Button variant="outline"><FileText className="mr-2 h-4 w-4" /> Gerar PDF</Button>
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Exportar</Button>
          <Button variant="outline" onClick={printPage}><Printer className="mr-2 h-4 w-4" /> Imprimir</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Informações Gerais</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Obra:</strong> {vistoria.obra}</p>
              <p><strong>Endereço:</strong> {vistoria.endereco}</p>
              <p><strong>Observações:</strong> {vistoria.observacoesGerais || "Nenhuma"}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Itens Vistoriados</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-semibold">Estrutural</h3>
              {vistoria.itensEstrutural.map((item: any) => (
                <div key={item.id} className="border-t pt-2">
                  <div className="flex justify-between"><span>{item.nome}</span> {renderStatusBadge(item.status)}</div>
                  <p className="text-sm text-gray-600 pl-2">- {item.observacoes || "Sem observações."}</p>
                </div>
              ))}
              <h3 className="font-semibold mt-4">Hidráulica</h3>
              {vistoria.itensHidraulica.map((item: any) => (
                <div key={item.id} className="border-t pt-2">
                  <div className="flex justify-between"><span>{item.nome}</span> {renderStatusBadge(item.status)}</div>
                  <p className="text-sm text-gray-600 pl-2">- {item.observacoes || "Sem observações."}</p>
                </div>
              ))}
              <h3 className="font-semibold mt-4">Elétrica</h3>
              {vistoria.itensEletrica.map((item: any) => (
                <div key={item.id} className="border-t pt-2">
                  <div className="flex justify-between"><span>{item.nome}</span> {renderStatusBadge(item.status)}</div>
                  <p className="text-sm text-gray-600 pl-2">- {item.observacoes || "Sem observações."}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader><CardTitle>Registro Fotográfico</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {vistoria.photos.length > 0 ? vistoria.photos.map((photo: any) => (
                <div key={photo.id} className="border rounded-lg">
                  <div className="bg-gray-200 h-32 flex items-center justify-center text-gray-500">Foto</div>
                  <div className="p-2">
                    <p className="text-sm">{photo.caption || "Sem descrição"}</p>
                    {photo.location && (
                      <p className="text-xs text-gray-500">
                        Lat: {photo.location.lat.toFixed(4)}, Lon: {photo.location.lng.toFixed(4)}
                      </p>
                    )}
                  </div>
                </div>
              )) : <p className="text-sm text-gray-500">Nenhuma foto registrada.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VistoriaDetalhesPage;