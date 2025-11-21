import "./index.css";
import { useState, useRef, useEffect } from "react";
import DadosPessoaisForm from "./components/components.Form/DadosPessoaisForm";
import Preview from "./components/Preview/Preview";
import ListaExperiencias from "./components/components.ListExperiencia/ListaExperiencia";
import ListaEducacao from "./components/components.Educacao/ListaEducacao";
import ListaHabilidades from "./components/Habilidades/ListaHabilidades";
import ExportButtons from "./components/components.Exportacao/ExportButtons";
import Header from "./components/components.Header/Header";
import { ThemeProvider } from "./contexts/ThemeProvider";

import type { DadosPessoais, Experiencia } from "./components/types/types";
import type { Educacao } from "./components/components.Educacao/ListaEducacao";
import { Toaster, toast } from "react-hot-toast"; // 🔹 Adicionei toast aqui

import PreviewStyles from "./components/Preview/Preview.module.css"
import jsPDF from "jspdf";

export interface Habilidade {
  id: number;
  nome: string;
  nivel: string;
}

function AppContent() {
  // Estados principais
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

  // Estados para controlar se as seções estão abertas
  const [openExperiencias, setOpenExperiencias] = useState(false);
  const [openEducacao, setOpenEducacao] = useState(false);
  const [openHabilidades, setOpenHabilidades] = useState(false);

  // 🔹 Estado para controlar se os dados já foram carregados
  const [isLoaded, setIsLoaded] = useState(false);

  // Adicionar habilidades
  const adicionarHabilidade = (habilidadesString: string, nivel: string) => {
    if (!habilidadesString.trim()) return;

    const habilidadesDigitadas = habilidadesString.split(",").map((hab) => ({
      id: Date.now() + Math.random(),
      nome: hab.trim(),
      nivel: nivel,
    }));

    setListaDeHabilidades((listaAnterior) => [
      ...listaAnterior,
      ...habilidadesDigitadas,
    ]);
    setHabilidadeTemp("");
  };

  // Remover habilidade
  const removerHabilidade = (id: number) => {
    setListaDeHabilidades((listaAnterior) =>
      listaAnterior.filter((h) => h.id !== id)
    );
  };

  const previewRef = useRef<HTMLDivElement>(null);

  // Refs para os componentes de formulário
  const dadosRef = useRef<{ resetForm: () => void }>(null);
  const experienciasRef = useRef<{ resetForm: () => void }>(null);
  const educacoesRef = useRef<{ resetForm: () => void }>(null);
  const habilidadesRef = useRef<{ resetForm: () => void }>(null);

  // 🔹 Função para importar JSON 
  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);

        if (importedData.dados) setDados(importedData.dados);
        if (importedData.experiencias) setExperiencias(importedData.experiencias);
        if (importedData.educacoes) setEducacoes(importedData.educacoes);
        if (importedData.habilidades) setListaDeHabilidades(importedData.habilidades);

        toast.success('Dados importados com sucesso!');
      } catch (error) {
        toast.error('Erro ao importar arquivo. Verifique o formato JSON.');
        console.error('Erro na importação:', error);
      }
    };
    reader.readAsText(file);

    // Reset do input para permitir reimportar o mesmo arquivo
    event.target.value = '';
  };

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

    // 🔹 Limpa também o localStorage
    localStorage.removeItem("curriculoData");

    // Reseta formulários internos chamando os métodos expostos pelas refs
    dadosRef.current?.resetForm();
    experienciasRef.current?.resetForm();
    educacoesRef.current?.resetForm();
    habilidadesRef.current?.resetForm();

    toast.success('Todos os dados foram limpos!');
  };

  // Exportar JSON
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

  // Exportar TXT
  const handleExportTXT = () => {
    const nomeUsuario = dados.nome && dados.nome.trim() !== "" ? dados.nome : "curriculo";
    const nomeArquivo = nomeUsuario
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "");

    const experienciasTxt = experiencias.length
      ? experiencias
        .map(
          (exp, i) =>
            `${i + 1}. Empresa: ${exp.empresa}\n   Cargo: ${exp.cargo}\n   Descrição: ${exp.descricao}\n   Período: ${exp.inicio} - ${exp.fim || "Atual"}`
        )
        .join("\n\n")
      : "Nenhuma experiência cadastrada";

    const educacoesTxt = educacoes.length
      ? educacoes
        .map(
          (edu, i) =>
            `${i + 1}. Curso: ${edu.curso}\n   Instituição: ${edu.instituicao}\n   Período: ${edu.inicio} - ${edu.fim}`
        )
        .join("\n\n")
      : "Nenhuma educação cadastrada";

    const habilidadesTxt = listaDeHabilidades.length
      ? listaDeHabilidades
        .map(
          (h, i) => `${i + 1}. ${h.nome} ${h.nivel !== "Nenhum" ? `(${h.nivel})` : ""}`
        )
        .join("\n")
      : "Nenhuma habilidade cadastrada";

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

  // Exportar WORD
  const handleExportWord = () => {
    const nomeUsuario = dados.nome && dados.nome.trim() !== "" ? dados.nome : "curriculo";
    const nomeArquivo = nomeUsuario
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "");

    const experienciasHtml = experiencias.length
      ? experiencias
        .map(
          (exp) =>
            `<li><b>Empresa:</b> ${exp.empresa} | <b>Cargo:</b> ${exp.cargo} | <b>Descrição:</b> ${exp.descricao} | <b>Período:</b> ${exp.inicio} - ${exp.fim || "Atual"}</li>`
        )
        .join("")
      : "<li>Nenhuma experiência cadastrada</li>";

    const educacoesHtml = educacoes.length
      ? educacoes
        .map(
          (edu) =>
            `<li><b>Curso:</b> ${edu.curso} | <b>Instituição:</b> ${edu.instituicao} | <b>Período:</b> ${edu.inicio} - ${edu.fim}</li>`
        )
        .join("")
      : "<li>Nenhuma educação cadastrada</li>";

    const habilidadesHtml = listaDeHabilidades.length
      ? listaDeHabilidades
        .map(
          (h) =>
            `<li><b>${h.nome}</b> ${h.nivel !== "Nenhum" ? `(${h.nivel})` : ""}</li>`
        )
        .join("")
      : "<li>Nenhuma habilidade cadastrada</li>";

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

    const blob = new Blob([htmlContent], { type: "application/msword" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${nomeArquivo}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // Exportar PDF
  const handleExportPDF = () => {
    const previewEl = previewRef.current as HTMLElement | null;
    if (!previewEl) return;

    const doc = new jsPDF("p", "mm", "a4");
    const a4Width = 210;
    const padding = 18;
    const targetWidthMm = a4Width - padding;
    const contentWidthPx = previewEl.offsetWidth;
    if (!contentWidthPx) return;
    const mmPerPx = targetWidthMm / contentWidthPx;
    const xOffset = 6;
    const yOffset = -12;

    const headerElement = previewEl.querySelector(`.${PreviewStyles.header}`) as HTMLElement | null;
    if (headerElement) headerElement.style.display = "none";

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
        scale: 0.4,
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

          doc.save(`${nomeArquivo}.pdf`);
        } finally {
          if (headerElement) headerElement.style.display = "";
        }
      },
    });
  };


  // 🔹 Carregar dados do localStorage na inicialização
  useEffect(() => {
    const savedData = localStorage.getItem("curriculoData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setDados(parsed.dados || {
          nome: "",
          cargoDesejado: "",
          email: "",
          telefone: "",
          linkedin: "",
          github: "",
          resumo: "",
        });
        setExperiencias(parsed.experiencias || []);
        setEducacoes(parsed.educacoes || []);
        setListaDeHabilidades(parsed.habilidades || []);

        // 🔹 Mostra toast apenas se há dados salvos
        if (parsed.dados?.nome || parsed.experiencias?.length || parsed.educacoes?.length || parsed.habilidades?.length) {
          toast.success('Dados anteriores carregados automaticamente!');
        }
      } catch (error) {
        console.error("Erro ao ler dados do localStorage:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // 🔹 Salvar dados no localStorage sempre que mudar (só depois do carregamento inicial)
  useEffect(() => {
    if (isLoaded) {
      const data = { dados, experiencias, educacoes, habilidades: listaDeHabilidades };
      localStorage.setItem("curriculoData", JSON.stringify(data));
    }
  }, [dados, experiencias, educacoes, listaDeHabilidades, isLoaded]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <input
        type="file"
        accept=".json"
        onChange={handleImportJSON}
        style={{ display: 'none' }}
        id="import-json-input"
      />

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

// 🔹 Função App que envolve tudo no ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;