import "./index.css";
import { useState } from "react";
import { DadosPessoaisForm } from "./components/Form/DadosPessoaisForm";
import Preview from "./components/Preview/Preview";
import { type DadosPessoais } from "./components/types/types";

function App() {
  const [dados, setDados] = useState<DadosPessoais>({
    nome: "",
    email: "",
    telefone: "",
    linkedin: "",
    resumo: "",
  });

  return (
    <div className="app">
      <h1>Gerador de Currículo Inteligente</h1>
      <p>Vamos começar a construir o projeto</p>

      <DadosPessoaisForm dados={dados} setDados={setDados} />
      <Preview dados={dados} />

      <h1 className="text-3xl font-bold text-red-500">Testando Tailwind</h1>
    </div>
  );
}

export default App;
