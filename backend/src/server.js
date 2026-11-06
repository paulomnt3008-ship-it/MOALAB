import app from './app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';
import './models/index.js';

try {
  await connectDatabase();
  app.listen(env.port, () => {
    console.log(`API lista en http://localhost:${env.port}/api`);
  });
} catch (error) {
  console.error('No se pudo conectar a la base de datos:', error.message);
  console.error('¿Está MySQL encendido en el panel de XAMPP?');
  process.exit(1);
}
