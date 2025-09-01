// src/components/components.ListHabilidades/ListaHabilidades.tsx
import { useState } from "react";
import styles from "../components.Habilidades/ListaHabilidades.module.css";

export type Habilidade = {
  id: number;
  nome: string;
  nivel: "Básico" | "Intermediário" | "Avançado";
};

interface Props {
  onChange: (habilidades: Habilidade[]) => void;
}

export default function ListaHabilidades({ onChange }: Props) {
  const [habilidades, setHabilidades] = useState<Habilidade[]>([]);

  const addHabilidade = () => {
    const nova: Habilidade = { id: Date.now(), nome: "", nivel: "Básico" };
    const novaLista = [...habilidades, nova];
    setHabilidades(novaLista);
    onChange(novaLista);
  };

  const removeHabilidade = (id: number) => {
    const novaLista = habilidades.filter((h) => h.id !== id);
    setHabilidades(novaLista);
    onChange(novaLista);
  };

  const updateHabilidade = (id: number, campo: keyof Habilidade, valor: any) => {
    const novaLista = habilidades.map((h) =>
      h.id === id ? { ...h, [campo]: valor } : h
    );
    setHabilidades(novaLista);
    onChange(novaLista);
  };

  return (
    <div className={styles.container}>
      <h3>Habilidades</h3>
      {habilidades.map((h) => (
        <div key={h.id} className={styles.item}>
          <input
            type="text"
            placeholder="Nome da Habilidade"
            value={h.nome}
            onChange={(e) => updateHabilidade(h.id, "nome", e.target.value)}
          />
          <select
            value={h.nivel}
            onChange={(e) =>
              updateHabilidade(h.id, "nivel", e.target.value as Habilidade["nivel"])
            }
          >
            <option value="Básico">Básico</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
          <button type="button" onClick={() => removeHabilidade(h.id)}>
            Remover
          </button>
        </div>
      ))}
      <button type="button" onClick={addHabilidade}>
        + Adicionar Habilidade
      </button>
    </div>
  );
}
