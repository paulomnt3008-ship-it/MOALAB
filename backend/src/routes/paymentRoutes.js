import { Router } from 'express';
import * as paymentController from '../controllers/paymentController.js';
import { paymentValidator, validate } from '../middlewares/validate.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post('/', validate(paymentValidator), asyncHandler(paymentController.create));

export default router;
