# Dockerfile
FROM node:16
WORKDIR /app

# Copiar los archivos package.json y package-lock.json antes de instalar dependencias
COPY ./src/package*.json ./

# Instalar dependencias del proyecto
RUN npm install

# Copiar el resto del código de la aplicación
COPY ./src /app

# Comando para iniciar el servidor
CMD ["node", "server.js"]
