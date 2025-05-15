import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import NavBar from '../shared-components/NavBar';
import Footer from '../shared-components/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, ShoppingBag } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

// Load Stripe outside of the component to avoid recreating it on re-renders
// Replace with your actual publishable key from environment variables in production
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const { cart } = useCart();
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderAmount, setOrderAmount] = useState(0); // State to store the calculated total amount
  const [orderId, setOrderId] = useState(null); // State to store the created order ID
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const createOrderAndPaymentIntent = async () => {
      if (!cart || cart.length === 0) {
        setLoading(false);
        return;
      }

      try {
        // Make a single call to the backend to create order and payment intent
        const response = await fetch('/api/cart/calculate-totals', { // Use the updated endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Include authorization header if needed
          },
          // Send cart items and potentially shipping address (add shippingAddress field when implemented)
          body: JSON.stringify({ cartItems: cart }),
        });

        if (!response.ok) {
           const errorData = await response.json();
          throw new Error(`Error creating order and payment intent: ${errorData.error || response.status}`);
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
        setOrderAmount(data.total); // Assuming total is returned in the response
        setOrderId(data.orderId); // Store the created order ID

      } catch (error) {
        console.error('Checkout Error:', error);
         toast({
            title: "Checkout Error",
            description: error.message,
            variant: "destructive",
          });
      } finally {
        setLoading(false);
      }
    };

    createOrderAndPaymentIntent();
  }, [cart, toast]); // Re-run when cart or toast changes

  const appearance = { theme: 'stripe' };
  const options = {
    clientSecret,
    appearance,
    // You can add more options here, e.g., 'layout': 'accordion'
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="h-16 w-16 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!clientSecret || !cart || cart.length === 0) {
     if (!loading && (!cart || cart.length === 0)){
         return (
            <Layout>
                <Card className="w-full max-w-md bg-background/50 backdrop-blur-[1px] mx-auto">
                <CardHeader>
                    <CardTitle className="text-center">Your Cart is Empty</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center">
                    <ShoppingBag className="h-24 w-24 text-muted-foreground" />
                    </div>
                    <p className="text-center mt-4 text-muted-foreground">Looks like you haven't added any items to your cart yet. Cannot proceed to checkout.</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button onClick={() => navigate('/products-page')} className="bg-primary hover:bg-primary/90 text-primary-foreground">Start Shopping</Button>
                </CardFooter>
                </Card>
            </Layout>
         )
     }
    return (
       <Layout>
         <div className="flex-grow flex items-center justify-center text-red-500">
            Error loading checkout.
         </div>
       </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
             {/* Order Summary - You can reuse or adapt the cart display logic here */}
             <Card className="bg-background/50 backdrop-blur-[1px]">
                <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                <CardContent>
                    {cart.map(item => (
                        <div key={`${item.productId}-${item.size}`} className="flex justify-between items-center mb-2">
                            <span>{item.name} ({item.size}) x {item.quantity}</span>
                            <span>₹ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <Separator className="my-4"/>
                     <div className="flex justify-between font-bold">
                        <span>Order Total</span>
                        <span>₹ {orderAmount.toFixed(2)}</span>
                    </div>
                </CardContent>
             </Card>
            {/* Stripe Payment Form */}
            <Card className="bg-background/50 backdrop-blur-[1px]">
                 <CardHeader><CardTitle>Payment Information</CardTitle></CardHeader>
                 <CardContent>
                    <Elements options={options} stripe={stripePromise}>
                        {/* Pass orderId to CheckoutForm if needed, e.g., for redirect URL */}
                        <CheckoutForm orderId={orderId} />
                    </Elements>
                 </CardContent>
            </Card>
          </div>
           {/* You could add shipping address or other info here - will need to collect this from user */}
           <div className="lg:col-span-1">
             {/* Shipping Address / Other Info Card */}
           </div>
        </div>
      </div>
    </Layout>
  );
}

// Separate component for the Stripe Payment Form to use useStripe and useElements hooks
function CheckoutForm({ orderId }) { // Receive orderId as prop
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                // You might want to pass the orderId in the return_url
                return_url: `${window.location.origin}/order-complete?order_id=${orderId}`,
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <Button disabled={isLoading || !stripe || !elements} id="submit" className="mt-6 w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </Button>
             {/* Show any error or success messages */}
            {message && <div id="payment-message" className="text-red-500 mt-4">{message}</div>}
        </form>
    );
}

const Layout = ({ children }) => (
  <div className="min-h-screen min-w-screen flex flex-col bg-gradient-to-b from-background to-secondary">
    <header className=" w-full bg-background/85 backdrop-blur-sm sticky top-0 z-50">
      <NavBar />
    </header>
    <main className="w-full">{children}</main>
    <Footer />
  </div>
);