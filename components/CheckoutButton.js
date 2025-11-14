export default function CheckoutButton({ cartItems }) {
  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems }),
    });

    const data = await res.json();

    if (data.id) {
      window.location.href = `https://checkout.stripe.com/pay/${data.id}`;
    } else {
      alert("Checkout failed.");
    }
  };

  return (
    <button 
      style={{ padding: "10px 20px", background: "black", color: "white", borderRadius: "8px" }}
      onClick={handleCheckout}
    >
      Pay Now
    </button>
  );
}
