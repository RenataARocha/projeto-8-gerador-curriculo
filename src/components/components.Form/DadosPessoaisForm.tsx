import type { DadosPessoais } from "../types/types";
import styles from "./DadosPessoaisForm.module.css";

type Props = {
  dados: DadosPessoais;
  setDados: React.Dispatch<React.SetStateAction<DadosPessoais>>;
};

export function DadosPessoaisForm({ dados, setDados }: Props) {
  const maxResumo = 1000;

  const validarEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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

      <label
        className={`${styles.floatingLabel} ${dados.nome ? styles.active : ""}`}
        data-placeholder="Nome Completo"
      >
        <input
          type="text"
          value={dados.nome}
          onChange={(e) => setDados({ ...dados, nome: e.target.value })}
          required
        />
      </label>

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

      <label
        className={`${styles.floatingLabel} ${dados.email ? styles.active : ""}`}
        data-placeholder="E-mail"
      >
        <input
          type="email"
          value={dados.email}
          onChange={(e) => setDados({ ...dados, email: e.target.value })}
          className={!validarEmail(dados.email) && dados.email ? styles.erro : ""}
          required
        />
        {!validarEmail(dados.email) && dados.email && (
          <span className={styles.msgErro}>Email inválido</span>
        )}
      </label>

      <label
        className={`${styles.floatingLabel} ${dados.telefone ? styles.active : ""}`}
        data-placeholder="Telefone"
      >
        <input
          type="tel"
          value={dados.telefone}
          onChange={(e) => setDados({ ...dados, telefone: e.target.value })}
          required
        />
      </label>

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

      <label
        className={`${styles.floatingLabel} ${dados.resumo ? styles.active : ""} ${styles.resumoField}`}
        data-placeholder={`Resumo Profissional (${dados.resumo.length}/${maxResumo})`}
      >
        <textarea
          value={dados.resumo}
          maxLength={maxResumo}
          onChange={(e) => setDados({ ...dados, resumo: e.target.value })}
        />
      </label>

      <label
        className={`${styles.floatingLabel} ${dados.habilidades ? styles.active : ""} ${styles.habilidadesField}`}
        data-placeholder="Habilidades (separadas por vírgula)"
      >
        <input
          type="text"
          value={dados.habilidades || ""}
          onChange={(e) => setDados({ ...dados, habilidades: e.target.value })}
        />
      </label>
    </form>
  );
}
