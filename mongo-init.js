// Script de inicialización para MongoDB
db = db.getSiblingDB('development');

// Crear usuario para la aplicación
db.createUser({
  user: 'appuser',
  pwd: 'apppassword',
  roles: [
    {
      role: 'readWrite',
      db: 'development'
    }
  ]
});

// Crear colecciones iniciales
db.createCollection('users');
db.createCollection('messages');

// Crear índices
db.users.createIndex({ "email": 1 }, { unique: true });
db.messages.createIndex({ "timestamp": 1 });

print('✅ Base de datos inicializada correctamente'); 