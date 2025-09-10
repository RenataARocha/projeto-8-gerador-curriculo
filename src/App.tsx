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
import { Toaster } from "react-hot-toast";

import PreviewStyles from "./components/Preview/Preview.module.css"
import jsPDF from "jspdf";


export interface Habilidade {
  id: number;
  nome: string;
  nivel: string;
}

function App() {
  //  Estados principais
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

  //  Estados para controlar se as seções estão abertas
  const [openExperiencias, setOpenExperiencias] = useState(false);
  const [openEducacao, setOpenEducacao] = useState(false);
  const [openHabilidades, setOpenHabilidades] = useState(false);

  //  Adicionar habilidades
  const adicionarHabilidade = (habilidadesString: string, nivel: string) => {
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

  //  Remover habilidade
  const removerHabilidade = (id: number) => {
    setListaDeHabilidades((listaAnterior) =>
      listaAnterior.filter((h) => h.id !== id)
    );
  };

  const previewRef = useRef<HTMLDivElement>(null);

  //  Ref para os componentes de formulário
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

    //  Reseta formulários internos chamando os métodos expostos pelas refs
    dadosRef.current?.resetForm();
    experienciasRef.current?.resetForm();
    educacoesRef.current?.resetForm();
    habilidadesRef.current?.resetForm();
  };

  //  Exportar JSON
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

  //  Exportar TXT
  const handleExportTXT = () => {
    //  Nome do arquivo seguro
    const nomeUsuario = dados.nome && dados.nome.trim() !== "" ? dados.nome : "curriculo";
    const nomeArquivo = nomeUsuario
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "");

    //  Experiências
    const experienciasTxt = experiencias.length
      ? experiencias
        .map(
          (exp, i) =>
            `${i + 1}. Empresa: ${exp.empresa}\n   Cargo: ${exp.cargo}\n   Descrição: ${exp.descricao}\n   Período: ${exp.inicio} - ${exp.fim || "Atual"}`
        )
        .join("\n\n")
      : "Nenhuma experiência cadastrada";

    //  Educação
    const educacoesTxt = educacoes.length
      ? educacoes
        .map(
          (edu, i) =>
            `${i + 1}. Curso: ${edu.curso}\n   Instituição: ${edu.instituicao}\n   Período: ${edu.inicio} - ${edu.fim}`
        )
        .join("\n\n")
      : "Nenhuma educação cadastrada";

    //  Habilidades
    const habilidadesTxt = listaDeHabilidades.length
      ? listaDeHabilidades
        .map(
          (h, i) => `${i + 1}. ${h.nome} ${h.nivel !== "Nenhum" ? `(${h.nivel})` : ""}`
        )
        .join("\n")
      : "Nenhuma habilidade cadastrada";

    //  Conteúdo completo
    const content = `
Nome: ${dados.nome || "Seu Nome"}
Cargo Desejado: ${dados.cargoDesejado || "-"}
Email: ${dados.email || "-"}
Telefone: ${dados.telefone || "-"}
LinkedIn: ${dados.linkedin || "-"}
GitHub: ${dados.github || "-"}

Resumo:
${dados.resumo || "-"}

Habilidades:
${habilidadesTxt}

Experiências:
${experienciasTxt}

Educação:
${educacoesTxt}
`;

    //  Cria blob e faz download com nome do usuário
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${nomeArquivo}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };



  //  Exportar WORD
  const handleExportWord = () => {
    //  Nome do arquivo seguro
    const nomeUsuario = dados.nome && dados.nome.trim() !== "" ? dados.nome : "curriculo";
    const nomeArquivo = nomeUsuario
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "");

    //  Experiências
    const experienciasHtml = experiencias.length
      ? experiencias
        .map(
          (exp) =>
            `<li><b>Empresa:</b> ${exp.empresa} | <b>Cargo:</b> ${exp.cargo} | <b>Descrição:</b> ${exp.descricao} | <b>Período:</b> ${exp.inicio} - ${exp.fim || "Atual"}</li>`
        )
        .join("")
      : "<li>Nenhuma experiência cadastrada</li>";

    //  Educação
    const educacoesHtml = educacoes.length
      ? educacoes
        .map(
          (edu) =>
            `<li><b>Curso:</b> ${edu.curso} | <b>Instituição:</b> ${edu.instituicao} | <b>Período:</b> ${edu.inicio} - ${edu.fim}</li>`
        )
        .join("")
      : "<li>Nenhuma educação cadastrada</li>";

    //  Habilidades
    const habilidadesHtml = listaDeHabilidades.length
      ? listaDeHabilidades
        .map(
          (h) =>
            `<li><b>${h.nome}</b> ${h.nivel !== "Nenhum" ? `(${h.nivel})` : ""}</li>`
        )
        .join("")
      : "<li>Nenhuma habilidade cadastrada</li>";

    //  Conteúdo HTML completo com estilos inline
    const htmlContent = `
<html>
<head><meta charset="UTF-8"><title>Currículo</title></head>
<body style="font-family: Arial, sans-serif; color:#333;">
<h1 style="color:#333; font-size:24px;">${dados.nome || "Seu Nome"}</h1>
<h2 style="color:#555; font-size:18px;">${dados.cargoDesejado || "Cargo Desejado"}</h2>

<p><b>Email:</b> ${dados.email || "-"}</p>
<p><b>Telefone:</b> ${dados.telefone || "-"}</p>
<p><b>LinkedIn:</b> ${dados.linkedin || "-"}</p>
<p><b>GitHub:</b> ${dados.github || "-"}</p>

<h3 style="color:#333; margin-top:20px;">Resumo</h3>
<p>${dados.resumo || "Nenhum resumo cadastrado."}</p>

<h3 style="color:#333; margin-top:20px;">Habilidades</h3>
<ul style="list-style-type: disc; padding-left: 20px; color:#444;">
${habilidadesHtml}
</ul>

<h3 style="color:#333; margin-top:20px;">Experiências</h3>
<ul style="list-style-type: disc; padding-left: 20px; color:#444;">
${experienciasHtml}
</ul>

<h3 style="color:#333; margin-top:20px;">Educação</h3>
<ul style="list-style-type: disc; padding-left: 20px; color:#444;">
${educacoesHtml}
</ul>
</body>
</html>
`;

    //  Cria blob e faz download com nome correto
    const blob = new Blob([htmlContent], { type: "application/msword" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${nomeArquivo}.doc`; // nome do usuário
    document.body.appendChild(link); // adiciona no DOM para o navegador respeitar o download
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };


  //  Exportar PDF
  const handleExportPDF = () => {
    const previewEl = previewRef.current as HTMLElement | null;
    if (!previewEl) return;

    const doc = new jsPDF("p", "mm", "a4");
    const a4Width = 210;
    const padding = 18;
    const targetWidthMm = a4Width * padding;
    const contentWidthPx = previewEl.offsetWidth;
    if (!contentWidthPx) return;
    const mmPerPx = targetWidthMm / contentWidthPx;
    const xOffset = 6;
    const yOffset = 2;

    const headerElement = previewEl.querySelector(`.${PreviewStyles.header}`) as HTMLElement | null;
    if (headerElement) headerElement.style.display = "none";

    // Cria o nome do arquivo baseado no nome do usuário
    const nomeArquivo = (dados.nome || "curriculo")
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "");

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

            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(href) && !href.startsWith("mailto:")) {
              href = `mailto:${href}`;
            } else if (!/^https?:\/\//i.test(href) && !href.startsWith("mailto:")) {
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

            doc.link(xMm, yMm, Math.max(wMm, 1), Math.max(hMm, 1), { url: href });
          });

          // Usa o nome do usuário para salvar
          doc.save(`${nomeArquivo}.pdf`);
        } finally {
          if (headerElement) headerElement.style.display = "";
        }
      },
    });
  };

  // 🔹 Inicialização dos dados padrões (pra usar no carregamento)
  const initialDados: DadosPessoais = {
    nome: "",
    cargoDesejado: "",
    email: "",
    telefone: "",
    linkedin: "",
    github: "",
    resumo: "",
  };

  // 🔹 Carregar dados do localStorage na inicialização
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem("curriculoData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setDados(parsed.dados || initialDados);
        setExperiencias(parsed.experiencias || []);
        setEducacoes(parsed.educacoes || []);
        setListaDeHabilidades(parsed.habilidades || []);
      } catch (error) {
        console.error("Erro ao ler dados do localStorage:", error);
      }
    }
    setIsLoaded(true); // sinaliza que os dados já foram carregados
  }, []);

  // 🔹 Salvar dados no localStorage sempre que mudar
  useEffect(() => {
    const data = { dados, experiencias, educacoes, habilidades: listaDeHabilidades };
    localStorage.setItem("curriculoData", JSON.stringify(data));
  }, [dados, experiencias, educacoes, listaDeHabilidades]);


  return (
    <>
      {/* 🔹 Ativa os toasts globais */}
      <Toaster position="top-right" reverseOrder={false} />

      <Header />
      <div className="main-content">
        <form className="form-container">
          {isLoaded && (
            <DadosPessoaisForm dados={dados} setDados={setDados} ref={dadosRef} />
          )}

          <div className="section-wrapper">
            {isLoaded && (
              <ListaExperiencias
                onChange={setExperiencias}
                open={openExperiencias}
                setOpen={setOpenExperiencias}
                ref={experienciasRef}
              />
            )}
          </div>

          <div className="section-wrapper">
            {isLoaded && (
              <ListaEducacao
                onChange={setEducacoes}
                open={openEducacao}
                setOpen={setOpenEducacao}
                ref={educacoesRef}
              />
            )}
          </div>

          <div className="section-wrapper">
            {isLoaded && (
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
            )}
          </div>

          {isLoaded && (
            <ExportButtons
              onExportPDF={handleExportPDF}
              onExportWord={handleExportWord}
              onExportTXT={handleExportTXT}
              onExportJSON={handleExportJSON}
              onClearAll={handleClearAll}
            />
          )}
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