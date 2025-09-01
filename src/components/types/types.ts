// src/types.ts

export interface DadosPessoais {
  nome: string;
  cargoDesejado: string;
  email: string;
  telefone: string;
  linkedin: string;
  github: string;
  resumo: string;
  habilidades: string; // ainda mantido caso queira string resumida
}

export interface Experiencia {
  id: number;
  empresa: string;
  cargo: string;
  descricao: string;
  inicio: string;
  fim: string;
  atual: boolean;
}

// Nova interface para Habilidade
export interface Habilidade {
  id: number;
  nome: string;
  nivel: "Básico" | "Intermediário" | "Avançado";
}

// Nova interface para Educação
export interface Educacao {
  id: number;
  instituicao: string;
  curso: string;
  inicio: string;
  fim: string;
}
