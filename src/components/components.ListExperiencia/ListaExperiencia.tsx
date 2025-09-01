import React, { useState } from "react";
import styles from "../components.ListExperiencia/ListaExperiencia.module.css";
import type { Experiencia } from "../types/types";

interface ListaExperienciasProps {
  onChange: (experiencias: Experiencia[]) => void;
}

const ListaExperiencias: React.FC<ListaExperienciasProps> = ({ onChange }) => {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);

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

  const updateExperiencia = (
    id: number,
    campo: keyof Experiencia,
    valor: Experiencia[keyof Experiencia]
  ) => {
    const novaLista = experiencias.map((exp) =>
      exp.id === id
        ? {
            ...exp,
            [campo]: valor,
            ...(campo === "atual" && valor ? { fim: "" } : {}),
          }
        : exp
    );
    setExperiencias(novaLista);
    onChange(novaLista);
  };

  return (
    <div className={styles.listaExperienciasContainer}>
      <div className={styles.formHeader}>
        <div className={styles.dots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={styles.experienciasList}>
        {experiencias.map((exp) => (
          <div key={exp.id} className={styles.experienciaItem}>
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
            />
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
              {!exp.atual && (
                <label>
                  Fim:
                  <input
                    type="month"
                    value={exp.fim}
                    onChange={(e) => updateExperiencia(exp.id, "fim", e.target.value)}
                    required
                  />
                </label>
              )}
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={exp.atual}
                  onChange={(e) => updateExperiencia(exp.id, "atual", e.target.checked)}
                />
                Trabalho atual
              </label>
            </div>
            <button type="button" onClick={() => removeExperiencia(exp.id)}>
              Remover
            </button>
          </div>
        ))}
      </div>
      <button type="button" onClick={addExperiencia} className={styles.addButton}>
        + Adicionar experiência
      </button>
    </div>
  );
}; // Removido o ponto e vírgula e a sintaxe incorreta

export default ListaExperiencias;
