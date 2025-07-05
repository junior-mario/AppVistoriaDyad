import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, Pie, PieChart, Cell, Legend } from "recharts";
import { mockVistorias } from "@/data/mockVistorias";

const ReportsPage = () => {
  // Data for Vistorias by Status Pie Chart
  const statusData = mockVistorias.reduce((acc, vistoria) => {
    const status = vistoria.status;
    const existing = acc.find(item => item.name === status);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: status, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const COLORS = {
    "Concluída": "hsl(var(--chart-2))",
    "Em Andamento": "hsl(var(--chart-1))",
    "Pendente": "hsl(var(--chart-3))",
  };

  // Data for Non-conformities by Area Bar Chart
  const allItems = mockVistorias.flatMap(v => [
    ...v.itensEstrutural.map(item => ({ ...item, area: "Estrutural" })),
    ...v.itensHidraulica.map(item => ({ ...item, area: "Hidráulica" })),
    ...v.itensEletrica.map(item => ({ ...item, area: "Elétrica" })),
  ]);

  const nonConformities = allItems
    .filter(item => item.status === "Reprovado")
    .reduce((acc, item) => {
      const area = (item as any).area;
      const existing = acc.find(d => d.area === area);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ area: area, count: 1 });
      }
      return acc;
    }, [] as { area: string; count: number }[]);

  const totalNonConformities = nonConformities.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Relatórios de Vistorias</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vistorias por Status</CardTitle>
            <CardDescription>Distribuição geral das vistorias cadastradas.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ChartContainer config={{}} className="mx-auto aspect-square h-[250px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                  return (<text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>);
                }}>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || '#8884d8'} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Não Conformidades por Área</CardTitle>
            <CardDescription>Total de itens reprovados em cada categoria.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[250px] w-full">
              <BarChart data={nonConformities} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="area" tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="count" fill="hsl(var(--destructive))" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumo Geral</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Total de Vistorias</p>
            <p className="text-2xl font-bold">{mockVistorias.length}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Total de Itens</p>
            <p className="text-2xl font-bold">{allItems.length}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-500">Não Conformidades</p>
            <p className="text-2xl font-bold text-red-700">{totalNonConformities}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-500">Itens Aprovados</p>
            <p className="text-2xl font-bold text-green-700">{allItems.filter(i => i.status === 'Aprovado').length}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;