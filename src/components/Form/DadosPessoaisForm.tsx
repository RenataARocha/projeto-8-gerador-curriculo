import styles from "./DadosPessoaisForm.module.css";
import { type DadosPessoais } from "../types/types";

type Props = {
  dados: DadosPessoais;
  setDados: React.Dispatch<React.SetStateAction<DadosPessoais>>;
};

export function DadosPessoaisForm({ dados, setDados }: Props) {
  const maxResumo = 200;

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
          required
        />
      </label>

      <label>
        Email *
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

      <label>
        Telefone *
        <input
          type="tel"
          value={dados.telefone}
          onChange={(e) => setDados({ ...dados, telefone: e.target.value })}
          required
        />
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
