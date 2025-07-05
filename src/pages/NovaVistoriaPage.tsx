import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Camera, Check, X } from "lucide-react";

const NovaVistoriaPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("geral");
  const [photos, setPhotos] = useState<{id: number, caption: string}[]>([]);

  const handleAddPhoto = () => {
    // Em produção, isso seria substituído por captura real de câmera
    setPhotos([...photos, { id: Date.now(), caption: "" }]);
  };

  const handleSubmit = () => {
    // Lógica para salvar vistoria
    navigate("/vistoria/123");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Nova Vistoria</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            <X className="mr-2 h-4 w-4" /> Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            <Check className="mr-2 h-4 w-4" /> Finalizar Vistoria
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="estrutural">Estrutural</TabsTrigger>
          <TabsTrigger value="hidraulica">Hidráulica</TabsTrigger>
          <TabsTrigger value="eletrica">Elétrica</TabsTrigger>
          <TabsTrigger value="acabamentos">Acabamentos</TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome da Obra</label>
                  <Input placeholder="Ex: Residencial Solaris" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Endereço</label>
                  <Input placeholder="Ex: Av. Paulista, 1000" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Responsável</label>
                  <Input placeholder="Nome do responsável" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Data</label>
                  <Input type="date" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Observações Gerais</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Descreva observações gerais sobre a obra..." rows={4} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estrutural">
          {/* Conteúdo similar para outras abas */}
          <Card>
            <CardHeader>
              <CardTitle>Itens Estruturais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Fundações</h3>
                    <p className="text-sm text-gray-500">Verificar estado das fundações</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Aprovado</Button>
                    <Button variant="destructive" size="sm">Reprovado</Button>
                  </div>
                </div>
                {/* Mais itens aqui */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Outras abas com estrutura similar */}

        <TabsContent value="acabamentos">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Registro Fotográfico</span>
                <Button onClick={handleAddPhoto}>
                  <Camera className="mr-2 h-4 w-4" /> Adicionar Foto
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map(photo => (
                  <div key={photo.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-200 border-2 border-dashed rounded-t-lg w-full h-48" />
                    <div className="p-3">
                      <Input 
                        placeholder="Descrição da foto..." 
                        value={photo.caption}
                        onChange={(e) => {
                          const newPhotos = photos.map(p => 
                            p.id === photo.id ? {...p, caption: e.target.value} : p
                          );
                          setPhotos(newPhotos);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NovaVistoriaPage;