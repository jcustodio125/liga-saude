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