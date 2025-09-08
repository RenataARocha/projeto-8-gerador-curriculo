import { useState } from "react";
import toast from "react-hot-toast";
import { melhorarTexto } from "../../utils/api";
import styles from "../components.Form/DadosPessoaisForm.module.css";

interface CampoResumoProps {
  value: string;
  onChange: (novoValor: string) => void;
  label?: string;
}

export function CampoResumo({ value, onChange, label }: CampoResumoProps) {
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
    <div className={styles.resumoFieldWrapper || ""}>
      {label && <label className={styles.floatingLabel}>{label}</label>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className={`${styles.floatingLabel} ${styles.resumoField} ${value ? styles.active : ""}`}
        data-placeholder={label}
      />
      <button
        onClick={handleMelhorar}
        disabled={loading}
        className={styles.botaoMelhorar} 
      >
        {loading ? "Melhorando..." : "Melhorar"}
      </button>
    </div>
  );
}
