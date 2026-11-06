import { Router } from 'express';
import * as orderController from '../controllers/orderController.js';
import { orderValidator, validate } from '../middlewares/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post('/', validate(orderValidator), asyncHandler(orderController.create));
router.get('/:id', asyncHandler(orderController.getById));

export default router;
