import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Camera, Check, X, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Photo = {
  id: number;
  caption: string;
  location?: { lat: number; lng: number };
  timestamp: Date;
};

const NovaVistoriaPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("geral");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Simulação de extração de metadados (em produção, usar biblioteca como exif-js)
      const newPhoto: Photo = {
        id: Date.now(),
        caption: "",
        timestamp: new Date(),
        location: currentLocation || { lat: -23.5505, lng: -46.6333 } // Fallback para SP
      };
      
      setPhotos([...photos, newPhoto]);
      toast({
        title: "Foto adicionada",
        description: `Localização: ${newPhoto.location.lat.toFixed(4)}, ${newPhoto.location.lng.toFixed(4)}`,
      });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast({
            title: "Localização obtida",
            description: "Pronto para adicionar fotos com geolocalização",
          });
        },
        (error) => {
          toast({
            title: "Erro",
            description: "Não foi possível obter a localização",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Erro",
        description: "Geolocalização não suportada pelo navegador",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = () => {
    navigate("/vistoria/123");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />
      
      {/* Restante do código existente... */}

      <TabsContent value="estrutural">
        <Card>
          <CardHeader>
            <CardTitle>Itens Estruturais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
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
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">Observações sobre Fundações</label>
                <Textarea placeholder="Descreva qualquer problema encontrado..." rows={3} />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Pilares</h3>
                  <p className="text-sm text-gray-500">Verificar alinhamento e resistência</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Aprovado</Button>
                  <Button variant="destructive" size="sm">Reprovado</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">Observações sobre Pilares</label>
                <Textarea placeholder="Descreva qualquer problema encontrado..." rows={3} />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="hidraulica">
        <Card>
          <CardHeader>
            <CardTitle>Itens Hidráulicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Tubulações</h3>
                  <p className="text-sm text-gray-500">Verificar vedação e instalação</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Aprovado</Button>
                  <Button variant="destructive" size="sm">Reprovado</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">Observações sobre Tubulações</label>
                <Textarea placeholder="Descreva qualquer problema encontrado..." rows={3} />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Pontos de Água</h3>
                  <p className="text-sm text-gray-500">Verificar vazão e funcionamento</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Aprovado</Button>
                  <Button variant="destructive" size="sm">Reprovado</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">Observações sobre Pontos de Água</label>
                <Textarea placeholder="Descreva qualquer problema encontrado..." rows={3} />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="eletrica">
        <Card>
          <CardHeader>
            <CardTitle>Itens Elétricos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Quadro de Distribuição</h3>
                  <p className="text-sm text-gray-500">Verificar organização e proteções</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Aprovado</Button>
                  <Button variant="destructive" size="sm">Reprovado</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">Observações sobre Quadro Elétrico</label>
                <Textarea placeholder="Descreva qualquer problema encontrado..." rows={3} />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Tomadas e Interruptores</h3>
                  <p className="text-sm text-gray-500">Verificar funcionamento e instalação</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Aprovado</Button>
                  <Button variant="destructive" size="sm">Reprovado</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">Observações sobre Tomadas</label>
                <Textarea placeholder="Descreva qualquer problema encontrado..." rows={3} />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="acabamentos">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Registro Fotográfico</span>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={getCurrentLocation}>
                  <MapPin className="mr-2 h-4 w-4" /> Obter Localização
                </Button>
                <Button onClick={handleAddPhoto}>
                  <Camera className="mr-2 h-4 w-4" /> Adicionar Foto
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {photos.map(photo => (
                <div key={photo.id} className="border rounded-lg overflow-hidden">
                  <div className="bg-gray-200 border-2 border-dashed rounded-t-lg w-full h-48" />
                  <div className="p-3 space-y-2">
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
                    {photo.location && (
                      <p className="text-xs text-gray-500">
                        Local: {photo.location.lat.toFixed(4)}, {photo.location.lng.toFixed(4)}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      {photo.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

export default NovaVistoriaPage;