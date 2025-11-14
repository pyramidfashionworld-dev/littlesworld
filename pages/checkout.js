import { useEffect } from "react";

export default function CheckoutPage() {
  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent SSR issues

    const items = JSON.parse(localStorage.getItem("cart") || "[]");

    if (items.length === 0) {
      alert("Your cart is empty!");
      window.location.href = "/shop";
      return;
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Call backend to create Razorpay order
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount }),
    })
      .then((res) => res.json())
      .then((order) => {
        if (!order.id) {
          console.error("Order creation failed:", order);
          alert("Something went wrong! Please try again.");
          return;
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay Public Key
          amount: order.amount,
          currency: "INR",
          name: "Little World",
          description: "Baby Wear Order Payment",
          order_id: order.id,
          handler: function (response) {
            localStorage.removeItem("cart");
            window.location.href = "/success";
          },
          prefill: {
            name: "Customer",
            email: "customer@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#F37254",
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      })
      .catch((err) => console.error("Checkout error:", err));
  }, []);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Redirecting to payment...</h1>
      <p>Please wait...</p>
    </div>
  );
}
