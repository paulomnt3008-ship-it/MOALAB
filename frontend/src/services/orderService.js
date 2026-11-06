import { request } from './apiClient';

export const createOrder = ({ customer, items }) =>
  request('/orders', { method: 'POST', body: { customer, items } });

export const getOrder = (orderId) => request(`/orders/${encodeURIComponent(orderId)}`);
