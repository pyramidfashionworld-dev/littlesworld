import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { useRouter } from "next/router";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // ✅ Load Razorpay script on page load
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const totalAmount = cart?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  // ✅ EmailJS Send Function
  const sendEmail = async (orderId, amount, items) => {
    try {
      await emailjs.send(
        "service_xxxxxx", // 🔑 Replace with your EmailJS service ID
        "template_xxxxxx", // 🔑 Replace with your EmailJS template ID
        {
          to_name: "Customer",
          order_id: orderId,
          amount: amount,
          items: items.map((item) => `${item.name} (x${item.quantity})`).join(", "),
        },
        "public_key_xxxxxx" // 🔑 Replace with your EmailJS public key
      );

      console.log("✅ Order email sent successfully!");
    } catch (error) {
      console.error("❌ Failed to send email:", error);
    }
  };

  // ✅ Razorpay Checkout
  const handlePayment = () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);

    const options = {
      key: "rzp_test_xxxxxxxxxxxxxx", // 🔑 Replace with your Razorpay key
      amount: totalAmount * 100, // amount in paise
      currency: "INR",
      name: "Little World",
      description: "Secure Payment - Little World",
      image: "/favicon.ico",
      handler: function (response) {
        const orderId = response.razorpay_payment_id;
        sendEmail(orderId, totalAmount, cart);
        alert("✅ Payment successful! Confirmation email sent.");
        clearCart();
        router.push("/");
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#EC4899",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Checkout</h1>

      {(!cart || cart.length === 0) ? (
        <p className="text-gray-700">Your cart is empty.</p>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
          <ul className="divide-y divide-gray-200 mb-4">
            {cart.map((item, index) => (
              <li key={index} className="py-2 flex justify-between">
                <span>{item.name} (x{item.quantity})</span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between font-semibold text-lg border-t pt-3">
            <span>Total:</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="mt-6 w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-medium shadow-md transition duration-200"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      )}

      {/* ✅ Footer */}
      <footer className="mt-10 text-gray-600 text-sm text-center">
        <p>© {new Date().getFullYear()} Little World. All rights reserved.</p>
        <p className="mt-1">
          Follow us on{" "}
          <a
            href="https://www.instagram.com/dlittleworld_26"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 font-medium hover:underline"
          >
            @dlittleworld_26
          </a>
        </p>
      </footer>
    </div>
  );
}
