import { sequelize } from '../config/database.js';
import { Order, OrderItem, Product } from '../models/index.js';
import { notFoundError } from '../utils/httpError.js';
import { calculateCartSummary } from './cartService.js';

export async function createOrder({ customer, items }) {
  return sequelize.transaction(async (transaction) => {
    const summary = await calculateCartSummary(items, { transaction });

    const order = await Order.create({
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      shippingAddress: customer.address,
      subtotal: summary.subtotal,
      discount: summary.discount,
      shipping: summary.shipping,
      total: summary.total,
      currency: summary.currency,
    }, { transaction });

    for (const line of summary.lines) {
      await OrderItem.create({ ...line, orderId: order.id }, { transaction });
      await Product.decrement('stock', { by: line.quantity, where: { id: line.productId }, transaction });
    }

    return { id: order.id, status: order.status, ...summary };
  });
}

export async function getOrderById(id) {
  const order = await Order.findByPk(id, {
    include: [{
      model: OrderItem,
      as: 'items',
      include: [{ model: Product, as: 'product', attributes: ['name', 'slug'] }],
    }],
  });
  if (!order) throw notFoundError('Orden no encontrada');
  return order;
}
