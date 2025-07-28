const logger = require('../utils/logger');

class HomeController {
  static async index(req, res) {
    try {
      logger.info('Acceso a la ruta principal');
      
      res.status(200).json({
        success: true,
        message: '¡Bienvenido a la API de Node.js con Docker! 🚀',
        data: {
          version: '2.0.0',
          environment: process.env.NODE_ENV || 'development',
          timestamp: new Date().toISOString(),
          endpoints: {
            health: '/health',
            api: '/api',
            stats: '/api/stats',
            message: '/api/message (POST)',
            users: '/api/users',
          },
          features: [
            'Express.js con middleware de seguridad',
            'MongoDB con Mongoose',
            'RabbitMQ para mensajería',
            'Docker y Docker Compose',
            'Logging con Winston',
            'Validación de datos',
            'Rate limiting',
            'CORS configurado',
            'Compresión de respuestas',
          ],
        },
      });
    } catch (error) {
      logger.error('Error en HomeController.index:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        message: 'No se pudo procesar la solicitud',
      });
    }
  }
}

module.exports = HomeController;