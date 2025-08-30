import './index.css'
import { DadosPessoaisForm } from "./components/Form/DadosPessoaisForm";
import Preview from "./components/Preview/Preview";

function App() {
  return (
    <>
      <h1>Gerador de Currículo Inteligente</h1>
      <p>Vamos começar a construir o projeto</p>
      <DadosPessoaisForm />
      <Preview />
    </>
  )
}

export default App;
