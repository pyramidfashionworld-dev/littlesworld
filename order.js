import Script from "next/script";

export default function Checkout() {
  const handlePayment = async () => {
    const amount = 500; // Example: ₹500

    // 1️⃣ Create order from your API
    const orderResponse = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const order = await orderResponse.json();

    // 2️⃣ Load Razorpay payment form
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Littles World",
      description: "Payment for baby clothing",
      order_id: order.id,
      handler: function (response) {
        alert("Payment Successful! ID: " + response.razorpay_payment_id);
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button
        onClick={handlePayment}
        className="bg-pink-500 text-white px-6 py-3 rounded-xl"
      >
        Pay ₹500
      </button>
    </>
  );
}
