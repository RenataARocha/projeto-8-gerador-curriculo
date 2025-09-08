import { useState, forwardRef, useImperativeHandle } from "react";
import type { DadosPessoais } from "../types/types";
import styles from "./DadosPessoaisForm.module.css";
import toast from "react-hot-toast";
import { melhorarTexto } from "../../utils/api";

// 🔹 Função para formatar o telefone
function formatarTelefone(valor: string): string {
  const numeros = valor.replace(/\D/g, ""); // só números

  if (numeros.length <= 10) {
    return numeros
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    return numeros
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }
}

// Componente CampoResumo
interface CampoResumoProps {
  value: string;
  onChange: (novoValor: string) => void;
  label?: string;
}

function CampoResumo({ value, onChange, label }: CampoResumoProps) {
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
    <div className={styles.resumoField}>
      {label && <label className={styles.floatingLabel}>{label}</label>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className={`${styles.floatingLabel} ${styles.resumoField} ${value ? styles.active : ""}`}
        data-placeholder={label}
        disabled={loading}
      />
      <button
        type="button"
        onClick={handleMelhorar}
        disabled={loading}
        className={styles.botaoMelhorar}
        style={{
          marginTop: "8px",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          border: "none",
          backgroundColor: "#ff4b9b",
          color: "#fff",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Melhorando..." : "Melhorar"}
      </button>
    </div>
  );
}

// Componente principal do formulário
type Props = {
  dados: DadosPessoais;
  setDados: React.Dispatch<React.SetStateAction<DadosPessoais>>;
};

const DadosPessoaisForm = forwardRef(({ dados, setDados }: Props, ref) => {
  const [touched, setTouched] = useState({
    nome: false,
    email: false,
    telefone: false,
  });

  const validarEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useImperativeHandle(ref, () => ({
    resetForm() {
      setTouched({ nome: false, email: false, telefone: false });
      setDados({
        nome: "",
        cargoDesejado: "",
        email: "",
        telefone: "",
        linkedin: "",
        github: "",
        resumo: "",
      });
    },
  }));

  return (
    <form className={styles.form}>
      <div className={styles.formHeader}>
        <h2>Suas Informações</h2>
        <div className={styles.dots}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Nome */}
      <label
        className={`${styles.floatingLabel} ${dados.nome ? styles.active : ""}`}
        data-placeholder="Nome Completo"
      >
        <input
          type="text"
          value={dados.nome}
          onChange={(e) => setDados({ ...dados, nome: e.target.value })}
          onBlur={() => setTouched((s) => ({ ...s, nome: true }))}
          required
        />
        {touched.nome && !dados.nome && (
          <span className={styles.msgErro}>Nome é obrigatório</span>
        )}
      </label>

      {/* Cargo Desejado */}
      <label
        className={`${styles.floatingLabel} ${dados.cargoDesejado ? styles.active : ""}`}
        data-placeholder="Cargo Desejado"
      >
        <input
          type="text"
          value={dados.cargoDesejado || ""}
          onChange={(e) => setDados({ ...dados, cargoDesejado: e.target.value })}
        />
      </label>

      {/* Email */}
      <label
        className={`${styles.floatingLabel} ${dados.email ? styles.active : ""}`}
        data-placeholder="E-mail"
      >
        <input
          type="email"
          value={dados.email}
          onChange={(e) => setDados({ ...dados, email: e.target.value })}
          onBlur={() => setTouched((s) => ({ ...s, email: true }))}
          className={
            touched.email && (!dados.email || !validarEmail(dados.email))
              ? styles.erro
              : ""
          }
          required
        />
        {touched.email && !dados.email && (
          <span className={styles.msgErro}>Email é obrigatório</span>
        )}
        {touched.email && dados.email && !validarEmail(dados.email) && (
          <span className={styles.msgErro}>Email inválido</span>
        )}
      </label>

      {/* Telefone */}
      <label
        className={`${styles.floatingLabel} ${dados.telefone ? styles.active : ""}`}
        data-placeholder="Telefone"
      >
        <input
          type="tel"
          value={dados.telefone}
          onChange={(e) =>
            setDados({ ...dados, telefone: formatarTelefone(e.target.value) })
          }
          onBlur={() => setTouched((s) => ({ ...s, telefone: true }))}
          required
        />
        {touched.telefone && !dados.telefone && (
          <span className={styles.msgErro}>Telefone é obrigatório</span>
        )}
      </label>

      {/* LinkedIn */}
      <label
        className={`${styles.floatingLabel} ${dados.linkedin ? styles.active : ""}`}
        data-placeholder="LinkedIn (opcional)"
      >
        <input
          type="url"
          value={dados.linkedin}
          onChange={(e) => setDados({ ...dados, linkedin: e.target.value })}
        />
      </label>

      {/* GitHub */}
      <label
        className={`${styles.floatingLabel} ${dados.github ? styles.active : ""}`}
        data-placeholder="GitHub (opcional)"
      >
        <input
          type="url"
          value={dados.github || ""}
          onChange={(e) => setDados({ ...dados, github: e.target.value })}
        />
      </label>

      {/* Resumo Profissional */}
      <CampoResumo
        value={dados.resumo}
        onChange={(novoValor) => setDados({ ...dados, resumo: novoValor })}
        label="Resumo Profissional"
      />
    </form>
  );
});

export default DadosPessoaisForm;
