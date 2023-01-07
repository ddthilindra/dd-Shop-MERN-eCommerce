import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderById } from '../../controllers/order.controller.js';
import { authMiddleware } from '../../lib/utils.js';

// @route    POST /api/orders
router.post('/',authMiddleware, addOrderItems);
// @route    GET /api/orders/:id
router.get('/:id',authMiddleware, getOrderById);

export default router;
