// src/types.ts

export interface DadosPessoais {
  nome: string;
  cargoDesejado: string;
  email: string;
  telefone: string;
  linkedin: string;
  github: string;
  resumo: string;
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

export interface Habilidade {
  id: number;
  nome: string;
  nivel: "Básico" | "Intermediário" | "Avançado";
}

export interface Educacao {
  id: number;
  instituicao: string;
  curso: string;
  inicio: string;
  fim: string;
}
