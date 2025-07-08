import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Loader2, Edit } from 'lucide-react';
import { Profile } from '@/hooks/use-profile';
import { EditUserRoleDialog } from '@/components/admin/EditUserRoleDialog';

const UserManagementPage = () => {
  const supabaseClient = useSupabaseClient();
  const [editingUser, setEditingUser] = useState<Profile | null>(null);

  const { data: users, isLoading, refetch } = useQuery<Profile[]>({
    queryKey: ['all_users'],
    queryFn: async () => {
      const { data, error } = await supabaseClient.from('profiles').select('*');
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  if (isLoading) {
    return <div className="flex justify-center items-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Gerenciamento de Usuários</h1>
      <Card>
        <CardHeader>
          <CardTitle>Todos os Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Função</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.first_name || 'N/A'} {user.last_name || ''}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role === 'admin' ? 'Admin' : 'Usuário'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => setEditingUser(user)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {editingUser && (
        <EditUserRoleDialog
          user={editingUser}
          isOpen={!!editingUser}
          onOpenChange={(open) => !open && setEditingUser(null)}
          onUserUpdate={refetch}
        />
      )}
    </div>
  );
};

export default UserManagementPage;