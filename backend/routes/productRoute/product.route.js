import express from 'express';
const router = express.Router();
import { deleteProduct, getProductById, getProducts } from '../../controllers/product.controller.js';
import { authMiddleware,adminAuthMiddleware } from '../../lib/utils.js';

// @route    GET /api/products
router.get('/', getProducts);

// @route    GET /api/products/:id
router.get('/:id', getProductById);
// @route    DELETE /api/products/:id
router.delete('/:id',authMiddleware,adminAuthMiddleware, deleteProduct);

export default router;
