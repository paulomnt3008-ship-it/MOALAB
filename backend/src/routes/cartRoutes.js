import { Router } from 'express';
import * as cartController from '../controllers/cartController.js';
import { cartItemsValidator, validate } from '../middlewares/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post('/summary', validate(cartItemsValidator), asyncHandler(cartController.summary));

export default router;
