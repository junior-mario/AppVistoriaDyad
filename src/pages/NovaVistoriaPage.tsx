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

  // Dados da vistoria
  const [vistoriaData, setVistoriaData] = useState({
    obra: "",
    endereco: "",
    responsavel: "",
    data: new Date().toISOString().split('T')[0],
    observacoesGerais: ""
  });

  // Itens da vistoria
  const [itensEstrutural, setItensEstrutural] = useState<VistoriaItem[]>([
    { id: "1", nome: "Fundações", descricao: "Verificar estado das fundações", status: "Pendente", observacoes: "" },
    { id: "2", nome: "Pilares", descricao: "Verificar alinhamento e resistência", status: "Pendente", observacoes: "" }
  ]);

  const [itensHidraulica, setItensHidraulica] = useState<VistoriaItem[]>([
    { id: "1", nome: "Tubulações", descricao: "Verificar vedação e instalação", status: "Pendente", observacoes: "" },
    { id: "2", nome: "Pontos de Água", descricao: "Verificar vazão e funcionamento", status: "Pendente", observacoes: "" }
  ]);

  const [itensEletrica, setItensEletrica] = useState<VistoriaItem[]>([
    { id: "1", nome: "Quadro de Distribuição", descricao: "Verificar organização e proteções", status: "Pendente", observacoes: "" },
    { id: "2", nome: "Tomadas e Interruptores", descricao: "Verificar funcionamento e instalação", status: "Pendente", observacoes: "" }
  ]);

  const handleAddPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newPhoto: Photo = {
        id: Date.now(),
        caption: "",
        timestamp: new Date(),
        location: currentLocation || { lat: -23.5505, lng: -46.6333 }
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
    // Criar objeto com todos os dados da vistoria
    const vistoriaCompleta = {
      ...vistoriaData,
      itensEstrutural,
      itensHidraulica,
      itensEletrica,
      photos
    };

    // Aqui você enviaria para a API/Supabase
    console.log("Dados da vistoria:", vistoriaCompleta);
    
    // Redirecionar para a página de detalhes com ID fictício
    navigate(`/vistoria/${Date.now()}`);
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="estrutural">Estrutural</TabsTrigger>
          <TabsTrigger value="hidraulica">Hidráulica</TabsTrigger>
          <TabsTrigger value="eletrica">Elétrica</TabsTrigger>
          <TabsTrigger value="acabamentos">Acabamentos</TabsTrigger>
        </TabsList>

        {/* Rest of the component remains the same */}
      </Tabs>
    </div>
  );
};

export default NovaVistoriaPage;