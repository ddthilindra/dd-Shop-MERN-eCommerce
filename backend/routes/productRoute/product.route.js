import express from 'express';
const router = express.Router();
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from '../../controllers/product.controller.js';
import { authMiddleware,adminAuthMiddleware } from '../../lib/utils.js';
import upload from '../../lib/multerConfig.js'

// @route    GET /api/products
router.get('/', getProducts);
// @route    GET /api/products/top
router.get('/top', getTopProducts);
// @route    GET /api/products/:id
router.get('/:id', getProductById);
// @route    DELETE /api/products/:id
router.delete('/:id',authMiddleware,adminAuthMiddleware, deleteProduct);
// @route    POST /api/products/
router.post('/',authMiddleware,adminAuthMiddleware, createProduct);
// @route    PUT /api/products/:id
router.put('/:id',authMiddleware,adminAuthMiddleware,upload.single('image'), updateProduct);
// @route    POST /api/products/:id/reviews
router.post('/:id/reviews',authMiddleware,createProductReview);

export default router;
