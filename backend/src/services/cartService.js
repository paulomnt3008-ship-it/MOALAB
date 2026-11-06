import { Op } from 'sequelize';
import { Product } from '../models/index.js';
import { badRequest, conflict } from '../utils/httpError.js';

// Sample business rules. Adjust them when the real ones are defined.
export const SHIPPING_COST = 99;
export const FREE_SHIPPING_FROM = 599;
export const DISCOUNT_RATE = 0;

const round = (value) => Math.round(value * 100) / 100;

// Builds the cart totals from database prices, never from prices sent by the client.
export async function calculateCartSummary(items, { transaction } = {}) {
  if (!items.length) throw badRequest('El carrito está vacío');

  const ids = items.map((item) => item.productId);
  const products = await Product.findAll({ where: { id: { [Op.in]: ids } }, transaction });
  const byId = new Map(products.map((product) => [product.id, product]));

  const lines = items.map(({ productId, quantity }) => {
    const product = byId.get(productId);
    if (!product) throw badRequest(`El producto ${productId} no existe`);
    if (product.stock < quantity) {
      throw conflict(`No hay stock suficiente de ${product.name}`, { available: product.stock });
    }
    const unitPrice = Number(product.price);
    return {
      productId,
      name: product.name,
      quantity,
      unitPrice,
      lineTotal: round(unitPrice * quantity),
    };
  });

  const subtotal = round(lines.reduce((sum, line) => sum + line.lineTotal, 0));
  const discount = round(subtotal * DISCOUNT_RATE);
  const shipping = subtotal - discount >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST;
  const total = round(subtotal - discount + shipping);
  const currency = products[0]?.currency ?? 'MXN';

  return { lines, subtotal, discount, shipping, total, currency };
}
