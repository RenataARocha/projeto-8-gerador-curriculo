# Projeto 8 – Gerador de Currículo Interativo

Este projeto é um gerador de currículo interativo, desenvolvido com **React + TypeScript + Vite**, que permite que o usuário preencha seus dados, adicione experiências, habilidades e formações, e visualize o resultado em tempo real.

O layout é responsivo, clean e otimizado para desktop e mobile, com feedback visual para campos obrigatórios e validações em tempo real.

---

## 👥 Integrantes e Contribuições

### 🤝 Organização do Projeto

- **Renata Rocha** ([RenataARocha](https://github.com/RenataARocha))
  - Criou o repositório
  - Organização inicial da estrutura de pastas e arquivos
  - Configuração inicial com Vite + React + TypeScript
  - Criação do global.css e CSS Modules para componentes
  - Design geral da aplicação (cores, tipografia, espaçamentos)
  - Layout split-screen com scroll independente para formulário e preview
  - Responsividade completa para desktop e mobile
  - Implementação do foco automático em campos novos (experiências e habilidades)
  - Destaque visual e feedback para inputs com erro
  - Padronização de UX, incluindo scroll customizado, modais de alerta e preview em tempo real

---

### 💡 Funcionalidades e Responsáveis

#### 🔹 Formulário de Dados Pessoais

- **Renata Rocha** ([RenataARocha](https://github.com/RenataARocha))
  - Componente `DadosPessoaisForm.tsx` com inputs controlados: Nome, Email, Telefone, LinkedIn, GitHub
  - Textarea para resumo profissional com contador de caracteres
  - Validação em tempo real (campos obrigatórios e email válido)
  - CSS modular (`DadosPessoaisForm.module.css`) para estilização

#### 🔹 Lista de Habilidades

- **borgesip** ([borgesip](https://github.com/borgesip))
  - Componente `ListaHabilidades.tsx` com inputs para nome da habilidade e nível
  - Botões de adicionar/remover habilidades
  - CSS organizado para exibição limpa das habilidades

#### 🔹 Lista de Experiências

- **dantaspereiraana** ([dantaspereiraana](https://github.com/dantaspereiraana))
  - Componente `ListaExperiencias.tsx`
  - Campos: Empresa, Cargo, Período, Descrição
  - Checkbox "Trabalho atual" e validação de datas
  - Botões para adicionar/remover experiências dinamicamente

#### 🔹 Preview em Tempo Real

- **htu6n7yi** ([htu6n7yi](https://github.com/htu6n7yi))
  - Estruturação do preview do currículo
  - Componente `Preview.tsx` exibindo dados, experiências, habilidades e educação
  - Indicação visual de campos vazios
  - Layout clean e organizado

#### 🔹 Validações e UX

- **angelogpaixao** ([angelogpaixao](https://github.com/angelogpaixao))
  - Task 7: Inclusão de erros em tempo real e indicação de campos vazios
  - Feedback visual aprimorado para inputs inválidos

#### 🔹 Tarefas Extras e Setup

- **dantaspereiraana** ([dantaspereiraana](https://github.com/dantaspereiraana))
  - Task 1 e Task 5: Setup inicial e funcionalidades complementares

---

## 🚀 Como rodar o projeto localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/RenataARocha/projeto-8-gerador-curriculo.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd projeto-8-gerador-curriculo
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Rode o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Abra o navegador em `http://localhost:5173` para ver o projeto.

---

## 💾 Deploy

O projeto está hospedado no **Vercel**:

[https://projeto-8-gerador-curriculo.vercel.app/](https://projeto-8-gerador-curriculo.vercel.app/)

---

## 🛠️ Tecnologias Utilizadas

- React + TypeScript
- Vite
- CSS Modules
- Git & GitHub
- Vercel para deploy

---

## 🤝 Como contribuir

1. Faça um fork deste repositório
2. Crie uma branch para sua feature (`git checkout -b minha-feature`)
3. Faça commit das suas alterações (`git commit -m "Minha contribuição"`)
4. Faça push para a branch (`git push origin minha-feature`)
5. Abra um Pull Request detalhando sua contribuição
