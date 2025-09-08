import { useState } from "react";
import toast from "react-hot-toast";
import { melhorarTexto } from "../../utils/api";

interface CampoResumoProps {
  value: string;
  onChange: (novoValor: string) => void;
  label?: string;
  className?: string; // 🔹 agora aceita className externa
}

export function CampoResumo({ value, onChange, label, className }: CampoResumoProps) {
  const [loading, setLoading] = useState(false);

  const handleMelhorar = async () => {
    if (!value.trim()) {
      toast.error("O campo está vazio!");
      return;
    }

    setLoading(true);
    try {
      const resultado = await melhorarTexto(value);
      onChange(resultado);
      toast.success("Texto melhorado com sucesso!");
    } catch (err) {
      console.error("Erro ao melhorar resumo:", err);
      toast.error("Erro ao melhorar resumo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      {label && <label className="font-semibold">{label}</label>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className="border p-2 rounded resize-none"
      />
      <button
        onClick={handleMelhorar}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Melhorando..." : "Melhorar"}
      </button>
    </div>
  );
}
