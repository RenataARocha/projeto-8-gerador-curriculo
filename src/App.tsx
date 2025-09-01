import "./index.css";
import { useState } from "react";
import { DadosPessoaisForm } from "./components/components.Form/DadosPessoaisForm";
import Preview from "./components/Preview/Preview";
import ListaExperiencias from "./components/components.ListExperiencia/ListaExperiencia";
import ListaHabilidades from "./components/components.Habilidades/ListaHabilidades";
import type { Habilidade } from "./components/components.Habilidades/ListaHabilidades";
import ListaEducacao from "./components/components.Educacao/ListaEducacao";
import type { Educacao } from "./components/components.Educacao/ListaEducacao";
import type { DadosPessoais, Experiencia } from "./components/types/types";
import Header from "./components/componets.Header/Header";

function App() {
  const [dados, setDados] = useState<DadosPessoais>({
    nome: "",
    cargoDesejado: "",
    email: "",
    telefone: "",
    linkedin: "",
    github: "",
    resumo: "",
    habilidades: "",
  });

  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [habilidades, setHabilidades] = useState<Habilidade[]>([]);
  const [educacoes, setEducacoes] = useState<Educacao[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados pessoais:", dados);
    console.log("Experiências:", experiencias);
    console.log("Habilidades:", habilidades);
    console.log("Educação:", educacoes);
    alert("Currículo gerado com sucesso!");
  };

  return (
    <>
      <Header />
      <div className="main-content">
        <form className="form-container" onSubmit={handleSubmit}>
          {/* Dados pessoais */}
          <DadosPessoaisForm dados={dados} setDados={setDados} />

          {/* Experiências */}
          <ListaExperiencias onChange={setExperiencias} />

          {/* Habilidades */}
          <ListaHabilidades onChange={setHabilidades} />

          {/* Educação */}
          <ListaEducacao onChange={setEducacoes} />

          <button type="submit" className="submit-button">
            Gerar Currículo
          </button>
        </form>

        {/* Pré-visualização */}
        <div className="preview-container">
          <Preview
            dados={dados}
            experiencias={experiencias}
            habilidades={habilidades}
            educacoes={educacoes}
          />
        </div>
      </div>
    </>
  );
}

export default App;
