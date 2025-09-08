import { useState, forwardRef, useImperativeHandle } from "react";
import type { DadosPessoais } from "../types/types";
import styles from "./DadosPessoaisForm.module.css";
import { CampoResumo } from "../Campo.Resumo/CampoResumo";


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
      setTouched({
        nome: false,
        email: false,
        telefone: false,
      });
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
        className={`${styles.floatingLabel} ${dados.cargoDesejado ? styles.active : ""
          }`}
        data-placeholder="Cargo Desejado"
      >
        <input
          type="text"
          value={dados.cargoDesejado || ""}
          onChange={(e) =>
            setDados({ ...dados, cargoDesejado: e.target.value })
          }
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
          onChange={(e) => setDados({ ...dados, telefone: e.target.value })}
          onBlur={() => setTouched((s) => ({ ...s, telefone: true }))}
          required
        />
        {touched.telefone && !dados.telefone && (
          <span className={styles.msgErro}>Telefone é obrigatório</span>
        )}
      </label>

      {/* LinkedIn */}
      <label
        className={`${styles.floatingLabel} ${dados.linkedin ? styles.active : ""
          }`}
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

      {/* Resumo */}
      <CampoResumo
        className={styles.resumoField}
        label="Resumo Profissional"
        value={dados.resumo}
        onChange={(novoValor) => setDados({ ...dados, resumo: novoValor })}
      />


    </form>
  );
});

export default DadosPessoaisForm;