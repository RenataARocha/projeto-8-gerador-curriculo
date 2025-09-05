// src/components/Habilidades/ListaHabilidades.tsx
import { useState } from "react";
import styles from "./ListaHabilidades.module.css";

interface Habilidade {
  id: number;
  nome: string;
  nivel: string;
}

interface ListaHabilidadesProps {
  habilidades: Habilidade[];
  adicionarHabilidade: (habilidades: string) => void;
  removerHabilidade: (id: number) => void;
  habilidadeTemp: string;
  setHabilidadeTemp: (habilidade: string) => void;
}

export default function ListaHabilidades({
  habilidades,
  adicionarHabilidade,
  removerHabilidade,
  habilidadeTemp,
  setHabilidadeTemp,
}: ListaHabilidadesProps) {
  const [mostrarForm, setMostrarForm] = useState(false);

  const handleToggleForm = () => {
    setMostrarForm(!mostrarForm);
    if (mostrarForm) {
      setHabilidadeTemp("");
    }
  };

  const handleAddClick = () => {
    adicionarHabilidade(habilidadeTemp);
    setMostrarForm(false);
  };

  return (
    <div className={styles.listaHabilidadesContainer}>
      <div className={styles.formHeader}>
        <button
          type="button"
          className={mostrarForm ? styles.salvarButton : styles.adicionarButton}
          onClick={mostrarForm ? handleAddClick : handleToggleForm}
        >
          {mostrarForm ? "Adicionar" : "+ Adicionar Habilidade"}
        </button>
      </div>

      {mostrarForm && (
        <div className={styles.habilidadeForm}>
          <input
            type="text"
            placeholder="Ex: HTML, CSS, JavaScript"
            value={habilidadeTemp}
            onChange={(e) => setHabilidadeTemp(e.target.value)}
          />
        </div>
      )}

      {habilidades.length > 0 && (
        <>
          <h3 className={styles.listaTitulo}>Habilidades Adicionadas:</h3>
          <ul className={styles.habilidadesList}>
            {habilidades.map((hab) => (
              <li key={hab.id} className={styles.habilidadeItem}>
                <span>
                  <strong>{hab.nome}</strong>{" "}
                  {hab.nivel !== "Nenhum" && <span>({hab.nivel})</span>}
                </span>
                <button
                  className={styles.removeButton}
                  onClick={() => removerHabilidade(hab.id)}
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}