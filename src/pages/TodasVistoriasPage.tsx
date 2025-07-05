import { useNavigate } from "react-router-dom";
import { mockVistorias } from "../data/mockVistorias";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TodasVistoriasPage = () => {
  const navigate = useNavigate();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Concluída":
        return "default";
      case "Pendente":
        return "destructive";
      case "Em Andamento":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Todas as Vistorias</h1>
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Vistorias</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Obra</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVistorias.map((vistoria) => (
                <TableRow key={vistoria.id}>
                  <TableCell className="font-medium">{vistoria.obra}</TableCell>
                  <TableCell>{new Date(vistoria.data).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(vistoria.status)}>{vistoria.status}</Badge>
                  </TableCell>
                  <TableCell>{vistoria.responsavel}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/vistoria/${vistoria.id}`)}>
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodasVistoriasPage;