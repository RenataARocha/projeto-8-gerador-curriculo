// src/App.tsx
import "./index.css";
import { useState, useRef, useEffect } from "react";
import DadosPessoaisForm from "./components/components.Form/DadosPessoaisForm";
import Preview from "./components/Preview/Preview";
import ListaExperiencias from "./components/components.ListExperiencia/ListaExperiencia";
import ListaEducacao from "./components/components.Educacao/ListaEducacao";
import ListaHabilidades from "./components/Habilidades/ListaHabilidades";
import ExportButtons from "./components/components.Exportacao/ExportButtons";
import Header from "./components/components.Header/Header";

import type { DadosPessoais, Experiencia } from "./components/types/types";
import type { Educacao } from "./components/components.Educacao/ListaEducacao";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PreviewStyles from "./components/Preview/Preview.module.css";

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
    setListaDeHabilidades((listaAnterior) => [...listaAnterior, novaHabilidade]);
  };

  const removerHabilidade = (id: number) => {
    setListaDeHabilidades((listaAnterior) => listaAnterior.filter((h) => h.id !== id));
  };

  useEffect(() => {
    const stringHabilidades = listaDeHabilidades.map((h) => `${h.nome} (${h.nivel})`).join(", ");
    setDados((dadosAtuais) => ({ ...dadosAtuais, habilidades: stringHabilidades }));
  }, [listaDeHabilidades]);

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
      ? experiencias.map((exp, i) => `${i + 1}. Empresa: ${exp.empresa}\n    Cargo: ${exp.cargo}\n    Descrição: ${exp.descricao}\n    Período: ${exp.inicio} - ${exp.fim || "Atual"}`).join("\n\n")
      : "Nenhuma experiência cadastrada";

    const educacoesTxt = educacoes.length
      ? educacoes.map((edu, i) => `${i + 1}. Curso: ${edu.curso}\n    Instituição: ${edu.instituicao}\n    Período: ${edu.inicio} - ${edu.fim}`).join("\n\n")
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

  // Código para download direto do PDF (versão final)
  const handleExportPDF = () => {
    // 1. Crie um elemento div temporário
    const tempDiv = document.createElement('div');
    tempDiv.className = PreviewStyles.previewContainer; // Aplica o estilo do preview
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px'; // Oculta o elemento da tela

    // 2. Crie o conteúdo do currículo a partir dos dados, sem o header
    const previewContent = `
        <div class="${PreviewStyles.personalInfo}">
            <h1>${dados.nome || "Seu Nome"}</h1>
            <p class="${PreviewStyles.jobTitle}">${dados.cargoDesejado || "Cargo Desejado"}</p>
            <p class="${PreviewStyles.contactInfo}">
                ${dados.email || "email@exemplo.com"}
                <span class="${PreviewStyles.contactSeparator}"> | </span>
                ${dados.telefone || "(00) 00000-0000"}
            </p>
            <div class="${PreviewStyles.contactLinks}">
                ${dados.linkedin ? `<a href="${dados.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>` : ''}
                ${dados.github && dados.linkedin ? `<span class="${PreviewStyles.contactSeparator}"> | </span>` : ''}
                ${dados.github ? `<a href="${dados.github}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ''}
            </div>
        </div>
        ${dados.resumo ? `<div class="${PreviewStyles.section}">
            <h3 class="${PreviewStyles.sectionTitle}">Resumo Profissional</h3>
            <p>${dados.resumo}</p>
        </div>` : ''}
        ${experiencias.length > 0 ? `<div class="${PreviewStyles.section}">
            <h3 class="${PreviewStyles.sectionTitle}">Experiências</h3>
            ${experiencias.map(exp => `<div class="${PreviewStyles.item}">
                <p><strong>Empresa:</strong> ${exp.empresa}</p>
                <p><strong>Cargo:</strong> ${exp.cargo}</p>
                <p><strong>Descrição:</strong> ${exp.descricao}</p>
                <p><strong>Período:</strong> ${exp.inicio} - ${exp.atual ? "Atual" : exp.fim}</p>
            </div>`).join('')}
        </div>` : ''}
        ${educacoes.length > 0 ? `<div class="${PreviewStyles.section}">
            <h3 class="${PreviewStyles.sectionTitle}">Educação</h3>
            ${educacoes.map(ed => `<div class="${PreviewStyles.item}">
                <p><strong>Curso:</strong> ${ed.curso}</p>
                <p><strong>Instituição:</strong> ${ed.instituicao}</p>
                <p><strong>Período:</strong> ${ed.inicio} - ${ed.fim}</p>
            </div>`).join('')}
        </div>` : ''}
        ${dados.habilidades ? `<div class="${PreviewStyles.section}">
            <h3 class="${PreviewStyles.sectionTitle}">Habilidades</h3>
            <div class="${PreviewStyles.habilidadesList}">
                ${dados.habilidades.split(",").map(h => `<span class="${PreviewStyles.skillTag}">${h.trim()}</span>`).join('')}
            </div>
        </div>` : ''}
    `;

    tempDiv.innerHTML = previewContent;
    document.body.appendChild(tempDiv);

    // 3. Captura o elemento temporário
    html2canvas(tempDiv, {
      scale: 2,
      backgroundColor: '#ffffff',
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      doc.save("curriculo.pdf");

      // 4. Remove o elemento temporário
      document.body.removeChild(tempDiv);
    });
  };

  return (
    <>
      <Header />
      <div className="main-content">
        <form className="form-container">
          <DadosPessoaisForm dados={dados} setDados={setDados} />

          <div className="section-wrapper">
            <ListaExperiencias onChange={setExperiencias} />
          </div>

          <div className="section-wrapper">
            <ListaEducacao onChange={setEducacoes} />
          </div>

          <div className="section-wrapper">
            <ListaHabilidades
              habilidades={listaDeHabilidades}
              adicionarHabilidade={adicionarHabilidade}
              removerHabilidade={removerHabilidade}
            />
          </div>
        </form> 
        
        <ExportButtons
          onExportPDF={handleExportPDF}
          onExportWord={handleExportWord}
          onExportTXT={handleExportTXT}
          onExportJSON={handleExportJSON}
          onClearAll={handleClearAll}
        />

        <div className="preview-container" ref={previewRef}>
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