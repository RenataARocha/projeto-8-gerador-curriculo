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
  onChange: (experiencias: Experiencia[]) => void; // para sincronizar com Preview
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

  const updateExperiencia = (id: number, campo: keyof Experiencia, valor: any) => {
    const novaLista = experiencias.map((exp) =>
      exp.id === id ? { ...exp, [campo]: valor, ...(campo === "atual" && valor ? { fim: "" } : {}) } : exp
    );
    setExperiencias(novaLista);
    onChange(novaLista);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Experiências</h2>

      {experiencias.map((exp) => (
        <div
          key={exp.id}
          className="border rounded-2xl p-4 shadow-sm space-y-3 bg-white"
        >
          <input
            type="text"
            placeholder="Empresa"
            value={exp.empresa}
            onChange={(e) => updateExperiencia(exp.id, "empresa", e.target.value)}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            placeholder="Cargo"
            value={exp.cargo}
            onChange={(e) => updateExperiencia(exp.id, "cargo", e.target.value)}
            required
            className="w-full border p-2 rounded"
          />

          <textarea
            placeholder="Descrição das atividades"
            value={exp.descricao}
            onChange={(e) => updateExperiencia(exp.id, "descricao", e.target.value)}
            className="w-full border p-2 rounded"
          />

          <div className="flex gap-2 items-center">
            <label className="flex flex-col">
              Início:
              <input
                type="month"
                value={exp.inicio}
                onChange={(e) => updateExperiencia(exp.id, "inicio", e.target.value)}
                required
                className="border p-2 rounded"
              />
            </label>

            {!exp.atual && (
              <label className="flex flex-col">
                Fim:
                <input
                  type="month"
                  value={exp.fim}
                  onChange={(e) => updateExperiencia(exp.id, "fim", e.target.value)}
                  required
                  className="border p-2 rounded"
                />
              </label>
            )}

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={exp.atual}
                onChange={(e) => updateExperiencia(exp.id, "atual", e.target.checked)}
              />
              Trabalho atual
            </label>
          </div>

          <button
            type="button"
            onClick={() => removeExperiencia(exp.id)}
            className="text-red-500 text-sm"
          >
            Remover
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addExperiencia}
        className="bg-blue-500 text-white px-4 py-2 rounded-2xl shadow"
      >
        + Adicionar experiência
      </button>
    </div>
  );
};

export default ListaExperiencias;
