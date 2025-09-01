import "./index.css";
import { useState } from "react";
import { DadosPessoaisForm } from "./components/components.Form/DadosPessoaisForm";
import Preview from "./components/Preview/Preview";
import ListaExperiencias from "./components/components.ListExperiencia/ListaExperiencia";
import ListaEducacao from "./components/components.Educacao/ListaEducacao";

import type { DadosPessoais, Experiencia } from "./components/types/types";
import type { Educacao } from "./components/components.Educacao/ListaEducacao";
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
  const [educacoes, setEducacoes] = useState<Educacao[]>([]);

  return (
    <>
      <Header />
      <div className="main-content">
        <form className="form-container">
          {/* Dados pessoais */}
          <DadosPessoaisForm dados={dados} setDados={setDados} />

          {/* Experiências */}
          <ListaExperiencias onChange={setExperiencias} />

          {/* Educação */}
          <ListaEducacao onChange={setEducacoes} />
        </form>

        {/* Pré-visualização */}
        <div className="preview-container">
          <Preview
            dados={dados}
            experiencias={experiencias}
            educacoes={educacoes}
          />
        </div>
      </div>
    </>
  );
}

export default App;
