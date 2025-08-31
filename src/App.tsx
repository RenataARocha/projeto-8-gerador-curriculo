import "./index.css";
import { useState } from "react";
import { DadosPessoaisForm } from "./components/components.Form/DadosPessoaisForm";
import Preview from "./components/Preview/Preview";
import type { DadosPessoais } from "./components/types/types";


function App() {
  const [dados, setDados] = useState<DadosPessoais>({
    nome: "",
    email: "",
    telefone: "",
    linkedin: "",
    resumo: "",
  });

  return (
    <div className="app-container" style={{ display: "flex", gap: "16px" }}>
      <div style={{ flex: 1 }}>
        <h1>Gerador de Currículo Inteligente</h1>
        <p>Vamos começar a construir o projeto</p>
        <DadosPessoaisForm dados={dados} setDados={setDados} />
      </div>

      <div style={{ flex: 1 }}>
        <Preview dados={dados} />
      </div>
    </div>
  );
}

export default App;
