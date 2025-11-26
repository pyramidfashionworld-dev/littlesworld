import { useState } from 'react';

const Payment = ({ amount = 50000, productName = "Sample Product" }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true); // Already loaded
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    
    try {
      // 1. Load Razorpay script
      const scriptLoaded = await loadRazorpay();
      if (!scriptLoaded) {
        throw new Error('Failed to load payment gateway');
      }

      // 2. Create order on server
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          amount: amount,
          currency: 'INR'
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      // 3. Configure payment options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Your Company Name",
        description: `Purchase: ${productName}`,
        order_id: orderData.id,
        handler: async function (response) {
          // 4. Verify payment on server
          const verificationResponse = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(response),
          });

          const verificationData = await verificationResponse.json();
          
          if (verificationData.success) {
            alert('Payment Successful! Thank you for your purchase.');
            // Redirect to success page or update UI
            window.location.href = `/order-success?payment_id=${response.razorpay_payment_id}`;
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: "", // You can prefill or leave empty
          email: "",
          contact: ""
        },
        theme: {
          color: "#3399cc"
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            console.log('Checkout closed by user');
          }
        }
      };

      // 5. Open payment modal
      const rzp = new window.Razorpay(options);
      rzp.open();
      
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });

    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Complete Your Purchase</h3>
      <p>Amount: ₹{amount / 100}</p>
      
      {error && (
        <div style={{ 
          color: 'red', 
          marginBottom: '10px',
          padding: '10px',
          border: '1px solid red',
          borderRadius: '5px'
        }}>
          {error}
        </div>
      )}
      
      <button 
        onClick={handlePayment} 
        disabled={loading}
        style={{
          padding: '12px 24px',
          backgroundColor: loading ? '#cccccc' : '#3399cc',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          minWidth: '120px'
        }}
      >
        {loading ? (
          <>
            <span>Processing...</span>
          </>
        ) : (
          `Pay ₹${amount / 100}`
        )}
      </button>
      
      <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
        Secure payment powered by Razorpay
      </p>
    </div>
  );
};

export default Payment;