import "./index.css";
import { useState } from "react";
import { DadosPessoaisForm } from "./components/components.Form/DadosPessoaisForm";
import Preview from "./components/Preview/Preview";
import ListaExperiencias from "./components/components.ListExperiencia/ListaExperiencia";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados pessoais:", dados);
    console.log("Experiências:", experiencias);
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
        </form>

        {/* Pré-visualização */}
        <div className="preview-container">
          <Preview dados={dados} experiencias={experiencias} />
        </div>
      </div>
    </>
  );
}

export default App;
