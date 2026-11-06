import { Order } from '../models/index.js';
import { notFoundError } from '../utils/httpError.js';

// Placeholder until a payment provider is chosen. It does not charge anything.
export async function createPayment({ orderId }) {
  const order = await Order.findByPk(orderId);
  if (!order) throw notFoundError('Orden no encontrada');
  return {
    orderId: order.id,
    status: 'pending',
    amount: Number(order.total),
    currency: order.currency,
    message: 'Pagos aún no conectados a un proveedor.',
  };
}
