import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  // Load cart from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(saved);
  }, []);

  // Save cart to localStorage on every change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const goToCheckout = () => {
    router.push("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: 30, textAlign: "center" }}>
        <h2>Your cart is empty</h2>
        <p>Add some cute baby wear to begin the fun.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: 20,
            border: "1px solid #ddd",
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{ width: 100, height: 100, objectFit: "cover" }}
          />

          <div style={{ flex: 1 }}>
            <h3>{item.name}</h3>
            <p>₹ {item.price}</p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 10,
              }}
            >
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>

            <button
              style={{
                marginTop: 10,
                background: "red",
                color: "#fff",
                padding: "6px 12px",
                border: "none",
                borderRadius: 5,
                cursor: "pointer",
              }}
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <h2>Total: ₹ {totalAmount}</h2>
        <button
          style={{
            background: "#0f73ee",
            color: "#fff",
            padding: "12px 20px",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            marginTop: 10,
          }}
          onClick={goToCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
