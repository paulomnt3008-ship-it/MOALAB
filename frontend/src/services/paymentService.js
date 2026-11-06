import { request } from './apiClient';

// Placeholder payment: the backend does not charge anything yet.
export const createPayment = (orderId) => request('/payments', { method: 'POST', body: { orderId } });
