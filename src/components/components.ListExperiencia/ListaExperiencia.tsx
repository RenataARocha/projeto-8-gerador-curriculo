import React, { useState } from "react";

interface Experiencia {
  id: number;
  empresa: string;
  cargo: string;
  descricao: string;
  inicio: string;
  fim: string;
  atual: boolean;
}

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
  valor: Experiencia[keyof Experiencia] // Substitui o any
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
    <div>
      <h2>Experiências</h2>

      {experiencias.map((exp) => (
        <div key={exp.id}>
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

          <div>
            <label>
              Início:
              <input
                type="month"
                value={exp.inicio}
                onChange={(e) =>
                  updateExperiencia(exp.id, "inicio", e.target.value)
                }
                required
              />
            </label>

            {!exp.atual && (
              <label>
                Fim:
                <input
                  type="month"
                  value={exp.fim}
                  onChange={(e) =>
                    updateExperiencia(exp.id, "fim", e.target.value)
                  }
                  required
                />
              </label>
            )}

            <label>
              <input
                type="checkbox"
                checked={exp.atual}
                onChange={(e) =>
                  updateExperiencia(exp.id, "atual", e.target.checked)
                }
              />
              Trabalho atual
            </label>
          </div>

          <button type="button" onClick={() => removeExperiencia(exp.id)}>
            Remover
          </button>
        </div>
      ))}

      <button type="button" onClick={addExperiencia}>
        + Adicionar experiência
      </button>
    </div>
  );
};

export default ListaExperiencias;
