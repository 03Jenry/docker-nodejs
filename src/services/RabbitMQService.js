const amqp = require('amqplib');
const config = require('config');
const logger = require('../utils/logger');

class RabbitMQService {
  constructor() {
    this.connection = null;
    this.channel = null;
    this.rabbitSettings = config.get('rabbitSettings');
  }

  async connect() {
    try {
      if (this.connection) {
        return this.connection;
      }

      logger.info('🔗 Conectando a RabbitMQ...');
      
      this.connection = await amqp.connect(this.rabbitSettings);
      this.channel = await this.connection.createChannel();
      
      // Configurar cola
      const queueName = 'messages';
      await this.channel.assertQueue(queueName, {
        durable: true,
      });

      logger.info('✅ Conexión a RabbitMQ establecida exitosamente');
      
      // Manejar desconexión
      this.connection.on('close', () => {
        logger.warn('❌ Conexión a RabbitMQ cerrada');
        this.connection = null;
        this.channel = null;
      });

      this.connection.on('error', (error) => {
        logger.error('❌ Error en conexión RabbitMQ:', error);
      });

      return this.connection;
    } catch (error) {
      logger.error('❌ Error al conectar con RabbitMQ:', error);
      throw error;
    }
  }

  async sendMessage(message, priority = 'medium') {
    try {
      await this.connect();
      
      const queueName = 'messages';
      const messageData = {
        message,
        priority,
        timestamp: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9),
      };

      const sent = this.channel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(messageData)),
        {
          persistent: true,
          priority: this.getPriorityValue(priority),
        },
      );

      if (sent) {
        logger.info(`📤 Mensaje enviado a cola: ${messageData.id}`);
        return messageData;
      } else {
        throw new Error('No se pudo enviar el mensaje a la cola');
      }
    } catch (error) {
      logger.error('❌ Error al enviar mensaje:', error);
      throw error;
    }
  }

  async getStats() {
    try {
      await this.connect();
      
      const queueName = 'messages';
      const queueInfo = await this.channel.checkQueue(queueName);
      
      return {
        queue: queueName,
        messageCount: queueInfo.messageCount,
        consumerCount: queueInfo.consumerCount,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      logger.error('❌ Error al obtener estadísticas:', error);
      throw error;
    }
  }

  async consumeMessages(callback) {
    try {
      await this.connect();
      
      const queueName = 'messages';
      
      this.channel.consume(queueName, (msg) => {
        if (msg !== null) {
          const content = JSON.parse(msg.content.toString());
          logger.info(`📥 Mensaje recibido: ${content.id}`);
          
          callback(content);
          
          this.channel.ack(msg);
        }
      });

      logger.info('👂 Consumidor de mensajes iniciado');
    } catch (error) {
      logger.error('❌ Error al iniciar consumidor:', error);
      throw error;
    }
  }

  getPriorityValue(priority) {
    const priorities = {
      low: 1,
      medium: 5,
      high: 10,
    };
    return priorities[priority] || 5;
  }

  async disconnect() {
    try {
      if (this.connection) {
        await this.connection.close();
        logger.info('🔌 Conexión a RabbitMQ cerrada');
      }
    } catch (error) {
      logger.error('❌ Error al cerrar conexión RabbitMQ:', error);
    }
  }
}

// Exportar instancia singleton
module.exports = new RabbitMQService(); 