const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const logger = require('../utils/logger');
const config = require('config');

const router = Router();

// Middleware de validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Datos de entrada inválidos',
      details: errors.array(),
    });
  }
  next();
};

// Middleware de manejo de errores para rutas
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Importar controladores
const HomeController = require('../controllers/HomeController');
const RabbitMQService = require('../services/RabbitMQService');

// Rutas
router.get('/', asyncHandler(HomeController.index));

// Ruta de ejemplo con validación
router.post(
  '/message',
  [
    body('message')
      .isString()
      .trim()
      .isLength({ min: 1, max: 500 })
      .withMessage('El mensaje debe tener entre 1 y 500 caracteres'),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high'])
      .withMessage('La prioridad debe ser low, medium o high'),
  ],
  validate,
  asyncHandler(async (req, res) => {
    const { message, priority = 'medium' } = req.body;
    
    try {
      // Enviar mensaje a RabbitMQ
      await RabbitMQService.sendMessage(message, priority);
      
      logger.info(`Mensaje enviado a RabbitMQ: ${message}`);
      
      res.status(200).json({
        success: true,
        message: 'Mensaje enviado exitosamente',
        data: { message, priority },
      });
    } catch (error) {
      logger.error('Error al enviar mensaje:', error);
      res.status(500).json({
        error: 'Error al procesar el mensaje',
        message: 'No se pudo enviar el mensaje a la cola',
      });
    }
  }),
);

// Ruta para obtener estadísticas
router.get('/stats', asyncHandler(async (req, res) => {
  try {
    const stats = await RabbitMQService.getStats();
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    logger.error('Error al obtener estadísticas:', error);
    res.status(500).json({
      error: 'Error al obtener estadísticas',
    });
  }
}));

// Ruta de ejemplo para MongoDB
router.get('/users', asyncHandler(async (req, res) => {
  // Aquí podrías agregar lógica para obtener usuarios de MongoDB
  res.json({
    success: true,
    message: 'Endpoint de usuarios - Implementar lógica de MongoDB',
    data: [],
  });
}));

module.exports = router;