export type Vistoria = {
  id: string;
  obra: string;
  endereco: string;
  data: string;
  status: "Pendente" | "Concluída" | "Em Andamento";
  responsavel: string;
  observacoesGerais: string;
  itensEstrutural: { id: string; nome: string; status: string; observacoes: string; }[];
  itensHidraulica: { id: string; nome: string; status: string; observacoes: string; }[];
  itensEletrica: { id: string; nome: string; status: string; observacoes: string; }[];
  photos: { id: number; caption: string; location?: { lat: number; lng: number }; }[];
};

export const mockVistorias: Vistoria[] = [
  {
    id: "1",
    obra: "Obra Residencial #1",
    endereco: "Av. Paulista, 1001 - São Paulo/SP",
    data: "2024-07-20",
    status: "Pendente",
    responsavel: "João Silva",
    observacoesGerais: "Iniciando a vistoria.",
    itensEstrutural: [],
    itensHidraulica: [],
    itensEletrica: [],
    photos: []
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
    photos: [{ id: 1, caption: 'Vazamento', location: { lat: -23.54, lng: -46.64 } }]
  },
  {
    id: "3",
    obra: "Reforma Apartamento 303",
    endereco: "Alameda Santos, 200 - São Paulo/SP",
    data: "2024-07-15",
    status: "Concluída",
    responsavel: "João Silva",
    observacoesGerais: "Tudo conforme o projeto.",
    itensEstrutural: [{ id: 'es1', nome: 'Paredes', status: 'Aprovado', observacoes: 'OK' }],
    itensHidraulica: [{ id: 'hi1', nome: 'Torneiras', status: 'Aprovado', observacoes: 'OK' }],
    itensEletrica: [{ id: 'el1', nome: 'Tomadas', status: 'Aprovado', observacoes: 'OK' }],
    photos: []
  }
];