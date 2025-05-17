// backend/routes/api/orders/get-order.js

import { getOrderById } from '../../../controllers/orderController.js';

const getOrderHandler = async (req, res) => {
  const { orderId } = req.params; // Get orderId from URL parameters
  const userId = req.userId; // Assuming user is available from authMiddleware

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated.' });
  }

  try {
    const order = await getOrderById(orderId, userId);
    res.status(200).json(order);
  } catch (error) {
    console.error('Error in get-order route handler:', error);
    // Return 404 if order not found or unauthorized, 500 for other errors
    const statusCode = error.message.includes('not found') || error.message.includes('belong to the user') ? 404 : 500;
    res.status(statusCode).json({ error: error.message || 'Failed to fetch order.' });
  }
};

export default getOrderHandler;