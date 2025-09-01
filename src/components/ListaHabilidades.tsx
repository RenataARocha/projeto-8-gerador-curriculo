import { useState } from 'react';

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
  const [nomeHabilidade, setNomeHabilidade] = useState('');
  const [nivelHabilidade, setNivelHabilidade] = useState('Básico');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!nomeHabilidade.trim()) return;
    adicionarHabilidade(nomeHabilidade, nivelHabilidade);

    setNomeHabilidade('');
    setNivelHabilidade('Básico');
  };

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Minhas Habilidades</h2>

      {/* Formulário para adicionar nova habilidade */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Nome da Habilidade"
          value={nomeHabilidade}
          onChange={(e) => setNomeHabilidade(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <select
          value={nivelHabilidade}
          onChange={(e) => setNivelHabilidade(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option>Básico</option>
          <option>Intermediário</option>
          <option>Avançado</option>
        </select>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Adicionar Habilidade
        </button>
      </form>

      {/* Lista de habilidades já adicionadas */}
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Habilidades Adicionadas:</h3>
      <ul className="space-y-2">
        {habilidades.map((habilidade) => (
          <li
            key={habilidade.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
          >
            <span>
              <span className="font-semibold">{habilidade.nome}</span> ({habilidade.nivel})
            </span>
            <button
              onClick={() => removerHabilidade(habilidade.id)}
              className="px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}