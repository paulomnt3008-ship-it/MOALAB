import * as cartService from '../services/cartService.js';

export async function summary(req, res) {
  res.json({ data: await cartService.calculateCartSummary(req.body.items) });
}
