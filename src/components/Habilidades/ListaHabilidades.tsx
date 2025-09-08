import { useState, forwardRef, useImperativeHandle } from "react";
import toast from "react-hot-toast";
import { melhorarTexto } from "../../utils/api";
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
    const [loading, setLoading] = useState(false);

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

    // Função melhorada
    const handleMelhorar = async () => {
      if (!habilidadeTemp.trim()) {
        toast.error("O campo de habilidade está vazio!");
        return;
      }

      setLoading(true);
      try {
        const resultado = await melhorarTexto(habilidadeTemp);

        // Limpeza automática para extrair apenas a lista de habilidades
        const resultadoProcessado = resultado
            // Remove títulos como "Habilidades e Competências em..."
            .replace(/Habilidades.*|Vamos juntos.*|Essas habilidades.*/gi, "")
            // Remove as categorias (ex: "Linguagens e Tecnologias:")
            .replace(/.*:\s*/g, "")
            // Transforma quebras de linha e barras em um único separador
            .replace(/[\n|]+/g, ",")
            // Remove o último separador se houver
            .replace(/,\s*$/, "")
            .trim();

        setHabilidadeTemp(resultadoProcessado);
        toast.success("Habilidade melhorada com sucesso!");
      } catch (err) {
        console.error(err);
        toast.error("Erro ao melhorar habilidade.");
      } finally {
        setLoading(false);
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
              disabled={loading} // 🔹 bloqueia enquanto carrega
            />
            <select
              value={habilidadeTempLevel}
              onChange={(e) => setHabilidadeTempLevel(e.target.value)}
              disabled={loading} // 🔹 bloqueia enquanto carrega
            >
              <option value="Nenhum">Nenhum</option>
              <option value="Básico">Básico</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
            <button
              type="button"
              className={styles.melhorarButton}
              onClick={handleMelhorar}
              disabled={loading}
            >
              {loading ? "Melhorando..." : "Melhorar"}
            </button>
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
);

export default ListaHabilidades;