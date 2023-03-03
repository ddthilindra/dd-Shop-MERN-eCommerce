import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderById, getOrders, getUserOrders, updateOrderToDelivered, updateOrderToPaid } from '../../controllers/order.controller.js';
import { adminAuthMiddleware, authMiddleware } from '../../lib/utils.js';

// @route    POST /api/orders
router.post('/',authMiddleware, addOrderItems);
// @route    GET /api/orders/myorders
router.get('/myorders',authMiddleware, getUserOrders);
// @route    GET /api/orders/:id
router.get('/:id',authMiddleware, getOrderById);
// @route    PUT /api/orders/:id/pay
router.put('/:id/pay',authMiddleware, updateOrderToPaid);
// @route    GET /api/orders
router.get('/',authMiddleware,adminAuthMiddleware, getOrders);
// @route    PUT /api/orders/:id/deliver
router.put('/:id/deliver',authMiddleware,adminAuthMiddleware, updateOrderToDelivered);

export default router;
