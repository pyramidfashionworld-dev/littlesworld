import { useState } from "react";

export default function Checkout() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 999 }), // example amount ₹999
    });

    const data = await res.json();

    if (!data.success) {
      alert("Failed to create order!");
      setLoading(false);
      return;
    }

    const options = {
      key: data.key_id,
      amount: data.amount,
      currency: data.currency,
      name: "Little’s World",
      description: "Baby Clothing Purchase",
      order_id: data.order_id,
      handler: function (response) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
      },
      theme: { color: "#ff99cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
      >
        {loading ? "Processing..." : "Pay ₹999"}
      </button>
    </div>
  );
}
