import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Printer, Camera, Paperclip } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { mockVistorias, Vistoria, Photo, VistoriaItem } from "@/data/mockVistorias";
import { CommentSection } from "@/components/CommentSection";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PhotoUploader = ({ vistoria, onAddPhoto, closeDialog }: { vistoria: Vistoria, onAddPhoto: (photo: Photo) => void, closeDialog: () => void }) => {
  const [caption, setCaption] = useState("");
  const [itemId, setItemId] = useState<string | undefined>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const allItems = [
    ...vistoria.itensEstrutural.map(item => ({ ...item, group: "Estrutural" })),
    ...vistoria.itensHidraulica.map(item => ({ ...item, group: "Hidráulica" })),
    ...vistoria.itensEletrica.map(item => ({ ...item, group: "Elétrica" })),
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAdd = () => {
    if (!selectedFile || !previewUrl) {
      toast({ title: "Nenhuma foto selecionada", description: "Por favor, escolha um arquivo de imagem.", variant: "destructive" });
      return;
    }
    const newPhoto: Photo = {
      id: Date.now(),
      caption,
      itemId,
      url: previewUrl,
      timestamp: new Date().toISOString(),
    };
    onAddPhoto(newPhoto);
    closeDialog();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar Nova Foto</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        
        {previewUrl ? (
          <div className="mt-4 text-center">
            <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover rounded-md border" />
            <Button variant="link" className="mt-2" onClick={() => fileInputRef.current?.click()}>Trocar foto</Button>
          </div>
        ) : (
          <Button variant="outline" className="w-full" onClick={() => fileInputRef.current?.click()}>
            <Camera className="mr-2 h-4 w-4" /> Selecionar Foto
          </Button>
        )}

        <Input placeholder="Legenda da foto" value={caption} onChange={e => setCaption(e.target.value)} />
        <Select onValueChange={setItemId} value={itemId}>
          <SelectTrigger>
            <SelectValue placeholder="Vincular a um item (opcional)" />
          </SelectTrigger>
          <SelectContent>
            {allItems.map(item => (
              <SelectItem key={item.id} value={item.id}>
                {item.group}: {item.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleAdd} className="w-full" disabled={!selectedFile}>Adicionar Foto à Vistoria</Button>
      </div>
    </DialogContent>
  );
};

const VistoriaDetalhesPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [vistoria, setVistoria] = useState<Vistoria | null>(null);
  const [isPhotoUploaderOpen, setIsPhotoUploaderOpen] = useState(false);

  useEffect(() => {
    const foundVistoria = mockVistorias.find(v => v.id === id);
    setVistoria(foundVistoria || null);
  }, [id]);

  if (!vistoria) {
    return <div>Vistoria não encontrada ou carregando...</div>;
  }

  const handleAddComment = (text: string) => {
    const newComment = {
      id: `c${Date.now()}`,
      user: "Eng. Ana", // Mocked user
      text,
      timestamp: new Date().toISOString(),
    };
    setVistoria(prev => prev ? { ...prev, comments: [...prev.comments, newComment] } : null);
    toast({ title: "Comentário adicionado!" });
  };

  const handleAddPhoto = (photo: Photo) => {
    setVistoria(prev => prev ? { ...prev, photos: [...prev.photos, photo] } : null);
    toast({ title: "Foto adicionada com sucesso!" });
  };

  const renderStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (status === "Aprovado") return <span className={`${baseClasses} bg-green-100 text-green-800`}>Aprovado</span>;
    if (status === "Reprovado") return <span className={`${baseClasses} bg-red-100 text-red-800`}>Reprovado</span>;
    return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Pendente</span>;
  };

  const renderItemPhotos = (itemId: string) => {
    const itemPhotos = vistoria.photos.filter(p => p.itemId === itemId);
    if (itemPhotos.length === 0) return null;

    return (
      <div className="mt-2 pl-4">
        <h4 className="text-sm font-semibold mb-2 text-gray-600">Fotos Vinculadas:</h4>
        <div className="flex gap-2 flex-wrap">
          {itemPhotos.map(photo => (
            <a key={photo.id} href={photo.url} target="_blank" rel="noopener noreferrer" className="block w-24">
              <img src={photo.url} alt={photo.caption} className="rounded-md object-cover h-16 w-24 border" />
              <p className="text-xs truncate mt-1">{photo.caption}</p>
            </a>
          ))}
        </div>
      </div>
    );
  };

  const renderItems = (title: string, items: VistoriaItem[]) => (
    <div>
      <h3 className="font-semibold mt-4 text-lg">{title}</h3>
      {items.map((item) => (
        <div key={item.id} className="border-t pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">{item.nome}</span> {renderStatusBadge(item.status)}
          </div>
          <p className="text-sm text-gray-600 pl-2 mt-1">- {item.observacoes || "Sem observações."}</p>
          {renderItemPhotos(item.id)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Detalhes da Vistoria</h1>
        <div className="flex space-x-2">
          <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Imprimir</Button>
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
            <CardContent>
              {renderItems("Estrutural", vistoria.itensEstrutural)}
              {renderItems("Hidráulica", vistoria.itensHidraulica)}
              {renderItems("Elétrica", vistoria.itensEletrica)}
            </CardContent>
          </Card>
          
          <CommentSection comments={vistoria.comments} onAddComment={handleAddComment} />
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Registro Fotográfico</span>
                <Dialog open={isPhotoUploaderOpen} onOpenChange={setIsPhotoUploaderOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm"><Camera className="mr-2 h-4 w-4" /> Adicionar</Button>
                  </DialogTrigger>
                  <PhotoUploader vistoria={vistoria} onAddPhoto={handleAddPhoto} closeDialog={() => setIsPhotoUploaderOpen(false)} />
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {vistoria.photos.length > 0 ? vistoria.photos.map((photo) => (
                <div key={photo.id} className="border rounded-lg p-2">
                  <img src={photo.url} alt={photo.caption} className="w-full h-32 object-cover rounded-md mb-2" />
                  <p className="text-sm font-medium">{photo.caption || "Sem descrição"}</p>
                  {photo.location && (
                    <p className="text-xs text-gray-500">
                      Lat: {photo.location.lat.toFixed(4)}, Lon: {photo.location.lng.toFixed(4)}
                    </p>
                  )}
                  {photo.itemId && <p className="text-xs text-blue-600 flex items-center gap-1"><Paperclip size={12} /> Vinculada</p>}
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