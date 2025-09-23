# API para Sistema de Gestão de Cobranças

<p align="center">
  <img src="https://img.shields.io/badge/status-conclu%C3%ADdo-brightgreen" alt="Status do Projeto: Concluído">
 
</p>

## 📖 Sobre o Projeto

Este projeto é uma **API RESTful** completa desenvolvida como trabalho de conclusão do curso de Desenvolvimento de Software Full Stack da [Cubos Academy](https://cubos.academy/). O backend foi construído para servir a uma aplicação front-end de gestão de cobranças (CRM), permitindo o controle de clientes e de seus respectivos ciclos de faturamento.

Fui o responsável exclusivo pela arquitetura, desenvolvimento e implementação de todo o backend, aplicando as melhores práticas de desenvolvimento com Node.js e Express.

Link para o projeto completo: https://github.com/VhHonorato/sistema-de-cobranca-localhost071.git

---

## ✨ Funcionalidades Principais

* **👤 Gestão de Usuários:** Cadastro e atualização de perfil de usuários.
* **🔐 Autenticação e Autorização:** Sistema de login seguro com senhas criptografadas (`Bcrypt`) e controle de acesso a rotas protegidas utilizando `JSON Web Tokens (JWT)`.
* **👥 Gestão de Clientes:** CRUD (Criar, Ler, Atualizar, Deletar) completo para o cadastro de clientes.
* **🧾 Gestão de Cobranças:** CRUD completo para o lançamento de cobranças, com status (Paga, Pendente, Vencida) e data de vencimento.
* **📊 Relatórios e Dashboard:** Endpoints para consolidar dados e gerar relatórios, como status de clientes (em dia ou inadimplentes) e um resumo de cobranças.
* **🛡️ Validação de Dados:** Validação robusta de todas as entradas da API utilizando a biblioteca `Yup` para garantir a integridade dos dados.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido com as seguintes tecnologias:

| Tecnologia | Descrição |
| :--- | :--- |
| **Node.js** | Ambiente de execução do JavaScript no servidor. |
| **Express.js** | Framework para construção da API, gerenciamento de rotas e middlewares. |
| **PostgreSQL** | Banco de dados relacional para armazenamento dos dados. |
| **SQL** | Linguagem para definição e manipulação das queries no banco de dados. |
| **JWT (JSON Web Token)** | Para criação de tokens de autenticação seguros e gerenciamento de sessões. |
| **Bcrypt** | Biblioteca para criptografia (hashing) de senhas. |
| **Yup** | Biblioteca para validação de esquemas e dados de entrada. |
| **Git & GitHub** | Para controle de versão e hospedagem do código. |

---

## 🚀 Como Executar o Projeto

Para executar este projeto localmente, siga os passos abaixo:

**1. Pré-requisitos:**
* [Node.js](https://nodejs.org/en/) (versão 14 ou superior)
* [PostgreSQL](https://www.postgresql.org/) instalado e rodando.
* Um cliente de API como [Insomnia](https://insomnia.rest/download) ou [Postman](https://www.postman.com/downloads/).

**2. Clone o Repositório:**
```bash
git clone [https://github.com/VhHonorato/back-end-sistema-de-cobranca---equipe-localhost071.git](https://github.com/VhHonorato/back-end-sistema-de-cobranca---equipe-localhost071.git)
```

**3. Navegue até a Pasta do Projeto:**
```bash
cd back-end-sistema-de-cobranca---equipe-localhost071
```

**4. Instale as Dependências:**
```bash
npm install
```

**5. Configure o Banco de Dados:**
* Crie um banco de dados no PostgreSQL para este projeto.
* Na raiz do projeto, crie um arquivo chamado `.env` e copie o conteúdo do arquivo `.env.example`.
* Preencha as variáveis de ambiente no arquivo `.env` com suas credenciais do PostgreSQL.

```env
# Configuração do Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario_postgres
DB_PASSWORD=sua_senha_postgres
DB_DATABASE=nome_do_seu_banco
```

**6. Execute as Migrations (Estrutura do Banco):**
* Execute o script SQL localizado em `./src/sql/schema.sql` no seu banco de dados para criar todas as tabelas necessárias.

**7. Inicie a Aplicação:**
```bash
npm run dev
```
> O servidor estará rodando em `http://localhost:3000` (ou na porta que você definir).

---

## 🔗 Endpoints da API

Abaixo estão as principais rotas da API. Todas as rotas, exceto `/login` e `/usuario` (POST), são protegidas e exigem um token JWT no cabeçalho de autorização.

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/usuario` | Cadastra um novo usuário. |
| `POST` | `/login` | Realiza o login e retorna um token de autenticação. |
| `GET` | `/usuario` | **(Protegida)** Retorna os dados do usuário logado. |
| `PUT` | `/usuario` | **(Protegida)** Atualiza os dados do usuário logado. |
| `POST`| `/cliente` | **(Protegida)** Cadastra um novo cliente. |
| `GET` | `/clientes`| **(Protegida)** Lista todos os clientes do usuário. |
| `PUT` | `/cliente/:id`| **(Protegida)** Atualiza um cliente existente. |
| `POST`| `/cobranca` | **(Protegida)** Cria uma nova cobrança para um cliente. |
| `GET` | `/cobrancas`| **(Protegida)** Lista todas as cobranças. |
| `PUT` | `/cobranca/:id`| **(Protegida)** Edita uma cobrança. |
| `DELETE`|`/cobranca/:id`| **(Protegida)** Deleta uma cobrança. |

---

## 👨‍💻 Autor

| [<img src="https://avatars.githubusercontent.com/u/89660505?v=4" width="100px;"/><br><sub>Victor Honorato</sub>](https://github.com/VhHonorato) |
| :---: |

---


