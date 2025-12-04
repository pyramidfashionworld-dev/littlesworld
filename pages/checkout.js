import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import Script from 'next/script';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    loadCart();
  }, []);

  const loadCart = () => {
    try {
      const savedCart = localStorage?.getItem('littlesworld_cart');
      if (savedCart) {
        const items = JSON.parse(savedCart);
        setCartItems(items);
        calculateTotal(items);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    setTotal(sum);
  };

  const updateQuantity = (id, change) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    );
    setCartItems(updated);
    localStorage.setItem('littlesworld_cart', JSON.stringify(updated));
    calculateTotal(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('littlesworld_cart', JSON.stringify(updated));
    calculateTotal(updated);
  };

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setLoading(true);

    try {
      const taxAmount = Math.round(total * 0.05);
      const shippingAmount = 50;
      const finalAmount = total + shippingAmount + taxAmount;

      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalAmount,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          notes: {
            items: cartItems.length,
            customer: 'LittlesWorld Customer',
          },
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        alert('Failed to create order');
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'LittlesWorld',
        description: 'Baby Clothing Payment',
        order_id: orderData.orderId,
        handler: async (response) => {
          try {
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              localStorage.setItem('littlesworld_cart', JSON.stringify([]));
              router.push('/order-success');
            } else {
              alert('Payment verification failed');
            }
          } catch (error) {
            console.error('Verification error:', error);
            alert('Payment verification error');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: 'Customer',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#EC4899',
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment processing failed');
      setLoading(false);
    }
  };

  if (!isClient) {
    return (
      <>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  const taxAmount = Math.round(total * 0.05);
  const shippingAmount = cartItems.length > 0 ? 50 : 0;
  const finalTotal = total + shippingAmount + taxAmount;

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <button
              onClick={() => router.push('/shop')}
              className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="bg-white p-6 rounded-lg shadow flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-4xl">{item.image}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price} each</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 border rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 hover:bg-gray-200"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity || 1}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 hover:bg-gray-200"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <p className="w-24 text-right font-bold">₹{item.price * (item.quantity || 1)}</p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg h-fit sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6 border-b pb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-semibold">₹{shippingAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%):</span>
                  <span className="font-semibold">₹{taxAmount}</span>
                </div>
              </div>
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total:</span>
                <span className="text-pink-600">₹{finalTotal}</span>
              </div>
              <button
                onClick={handlePayment}
                disabled={loading || cartItems.length === 0}
                className="w-full bg-pink-600 text-white py-3 rounded-lg font-bold hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? 'Processing...' : '💳 Pay Now with Razorpay'}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}