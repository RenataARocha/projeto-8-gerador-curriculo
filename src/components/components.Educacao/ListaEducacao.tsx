import { useState, forwardRef, useImperativeHandle } from "react";
import styles from "./ListaEducacao.module.css";

export type Educacao = {
  id: number;
  curso: string;
  instituicao: string;
  inicio: string;
  fim: string;
};

interface Props {
  onChange: (educacoes: Educacao[]) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

// Tipagem correta para forwardRef
const ListaEducacao = forwardRef<{ resetForm: () => void }, Props>(({ onChange }, ref) => {
  const [educacoes, setEducacoes] = useState<Educacao[]>([]);

  useImperativeHandle(ref, () => ({
    resetForm() {
      setEducacoes([]);
      onChange([]);
    },
  }));

  const addEducacao = () => {
    const nova: Educacao = { id: Date.now(), instituicao: "", curso: "", inicio: "", fim: "" };
    const novaLista = [...educacoes, nova];
    setEducacoes(novaLista);
    onChange(novaLista);
  };

  const removeEducacao = (id: number) => {
    const novaLista = educacoes.filter((e) => e.id !== id);
    setEducacoes(novaLista);
    onChange(novaLista);
  };

  const updateEducacao = (id: number, campo: keyof Educacao, valor: string) => {
    const novaLista = educacoes.map((e) =>
      e.id === id ? { ...e, [campo]: valor } : e
    );
    setEducacoes(novaLista);
    onChange(novaLista);
  };

  return (
    <div className={styles.listaEducacaoContainer}>
      <div className={styles.formHeader}></div>

      {educacoes.map((e, index) => (
        <div key={e.id} className={styles.educacaoItem}>
          <div className={styles.headerItem}>
            <h3>Educação {index + 1}</h3>
            <button
              type="button"
              onClick={() => removeEducacao(e.id)}
              className={styles.removeButton}
            >
              &times;
            </button>
          </div>

          <input
            type="text"
            placeholder="Instituição"
            value={e.instituicao}
            onChange={(ev) => updateEducacao(e.id, "instituicao", ev.target.value)}
          />
          <input
            type="text"
            placeholder="Curso"
            value={e.curso}
            onChange={(ev) => updateEducacao(e.id, "curso", ev.target.value)}
          />
          <div className={styles.dateFields}>
            <label>
              Início:
              <input
                type="month"
                value={e.inicio}
                onChange={(ev) => updateEducacao(e.id, "inicio", ev.target.value)}
              />
            </label>
            <label>
              Fim:
              <input
                type="month"
                value={e.fim}
                onChange={(ev) => updateEducacao(e.id, "fim", ev.target.value)}
              />
            </label>
          </div>
        </div>
      ))}

      <button type="button" className={styles.addButton} onClick={addEducacao}>
        + Adicionar Educação
      </button>
    </div>
  );
});

export default ListaEducacao;