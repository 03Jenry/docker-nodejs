const mongoose = require('mongoose');
const config = require('config');
const logger = require('../utils/logger');

// Configuración de MongoDB para Mongoose 8 (sin opciones deprecadas)
const mongoConfig = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 1,
  maxIdleTimeMS: 30000,
  retryWrites: true,
  w: 'majority',
};

class DatabaseConnection {
  constructor() {
    this.isConnected = false;
    this.connectionString = config.get('mongodb');
  }

  async connect() {
    try {
      if (this.isConnected) {
        logger.info('📊 MongoDB ya está conectado');
        return;
      }

      logger.info('🔗 Conectando a MongoDB...');
      
      await mongoose.connect(this.connectionString, mongoConfig);
      
      this.isConnected = true;
      
      logger.info('✅ MongoDB conectado exitosamente');
      
      // Configurar eventos de conexión
      mongoose.connection.on('connected', () => {
        logger.info('📊 MongoDB conectado');
        this.isConnected = true;
      });

      mongoose.connection.on('error', (error) => {
        logger.error('❌ Error en conexión MongoDB:', error);
        this.isConnected = false;
      });

      mongoose.connection.on('disconnected', () => {
        logger.warn('📴 MongoDB desconectado');
        this.isConnected = false;
      });

      // Manejar cierre graceful
      process.on('SIGINT', async () => {
        await this.disconnect();
        process.exit(0);
      });

    } catch (error) {
      logger.error('❌ Error al conectar con MongoDB:', error);
      throw error;
    }
  }

  async disconnect() {
    try {
      if (this.isConnected) {
        await mongoose.connection.close();
        this.isConnected = false;
        logger.info('🔌 Conexión a MongoDB cerrada');
      }
    } catch (error) {
      logger.error('❌ Error al cerrar conexión MongoDB:', error);
    }
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      name: mongoose.connection.name,
    };
  }
}

// Crear instancia singleton
const databaseConnection = new DatabaseConnection();

// Conectar automáticamente al importar el módulo
databaseConnection.connect().catch((error) => {
  logger.error('❌ Error fatal al conectar con MongoDB:', error);
  process.exit(1);
});

module.exports = databaseConnection; 
