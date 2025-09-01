import { useState, useEffect } from "react"; 

import "./index.css";
import { DadosPessoaisForm } from "./components/components.Form/DadosPessoaisForm";
import Preview from "./components/Preview/Preview";
import ListaExperiencias from "./components/components.ListExperiencia/ListaExperiencia";
import ListaEducacao from "./components/components.Educacao/ListaEducacao";

import type { DadosPessoais, Experiencia } from "./components/types/types";
import type { Educacao } from "./components/components.Educacao/ListaEducacao";
import Header from "./components/componets.Header/Header";

import ListaHabilidades from "./components/ListaHabilidades";

export interface Habilidade {
  id: number;
  nome: string;
  nivel: string;
}

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

  const [listaDeHabilidades, setListaDeHabilidades] = useState<Habilidade[]>([]);


  const adicionarHabilidade = (nome: string, nivel: string) => {
    const novaHabilidade: Habilidade = { id: Date.now(), nome, nivel };
    setListaDeHabilidades(listaAnterior => [...listaAnterior, novaHabilidade]);
  };

  const removerHabilidade = (id: number) => {
    setListaDeHabilidades(listaAnterior => listaAnterior.filter((h) => h.id !== id));
  };


  useEffect(() => {
    const stringHabilidades = listaDeHabilidades
      .map(h => `${h.nome} (${h.nivel})`)
      .join(', ');
    
    setDados(dadosAtuais => ({ ...dadosAtuais, habilidades: stringHabilidades }));
  }, [listaDeHabilidades]); 


  return (
    <>
      <Header />
      <div className="main-content">
        <form className="form-container">
          <DadosPessoaisForm dados={dados} setDados={setDados} />
          <ListaExperiencias onChange={setExperiencias} />
          <ListaEducacao onChange={setEducacoes} />
          <ListaHabilidades
            habilidades={listaDeHabilidades}
            adicionarHabilidade={adicionarHabilidade}
            removerHabilidade={removerHabilidade}
          />
        </form>
        <div className="preview-container">
          <Preview
            dados={dados}
            experiencias={experiencias}
            educacoes={educacoes}
            listaDeHabilidades={listaDeHabilidades} 
          />
        </div>
      </div>
    </>
  );
}

export default App;