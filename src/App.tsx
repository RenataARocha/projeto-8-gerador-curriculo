import "./index.css";
import { useState, useRef } from "react";
import DadosPessoaisForm from "./components/components.Form/DadosPessoaisForm";
import Preview from "./components/Preview/Preview";
import ListaExperiencias from "./components/components.ListExperiencia/ListaExperiencia";
import ListaEducacao from "./components/components.Educacao/ListaEducacao";
import ListaHabilidades from "./components/Habilidades/ListaHabilidades";
import ExportButtons from "./components/components.Exportacao/ExportButtons";
import Header from "./components/components.Header/Header";

import type { DadosPessoais, Experiencia } from "./components/types/types";
import type { Educacao } from "./components/components.Educacao/ListaEducacao";

import PreviewStyles from "./components/Preview/Preview.module.css"
import jsPDF from "jspdf";


export interface Habilidade {
  id: number;
  nome: string;
  nivel: string;
}

function App() {
  // 🔹 Estados principais
  const [dados, setDados] = useState<DadosPessoais>({
    nome: "",
    cargoDesejado: "",
    email: "",
    telefone: "",
    linkedin: "",
    github: "",
    resumo: "",
  });

  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [educacoes, setEducacoes] = useState<Educacao[]>([]);
  const [listaDeHabilidades, setListaDeHabilidades] = useState<Habilidade[]>([]);
  const [habilidadeTemp, setHabilidadeTemp] = useState("");

  // 🔹 Estados para controlar se as seções estão abertas
  const [openExperiencias, setOpenExperiencias] = useState(false);
  const [openEducacao, setOpenEducacao] = useState(false);
  const [openHabilidades, setOpenHabilidades] = useState(false);

  // 🔹 Adicionar habilidades
  const adicionarHabilidade = (habilidadesString: string, nivel: String) => {
    if (!habilidadesString.trim()) return;

    const habilidadesDigitadas = habilidadesString.split(",").map((hab) => ({
      id: Date.now() + Math.random(),
      nome: hab.trim(),
      nivel: nivel, // padrão
    }));

    setListaDeHabilidades((listaAnterior) => [
      ...listaAnterior,
      ...habilidadesDigitadas,
    ]);
    setHabilidadeTemp("");
  };

  // 🔹 Remover habilidade
  const removerHabilidade = (id: number) => {
    setListaDeHabilidades((listaAnterior) =>
      listaAnterior.filter((h) => h.id !== id)
    );
  };

  const previewRef = useRef<HTMLDivElement>(null);

  // 🔹 Ref para os componentes de formulário
  const dadosRef = useRef<{ resetForm: () => void }>(null);
  const experienciasRef = useRef<{ resetForm: () => void }>(null);
  const educacoesRef = useRef<{ resetForm: () => void }>(null);
  const habilidadesRef = useRef<{ resetForm: () => void }>(null);

  const handleClearAll = () => {
    setDados({
      nome: "",
      cargoDesejado: "",
      email: "",
      telefone: "",
      linkedin: "",
      github: "",
      resumo: "",
    });
    setExperiencias([]);
    setEducacoes([]);
    setListaDeHabilidades([]);
    setHabilidadeTemp("");

    // 🔹 Reseta formulários internos chamando os métodos expostos pelas refs
    dadosRef.current?.resetForm();
    experienciasRef.current?.resetForm();
    educacoesRef.current?.resetForm();
    habilidadesRef.current?.resetForm();
  };

  // 🔹 Exportar JSON
  const handleExportJSON = () => {
    const data = {
      dados,
      experiencias,
      educacoes,
      habilidades: listaDeHabilidades,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "curriculo.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  // 🔹 Exportar TXT
  const handleExportTXT = () => {
    const experienciasTxt = experiencias.length
      ? experiencias
        .map(
          (exp, i) =>
            `${i + 1}. Empresa: ${exp.empresa}\n Cargo: ${exp.cargo
            }\n Descrição: ${exp.descricao}\n Período: ${exp.inicio} - ${exp.fim || "Atual"
            }`
        )
        .join("\n\n")
      : "Nenhuma experiência cadastrada";

    const educacoesTxt = educacoes.length
      ? educacoes
        .map(
          (edu, i) =>
            `${i + 1}. Curso: ${edu.curso}\n Instituição: ${edu.instituicao
            }\n Período: ${edu.inicio} - ${edu.fim}`
        )
        .join("\n\n")
      : "Nenhuma educação cadastrada";

    const habilidadesTxt = listaDeHabilidades.length
      ? listaDeHabilidades
        .map(
          (h, i) =>
            `${i + 1}. ${h.nome} ${h.nivel !== "Nenhum" ? `(${h.nivel})` : ""
            }`
        )
        .join("\n")
      : "Nenhuma habilidade cadastrada";

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
${habilidadesTxt}

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

  // 🔹 Exportar Word
  const handleExportWord = () => {
    const experienciasHtml = experiencias.length
      ? experiencias
        .map(
          (exp) =>
            `<li>Empresa: ${exp.empresa} | Cargo: ${exp.cargo} | Descrição: ${exp.descricao
            } | Período: ${exp.inicio} - ${exp.fim || "Atual"}</li>`
        )
        .join("")
      : "<li>Nenhuma experiência cadastrada</li>";

    const educacoesHtml = educacoes.length
      ? educacoes
        .map(
          (edu) =>
            `<li>Curso: ${edu.curso} | Instituição: ${edu.instituicao} | Período: ${edu.inicio} - ${edu.fim}</li>`
        )
        .join("")
      : "<li>Nenhuma educação cadastrada</li>";

    const habilidadesHtml = listaDeHabilidades.length
      ? `<ul>${listaDeHabilidades
        .map(
          (h) =>
            `<li>${h.nome} ${h.nivel !== "Nenhum" ? `(${h.nivel})` : ""
            }</li>`
        )
        .join("")}</ul>`
      : "<p>Nenhuma habilidade cadastrada</p>";

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
${habilidadesHtml}
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


  // 🔹 Exportar PDF
const handleExportPDF = () => {
  const previewEl = previewRef.current as HTMLElement | null;
  if (!previewEl) return;

  const doc = new jsPDF("p", "mm", "a4");
  const a4Width = 210;
  const padding = 8;
  const targetWidthMm = a4Width - 2 * padding;
  const contentWidthPx = previewEl.offsetWidth;
  if (!contentWidthPx) return;
  const mmPerPx = targetWidthMm / contentWidthPx;
  const xOffset = padding;
  const yOffset = padding;

  const headerElement = previewEl.querySelector(`.${PreviewStyles.header}`) as HTMLElement | null;
  if (headerElement) headerElement.style.display = "none";

  doc.html(previewEl, {
    x: xOffset,
    y: yOffset,
    width: targetWidthMm,
    windowWidth: contentWidthPx,
    html2canvas: {
      scale: 0.3,
      useCORS: true,
    },
    callback: (doc) => {
      try {
        const links = previewEl.querySelectorAll("a, .contactRow span");

        links.forEach((link) => {
          let href = link.getAttribute("href") || link.textContent || "";
          href = href.trim();
          if (!href) return;

          // Se for e-mail, adiciona mailto:
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(href) && !href.startsWith("mailto:")) {
            href = `mailto:${href}`;
          }
          // Se for link sem protocolo, adiciona https:
          else if (!/^https?:\/\//i.test(href) && !href.startsWith("mailto:")) {
            href = href.startsWith("www.") ? `https://${href}` : `https://${href}`;
          }

          const rect = link.getBoundingClientRect();
          const previewRect = previewEl.getBoundingClientRect();

          const relLeftPx = rect.left - previewRect.left;
          const relTopPx = rect.top - previewRect.top;

          const xMm = xOffset + relLeftPx * mmPerPx;
          const yMm = yOffset + relTopPx * mmPerPx;
          const wMm = rect.width * mmPerPx;
          const hMm = rect.height * mmPerPx;

          // Adiciona link clicável invisível
          doc.link(xMm, yMm, Math.max(wMm, 1), Math.max(hMm, 1), { url: href });
        });

        doc.save("curriculo.pdf");
      } finally {
        if (headerElement) headerElement.style.display = "";
      }
    },
  });
};


  return (
    <>
      <Header />
      <div className="main-content">
        <form className="form-container">
          <DadosPessoaisForm dados={dados} setDados={setDados} ref={dadosRef} />

          <div className="section-wrapper">
            <ListaExperiencias
              onChange={setExperiencias}
              open={openExperiencias}
              setOpen={setOpenExperiencias}
              ref={experienciasRef}
            />
          </div>

          <div className="section-wrapper">
            <ListaEducacao
              onChange={setEducacoes}
              open={openEducacao}
              setOpen={setOpenEducacao}
              ref={educacoesRef}
            />
          </div>

          <div className="section-wrapper">
            <ListaHabilidades
              habilidades={listaDeHabilidades}
              removerHabilidade={removerHabilidade}
              habilidadeTemp={habilidadeTemp}
              setHabilidadeTemp={setHabilidadeTemp}
              adicionarHabilidade={adicionarHabilidade}
              open={openHabilidades}
              setOpen={setOpenHabilidades}
              ref={habilidadesRef}
            />
          </div>

          <ExportButtons
            onExportPDF={handleExportPDF}
            onExportWord={handleExportWord}
            onExportTXT={handleExportTXT}
            onExportJSON={handleExportJSON}
            onClearAll={handleClearAll}
          />
        </form>

        <div className="preview-container" ref={previewRef}>
          <Preview
            dados={dados}
            experiencias={experiencias}
            educacoes={educacoes}
            listaDeHabilidades={listaDeHabilidades}
            habilidadeTemp={habilidadeTemp}
          />
        </div>
      </div>
    </>
  );
}

export default App;