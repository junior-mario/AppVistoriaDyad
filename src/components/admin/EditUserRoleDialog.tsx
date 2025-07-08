import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useToast } from '@/components/ui/use-toast';
import { Profile } from '@/hooks/use-profile';

interface EditUserRoleDialogProps {
  user: Profile;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUserUpdate: () => void;
}

export const EditUserRoleDialog = ({ user, isOpen, onOpenChange, onUserUpdate }: EditUserRoleDialogProps) => {
  const [role, setRole] = useState(user.role);
  const [isSaving, setIsSaving] = useState(false);
  const supabaseClient = useSupabaseClient();
  const { toast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    const { error } = await supabaseClient
      .from('profiles')
      .update({ role })
      .eq('id', user.id);

    if (error) {
      toast({ title: "Erro ao atualizar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Sucesso!", description: `A função de ${user.first_name || 'usuário'} foi atualizada.` });
      onUserUpdate();
      onOpenChange(false);
    }
    setIsSaving(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Função de {user.first_name} {user.last_name}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Select value={role} onValueChange={(value) => setRole(value as 'admin' | 'user')}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma função" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administrador</SelectItem>
              <SelectItem value="user">Usuário</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};