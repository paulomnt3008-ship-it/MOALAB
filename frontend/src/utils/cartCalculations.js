export const MAX_QUANTITY = 10;

export const countItems = (items) => items.reduce((sum, item) => sum + item.quantity, 0);

export const calculateSubtotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const clampQuantity = (quantity) => Math.min(MAX_QUANTITY, Math.max(1, Math.trunc(quantity)));

// The backend only needs ids and quantities; it uses its own prices.
export const toApiItems = (items) =>
  items.map(({ productId, quantity }) => ({ productId, quantity }));
