
import type { Habilidade } from "../../App"; 
import type { DadosPessoais, Experiencia } from "../types/types";
import type { Educacao } from "../components.Educacao/ListaEducacao";
import styles from "./Preview.module.css";

type Props = {
  dados: DadosPessoais;
  experiencias?: Experiencia[];
  educacoes?: Educacao[];
  listaDeHabilidades?: Habilidade[];
};

export default function Preview({
  dados,
  experiencias = [],
  educacoes = [],
  listaDeHabilidades = [],
}: Props) {


  return (
    <div className={styles.previewContainer}>
      <h2>Prévia do Currículo</h2>

      <div className={styles.card}>
        <h3>Dados Pessoais</h3>
        <p><strong>Nome:</strong> {dados.nome}</p>
        <p><strong>Cargo Desejado:</strong> {dados.cargoDesejado}</p>
        <p><strong>Email:</strong> {dados.email}</p>
        <p><strong>Telefone:</strong> {dados.telefone}</p>
        <p><strong>LinkedIn:</strong> {dados.linkedin}</p>
        <p><strong>GitHub:</strong> {dados.github}</p>
        <p><strong>Resumo:</strong> {dados.resumo}</p>
      </div>

      {experiencias.length > 0 && (
        <div className={styles.card}>
          <h3>Experiências</h3>
          {experiencias.map((exp) => (
            <div key={exp.id}>
              <p><strong>Empresa:</strong> {exp.empresa}</p>
              <p><strong>Cargo:</strong> {exp.cargo}</p>
              <p><strong>Descrição:</strong> {exp.descricao}</p>
              <p><strong>Período:</strong> {exp.inicio} - {exp.atual ? "Atual" : exp.fim}</p>
            </div>
          ))}
        </div>
      )}

      {/* ALTERADO: Este bloco agora usa a 'listaDeHabilidades' para mostrar nome e nível */}
      {listaDeHabilidades.length > 0 && (
        <div className={styles.card}>
          <h3>Habilidades</h3>
          {listaDeHabilidades.map((habilidade) => (
            <p key={habilidade.id}>
              {habilidade.nome} ({habilidade.nivel})
            </p>
          ))}
        </div>
      )}

      {educacoes.length > 0 && (
        <div className={styles.card}>
          <h3>Educação</h3>
          {educacoes.map((ed) => (
            <p key={ed.id}>{ed.curso} - {ed.instituicao} ({ed.inicio} - {ed.fim})</p>
          ))}
        </div>
      )}
    </div>
  );
}