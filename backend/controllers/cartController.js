// backend/controllers/cartController.js
import Cart from "../models/cart.js";
import Product from "../models/product.js";
import Order from "../models/order.js"; // Import the Order model
import mongoose from 'mongoose';

//Get Cart
export const getCart = async (userId) => {
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }
    return Promise.resolve(cart);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addItemToCart = async (userId, item) => {
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const product = await Product.findById(item.productId);
    if (!product) {
      return Promise.reject("Product not found");
    }

    const existingItemIndex = cart.items.findIndex(
      cartItem => cartItem.productId.equals(item.productId) && cartItem.size === item.size
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += item.quantity;
    } else {
     
      cart.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0].src,
        size: item.size,
        quantity: item.quantity
      });
    }

    await cart.save();
    return Promise.resolve(cart);
  } catch (error) {
    return Promise.reject(error);
  }
};


export const updateQuantity = async (userId, productId, size, quantity) => {
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return Promise.reject("Cart not found");
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.equals(productId) && item.size === size
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      return Promise.resolve(cart);
    } else {
      return Promise.reject("Item not found in cart");
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeItemFromCart = async (userId, productId, size) => {
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return Promise.reject("Cart not found");
    }

    cart.items = cart.items.filter(
      item => !(item.productId.equals(productId) && item.size === size)
    );

    await cart.save();
    return Promise.resolve(cart);
  } catch (error) {
    return Promise.reject("Error removing item from cart");
  }
};

export const clearCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return Promise.reject('Cart not found');
    }

    cart.items = [];
    await Cart.findOneAndUpdate({ userId }, cart);

    return Promise.resolve(cart);
  } catch (error) {
    return Promise.reject(error);
  }
};

// Function to calculate cart totals and create a pending order
export const calculateCartTotals = async (userId, cartItems, shippingAddress = {}) => {
  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    throw new Error('Cart is empty or invalid.');
  }

  try {
    // Calculate subtotal (assuming cartItems have price and quantity)
    // TODO: In a production app, fetch product prices from DB to prevent manipulation
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Calculate shipping cost based on current logic
    const shippingCost = subtotal > 14000 ? 0 : 500;

    const total = subtotal + shippingCost;

    // Create a new order in the database
    const order = new Order({
      userId: userId,
      items: cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price, // Using price from cartItems for now
        image: item.image,
        size: item.size,
        quantity: item.quantity,
      })),
      subtotal: subtotal,
      shippingCost: shippingCost,
      total: total,
      shippingAddress: shippingAddress,
      paymentStatus: 'pending',
    });

    await order.save();

    return order; // Return the created order object

  } catch (error) {
    console.error('Error calculating cart totals or creating order:', error);
    throw new Error('Failed to process order.');
  }
};