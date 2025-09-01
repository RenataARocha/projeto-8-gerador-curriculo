// src/components/Preview/Preview.tsx

import type { DadosPessoais, Experiencia } from "../types/types";
import type { Educacao } from "../components.Educacao/ListaEducacao";
import styles from "./Preview.module.css";

type Props = {
  dados: DadosPessoais;
  experiencias?: Experiencia[];
  educacoes?: Educacao[];
};

export default function Preview({
  dados,
  experiencias = [],
  educacoes = [],
}: Props) {
  const habilidades = dados.habilidades
    ? dados.habilidades.split(",").map((h) => h.trim()).filter(Boolean)
    : [];

  return (
    <div className={styles.previewContainer}>
      <div className={styles.header}>
        <div className={styles.topBar}>
          <span className={styles.dot} style={{ backgroundColor: 'rgb(255, 179, 192)' }}></span>
          <span className={styles.dot} style={{ backgroundColor: 'rgb(255, 179, 192)' }}></span>
          <span className={styles.dot} style={{ backgroundColor: ' #f806b0' }}></span>
        </div>
        <p className={styles.title}>Preview do Currículo</p>
      </div>

      <div className={styles.personalInfo}>
        <h1>{dados.nome || "Seu Nome"}</h1>
        <p className={styles.jobTitle}>{dados.cargoDesejado || "Cargo Desejado"}</p>
        <p className={styles.contactInfo}>
          {dados.email || "email@exemplo.com"}
          <span className={styles.contactSeparator}> | </span>
          {dados.telefone || "(00) 00000-0000"}
        </p>
      </div>

      {experiencias.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Experiências</h3>
          {experiencias.map((exp) => (
            <div key={exp.id} className={styles.item}>
              <p><strong>Empresa:</strong> {exp.empresa}</p>
              <p><strong>Cargo:</strong> {exp.cargo}</p>
              <p><strong>Descrição:</strong> {exp.descricao}</p>
              <p><strong>Período:</strong> {exp.inicio} - {exp.atual ? "Atual" : exp.fim}</p>
            </div>
          ))}
        </div>
      )}

      {habilidades.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Habilidades</h3>
          <div className={styles.habilidadesList}>
            {habilidades.map((h, index) => (
              <span key={index} className={styles.skillTag}>{h}</span>
            ))}
          </div>
        </div>
      )}

      {educacoes.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Educação</h3>
          {educacoes.map((ed) => (
            <div key={ed.id} className={styles.item}>
              <p><strong>Curso:</strong> {ed.curso}</p>
              <p><strong>Instituição:</strong> {ed.instituicao}</p>
              <p><strong>Período:</strong> {ed.inicio} - {ed.fim}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}