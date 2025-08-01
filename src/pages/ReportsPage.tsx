import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell, Legend, YAxis } from "recharts";
import { mockVistorias } from "@/data/mockVistorias";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IndividualReport } from "@/components/IndividualReport";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const ReportsPage = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedVistoriaId, setSelectedVistoriaId] = useState<string | undefined>();
  const { toast } = useToast();

  // Data for Vistorias by Status Pie Chart
  const statusData = mockVistorias.reduce((acc, vistoria) => {
    const status = vistoria.status;
    const existing = acc.find(item => item.name === status);
    if (existing) existing.value += 1;
    else acc.push({ name: status, value: 1 });
    return acc;
  }, [] as { name: string; value: number }[]);

  const STATUS_COLORS = {
    "Concluída": "#22c55e", // green-500
    "Em Andamento": "#3b82f6", // blue-500
    "Pendente": "#f59e0b", // amber-500
  };
  const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  // Data for Non-conformities by Obra Pie Chart
  const nonConformitiesByObra = mockVistorias
    .map(vistoria => {
      const reprovados = [...vistoria.itensEstrutural, ...vistoria.itensHidraulica, ...vistoria.itensEletrica]
        .filter(item => item.status === "Reprovado").length;
      return { name: vistoria.obra, value: reprovados };
    })
    .filter(item => item.value > 0);

  // Data for Vistorias by Month Bar Chart
  const vistoriasByMonth = mockVistorias.reduce((acc, vistoria) => {
    const monthKey = format(new Date(vistoria.data), "yyyy-MM");
    const monthLabel = format(new Date(vistoria.data), "MMM/yy", { locale: ptBR });
    if (!acc[monthKey]) acc[monthKey] = { month: monthLabel, total: 0, sortKey: monthKey };
    acc[monthKey].total += 1;
    return acc;
  }, {} as Record<string, { month: string; total: number; sortKey: string }>);
  const monthlyChartData = Object.values(vistoriasByMonth).sort((a, b) => a.sortKey.localeCompare(b.sortKey));

  const handleExportPDF = () => {
    const input = reportRef.current;
    if (!input) {
      toast({ title: "Erro ao exportar", variant: "destructive" });
      return;
    }
    setIsExporting(true);
    toast({ title: "Gerando PDF..." });
    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps= pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      pdf.save("relatorio-vistorias.pdf");
      setIsExporting(false);
    }).catch(err => {
      toast({ title: "Erro ao exportar PDF", variant: "destructive" });
      setIsExporting(false);
    });
  };

  const selectedVistoria = mockVistorias.find(v => v.id === selectedVistoriaId);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Relatórios de Vistorias</h1>
        <Button onClick={handleExportPDF} disabled={isExporting}>
          {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
          Exportar Relatório Completo
        </Button>
      </div>
      
      <div ref={reportRef} className="space-y-8 bg-white p-6 rounded-lg shadow-sm">
        <Card>
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
            <CardDescription>Indicadores globais de todas as vistorias cadastradas.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <h3 className="font-semibold mb-4">Vistorias por Status</h3>
              <ChartContainer config={{}} className="mx-auto aspect-square h-[250px]">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
                    {statusData.map((entry) => <Cell key={entry.name} fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS]} />)}
                  </Pie>
                  <Legend />
                </PieChart>
              </ChartContainer>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="font-semibold mb-4">Não Conformidades por Obra</h3>
              <ChartContainer config={{}} className="mx-auto aspect-square h-[250px]">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                  <Pie data={nonConformitiesByObra} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                     {nonConformitiesByObra.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vistorias por Mês</CardTitle>
            <CardDescription>Volume de vistorias realizadas mensalmente.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <BarChart data={monthlyChartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis allowDecimals={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="total" fill="#334155" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Relatório Individual</CardTitle>
            <CardDescription>Selecione uma vistoria para ver uma análise detalhada.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSelectedVistoriaId} value={selectedVistoriaId}>
              <SelectTrigger className="w-full md:w-1/2 mx-auto">
                <SelectValue placeholder="Selecione uma obra..." />
              </SelectTrigger>
              <SelectContent>
                {mockVistorias.map(v => (
                  <SelectItem key={v.id} value={v.id}>
                    {v.obra} - {new Date(v.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedVistoria && <IndividualReport vistoria={selectedVistoria} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;