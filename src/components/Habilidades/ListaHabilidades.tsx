import { useState, forwardRef, useImperativeHandle } from "react";
import styles from "./ListaHabilidades.module.css";

export interface Habilidade {
  id: number;
  nome: string;
  nivel: string;
}

interface ListaHabilidadesProps {
  habilidades: Habilidade[];
  adicionarHabilidade: (nome: string, nivel: string) => void;
  removerHabilidade: (id: number) => void;
  habilidadeTemp: string;
  setHabilidadeTemp: (habilidade: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ListaHabilidades = forwardRef<{ resetForm: () => void }, ListaHabilidadesProps>(
  ({ habilidades, adicionarHabilidade, removerHabilidade, habilidadeTemp, setHabilidadeTemp }, ref) => {
    const [mostrarForm, setMostrarForm] = useState(false);
    const [habilidadeTempLevel, setHabilidadeTempLevel] = useState<string>("Básico");

    // Expõe método reset para o pai
    useImperativeHandle(ref, () => ({
      resetForm() {
        setHabilidadeTemp("");
        setMostrarForm(false);
        setHabilidadeTempLevel("Básico");
      },
    }));

    const handleToggleForm = () => {
      setMostrarForm(!mostrarForm);
      if (mostrarForm) {
        setHabilidadeTemp("");
        setHabilidadeTempLevel("Básico");
      }
    };

    const handleAddClick = () => {
      if (habilidadeTemp.trim() !== "") {
        adicionarHabilidade(habilidadeTemp, habilidadeTempLevel);
        setMostrarForm(false);
        setHabilidadeTemp("");
        setHabilidadeTempLevel("Básico");
      }
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
            <select
              value={habilidadeTempLevel}
              onChange={(e) => setHabilidadeTempLevel(e.target.value)}
            >
              <option value="Nenhum">Nenhum</option>
              <option value="Básico">Básico</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
          </div>
        )}

        {habilidades.length > 0 && (
          <>
            <h3 className={styles.listaTitulo}>Habilidades Adicionadas:</h3>

            {/* Lista das habilidades */}
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
);

export default ListaHabilidades;
