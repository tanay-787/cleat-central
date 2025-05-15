import express from 'express';
const router = express.Router();

import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Payment routes
router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // amount in cents
      currency: 'usd',
    });
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: error.message });
  }
});

// Other payment routes will be added here later

export default router;