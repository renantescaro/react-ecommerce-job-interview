# 🚀 Sistema de Gestão de Clientes (Frontend ReactJS)

Este projeto é o frontend construído com **ReactJS** e **Vite** para consumir uma API RESTful (desenvolvida em PHP) e gerenciar cadastros de clientes e seus endereços.
O sistema implementa autenticação via **JWT (JSON Web Tokens)** e usa o **Axios** para requisições HTTP.

---

## 📋 Funcionalidades

* **Autenticação JWT:** Login de usuário e proteção de rotas.
* **Rotas Protegidas:** Acesso a páginas restrito a usuários logados.
* **CRUD de Clientes:**
* **CRUD de Usuários:**

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** ReactJS
* **Build Tool:** Vite
* **Roteamento:** React Router DOM
* **Requisições HTTP:** Axios (com instância customizada para JWT)
* **Estilização:** Bootstrap 5
* **Gerenciamento de Estado (Auth):** React Context API

---

## ⚙️ Instalação e Execução Local

Siga estes passos para configurar e executar o projeto em sua máquina local.

### Pré-requisitos

* Node.js (versão 18+)
* npm ou yarn
* O Backend PHP deve estar rodando e acessível.

### Passos

1.  **Clone o Repositório:**
    ```bash
    git clone https://github.com/renantescaro/react-ecommerce-job-interview
    cd react-ecommerce-job-interview
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    # ou
    # yarn install
    ```

3.  **Configurar Variáveis de Ambiente:**
    Crie um arquivo chamado **`.env`** na raiz do projeto e defina a URL base da sua API.

    ```
    # .env
    VITE_API_BASE_URL=http://localhost:8000/api 
    ```
    *(Ajuste a porta 8000 conforme a configuração local do seu backend).*

4.  **Iniciar a Aplicação:**
    ```bash
    npm run dev
    # ou
    # yarn dev
    ```
    O frontend estará acessível em `http://localhost:5173` (ou porta similar).

---

## 🌍 Configuração de Deploy (Heroku)

O projeto está configurado para ser implantado no Heroku usando o Node.js Buildpack e o pacote `serve` para servir os arquivos estáticos de produção.

### Variáveis de Ambiente no Heroku

Para que o processo de build do Vite funcione corretamente no Heroku, a URL de produção da API deve ser definida nas **Config Vars** do seu aplicativo Heroku:

| Chave | Valor | Descrição |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `[SUA_URL_DO_BACKEND_HEROKU]/api` | URL base da API em produção. |

### Processo de Deploy

O `package.json` está configurado para:
* `"build"`: Gera a versão otimizada na pasta `dist`.
* `"start"`: Inicia o servidor estático `serve` na porta definida pelo Heroku (`$PORT`), servindo a pasta `dist`.
