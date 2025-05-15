// backend/routes/api/orders/index.js

import { Router } from 'express';
import getOrderHandler from './get-order.js';
import authMiddleware from '../../../utils/authMiddleware.js'; // Assuming authMiddleware is needed for order routes
import catchAll from '../catch-all.js';

const router = Router();

// Route to get a specific order by ID
router.get('/:orderId', authMiddleware, getOrderHandler);

// You can add other order-related routes here (e.g., POST for creating orders - although we are creating in calculate-totals for now, GET for user's order history)

// Fallback route for /api/orders
router.use(catchAll);

export default router;