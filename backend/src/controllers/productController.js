import * as productService from '../services/productService.js';

export async function list(req, res) {
  res.json({ data: await productService.listProducts() });
}

export async function featured(req, res) {
  res.json({ data: await productService.getFeaturedProduct() });
}

export async function getBySlug(req, res) {
  res.json({ data: await productService.getProductBySlug(req.params.slug) });
}
