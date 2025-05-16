// backend/controllers/webhookController.js

import Stripe from 'stripe';
import Order from '../models/order.js'; // Import the Order model
import { clearCart } from './cartController.js'; // Import clearCart function

const stripe = Stripe(`${process.env.STRIPE_SECRET_KEY}`);
const endpointSecret = `${process.env.STRIPE_WEBHOOK_SECRET}`;

export const handleStripeWebhook = async (request) => {
  const sig = request.headers['stripe-signature'];
  const rawBody = request.rawBody; // Assuming raw body is available on the request object

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    // Return an error response from the route handler
    throw new Error('Webhook signature verification failed.');
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Update order status in the database
      try {
        // Find the order associated with this payment intent
        const order = await Order.findOneAndUpdate(
          { stripePaymentIntentId: paymentIntent.id },
          { paymentStatus: 'succeeded' },
          { new: true }
        );

        if (!order) {
          console.error(`Order not found for payment intent ID: ${paymentIntent.id}`);
        } else {
          console.log(`Order ${order._id} payment status updated to succeeded.`);
          // Clear the user's cart after successful payment
          try {
            await clearCart(order.userId); // Call clearCart with the user ID from the order
            console.log(`Cart cleared for user ${order.userId}`);
          } catch (cartError) {
            console.error(`Error clearing cart for user ${order.userId}:`, cartError);
            // Log the error, but don't necessarily fail the webhook process
          }
        }
      } catch (dbError) {
        console.error(`Error updating order in DB for succeeded payment intent ${paymentIntent.id}:`, dbError);
        // Depending on your error handling strategy, you might want to log this
        // and potentially use a retry mechanism.
      }
      break;
    case 'payment_intent.payment_failed':
      const failedPaymentIntent = event.data.object;
      console.log(`PaymentIntent for ${failedPaymentIntent.amount} failed.`);
       // Update order status in the database
       try {
        // Find the order associated with this failed payment intent
        const order = await Order.findOneAndUpdate(
          { stripePaymentIntentId: failedPaymentIntent.id },
          { paymentStatus: 'failed' },
          { new: true }
        );

        if (!order) {
            console.error(`Order not found for failed payment intent ID: ${failedPaymentIntent.id}`);
          } else {
            console.log(`Order ${order._id} payment status updated to failed.`);
          }
      } catch (dbError) {
        console.error(`Error updating order in DB for failed payment intent ${failedPaymentIntent.id}:`, dbError);
      }
      break;
    // ... handle other event types like refund, etc.
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  // This will be done in the route handler
  return { received: true };
};
