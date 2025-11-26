// components/Navbar.js
import Link from "next/link";
import { useRouter } from "next/router";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('littlesworld_cart') || '[]');
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-pink-200 text-gray-800 shadow-md z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <h1
          className="text-2xl font-bold text-pink-700 cursor-pointer"
          onClick={() => router.push("/")}
        >
          Little World 🧸
        </h1>

        <div className="flex items-center gap-6 font-medium">
          <Link href="/" className="hover:text-pink-600">
            Home
          </Link>
          <Link href="/shop" className="hover:text-pink-600">
            Shop
          </Link>
          <Link href="/account" className="hover:text-pink-600">
            Account
          </Link>
          <Link href="/contact" className="hover:text-pink-600">
            Contact
          </Link>
          
          <button 
            onClick={() => router.push('/checkout')}
            className="relative hover:text-pink-600"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}