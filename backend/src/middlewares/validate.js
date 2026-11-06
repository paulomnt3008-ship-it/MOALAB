import { badRequest } from '../utils/httpError.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Runs a validator that returns a list of error messages.
export const validate = (validator) => (req, res, next) => {
  const errors = validator(req);
  if (errors.length) return next(badRequest('Datos inválidos', errors));
  next();
};

export function cartItemsValidator(req) {
  const { items } = req.body ?? {};
  if (!Array.isArray(items) || items.length === 0) {
    return ['items debe ser una lista con al menos un producto'];
  }
  const errors = [];
  items.forEach((item, index) => {
    if (!Number.isInteger(item?.productId) || item.productId < 1) {
      errors.push(`items[${index}].productId no es válido`);
    }
    if (!Number.isInteger(item?.quantity) || item.quantity < 1) {
      errors.push(`items[${index}].quantity debe ser 1 o más`);
    }
  });
  return errors;
}

export function orderValidator(req) {
  const errors = cartItemsValidator(req);
  const customer = req.body?.customer ?? {};
  if (!customer.name?.trim()) errors.push('customer.name es obligatorio');
  if (!EMAIL_PATTERN.test(customer.email ?? '')) errors.push('customer.email no es válido');
  if (!customer.address?.trim()) errors.push('customer.address es obligatorio');
  return errors;
}

export function paymentValidator(req) {
  const { orderId } = req.body ?? {};
  return Number.isInteger(orderId) && orderId > 0 ? [] : ['orderId no es válido'];
}
