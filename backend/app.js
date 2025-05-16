import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream } from 'fs';
import morgan from 'morgan';
import compression from 'compression';
import connectToDB from './db/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import productRoutes from './routes/api/products/index.js';
import userRoutes from './routes/api/user/index.js';
import cartRoutes from './routes/api/cart/index.js';
import userProfileRoutes from './routes/api/userProfile/index.js';
import paymentRoutes from './routes/api/payments/index.js';
import stripeWebhookRoutes from './routes/api/webhooks/stripe.js'; // Import webhook routes
import orderRoutes from './routes/api/orders/index.js'; // Import order routes

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
const logFile = join(__dirname, 'server.log');

app.use(compression());

app.use(cors());

app.use(express.static(join(__dirname, '../frontend/dist'))); // Serve the built static files of the React app
app.use('/assets', express.static(join(__dirname, '../frontend/assets')));

// Stripe webhook requires the raw body, so we add a middleware to make it available
// This middleware should be applied ONLY to the webhook route and BEFORE express.json()
app.use('/api/webhooks/stripe', express.raw({type: 'application/json'}), stripeWebhookRoutes); // Mount webhook route

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Apply express.json() AFTER the webhook route
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/user', userRoutes);
app.use('/api/user-profile', userProfileRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/orders', orderRoutes); // Mount order routes

//keep alive mechanism
app.get('/health', (req, res) => {
  try {
      res.status(200).send('OK');
  } catch (error) {
      res.status(500).send('Service Unavailable');
  }
});


// Handle all other routes and return the React app
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../frontend/dist', 'index.html'));
});

//Implementing FIle Logger
app.use(morgan(':method - :url - :date - :response-time ms'));
app.use(
  morgan(':method - :url - :date - :response-time ms', {
    stream: createWriteStream(logFile, { flags: 'a' }),
  })
);


Promise.resolve(connectToDB()).then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
});

