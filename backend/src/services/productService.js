import { Product } from '../models/index.js';
import { notFoundError } from '../utils/httpError.js';

const toPublic = (product) => {
  const data = product.toJSON();
  return {
    ...data,
    price: Number(data.price),
    compareAtPrice: data.compareAtPrice === null ? null : Number(data.compareAtPrice),
  };
};

export async function listProducts() {
  const products = await Product.findAll({ order: [['isFeatured', 'DESC'], ['id', 'ASC']] });
  return products.map(toPublic);
}

export async function getProductBySlug(slug) {
  const product = await Product.findOne({ where: { slug } });
  if (!product) throw notFoundError('Producto no encontrado');
  return toPublic(product);
}

export async function getFeaturedProduct() {
  const product = await Product.findOne({ where: { isFeatured: true } });
  if (!product) throw notFoundError('No hay un producto destacado');
  return toPublic(product);
}
