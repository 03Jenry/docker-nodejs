# 🚀 Node.js Docker Template

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.x-blue.svg)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-20.x-blue.svg)](https://www.docker.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green.svg)](https://www.mongodb.com/)
[![RabbitMQ](https://img.shields.io/badge/RabbitMQ-3.12-orange.svg)](https://www.rabbitmq.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Plantilla moderna y robusta de Node.js con Docker, MongoDB y RabbitMQ** - Lista para producción con las mejores prácticas de desarrollo.

## 📋 Tabla de Contenidos

- [✨ Características](#-características)
- [🛠️ Tecnologías](#️-tecnologías)
- [🚀 Inicio Rápido](#-inicio-rápido)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🔧 Configuración](#-configuración)
- [🐳 Docker](#-docker)
- [📊 API Endpoints](#-api-endpoints)
- [🧪 Testing](#-testing)
- [📝 Scripts Disponibles](#-scripts-disponibles)
- [🔒 Seguridad](#-seguridad)
- [📈 Monitoreo y Logging](#-monitoreo-y-logging)
- [🤝 Contribución](#-contribución)
- [📄 Licencia](#-licencia)

## ✨ Características

- 🔐 **Seguridad Avanzada**: Helmet, CORS, Rate Limiting, Validación de datos
- 📊 **Base de Datos**: MongoDB con Mongoose y conexión optimizada
- 🐰 **Mensajería**: RabbitMQ para procesamiento asíncrono
- 🐳 **Containerización**: Docker y Docker Compose optimizados
- 📝 **Logging**: Winston con múltiples niveles y formatos
- 🧪 **Testing**: Jest con configuración completa
- 🔍 **Linting**: ESLint y Prettier para código limpio
- ⚡ **Performance**: Compresión, caching y optimizaciones
- 🏥 **Health Checks**: Monitoreo de servicios integrado
- 🔄 **Graceful Shutdown**: Manejo elegante de cierres

## 🛠️ Tecnologías

### Backend
- **Node.js 18** - Runtime de JavaScript
- **Express.js 4.18** - Framework web
- **Mongoose 8.0** - ODM para MongoDB
- **AMQP** - Protocolo de mensajería

### Base de Datos y Mensajería
- **MongoDB 7.0** - Base de datos NoSQL
- **RabbitMQ 3.12** - Message broker
- **Redis 7.2** - Cache y sesiones

### Desarrollo y Testing
- **Jest** - Framework de testing
- **ESLint** - Linter de código
- **Prettier** - Formateador de código
- **Nodemon** - Auto-reload en desarrollo

### DevOps
- **Docker** - Containerización
- **Docker Compose** - Orquestación de servicios
- **Winston** - Sistema de logging

## 🚀 Inicio Rápido

### Prerrequisitos

- [Node.js](https://nodejs.org/) >= 18.0.0
- [Docker](https://www.docker.com/) >= 20.0.0
- [Docker Compose](https://docs.docker.com/compose/) >= 2.0.0
- [Git](https://git-scm.com/)

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/nodejs-docker-template.git
   cd nodejs-docker-template
   ```

2. **Configurar variables de entorno**
   ```bash
   cp env.example .env
   # Editar .env con tus configuraciones
   ```

3. **Ejecutar con Docker (Recomendado)**
   ```bash
   # Construir y levantar todos los servicios
   docker-compose up -d
   
   # Ver logs
   docker-compose logs -f app
   ```

4. **O ejecutar localmente**
   ```bash
   # Instalar dependencias
   npm install
   
   # Ejecutar en modo desarrollo
   npm run dev
   ```

### Verificar la instalación

- 🌐 **API**: http://localhost:3000/api
- 🏥 **Health Check**: http://localhost:3000/health
- 🐰 **RabbitMQ Management**: http://localhost:15672 (usuario: usuario, pass: pass)
- 📊 **MongoDB**: localhost:27017

## 📁 Estructura del Proyecto

```
docker-nodejs/
├── 📁 config/                 # Configuraciones por ambiente
│   ├── development.json
│   └── production.json
├── 📁 src/
│   ├── 📁 __tests__/         # Tests
│   ├── 📁 connection/        # Conexiones a BD
│   ├── 📁 controllers/       # Controladores
│   ├── 📁 routes/           # Rutas de la API
│   ├── 📁 services/         # Servicios de negocio
│   ├── 📁 utils/            # Utilidades (logger, etc.)
│   ├── app.js              # Configuración de Express
│   └── index.js            # Punto de entrada
├── 📁 logs/                # Archivos de log
├── .eslintrc.js           # Configuración ESLint
├── .prettierrc            # Configuración Prettier
├── docker-compose.yml     # Orquestación de servicios
├── Dockerfile             # Imagen de la aplicación
├── jest.config.js         # Configuración de tests
├── package.json           # Dependencias y scripts
└── README.md              # Este archivo
```

## 🔧 Configuración

### Variables de Entorno

Copia `env.example` a `.env` y configura:

```bash
# Servidor
NODE_ENV=development
PORT=3000
HOST=0.0.0.0

# Logging
LOG_LEVEL=info

# Seguridad
ALLOWED_ORIGINS=http://localhost:3000

# Base de datos
MONGODB_URI=mongodb://appuser:apppassword@mongo:27017/development

# RabbitMQ
RABBITMQ_HOST=rabbitmq
RABBITMQ_USER=usuario
RABBITMQ_PASS=pass
```

### Configuración por Ambiente

- **Development**: `config/development.json`
- **Production**: `config/production.json`

## 🐳 Docker

### Comandos útiles

```bash
# Levantar todos los servicios
docker-compose up -d

# Ver logs de un servicio específico
docker-compose logs -f app

# Reconstruir y levantar
docker-compose up -d --build

# Detener todos los servicios
docker-compose down

# Limpiar volúmenes
docker-compose down -v

# Ejecutar comandos en el contenedor
docker-compose exec app npm run test
```

### Servicios incluidos

- **app**: Aplicación Node.js
- **mongo**: Base de datos MongoDB
- **rabbitmq**: Message broker RabbitMQ
- **redis**: Cache Redis

## 📊 API Endpoints

### Health Check
```http
GET /health
```

### API Principal
```http
GET /api
```

### Mensajería
```http
POST /api/message
Content-Type: application/json

{
  "message": "Hola mundo",
  "priority": "medium"
}
```

### Estadísticas
```http
GET /api/stats
```

### Usuarios (ejemplo)
```http
GET /api/users
```

## 🧪 Testing

### Ejecutar tests
```bash
# Todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Con coverage
npm test -- --coverage
```

### Estructura de tests
- `src/__tests__/` - Tests de la aplicación
- `jest.config.js` - Configuración de Jest
- `src/__tests__/setup.js` - Setup global

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Ejecutar con nodemon
npm start           # Ejecutar en producción

# Testing
npm test            # Ejecutar tests
npm run test:watch  # Tests en modo watch

# Linting y formateo
npm run lint        # Verificar código
npm run lint:fix    # Corregir errores automáticamente
npm run format      # Formatear código

# Docker
npm run docker:build      # Construir imagen
npm run docker:run        # Ejecutar contenedor
npm run docker:compose    # Levantar con docker-compose
npm run docker:logs       # Ver logs
```

## 🔒 Seguridad

### Características implementadas

- **Helmet**: Headers de seguridad HTTP
- **CORS**: Configuración de origen cruzado
- **Rate Limiting**: Protección contra spam
- **Validación**: Express-validator para inputs
- **Sanitización**: Limpieza de datos de entrada
- **Compresión**: Optimización de respuestas

### Recomendaciones de producción

1. Cambiar contraseñas por defecto
2. Configurar HTTPS
3. Implementar autenticación JWT
4. Usar variables de entorno seguras
5. Configurar firewall
6. Monitorear logs de seguridad

## 📈 Monitoreo y Logging

### Logging con Winston

```javascript
const logger = require('./utils/logger');

logger.info('Mensaje informativo');
logger.warn('Advertencia');
logger.error('Error crítico');
```

### Health Checks

- **Aplicación**: `/health`
- **MongoDB**: Monitoreo automático
- **RabbitMQ**: Monitoreo automático
- **Docker**: Health checks configurados

### Métricas disponibles

- Uptime del servidor
- Estado de conexiones
- Estadísticas de RabbitMQ
- Logs estructurados

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de contribución

- Sigue las convenciones de código
- Ejecuta los tests antes de commit
- Documenta nuevas funcionalidades
- Mantén la cobertura de tests

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- [Express.js](https://expressjs.com/) - Framework web
- [MongoDB](https://www.mongodb.com/) - Base de datos
- [RabbitMQ](https://www.rabbitmq.com/) - Message broker
- [Docker](https://www.docker.com/) - Containerización

---

<div align="center">

**¿Te gustó este proyecto? ¡Dale una ⭐!**

[![GitHub stars](https://img.shields.io/github/stars/tu-usuario/nodejs-docker-template?style=social)](https://github.com/tu-usuario/nodejs-docker-template)

</div>
