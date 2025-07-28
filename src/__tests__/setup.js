// Configuración global para tests
process.env.NODE_ENV = 'test';
process.env.PORT = 3001;

// Configurar timeout para tests
jest.setTimeout(10000);

// Mock de console.log para tests más limpios
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}; 