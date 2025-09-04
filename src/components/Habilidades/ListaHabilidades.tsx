import { useState } from "react";
import styles from "./ListaHabilidades.module.css";

interface Habilidade {
  id: number;
  nome: string;
  nivel: string;
}

interface ListaHabilidadesProps {
  habilidades: Habilidade[];
  adicionarHabilidade: (nome: string, nivel: string) => void;
  removerHabilidade: (id: number) => void;
}

export default function ListaHabilidades({
  habilidades,
  adicionarHabilidade,
  removerHabilidade,
}: ListaHabilidadesProps) {
  const [nomeHabilidade, setNomeHabilidade] = useState("");
  const [nivelHabilidade, setNivelHabilidade] = useState("Básico");
  const [mostrarForm, setMostrarForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeHabilidade.trim()) return;
    adicionarHabilidade(nomeHabilidade, nivelHabilidade);
    setNomeHabilidade("");
    setNivelHabilidade("Básico");
  };

  return (
    <div className={styles.listaHabilidadesContainer}>
      <div className={styles.formHeader}>
        <div className={styles.dots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
     <button
  type="button" 
  className={mostrarForm ? styles.removeButtonForm : styles.addButtonForm}
  onClick={() => setMostrarForm(!mostrarForm)}
>
  {mostrarForm ? "×" : "+ Adicionar Habilidade"}
</button>

      {mostrarForm && (
        <form onSubmit={handleSubmit} className={styles.habilidadeForm}>
          <input
            type="text"
            placeholder="Nome da Habilidade"
            value={nomeHabilidade}
            onChange={(e) => setNomeHabilidade(e.target.value)}
          />
          <select
            value={nivelHabilidade}
            onChange={(e) => setNivelHabilidade(e.target.value)}
          >
            <option>Básico</option>
            <option>Intermediário</option>
            <option>Avançado</option>
          </select>
          <button type="submit" className={styles.addButtonForm}>
            Adicionar
          </button>
        </form>
      )}

      {habilidades.length > 0 && (
        <>
          <h3 className={styles.listaTitulo}>Habilidades Adicionadas:</h3>
          <ul className={styles.habilidadesList}>
            {habilidades.map((hab) => (
              <li key={hab.id} className={styles.habilidadeItem}>
                <span>
                  <strong>{hab.nome}</strong> ({hab.nivel})
                </span>
                <button
                  className={styles.removeButton}
                  onClick={() => removerHabilidade(hab.id)}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
