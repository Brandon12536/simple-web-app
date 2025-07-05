# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install --only=production

# Copiar el código de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Instalar un servidor web liviano
RUN npm install -g http-server

# Puerto expuesto
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["http-server", "dist", "-p", "8080"]
