import { useState, forwardRef, useImperativeHandle } from "react";
import toast from "react-hot-toast";
import { melhorarTexto } from "../../utils/api";
import styles from "./ListaExperiencia.module.css";
import type { Experiencia } from "../types/types";

interface ListaExperienciasProps {
  onChange: (experiencias: Experiencia[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ListaExperiencias = forwardRef<{ resetForm: () => void }, ListaExperienciasProps>(
  ({ onChange }, ref) => {
    const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
    const [loadingIds, setLoadingIds] = useState<number[]>([]);

    useImperativeHandle(ref, () => ({
      resetForm() {
        setExperiencias([]);
        onChange([]);
      },
    }));

    const addExperiencia = () => {
      const nova: Experiencia = {
        id: Date.now(),
        empresa: "",
        cargo: "",
        descricao: "",
        inicio: "",
        fim: "",
        atual: false,
      };
      const novaLista = [...experiencias, nova];
      setExperiencias(novaLista);
      onChange(novaLista);
    };

    const removeExperiencia = (id: number) => {
      const novaLista = experiencias.filter((exp) => exp.id !== id);
      setExperiencias(novaLista);
      onChange(novaLista);
    };

    const updateExperiencia = (id: number, campo: keyof Experiencia, valor: Experiencia[keyof Experiencia]) => {
      const novaLista = experiencias.map((exp) =>
        exp.id === id
          ? { ...exp, [campo]: valor, ...(campo === "atual" && valor ? { fim: "" } : {}) }
          : exp
      );
      setExperiencias(novaLista);
      onChange(novaLista);
    };

    const handleMelhorarDescricao = async (exp: Experiencia) => {
      if (!exp.descricao.trim()) {
        toast.error("Descrição vazia!");
        return;
      }
      setLoadingIds((prev) => [...prev, exp.id]);
      try {
        const resultado = await melhorarTexto(exp.descricao);
        updateExperiencia(exp.id, "descricao", resultado);
        toast.success("Descrição melhorada!");
      } catch (err) {
        console.error(err);
        toast.error("Erro ao melhorar descrição.");
      } finally {
        setLoadingIds((prev) => prev.filter((id) => id !== exp.id));
      }
    };

    return (
      <div className={styles.listaExperienciasContainer}>
        <div className={styles.experienciasList}>
          {experiencias.map((exp, index) => (
            <div key={exp.id} className={styles.experienciaItem}>
              <div className={styles.headerItem}>
                <h3>Experiência {index + 1}</h3>
                <button type="button" onClick={() => removeExperiencia(exp.id)} className={styles.removeButton}>
                  &times;
                </button>
              </div>
              <input
                type="text"
                placeholder="Empresa"
                value={exp.empresa}
                onChange={(e) => updateExperiencia(exp.id, "empresa", e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Cargo"
                value={exp.cargo}
                onChange={(e) => updateExperiencia(exp.id, "cargo", e.target.value)}
                required
              />
              <textarea
                placeholder="Descrição das atividades"
                value={exp.descricao}
                onChange={(e) => updateExperiencia(exp.id, "descricao", e.target.value)}
                disabled={loadingIds.includes(exp.id)} // desabilita durante o loading
              />
              <button
                type="button"
                className={styles.addButton}
                onClick={() => handleMelhorarDescricao(exp)}
                disabled={loadingIds.includes(exp.id)} // botão desabilitado enquanto carrega
              >
                {loadingIds.includes(exp.id) ? (
                  <span className={styles.spinner}></span> // spinner dentro do botão
                ) : (
                  "Melhorar"
                )}
              </button>
              <div className={styles.dateFields}>
                <label>
                  Início:
                  <input
                    type="month"
                    value={exp.inicio}
                    onChange={(e) => updateExperiencia(exp.id, "inicio", e.target.value)}
                    required
                  />
                </label>
                <label>
                  Fim:
                  {!exp.atual && (
                    <input
                      type="month"
                      value={exp.fim}
                      onChange={(e) => updateExperiencia(exp.id, "fim", e.target.value)}
                      required
                    />
                  )}
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={exp.atual}
                    onChange={(e) => updateExperiencia(exp.id, "atual", e.target.checked)}
                  />
                  Trabalho atual
                </label>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addExperiencia} className={styles.addButton}>
          + Adicionar experiência
        </button>
      </div>
    );
  }
);

export default ListaExperiencias;
