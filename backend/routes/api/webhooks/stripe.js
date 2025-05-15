// backend/routes/api/webhooks/stripe.js

import express from 'express';
import { handleStripeWebhook } from '../../../controllers/webhookController.js';

const router = express.Router();

// Stripe webhook endpoint
// It's crucial that this route is NOT processed by express.json() middleware
router.post('/', async (req, res) => {
  try {
    // The raw body is needed for Stripe signature verification
    // Assuming raw body is attached to the request object by a middleware
    await handleStripeWebhook(req);
    res.status(200).send({ received: true });
  } catch (error) {
    console.error('Error in Stripe webhook handler:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

export default router;