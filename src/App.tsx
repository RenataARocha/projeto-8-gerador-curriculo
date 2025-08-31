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
    email: "",
    telefone: "",
    linkedin: "",
    resumo: "",
  });

  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);

  return (
    <div className="app-container">
      <Header />

      <div className="main-content">
        <div className="form-container">
          <h1>Gerador de Currículo Inteligente</h1>
          <p>Vamos começar a construir o projeto</p>
          <DadosPessoaisForm dados={dados} setDados={setDados} />

          {/* Botão e lista de experiências */}
          <ListaExperiencias onChange={setExperiencias} />
        </div>

        <div className="preview-container">
          <Preview dados={dados} experiencias={experiencias} />
        </div>
      </div>
    </div>
  );
}

export default App;
