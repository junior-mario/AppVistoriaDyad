import { useQuery } from '@tanstack/react-query';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Vistoria } from '@/data/mockVistorias';

export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: 'admin' | 'user';
};

export const useProfile = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const { data: profile, isLoading, error } = useQuery<Profile | null>({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data as Profile;
    },
    enabled: !!user, // Apenas executa a query se o usuário existir
  });

  return { profile, isLoading, error };
};