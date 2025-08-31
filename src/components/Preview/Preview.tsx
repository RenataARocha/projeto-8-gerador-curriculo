import { type DadosPessoais } from "../types/types";

type Props = {
  dados: DadosPessoais;
};

export default function Preview({ dados }: Props) {
  return (
    <>
    <h2>Prévia do Currículo</h2>
      <div className="border border-black mt-0 mr-4 p-8 min-h-[90vh]">
        <h2 className="font-bold text-center">Dados Pessoais</h2>
        <p>
          <strong>Nome:</strong> {dados.nome}
        </p>
        <p>
          <strong>Email:</strong> {dados.email}
        </p>
        <p>
          <strong>Telefone:</strong> {dados.telefone}
        </p>
        <p>
          <strong>LinkedIn:</strong> {dados.linkedin}
        </p>
        <p>
          <strong>Resumo:</strong> {dados.resumo}
        </p>
      </div>
    </>
  );
}
