// backend/controllers/orderController.js

import Order from '../models/order.js';
import mongoose from 'mongoose';

// Get order by ID and verify user ownership
export const getOrderById = async (orderId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new Error('Invalid Order ID format.');
  }

  try {
    const order = await Order.findOne({
      _id: orderId,
      userId: userId // Ensure the order belongs to the authenticated user
    }).populate('items.productId'); // Populate product details if needed

    if (!order) {
      throw new Error('Order not found or does not belong to the user.');
    }

    return order;

  } catch (error) {
    console.error('Error fetching order by ID:', error);
    throw new Error(`Failed to fetch order: ${error.message}`);
  }
};

// You can add other order-related controller functions here (e.g., getAllOrders)