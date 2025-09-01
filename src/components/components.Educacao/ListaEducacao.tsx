// src/components/components.Educacao/ListaEducacao.tsx
import { useState } from "react";
import styles from "../components.Educacao/ListaEducacao.module.css";

export type Educacao = {
  id: number;
  curso: string;
  instituicao: string;
  inicio: string;
  fim: string;
};

interface Props {
  onChange: (educacoes: Educacao[]) => void;
}

export default function ListaEducacao({ onChange }: Props) {
  const [educacoes, setEducacoes] = useState<Educacao[]>([]);

  const addEducacao = () => {
    const nova: Educacao = { id: Date.now(), instituicao: "", curso: "", inicio: "", fim: "" };
    const novaLista = [...educacoes, nova];
    setEducacoes(novaLista);
    onChange(novaLista);
  };

  const removeEducacao = (id: number) => {
    const novaLista = educacoes.filter((e) => e.id !== id);
    setEducacoes(novaLista);
    onChange(novaLista);
  };

  const updateEducacao = (id: number, campo: keyof Educacao, valor: string) => {
    const novaLista = educacoes.map((e) =>
      e.id === id ? { ...e, [campo]: valor } : e
    );
    setEducacoes(novaLista);
    onChange(novaLista);
  };

  return (
    <div className={styles.listaEducacaoContainer}>
      <div className={styles.formHeader}>
        <div className={styles.dots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {educacoes.map((e) => (
        <div key={e.id} className={styles.educacaoItem}>
          <input
            type="text"
            placeholder="Instituição"
            value={e.instituicao}
            onChange={(ev) => updateEducacao(e.id, "instituicao", ev.target.value)}
          />
          <input
            type="text"
            placeholder="Curso"
            value={e.curso}
            onChange={(ev) => updateEducacao(e.id, "curso", ev.target.value)}
          />
          <input
            type="month"
            placeholder="Início"
            value={e.inicio}
            onChange={(ev) => updateEducacao(e.id, "inicio", ev.target.value)}
          />
          <input
            type="month"
            placeholder="Fim"
            value={e.fim}
            onChange={(ev) => updateEducacao(e.id, "fim", ev.target.value)}
          />
          <button type="button" onClick={() => removeEducacao(e.id)}>
            Remover
          </button>
        </div>
      ))}

      <button type="button" className={styles.addButton} onClick={addEducacao}>
        + Adicionar Educação
      </button>
    </div>
  );
}
