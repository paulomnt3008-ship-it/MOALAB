import { getFeaturedProduct, getProductBySlug, getProducts } from '../services/productService';
import { useAsync } from './useAsync';

export const useProducts = () => useAsync(getProducts, []);

export const useFeaturedProduct = () => useAsync(getFeaturedProduct, []);

export const useProduct = (slug) => useAsync(() => getProductBySlug(slug), [slug]);
