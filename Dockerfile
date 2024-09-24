# Usa una imagen base oficial de Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json al directorio de trabajo
COPY ./src/package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código fuente de la aplicación al contenedor
COPY ./src ./

# Expone el puerto 3000 para la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
