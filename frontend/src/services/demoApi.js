// Demo mode: answers the same routes as backend/src/routes without a server.
// Used by apiClient only when VITE_DEMO_MODE is 'true' (the GitHub Pages build).
// Stock and placed orders live in this browser's localStorage; nothing is charged.
import { ApiError } from './apiClient';
import { DEMO_PRODUCTS, DEMO_RULES } from './demoData';

const STORAGE_KEY = 'moalab-demo';
const LATENCY_MS = 250;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const round = (value) => Math.round(value * 100) / 100;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function freshState() {
  return {
    stock: Object.fromEntries(DEMO_PRODUCTS.map((product) => [product.id, product.stock])),
    orders: [],
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.stock && Array.isArray(saved.orders)) return saved;
  } catch {
    // Private mode or corrupted data: start over.
  }
  return freshState();
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable: the demo still works for this visit.
  }
}

const withStock = (product, state) => ({ ...product, stock: state.stock[product.id] ?? product.stock });

function findProduct(predicate, state, message) {
  const product = DEMO_PRODUCTS.find(predicate);
  if (!product) throw new ApiError(message, 404);
  return withStock(product, state);
}

function listProducts(state) {
  return [...DEMO_PRODUCTS]
    .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || a.id - b.id)
    .map((product) => withStock(product, state));
}

// Same rules as backend/src/services/cartService.js.
function calculateCartSummary(items, state) {
  if (!Array.isArray(items) || items.length === 0) throw new ApiError('El carrito está vacío', 400);

  const lines = items.map(({ productId, quantity }) => {
    const product = DEMO_PRODUCTS.find((item) => item.id === productId);
    if (!product) throw new ApiError(`El producto ${productId} no existe`, 400);
    const available = state.stock[productId] ?? product.stock;
    if (available < quantity) {
      throw new ApiError(`No hay stock suficiente de ${product.name}`, 409, { available });
    }
    return {
      productId,
      name: product.name,
      quantity,
      unitPrice: product.price,
      lineTotal: round(product.price * quantity),
    };
  });

  const subtotal = round(lines.reduce((sum, line) => sum + line.lineTotal, 0));
  const discount = round(subtotal * DEMO_RULES.discountRate);
  const shipping = subtotal - discount >= DEMO_RULES.freeShippingFrom ? 0 : DEMO_RULES.shippingCost;
  const total = round(subtotal - discount + shipping);

  return { lines, subtotal, discount, shipping, total, currency: DEMO_PRODUCTS[0].currency };
}

// Same checks as orderValidator in backend/src/middlewares/validate.js.
function validateCustomer(customer = {}) {
  const errors = [];
  if (!customer.name?.trim()) errors.push('customer.name es obligatorio');
  if (!EMAIL_PATTERN.test(customer.email ?? '')) errors.push('customer.email no es válido');
  if (!customer.address?.trim()) errors.push('customer.address es obligatorio');
  if (errors.length) throw new ApiError('Datos inválidos', 400, errors);
}

function createOrder({ customer, items } = {}, state) {
  validateCustomer(customer);
  const summary = calculateCartSummary(items, state);
  const id = (state.orders.at(-1)?.id ?? 0) + 1;

  summary.lines.forEach((line) => {
    state.stock[line.productId] -= line.quantity;
  });
  state.orders.push({
    id,
    status: 'pending',
    customerName: customer.name,
    customerEmail: customer.email,
    customerPhone: customer.phone ?? null,
    shippingAddress: customer.address,
    createdAt: new Date().toISOString(),
    ...summary,
  });
  saveState(state);

  return { id, status: 'pending', ...summary };
}

function getOrder(id, state) {
  const order = state.orders.find((item) => item.id === Number(id));
  if (!order) throw new ApiError('Orden no encontrada', 404);
  const { lines, ...rest } = order;
  return {
    ...rest,
    items: lines.map((line) => {
      const product = DEMO_PRODUCTS.find((item) => item.id === line.productId);
      return { ...line, product: { name: product?.name, slug: product?.slug } };
    }),
  };
}

function createPayment({ orderId } = {}, state) {
  const order = state.orders.find((item) => item.id === orderId);
  if (!order) throw new ApiError('Orden no encontrada', 404);
  return {
    orderId: order.id,
    status: 'pending',
    amount: order.total,
    currency: order.currency,
    message: 'Modo demostración: no se cobra nada.',
  };
}

export async function handleDemoRequest(path, { method = 'GET', body } = {}) {
  await wait(LATENCY_MS);
  const state = loadState();
  const route = path.split('?')[0];
  let match;

  if (method === 'GET' && route === '/products') return listProducts(state);
  if (method === 'GET' && route === '/products/featured') {
    return findProduct((product) => product.isFeatured, state, 'No hay un producto destacado');
  }
  if (method === 'GET' && (match = route.match(/^\/products\/([^/]+)$/))) {
    const slug = decodeURIComponent(match[1]);
    return findProduct((product) => product.slug === slug, state, 'Producto no encontrado');
  }
  if (method === 'POST' && route === '/cart/summary') return calculateCartSummary(body?.items, state);
  if (method === 'POST' && route === '/orders') return createOrder(body, state);
  if (method === 'GET' && (match = route.match(/^\/orders\/([^/]+)$/))) {
    return getOrder(decodeURIComponent(match[1]), state);
  }
  if (method === 'POST' && route === '/payments') return createPayment(body, state);

  throw new ApiError('Ruta no encontrada', 404);
}
