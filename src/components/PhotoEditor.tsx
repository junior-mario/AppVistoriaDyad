import { useRef } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { Button } from "@/components/ui/button";
import { Square, Circle, ArrowRight, Undo, Redo, Trash2, Save } from "lucide-react";

interface PhotoEditorProps {
  imageUrl: string;
  onSave: (data: string) => void;
}

export const PhotoEditor = ({ imageUrl, onSave }: PhotoEditorProps) => {
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const handleSave = async () => {
    if (canvasRef.current) {
      const data = await canvasRef.current.exportImage("png");
      onSave(data);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-center items-center gap-2 flex-wrap p-2 border rounded-md">
        <Button variant="outline" size="sm" onClick={() => canvasRef.current?.undo()}><Undo className="h-4 w-4 mr-1" /> Desfazer</Button>
        <Button variant="outline" size="sm" onClick={() => canvasRef.current?.redo()}><Redo className="h-4 w-4 mr-1" /> Refazer</Button>
        <Button variant="outline" size="sm" onClick={() => canvasRef.current?.clearCanvas()}><Trash2 className="h-4 w-4 mr-1" /> Limpar</Button>
        <Button size="sm" onClick={handleSave}><Save className="h-4 w-4 mr-1" /> Salvar Anotações</Button>
      </div>
      <ReactSketchCanvas
        ref={canvasRef}
        style={{ border: "1px solid #ccc", borderRadius: "0.5rem" }}
        width="100%"
        height="500px"
        backgroundImage={imageUrl}
        strokeWidth={4}
        strokeColor="red"
      />
    </div>
  );
};