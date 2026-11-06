import * as paymentService from '../services/paymentService.js';

export async function create(req, res) {
  res.status(201).json({ data: await paymentService.createPayment(req.body) });
}
