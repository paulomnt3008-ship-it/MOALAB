import { request } from './apiClient';

// items: [{ productId, quantity }]. The server answers with subtotal, shipping and total.
export const getCartSummary = (items) => request('/cart/summary', { method: 'POST', body: { items } });
