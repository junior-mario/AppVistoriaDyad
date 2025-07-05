import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Check, X, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Photo = {
  id: number;
  caption: string;
  location?: { lat: number; lng: number };
  timestamp: Date;
};

type VistoriaItem = {
  id: string;
  nome: string;
  descricao: string;
  status: "Aprovado" | "Reprovado" | "Pendente";
  observacoes: string;
};

const NovaVistoriaPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("geral");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // General inspection data
  const [vistoriaData, setVistoriaData] = useState({
    obra: "",
    endereco: "",
    responsavel: "",
    data: new Date().toISOString().split('T')[0],
    observacoesGerais: ""
  });

  // Inspection items by category
  const [itensEstrutural, setItensEstrutural] = useState<VistoriaItem[]>([
    { id: "est1", nome: "Fundações", descricao: "Verificar estado das sapatas e baldrames", status: "Pendente", observacoes: "" },
    { id: "est2", nome: "Pilares e Vigas", descricao: "Verificar alinhamento, fissuras e armadura", status: "Pendente", observacoes: "" }
  ]);

  const [itensHidraulica, setItensHidraulica] = useState<VistoriaItem[]>([
    { id: "hid1", nome: "Tubulações de Água Fria", descricao: "Verificar vazamentos e instalação", status: "Pendente", observacoes: "" },
    { id: "hid2", nome: "Rede de Esgoto", descricao: "Verificar caimento e vedação", status: "Pendente", observacoes: "" }
  ]);

  const [itensEletrica, setItensEletrica] = useState<VistoriaItem[]>([
    { id: "ele1", nome: "Quadro de Distribuição", descricao: "Verificar disjuntores e organização", status: "Pendente", observacoes: "" },
    { id: "ele2", nome: "Pontos de Tomada e Luz", descricao: "Verificar fiação e funcionamento", status: "Pendente", observacoes: "" }
  ]);

  const handleAddPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newPhoto: Photo = {
        id: Date.now(),
        caption: "",
        timestamp: new Date(),
        location: currentLocation || undefined
      };
      
      setPhotos([...photos, newPhoto]);
      toast({
        title: "Foto adicionada",
        description: currentLocation ? `Localização capturada: ${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}` : "Localização não capturada.",
      });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(loc);
          toast({
            title: "Localização obtida com sucesso!",
            description: "As próximas fotos serão georreferenciadas.",
          });
        },
        () => {
          toast({
            title: "Erro de localização",
            description: "Não foi possível obter a localização. Verifique as permissões do navegador.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Navegador incompatível",
        description: "A geolocalização não é suportada por este navegador.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = () => {
    const vistoriaCompleta = {
      ...vistoriaData,
      itensEstrutural,
      itensHidraulica,
      itensEletrica,
      photos
    };
    console.log("Salvando Vistoria Completa:", vistoriaCompleta);
    // In a real app, you would save this to your database (e.g., Supabase)
    // and then navigate. For now, we pass it via state.
    navigate(`/vistoria/${Date.now()}`, { state: { vistoria: vistoriaCompleta } });
  };

  const renderVistoriaItems = (items: VistoriaItem[], setItems: React.Dispatch<React.SetStateAction<VistoriaItem[]>>) => {
    return items.map((item, index) => (
      <div key={item.id} className={`space-y-4 ${index < items.length - 1 ? 'border-b pb-4' : ''}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">{item.nome}</h3>
            <p className="text-sm text-gray-500">{item.descricao}</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant={item.status === "Aprovado" ? "default" : "outline"} 
              size="sm"
              onClick={() => {
                const updated = items.map(i => i.id === item.id ? {...i, status: "Aprovado" as const} : i);
                setItems(updated);
              }}
            >
              Aprovado
            </Button>
            <Button 
              variant={item.status === "Reprovado" ? "destructive" : "outline"} 
              size="sm"
              onClick={() => {
                const updated = items.map(i => i.id === item.id ? {...i, status: "Reprovado" as const} : i);
                setItems(updated);
              }}
            >
              Reprovado
            </Button>
          </div>
        </div>
        <Textarea 
          placeholder="Adicionar observações..." 
          rows={2}
          value={item.observacoes}
          onChange={(e) => {
            const updated = items.map(i => i.id === item.id ? {...i, observacoes: e.target.value} : i);
            setItems(updated);
          }}
        />
      </div>
    ));
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

      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="estrutural">Estrutural</TabsTrigger>
          <TabsTrigger value="hidraulica">Hidráulica</TabsTrigger>
          <TabsTrigger value="eletrica">Elétrica</TabsTrigger>
          <TabsTrigger value="fotos">Fotos</TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <Card>
            <CardHeader><CardTitle>Informações Gerais</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Nome da Obra</label>
                  <Input placeholder="Ex: Residencial Solaris" value={vistoriaData.obra} onChange={(e) => setVistoriaData({...vistoriaData, obra: e.target.value})} />
                </div>
                <div>
                  <label className="text-sm font-medium">Endereço</label>
                  <Input placeholder="Ex: Av. Paulista, 1000" value={vistoriaData.endereco} onChange={(e) => setVistoriaData({...vistoriaData, endereco: e.target.value})} />
                </div>
              </div>
              <Textarea placeholder="Observações gerais sobre a vistoria..." value={vistoriaData.observacoesGerais} onChange={(e) => setVistoriaData({...vistoriaData, observacoesGerais: e.target.value})} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estrutural">
          <Card>
            <CardHeader><CardTitle>Itens Estruturais</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              {renderVistoriaItems(itensEstrutural, setItensEstrutural)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hidraulica">
          <Card>
            <CardHeader><CardTitle>Itens de Hidráulica</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              {renderVistoriaItems(itensHidraulica, setItensHidraulica)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eletrica">
          <Card>
            <CardHeader><CardTitle>Itens de Elétrica</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              {renderVistoriaItems(itensEletrica, setItensEletrica)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fotos">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Registro Fotográfico</span>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={getCurrentLocation}>
                    <MapPin className="mr-2 h-4 w-4" /> Capturar GPS
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
                  <div key={photo.id} className="border rounded-lg">
                    <div className="bg-gray-200 h-40 flex items-center justify-center text-gray-500">Foto</div>
                    <div className="p-2 space-y-1">
                      <Input placeholder="Descrição da foto..." className="text-sm" />
                      {photo.location && (
                        <p className="text-xs text-gray-500">
                          Lat: {photo.location.lat.toFixed(4)}, Lon: {photo.location.lng.toFixed(4)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                {photos.length === 0 && <p className="text-sm text-gray-500 col-span-full">Nenhuma foto adicionada.</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NovaVistoriaPage;