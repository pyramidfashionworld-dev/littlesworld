"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import emailjs from "emailjs-com";

// ✅ Lazy-load 3D viewer (avoids SSR issues)
const ModelViewer = dynamic(() => import("@/components/ModelViewer"), {
  ssr: false,
});

export default function HomePage() {
  const [tab, setTab] = useState("home");
  const [amount, setAmount] = useState(499); // default price
  const [orderDetails, setOrderDetails] = useState(null);

  // ✅ Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // ✅ Create Razorpay order from backend API
  const createOrder = async (amount) => {
    const res = await fetch("/api/razorpay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    return await res.json();
  };

  // ✅ Open Razorpay Payment Window
  const openRazorpayPayment = async (amount) => {
    const order = await createOrder(amount);
    if (!order?.id) {
      alert("Failed to create payment order.");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Little's World",
      description: "Cute baby clothes purchase",
      order_id: order.id,
      handler: function (response) {
        setOrderDetails(response);

        // ✅ Send email notification using EmailJS
        emailjs.send(
          "service_wkvtoih", // your service ID
          "template_e0qnu2e", // your template ID
          {
            to_name: "Customer",
            order_id: response.razorpay_order_id,
            amount: amount,
          },
          "BhhP•••••••••••••••••" // your public key
        );
        alert("Payment Successful! Confirmation sent to your email.");
      },
      prefill: {
        name: "Customer",
        email: "example@email.com",
        contact: "9999999999",
      },
      theme: {
        color: "#ff66a3",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // ✅ Tab Layout
  return (
    <div className="min-h-screen bg-pink-50">
      {/* ---------- Header Navigation ---------- */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-pink-600">Little’s World</h1>
        <nav className="space-x-4">
          {["home", "shop", "product", "about", "checkout"].map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`capitalize ${
                tab === item
                  ? "text-pink-600 border-b-2 border-pink-600"
                  : "text-gray-600 hover:text-pink-500"
              }`}
            >
              {item}
            </button>
          ))}
          {/* Payment tab is intentionally hidden */}
        </nav>
      </header>

      {/* ---------- Page Content ---------- */}
      <main className="p-6">
        {tab === "home" && (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-semibold text-pink-600">
              Welcome to Little’s World
            </h2>
            <p className="text-gray-700">
              Discover cute & colorful outfits for 0-2-year-old babies.
            </p>
            <div className="flex justify-center">
              <ModelViewer />
            </div>
          </div>
        )}

        {tab === "shop" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((p) => (
              <div
                key={p}
                className="bg-white shadow-md p-4 rounded-xl text-center"
              >
                <img
                  src={`/images/product${p}.jpg`}
                  alt={`Product ${p}`}
                  className="w-full h-64 object-cover rounded-xl mb-3"
                />
                <h3 className="font-semibold text-pink-600">Baby Outfit {p}</h3>
                <p className="text-gray-700">Soft cotton comfort wear</p>
                <p className="text-pink-700 font-bold mt-2">₹499</p>
                <button
                  onClick={() => setTab("checkout")}
                  className="mt-3 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "product" && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-pink-600">
              Product Details
            </h2>
            <p className="text-gray-700">
              Our baby clothes are made from soft organic cotton, designed for
              comfort and style.
            </p>
            <div className="flex justify-center">
              <ModelViewer />
            </div>
          </div>
        )}

        {tab === "about" && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-pink-600">About Us</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              At Little’s World, we bring warmth, color, and comfort into your
              baby’s life through soft and stylish clothing — crafted with love
              and care.
            </p>
          </div>
        )}

        {tab === "checkout" && (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-semibold text-pink-600">Checkout</h2>
            <p className="text-gray-700">You’re about to buy the cutest outfit!</p>
            <p className="text-xl font-bold text-pink-700">Total: ₹{amount}</p>
            <button
              onClick={() => openRazorpayPayment(amount)}
              className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="text-center py-4 text-gray-500 mt-10 border-t">
        © 2025 Little’s World. All rights reserved.
      </footer>
    </div>
  );
}
