// backend/routes/api/cart/calculate-totals.js

import { calculateCartTotals } from '../../../controllers/cartController.js';
import Stripe from 'stripe'; // Import Stripe
import Order from '../../../models/order.js'; // Import Order model to update it with Payment Intent ID

const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Initialize Stripe

const calculateTotalsHandler = async (req, res) => {
  // Assuming userId is available from authMiddleware
  const userId = req.userId; // Adjust based on how your authMiddleware adds user info
  const { cartItems, shippingAddress } = req.body; // Get shippingAddress from body

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated.' });
  }

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
     return res.status(400).json({ error: 'Cart is empty or invalid.' });
  }

  try {
    // 1. Calculate totals and create a pending order in the database
    const order = await calculateCartTotals(userId, cartItems, shippingAddress);

    // 2. Create a Payment Intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.total), // Amount in the smallest currency unit (e.g., paise for INR)
      currency: 'inr', // Use INR as determined earlier
      metadata: { orderId: order._id.toString() }, // Associate order ID with Payment Intent
      // Add other parameters like receipt_email if available from user
    });

    // 3. Update the order with the Stripe Payment Intent ID
    order.stripePaymentIntentId = paymentIntent.id;
    await order.save(); // Save the updated order with the Payment Intent ID

    // 4. Send the client secret and order details to the frontend
    res.status(200).json({
      orderId: order._id,
      subtotal: order.subtotal,
      shippingCost: order.shippingCost,
      total: order.total,
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error('Error in calculate-totals route handler:', error);
    res.status(500).json({ error: error.message || 'Failed to process order and payment intent.' });
  }
};

export default calculateTotalsHandler;