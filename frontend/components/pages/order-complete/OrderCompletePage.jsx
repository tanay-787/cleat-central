import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// Removed local loadStripe import
import NavBar from '../shared-components/NavBar';
import Footer from '../shared-components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { stripePromise } from '../../utils/stripe'; // Import stripePromise from utility file

// Removed local loadStripe call

export default function OrderCompletePage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null); // State to store fetched order details

  const orderId = searchParams.get('order_id'); // Get order_id from URL

  useEffect(() => {
    const fetchPaymentIntentAndOrder = async () => {
      const clientSecret = searchParams.get('payment_intent_client_secret');

      if (!clientSecret) {
        setStatus('error');
        setMessage('Payment verification failed: Missing information.');
        setLoading(false);
        return;
      }

      try {
        const stripe = await stripePromise; // Use the imported stripePromise
        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

        let paymentStatus = 'error'; // Default status
        switch (paymentIntent.status) {
          case 'succeeded':
            paymentStatus = 'success';
            setMessage('Payment Succeeded! Your order is confirmed.');
            break;
          case 'processing':
            paymentStatus = 'processing';
            setMessage("Payment Processing. We'll update you on the status.");
            break;
          case 'requires_payment_method':
            paymentStatus = 'failed';
            setMessage('Payment failed. Please try again.');
            break;
          default:
            paymentStatus = 'error';
            setMessage('Something went wrong with the payment.');
            break;
        }
        setStatus(paymentStatus);

        // If payment is successful or processing, fetch order details
        if ((paymentStatus === 'success' || paymentStatus === 'processing') && orderId) {
            try {
                const orderResponse = await fetch(`/api/orders/${orderId}`, {
                    headers: {
                        // Include authorization header if needed to fetch order details
                         'Authorization': `Bearer ${localStorage.getItem('token')}` // Example: assuming token stored in localStorage
                    }
                });

                if (!orderResponse.ok) {
                     const errorData = await orderResponse.json();
                     console.error('Error fetching order details:', errorData);
                    // If order not found or unauthorized, might set status to error or failed appropriately
                     setMessage(prev => `${prev} Could not retrieve order details.`);
                } else {
                    const orderData = await orderResponse.json();
                    setOrderDetails(orderData);
                }
            } catch (orderFetchError) {
                 console.error('Network error fetching order details:', orderFetchError);
                 setMessage(prev => `${prev} Network error retrieving order details.`);
            }
        }

      } catch (error) {
        console.error('Error retrieving payment intent:', error);
        setStatus('error');
        setMessage(`Error verifying payment: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentIntentAndOrder();
  }, [searchParams, orderId]); // Re-run effect if URL search params or orderId change

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-16 w-16 text-green-500" />;
      case 'processing':
        return <Clock className="h-16 w-16 text-blue-500" />;
      case 'failed':
      case 'error':
        return <XCircle className="h-16 w-16 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
        <Card className="w-full max-w-md bg-background/50 backdrop-blur-[1px] text-center">
          <CardHeader>
            <CardTitle>{loading ? 'Verifying Payment...' : (status === 'success' ? 'Order Confirmed!' : 'Payment Status')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-4">
              {loading ? <Loader2 className="h-16 w-16 animate-spin" /> : getStatusIcon()}
            </div>
            <p className={`text-lg ${status === 'success' ? 'text-green-600' : status === 'failed' || status === 'error' ? 'text-red-600' : 'text-blue-600'}`}>
              {message}
            </p>

            {/* Display order details if fetched and payment is successful/processing */}
            {(status === 'success' || status === 'processing') && orderDetails && (
                <div className="mt-6 text-left">
                    <h3 className="text-xl font-semibold mb-2">Order Details</h3>
                    <Separator className="my-2"/>
                    {orderDetails.items.map(item => (
                        <div key={item._id} className="flex justify-between items-center mb-1 text-sm">
                            <span>{item.name} ({item.size}) x {item.quantity}</span>
                            <span>₹ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                     <Separator className="my-2"/>
                     <div className="flex justify-between items-center font-bold">
                        <span>Total Paid</span>
                         {/* Display total from fetched order details */}
                        <span>₹ {orderDetails.total.toFixed(2)}</span>
                    </div>
                     {/* You can add shipping address details here as well */}
                     {/* {orderDetails.shippingAddress && (...) } */}
                </div>
            )}
          </CardContent>
          {/* You might want a button to go back to the home page or order history */}
           {!loading && (
             <Button onClick={() => window.location.href = '/'} className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                Continue Shopping
            </Button>
           )}
        </Card>
      </div>
    </Layout>
  );
}

// Simple Layout component (you can reuse the one from Cart/Checkout or create a dedicated one)
const Layout = ({ children }) => (
  <div className="min-h-screen min-w-screen flex flex-col bg-gradient-to-b from-background to-secondary">
    <header className=" w-full bg-background/85 backdrop-blur-sm sticky top-0 z-50">
      <NavBar />
    </header>
    <main className="w-full">{children}</main>
    <Footer />
  </div>
);