import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
    calculateTotal(savedCart);
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum);
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    calculateTotal(updated);
  };

  const updateQuantity = (id, qty) => {
    const updated = cart.map(item => 
      item.id === id ? { ...item, quantity: qty } : item
    );
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    calculateTotal(updated);
  };

  if (cart.length === 0) {
    return <div className="p-8 text-center">Your cart is empty. <Link href="/"><a>Continue shopping</a></Link></div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart.map(item => (
        <div key={item.id} className="flex justify-between items-center border-b py-4">
          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">Size: {item.size}</p>
          </div>
          <div>
            <input 
              type="number" 
              min="1" 
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              className="w-12 px-2 py-1 border"
            />
          </div>
          <div className="px-6">₹{item.price * item.quantity}</div>
          <button 
            onClick={() => removeItem(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="mt-6 text-right">
        <h2 className="text-2xl font-bold">Total: ₹{total.toFixed(2)}</h2>
        <button className="mt-4 bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}