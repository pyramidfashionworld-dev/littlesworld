import { useState } from 'react';

const Payment = () => {
  const [loading, setLoading] = useState(false);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createOrder = async (amount) => {
    // Call your backend to create order
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
    return await response.json();
  };

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      // Load Razorpay script
      const res = await loadRazorpay();
      if (!res) {
        alert('Razorpay SDK failed to load');
        return;
      }

      // Create order on your server
      const orderData = await createOrder(50000); // ₹500 in paise

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: orderData.id,
        handler: async function (response) {
          // Verify payment on your server
          const verificationResponse = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(response),
          });
          
          const verificationData = await verificationResponse.json();
          
          if (verificationData.success) {
            alert('Payment Successful!');
            console.log('Payment ID:', response.razorpay_payment_id);
            console.log('Order ID:', response.razorpay_order_id);
            console.log('Signature:', response.razorpay_signature);
          } else {
            alert('Payment Verification Failed');
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999"
        },
        notes: {
          address: "Customer Address"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={handlePayment} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#3399cc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Processing...' : 'Pay ₹500'}
      </button>
    </div>
  );
};

export default Payment;