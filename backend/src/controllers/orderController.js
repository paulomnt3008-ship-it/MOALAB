import * as orderService from '../services/orderService.js';

export async function create(req, res) {
  res.status(201).json({ data: await orderService.createOrder(req.body) });
}

export async function getById(req, res) {
  res.json({ data: await orderService.getOrderById(req.params.id) });
}
