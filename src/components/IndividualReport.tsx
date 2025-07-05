import { useRef, useState } from "react";
import { Vistoria, VistoriaItem } from "@/data/mockVistorias";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useToast } from "@/components/ui/use-toast";

interface IndividualReportProps {
  vistoria: Vistoria;
}

const renderStatusBadge = (status: string) => {
  if (status === "Aprovado") return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-200">Aprovado</Badge>;
  if (status === "Reprovado") return <Badge variant="destructive">Reprovado</Badge>;
  return <Badge variant="secondary">Pendente</Badge>;
};

const renderItems = (title: string, items: VistoriaItem[]) => (
  <div className="mt-4">
    <h4 className="font-semibold text-md mb-2">{title}</h4>
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex justify-between items-center p-2 border rounded-md bg-gray-50/50">
          <div>
            <p className="font-medium">{item.nome}</p>
            <p className="text-sm text-gray-600">{item.observacoes || "Sem observações."}</p>
          </div>
          {renderStatusBadge(item.status)}
        </div>
      ))}
       {items.length === 0 && <p className="text-sm text-gray-500">Nenhum item nesta categoria.</p>}
    </div>
  </div>
);

export const IndividualReport = ({ vistoria }: IndividualReportProps) => {
  const reportCardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = () => {
    const input = reportCardRef.current;
    if (!input) return;

    setIsExporting(true);
    toast({ title: "Gerando PDF do relatório..." });

    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, imgHeight - 20);
      pdf.save(`relatorio-${vistoria.obra.replace(/\s+/g, '_')}.pdf`);
      setIsExporting(false);
    });
  };

  const allItems = [
    ...vistoria.itensEstrutural,
    ...vistoria.itensHidraulica,
    ...vistoria.itensEletrica,
  ];
  const approvedCount = allItems.filter(i => i.status === "Aprovado").length;
  const rejectedCount = allItems.filter(i => i.status === "Reprovado").length;

  return (
    <Card ref={reportCardRef} className="mt-6 border-t-4 border-blue-500 bg-white p-4">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Relatório Detalhado: {vistoria.obra}</CardTitle>
          <CardDescription>
            {vistoria.endereco} - Realizada em {new Date(vistoria.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
          </CardDescription>
        </div>
        <Button onClick={handleExport} disabled={isExporting} size="sm" variant="outline">
          {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
          Exportar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm font-medium text-green-700">Itens Aprovados</p>
            <p className="text-2xl font-bold text-green-800">{approvedCount}</p>
          </div>
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm font-medium text-red-700">Itens Reprovados</p>
            <p className="text-2xl font-bold text-red-800">{rejectedCount}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-700">Total de Itens</p>
            <p className="text-2xl font-bold text-blue-800">{allItems.length}</p>
          </div>
        </div>

        {renderItems("Estrutural", vistoria.itensEstrutural)}
        {renderItems("Hidráulica", vistoria.itensHidraulica)}
        {renderItems("Elétrica", vistoria.itensEletrica)}

        {vistoria.photos.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold text-md mb-2">Registro Fotográfico</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {vistoria.photos.map(photo => (
                <div key={photo.id}>
                  <img src={photo.url} alt={photo.caption} className="rounded-md object-cover h-32 w-full border" />
                  <p className="text-xs mt-1 truncate">{photo.caption}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};