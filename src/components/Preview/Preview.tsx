import { type DadosPessoais } from "../types/types";
import styles from "./Preview.module.css";

type Props = {
  dados: DadosPessoais;
};

export default function Preview({ dados }: Props) {
  return (
    <div className={styles.previewContainer} >
    <h2>Prévia do Currículo</h2>
      <div className={styles.card}>
        <h2>Dados Pessoais</h2>
        <p>
          <strong>Nome:</strong> {dados.nome}
        </p>
        <p>
          <strong>Email:</strong> {dados.email}
        </p>
        <p>
          <strong>Telefone:</strong> {dados.telefone}
        </p>
        <p>
          <strong>LinkedIn:</strong> {dados.linkedin}
        </p>
        <p>
          <strong>Resumo:</strong> {dados.resumo}
        </p>
      </div>
    </div>
  );
}
