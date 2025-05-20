
# 🩺 Sistema de Agendamento Médico - Front-end

Este projeto foi desenvolvido como parte do teste prático para a vaga de desenvolvedor Front-end. Ele simula um sistema de agendamento de consultas médicas, incluindo especialidades, convênios, horários disponíveis e agendamentos, com foco em acessibilidade, responsividade e internacionalização (i18n).

---

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- JavaScript (ES6+)
- CSS3
- Docker

---

## 📦 Funcionalidades

- Cadastro e listagem de especialidades médicas.
- Cadastro e listagem de convênios.
- Definição e visualização de horários disponíveis para consultas.
- Agendamento de consultas por paciente, convênio e especialidade.
- Marcação de agendamentos como atendidos.
- Suporte a idiomas (Português, Inglês e Espanhol).
- Acessibilidade com alto contraste e ajustes de fonte.
- Estilo responsivo e adaptável para desktop/mobile.

---

## 🧭 Estrutura do Projeto

```
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   └── services/
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 🧑‍💻 Como Executar Localmente

### Pré-requisitos

- Node.js 18 ou superior
- npm (gerenciador de pacotes)

### Passos

```bash
# 1. Clonar o repositório
git clone https://seu-repositorio.com/sistema-liga-saude
cd liga-saude

# 2. Instalar as dependências
npm install

# 3. Executar o projeto localmente
npm run dev
```

O projeto estará disponível em `http://localhost:5173`.

---

## 🐳 Como Executar com Docker

### Requisitos

- Docker instalado
- Docker Compose (opcional)

### Usando Docker diretamente

```bash
docker build -t agendamento-frontend .
docker run -p 5173:5173 agendamento-frontend
```

### Usando Docker Compose

```bash
docker-compose up --build
```

#### docker-compose.yml

```yaml
services:
  frontend:
    build: .
    ports:
      - "5173:5173"
    volumes:
      - .:/app
    working_dir: /app
    command: npm run dev
```

#### Dockerfile

```Dockerfile
# Usando uma imagem base do Node.js
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar arquivos do projeto
COPY . .

# Instalar dependências
RUN npm install

# Comando padrão para rodar o projeto
CMD ["npm", "run", "dev"]
```

---

## ♿ Acessibilidade e Internacionalização

Este projeto foi construído com atenção à:

- ✅ Acessibilidade: modo de alto contraste, aumento de fonte e navegação clara por teclado.
- 🌍 Suporte a múltiplos idiomas: os textos são renderizados com base na linguagem selecionada e persistem mesmo após recarregamento da página.

---

## 📄 Licença

Este projeto é de uso exclusivo para avaliação técnica da vaga de desenvolvedor Front-end.

---

## 📬 Contato

Caso tenha dúvidas ou queira mais informações:

**Email:** jeicksondelima125@gmail.com
**LinkedIn:** [linkedin.com/in/jeickson-junior](https://www.linkedin.com/in/jeickson-junior-626454239/)
**Github** [github.com/jcustodio125] (https://github.com/jcustodio125)
**WhatsApp** (84) 99951-7914

---
