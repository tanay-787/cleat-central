// frontend/utils/stripe.js

import { loadStripe } from '@stripe/stripe-js';

// Load Stripe outside of the component to avoid recreating it on re-renders
// Using import.meta.env for Vite compatibility
const apiKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(apiKey);
console.log('PK: ', apiKey);

export { stripePromise };
