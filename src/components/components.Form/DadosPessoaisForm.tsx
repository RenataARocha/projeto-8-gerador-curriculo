import { useState } from "react";
import type { DadosPessoais } from "../types/types";
import styles from "./DadosPessoaisForm.module.css";

type Props = {
  dados: DadosPessoais;
  setDados: React.Dispatch<React.SetStateAction<DadosPessoais>>;
};

export function DadosPessoaisForm({ dados, setDados }: Props) {
  const maxResumo = 200;
  const [touched, setTouched] = useState({
    nome: false,
    email: false,
    telefone: false,
  });

  const validarEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <form className={styles.form}>
      <label>
        Nome *
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

      <label>
        Email *
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

      <label>
        Telefone *
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

      <label>
        LinkedIn
        <input
          type="url"
          value={dados.linkedin}
          onChange={(e) => setDados({ ...dados, linkedin: e.target.value })}
        />
      </label>

      <label>
        Resumo ({dados.resumo.length}/{maxResumo})
        <textarea
          value={dados.resumo}
          maxLength={maxResumo}
          onChange={(e) => setDados({ ...dados, resumo: e.target.value })}
        />
      </label>
    </form>
  );
}
