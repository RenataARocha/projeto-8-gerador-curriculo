import { useState, forwardRef, useImperativeHandle } from "react";
import toast from "react-hot-toast";
import { melhorarTexto } from "../../utils/api";
import styles from "./ListaHabilidades.module.css";

export interface Habilidade {
  id: number;
  nome: string;
  nivel: string;
}

interface ListaHabilidadesProps {
  habilidades: Habilidade[];
  adicionarHabilidade: (nome: string, nivel: string) => void;
  removerHabilidade: (id: number) => void;
  habilidadeTemp: string;
  setHabilidadeTemp: (habilidade: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ListaHabilidades = forwardRef<{ resetForm: () => void }, ListaHabilidadesProps>(
  ({ habilidades, adicionarHabilidade, removerHabilidade, habilidadeTemp, setHabilidadeTemp }, ref) => {
    const [mostrarForm, setMostrarForm] = useState(false);
    const [habilidadeTempLevel, setHabilidadeTempLevel] = useState<string>("Básico");
    const [loading, setLoading] = useState(false);

    useImperativeHandle(ref, () => ({
      resetForm() {
        setHabilidadeTemp("");
        setMostrarForm(false);
        setHabilidadeTempLevel("Básico");
      },
    }));

    const handleToggleForm = () => {
      setMostrarForm(!mostrarForm);
      if (mostrarForm) {
        setHabilidadeTemp("");
        setHabilidadeTempLevel("Básico");
      }
    };

    const handleAddClick = () => {
      if (habilidadeTemp.trim() !== "") {
        adicionarHabilidade(habilidadeTemp, habilidadeTempLevel);
        setMostrarForm(false);
        setHabilidadeTemp("");
        setHabilidadeTempLevel("Básico");
      }
    };

    // Função melhorada
    const handleMelhorar = async () => {
      if (!habilidadeTemp.trim()) {
        toast.error("O campo de habilidade está vazio!");
        return;
      }

      setLoading(true);
      try {
        // Melhora o prompt enviado para a API
        const textoParaMelhorar = `Melhore esta lista de habilidades técnicas e retorne apenas os nomes das habilidades separadas por " | ", sem descrições ou formatação: ${habilidadeTemp}`;

        const resultado = await melhorarTexto(textoParaMelhorar);

        // Função auxiliar para limpar o resultado
        const limparResultado = (texto: string): string => {
          return texto
            // Remove toda formatação markdown e símbolos
            .replace(/[*#\-_`]/g, "")

            // Remove títulos e categorias (texto seguido de dois pontos)
            .replace(/^[^|]*?:+\s*/gm, "")

            // Remove descrições (texto longo após dois pontos ou parênteses)
            .replace(/:\s*[^|]{20,}/g, "")
            .replace(/\([^)]{10,}\)/g, "")

            // Remove frases explicativas comuns
            .replace(/(Habilidades|Competências|Essenciais|Linguagens|Programação|Desenvolvimento|Técnicas|Experiência|Conhecimento)[^|]*?:/gi, "")

            // Substitui quebras de linha por separador
            .replace(/\n+/g, " | ")

            // Normaliza os separadores
            .replace(/\s*[|,;]\s*/g, " | ")

            // Remove texto muito longo (provavelmente descrições)
            .split(" | ")
            .filter((item: string) => {
              const cleaned = item.trim();
              return cleaned.length > 1 &&
                cleaned.length < 30 &&
                !cleaned.match(/^(cada|vamos|fundamental|para|criar|soluções|no|mundo|digital)/i) &&
                !cleaned.includes("experiências") &&
                !cleaned.includes("funcionalidade");
            })
            .map((item: string) => item.trim())
            .join(" | ")

            // Remove separadores no início e fim
            .replace(/^\s*\|\s*|\s*\|\s*$/g, "")
            .trim();
        };

        const resultadoLimpo = limparResultado(resultado);


        if (resultadoLimpo.length > 400 || resultadoLimpo.split(" | ").some((item: string) => item.length > 25)) {
          console.warn("Resultado da API ainda com problemas, usando lista original melhorada");

          // Cria uma versão melhorada da entrada original
          const habilidadesOriginais = habilidadeTemp.split(/[|,;]/).map((h: string) => h.trim());
          const habilidadesMelhoradas: string[] = [];

          habilidadesOriginais.forEach((hab: string) => {
            if (hab.toLowerCase().includes('html')) habilidadesMelhoradas.push('HTML');
            if (hab.toLowerCase().includes('css')) habilidadesMelhoradas.push('CSS');
            if (hab.toLowerCase().includes('javascript') || hab.toLowerCase().includes('js')) {
              habilidadesMelhoradas.push('JavaScript');
            }
            if (hab.toLowerCase().includes('react')) habilidadesMelhoradas.push('React');
            if (hab.toLowerCase().includes('vue')) habilidadesMelhoradas.push('Vue.js');
            if (hab.toLowerCase().includes('git')) habilidadesMelhoradas.push('Git');
            if (hab.toLowerCase().includes('github')) habilidadesMelhoradas.push('GitHub');
            if (hab.toLowerCase().includes('api')) habilidadesMelhoradas.push('API REST');
            // Adicione mais mapeamentos conforme necessário

            // Se não encontrou correspondência específica, usa o original limpo
            if (!habilidadesMelhoradas.some((h: string) => h.toLowerCase().includes(hab.toLowerCase().split(' ')[0]))) {
              habilidadesMelhoradas.push(hab);
            }
          });

          setHabilidadeTemp([...new Set(habilidadesMelhoradas)].join(" | "));
        } else {
          setHabilidadeTemp(resultadoLimpo);
        }

        toast.success("Habilidade melhorada com sucesso!");
      } catch (err) {
        console.error(err);
        toast.error("Erro ao melhorar habilidade.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className={styles.listaHabilidadesContainer}>
        <div className={styles.formHeader}>
          <button
            type="button"
            className={mostrarForm ? styles.salvarButton : styles.adicionarButton}
            onClick={mostrarForm ? handleAddClick : handleToggleForm}
          >
            {mostrarForm ? "Adicionar" : "+ Adicionar Habilidade"}
          </button>
        </div>

        {mostrarForm && (
          <div className={styles.habilidadeForm}>
            <input
              type="text"
              placeholder="Ex: HTML, CSS, JavaScript"
              value={habilidadeTemp}
              onChange={(e) => setHabilidadeTemp(e.target.value)}
              disabled={loading} // 🔹 bloqueia enquanto carrega
            />
            <select
              value={habilidadeTempLevel}
              onChange={(e) => setHabilidadeTempLevel(e.target.value)}
              disabled={loading} // 🔹 bloqueia enquanto carrega
            >
              <option value="Nenhum">Nenhum</option>
              <option value="Básico">Básico</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
            <button
              type="button"
              className={styles.melhorarButton}
              onClick={handleMelhorar}
              disabled={loading}
            >
              {loading ? "Melhorando..." : "Melhorar"}
            </button>
          </div>
        )}

        {habilidades.length > 0 && (
          <>
            <h3 className={styles.listaTitulo}>Habilidades Adicionadas:</h3>
            <ul className={styles.habilidadesList}>
              {habilidades.map((hab) => (
                <li key={hab.id} className={styles.habilidadeItem}>
                  <span>
                    <strong>{hab.nome}</strong>{" "}
                    {hab.nivel !== "Nenhum" && <span>({hab.nivel})</span>}
                  </span>
                  <button
                    className={styles.removeButton}
                    onClick={() => removerHabilidade(hab.id)}
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
);

export default ListaHabilidades;
