// Sample data for demo mode (the GitHub Pages build, which has no backend).
// Keep it in sync with backend/src/utils/seedProducts.js and the rules at the
// top of backend/src/services/cartService.js. Ids match a fresh `npm run seed`.
export const DEMO_PRODUCTS = [
  {
    id: 1,
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
    id: 2,
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

export const DEMO_RULES = {
  shippingCost: 99,
  freeShippingFrom: 599,
  discountRate: 0,
};
