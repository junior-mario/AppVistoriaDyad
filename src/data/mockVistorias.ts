export type Comment = {
  id: string;
  user: string;
  text: string;
  timestamp: string;
};

export type Photo = {
  id: number;
  caption: string;
  url: string;
  location?: { lat: number; lng: number };
  timestamp: string;
  itemId?: string; // Links to VistoriaItem.id
};

export type VistoriaItem = { 
  id: string; 
  nome: string; 
  status: string; 
  observacoes: string; 
  descricao?: string; 
};

export type Vistoria = {
  id: string;
  obra: string;
  endereco: string;
  data: string;
  status: "Pendente" | "Concluída" | "Em Andamento";
  responsavel: string;
  observacoesGerais: string;
  itensEstrutural: VistoriaItem[];
  itensHidraulica: VistoriaItem[];
  itensEletrica: VistoriaItem[];
  photos: Photo[];
  comments: Comment[];
};

export const mockVistorias: Vistoria[] = [
  {
    id: "1",
    obra: "Obra Residencial #1",
    endereco: "Av. Paulista, 1001 - São Paulo/SP",
    data: "2024-07-20",
    status: "Em Andamento",
    responsavel: "João Silva",
    observacoesGerais: "Iniciando a vistoria.",
    itensEstrutural: [{ id: 'est1', nome: 'Fundações', status: 'Pendente', observacoes: '' }],
    itensHidraulica: [{ id: 'hid1', nome: 'Tubulação', status: 'Pendente', observacoes: '' }],
    itensEletrica: [{ id: 'ele1', nome: 'Quadro Geral', status: 'Pendente', observacoes: '' }],
    photos: [],
    comments: [
      { id: 'c1', user: 'Eng. Maria', text: 'Início da vistoria. Tudo parece em ordem.', timestamp: '2024-07-20T09:00:00Z' }
    ]
  },
  {
    id: "2",
    obra: "Edifício Comercial Central",
    endereco: "Rua da Consolação, 500 - São Paulo/SP",
    data: "2024-07-18",
    status: "Concluída",
    responsavel: "Maria Oliveira",
    observacoesGerais: "Vistoria finalizada com sucesso. Pequenos reparos na hidráulica recomendados.",
    itensEstrutural: [{ id: 'es1', nome: 'Fundações', status: 'Aprovado', observacoes: 'OK' }],
    itensHidraulica: [{ id: 'hi1', nome: 'Encanamento', status: 'Reprovado', observacoes: 'Vazamento no banheiro do 2º andar.' }],
    itensEletrica: [{ id: 'el1', nome: 'Quadro de Força', status: 'Aprovado', observacoes: 'OK' }],
    photos: [
      { id: 1, caption: 'Vazamento encontrado', url: 'https://picsum.photos/seed/vazamento/400/300', location: { lat: -23.54, lng: -46.64 }, timestamp: '2024-07-18T14:30:00Z', itemId: 'hi1' }
    ],
    comments: [
      { id: 'c2', user: 'Eng. Maria', text: 'Encontrado vazamento na hidráulica. Foto anexada.', timestamp: '2024-07-18T14:32:00Z' },
      { id: 'c3', user: 'Eng. João', text: 'Reparo agendado para amanhã.', timestamp: '2024-07-18T16:00:00Z' }
    ]
  },
];