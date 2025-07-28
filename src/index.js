require('dotenv').config();
const app = require('./app');
const logger = require('./utils/logger');
require('./connection/index');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

async function startServer() {
  try {
    const server = app.listen(PORT, HOST, () => {
      logger.info(`🚀 Servidor iniciado en http://${HOST}:${PORT}`);
      logger.info(`📊 Health check disponible en http://${HOST}:${PORT}/health`);
      logger.info(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`⏰ ${new Date().toLocaleString('es-ES')}`);
    });

    // Manejo graceful de cierre
    const gracefulShutdown = (signal) => {
      logger.info(`📴 Recibida señal ${signal}. Cerrando servidor...`);
      server.close(() => {
        logger.info('✅ Servidor cerrado exitosamente');
        process.exit(0);
      });

      // Forzar cierre si no se completa en 10 segundos
      setTimeout(() => {
        logger.error('❌ Forzando cierre del servidor');
        process.exit(1);
      }, 10000);
    };

    // Escuchar señales de terminación
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Manejo de errores no capturados
    process.on('uncaughtException', (error) => {
      logger.error('❌ Excepción no capturada:', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      logger.error('❌ Promesa rechazada no manejada:', reason);
      process.exit(1);
    });

  } catch (error) {
    logger.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();