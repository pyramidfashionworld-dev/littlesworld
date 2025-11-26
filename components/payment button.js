// components/PaymentButton.jsx
'use client';

export default function PaymentButton({ amount, currency = 'INR' }) {
  const handlePayment = async () => {
    try {
      // Load Razorpay script
      await loadRazorpayScript();
      
      // First, create an order on your server
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // in paise
          currency: currency
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Your Company Name',
        description: 'Purchase Description',
        order_id: orderData.id, // Use the order ID from your server
        handler: async function (response) {
          await verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment initialization error:', error);
      alert('Failed to initialize payment. Please try again.');
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Razorpay script'));
      document.body.appendChild(script);
    });
  };

  const verifyPayment = async (paymentId, orderId, signature) => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          paymentId, 
          orderId, 
          signature 
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server returned an invalid response');
      }

      const result = await response.json();
      
      if (result.success) {
        alert('Payment verified successfully!');
        // Redirect to success page or update UI
      } else {
        alert(`Payment verification failed: ${result.error}`);
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      alert('Error verifying payment. Please contact support.');
    }
  };

  return (
    <button 
      onClick={handlePayment}
      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
    >
      Pay ₹{amount}
    </button>
  );
}