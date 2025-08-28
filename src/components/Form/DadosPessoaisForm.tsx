import { useState } from "react";
import styles from "./DadosPessoaisForm.module.css";

export function DadosPessoaisForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [resumo, setResumo] = useState("");

  const maxResumo = 200;

  // Funções de validação simples
  const validarEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <form className={styles.form}>
      <label>
        Nome *
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </label>

      <label>
        Email *
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={!validarEmail(email) && email ? styles.erro : ""}
          required
        />
        {!validarEmail(email) && email && (
          <span className={styles.msgErro}>Email inválido</span>
        )}
      </label>

      <label>
        Telefone *
        <input
          type="tel"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />
      </label>

      <label>
        LinkedIn
        <input
          type="url"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
      </label>

      <label>
        Resumo ({resumo.length}/{maxResumo})
        <textarea
          value={resumo}
          maxLength={maxResumo}
          onChange={(e) => setResumo(e.target.value)}
        />
      </label>
    </form>
  );
}
