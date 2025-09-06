import type { Habilidade } from "../../App";
import type { DadosPessoais, Experiencia } from "../types/types";
import type { Educacao } from "../components.Educacao/ListaEducacao";
import styles from "./Preview.module.css";

type Props = {
  dados: DadosPessoais;
  experiencias?: Experiencia[];
  educacoes?: Educacao[];
  listaDeHabilidades?: Habilidade[];
  habilidadeTemp: string;
};

export default function Preview({
  dados,
  experiencias = [],
  educacoes = [],
  listaDeHabilidades = [],
  habilidadeTemp,
}: Props) {
  const habilidadesTemporarias = habilidadeTemp
    .split(",")
    .map((nome) => ({
      id: "temp-" + Math.random(),
      nome: nome.trim(),
      nivel: "Nenhum",
    }))
    .filter((h) => h.nome);

  const todasAsHabilidades = [
    ...listaDeHabilidades,
    ...habilidadesTemporarias,
  ];

  return (
    <div className={styles.previewContainer}>
      <div className={styles.header}>
        <div className={styles.topBar}>
          <span
            className={styles.dot}
            style={{ backgroundColor: "rgb(255, 179, 192)" }}
          ></span>
          <span
            className={styles.dot}
            style={{ backgroundColor: "rgb(255, 179, 192)" }}
          ></span>
          <span
            className={styles.dot}
            style={{ backgroundColor: "#f806b0" }}
          ></span>
        </div>
        <p className={styles.title}>Preview do Currículo</p>
      </div>

      <div className={styles.personalInfo}>
        <h1>{dados.nome || "Seu Nome"}</h1>
        <p className={styles.jobTitle}>
          {dados.cargoDesejado || "Cargo Desejado"}
        </p>
        <p className={styles.contactInfo}>
          {dados.email || "email@exemplo.com"}
          <span className={styles.contactSeparator}> | </span>
          {dados.telefone || "(00) 00000-0000"}
        </p>

        <div className={styles.contactLinks}>
          {dados.linkedin && (
            <a href={dados.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}
          {dados.github && dados.linkedin && (
            <span className={styles.contactSeparator}> | </span>
          )}
          {dados.github && (
            <a href={dados.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
        </div>
        <hr className={styles.separatorLine} />
      </div>

      {dados.resumo && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Resumo Profissional</h3>
          <ul className={styles.list}>
            {dados.resumo.split("\n").map((linha, index) => (
              <li key={index}>{linha.trim()}</li>
            ))}
          </ul>
        </div>
      )}
      {(dados.resumo && (experiencias.length > 0 || educacoes.length > 0 || todasAsHabilidades.length > 0)) && (
        <hr className={styles.separatorLine} />
      )}

      {experiencias.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle1}>Experiências</h3>
          {experiencias.map((exp) => (
            <div key={exp.id} className={styles.item}>
              <p>
                <strong>Empresa:</strong> {exp.empresa}
              </p>
              <p>
                <strong>Cargo:</strong> {exp.cargo}
              </p>
              <p className={styles.descricao}>
                <strong>Descrição:</strong> {exp.descricao}
              </p>
              <p>
                <strong>Período:</strong> {exp.inicio} -{" "}
                {exp.atual ? "Atual" : exp.fim}
              </p>
            </div>
          ))}
        </div>
      )}
      {(experiencias.length > 0 && (educacoes.length > 0 || todasAsHabilidades.length > 0)) && (
        <hr className={styles.separatorLine} />
      )}

      {educacoes.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle1}>Educação</h3>
          {educacoes.map((ed) => (
            <div key={ed.id} className={styles.item}>
              <p>
                <strong>Curso:</strong> {ed.curso}
              </p>
              <p>
                <strong>Instituição:</strong> {ed.instituicao}
              </p>
              <p>
                <strong>Período:</strong> {ed.inicio} - {ed.fim}
              </p>
            </div>
          ))}
        </div>
      )}
      {(educacoes.length > 0 && todasAsHabilidades.length > 0) && (
        <hr className={styles.separatorLine} />
      )}

      {todasAsHabilidades.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle1}>Habilidades</h3>
          <div className={styles.habilidadesList}>
            {todasAsHabilidades.map((h, index) => (
              <span key={h.id} className={styles.skillTag}>
                {h.nome}{" "}
                {h.nivel !== "Nenhum" && `(${h.nivel})`}
                {index < todasAsHabilidades.length - 1 && (
                  <span className={styles.separator}> | </span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}