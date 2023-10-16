import express from 'express';
const router = express.Router();
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// Route for creating a new order and retrieving all orders (admin-only)
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

// Route for retrieving orders for the currently authenticated user
router.route('/mine').get(protect, getMyOrders);

// Route for retrieving an order by its ID
router.route('/:id').get(protect,getOrderById);

// Route for updating the payment status of an order
router.route('/:id/pay').put(protect, updateOrderToPaid);

// Route for updating the delivery status of an order (admin-only)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
