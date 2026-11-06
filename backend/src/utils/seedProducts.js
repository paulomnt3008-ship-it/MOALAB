import { pathToFileURL } from 'node:url';
import { connectDatabase, sequelize } from '../config/database.js';
import { Product } from '../models/index.js';

// Sample data. Edit it and run `npm run seed` to reload it into the database.
export const sampleProducts = [
  {
    slug: 'moalab-spray-n1',
    name: 'MOALAB Spray Nº1',
    tagline: 'Una bruma fina, en botella negra.',
    description:
      'Spray de 100 ml con atomizador de bruma fina. Texto de ejemplo: reemplázalo con la descripción real del producto.',
    price: 349,
    compareAtPrice: 420,
    currency: 'MXN',
    volume: '100 ml',
    stock: 120,
    isFeatured: true,
    images: ['bottle-front', 'bottle-back', 'bottle-nozzle'],
  },
  {
    slug: 'moalab-spray-viaje',
    name: 'MOALAB Spray Viaje',
    tagline: 'El mismo spray, en tamaño de bolsillo.',
    description: 'Formato de 30 ml para llevar. Producto de ejemplo.',
    price: 149,
    compareAtPrice: null,
    currency: 'MXN',
    volume: '30 ml',
    stock: 80,
    isFeatured: false,
    images: ['bottle-front'],
  },
];

export async function seedProducts() {
  for (const product of sampleProducts) {
    await Product.upsert(product);
  }
  return sampleProducts.length;
}

// Runs only when called directly with `npm run seed`.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    await connectDatabase();
    const count = await seedProducts();
    console.log(`Productos de ejemplo cargados: ${count}`);
  } catch (error) {
    console.error('No se pudieron cargar los productos:', error.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}
