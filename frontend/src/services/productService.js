import { request } from './apiClient';

export const getProducts = () => request('/products');

export const getFeaturedProduct = () => request('/products/featured');

export const getProductBySlug = (slug) => request(`/products/${encodeURIComponent(slug)}`);
