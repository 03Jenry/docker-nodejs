# Usar imagen oficial de Node.js LTS
FROM node:18-alpine

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias (usar npm install en lugar de npm ci)
RUN npm install --omit=dev && \
    npm cache clean --force

# Copiar código fuente
COPY --chown=nodejs:nodejs . .

# Crear directorio para logs
RUN mkdir -p logs && chown -R nodejs:nodejs logs

# Exponer puerto
EXPOSE 3000

# Cambiar al usuario no-root
USER nodejs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js

# Comando para ejecutar la aplicación
CMD ["npm", "start"]