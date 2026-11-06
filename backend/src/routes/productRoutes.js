import { Router } from 'express';
import * as productController from '../controllers/productController.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/', asyncHandler(productController.list));
router.get('/featured', asyncHandler(productController.featured));
router.get('/:slug', asyncHandler(productController.getBySlug));

export default router;
