// src/App.tsx
import "./index.css";
import { useState, useRef } from "react";
import { DadosPessoaisForm } from "./components/components.Form/DadosPessoaisForm";
import Preview from "./components/Preview/Preview";
import ListaExperiencias from "./components/components.ListExperiencia/ListaExperiencia";
import ListaEducacao from "./components/components.Educacao/ListaEducacao";

import type { DadosPessoais, Experiencia } from "./components/types/types";
import type { Educacao } from "./components/components.Educacao/ListaEducacao";
import ExportButtons from "./components/components.Exportacao/ExportButtons";
import Header from "./components/components.Header/Header";

// Não precisamos mais do jsPDF para essa abordagem
// import jsPDF from "jspdf";

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

  const previewRef = useRef<HTMLDivElement>(null);

  // Limpar tudo
  const handleClearAll = () => {
    setDados({
      nome: "",
      cargoDesejado: "",
      email: "",
      telefone: "",
      linkedin: "",
      github: "",
      resumo: "",
      habilidades: "",
    });
    setExperiencias([]);
    setEducacoes([]);
  };

  // Exportar JSON
  const handleExportJSON = () => {
    const data = { dados, experiencias, educacoes };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "curriculo.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Exportar TXT
  const handleExportTXT = () => {
    const experienciasTxt = experiencias.length
      ? experiencias.map((exp, i) => `${i + 1}. Empresa: ${exp.empresa}\n   Cargo: ${exp.cargo}\n   Descrição: ${exp.descricao}\n   Período: ${exp.inicio} - ${exp.fim || "Atual"}`).join("\n\n")
      : "Nenhuma experiência cadastrada";

    const educacoesTxt = educacoes.length
      ? educacoes.map((edu, i) => `${i + 1}. Curso: ${edu.curso}\n   Instituição: ${edu.instituicao}\n   Período: ${edu.inicio} - ${edu.fim}`).join("\n\n")
      : "Nenhuma educação cadastrada";

    const content = `
Nome: ${dados.nome}
Cargo Desejado: ${dados.cargoDesejado}
Email: ${dados.email}
Telefone: ${dados.telefone}
LinkedIn: ${dados.linkedin}
GitHub: ${dados.github}

Resumo:
${dados.resumo}

Habilidades:
${dados.habilidades}

Experiências:
${experienciasTxt}

Educação:
${educacoesTxt}
 `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "curriculo.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Exportar Word (sem cores)
  const handleExportWord = () => {
    const experienciasHtml = experiencias.length
      ? experiencias.map(exp => `<li>Empresa: ${exp.empresa} | Cargo: ${exp.cargo} | Descrição: ${exp.descricao} | Período: ${exp.inicio} - ${exp.fim || "Atual"}</li>`).join("")
      : "<li>Nenhuma experiência cadastrada</li>";

    const educacoesHtml = educacoes.length
      ? educacoes.map(edu => `<li>Curso: ${edu.curso} | Instituição: ${edu.instituicao} | Período: ${edu.inicio} - ${edu.fim}</li>`).join("")
      : "<li>Nenhuma educação cadastrada</li>";

    const htmlContent = `
<html>
<head><meta charset="UTF-8"><title>Currículo</title></head>
<body>
<h1>${dados.nome}</h1>
<h2>${dados.cargoDesejado}</h2>
<p>Email: ${dados.email}</p>
<p>Telefone: ${dados.telefone}</p>
<p>LinkedIn: ${dados.linkedin}</p>
<p>GitHub: ${dados.github}</p>
<h3>Resumo</h3>
<p>${dados.resumo}</p>
<h3>Habilidades</h3>
<p>${dados.habilidades}</p>
<h3>Experiências</h3>
<ul>
${experienciasHtml}
</ul>
<h3>Educação</h3>
<ul>
${educacoesHtml}
</ul>
</body>
</html>
`;

    const blob = new Blob([htmlContent], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "curriculo.doc";
    link.click();
    URL.revokeObjectURL(url);
  };

  // Exportar PDF (sem cores, estilo limpo)
  const handleExportPDF = () => {
    // Usa o recurso nativo do navegador para imprimir/salvar como PDF
    window.print();
  };

  return (
    <>
      <Header />
      <div className="main-content">
        <form className="form-container">
          <DadosPessoaisForm dados={dados} setDados={setDados} />
          <ListaExperiencias onChange={setExperiencias} />
          <ListaEducacao onChange={setEducacoes} />

          <ExportButtons
            onExportPDF={handleExportPDF}
            onExportWord={handleExportWord}
            onExportTXT={handleExportTXT}
            onExportJSON={handleExportJSON}
            onClearAll={handleClearAll}
          />
        </form>

        <div className="preview-container" ref={previewRef}>
          <Preview dados={dados} experiencias={experiencias} educacoes={educacoes} />
        </div>
      </div>
    </>
  );
}

export default App;