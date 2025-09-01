import type { DadosPessoais } from "../../components/types/types";
import styles from "./Preview.module.css";
import type { Experiencia } from "../../components/types/types"; 

type Props = {
  dados: DadosPessoais;
  experiencias?: Experiencia[];
};

export default function Preview({ dados, experiencias = [] }: Props) {
  return (
    <div className={styles.previewContainer}>
      <h2>Prévia do Currículo</h2>

      <div className={styles.card}>
        <h2>Dados Pessoais</h2>
        <p><strong>Nome:</strong> {dados.nome}</p>
        <p><strong>Cargo Desejado:</strong> {dados.cargoDesejado}</p>
        <p><strong>Email:</strong> {dados.email}</p>
        <p><strong>Telefone:</strong> {dados.telefone}</p>
        <p><strong>LinkedIn:</strong> {dados.linkedin}</p>
        <p><strong>Resumo:</strong> {dados.resumo}</p>
      </div>

      {experiencias.length > 0 && (
        <div className={styles.card}>
          <h2>Experiências</h2>
          {experiencias.map((exp) => (
            <div key={exp.id} className={styles.experienciaItem}>
              <p><strong>Empresa:</strong> {exp.empresa}</p>
              <p><strong>Cargo:</strong> {exp.cargo}</p>
              <p><strong>Descrição:</strong> {exp.descricao}</p>
              <p>
                <strong>Período:</strong> {exp.inicio} - {exp.atual ? "Atual" : exp.fim}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
