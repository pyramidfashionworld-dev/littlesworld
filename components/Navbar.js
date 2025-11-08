import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="bg-pink-200 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/">
          <h1 className="text-2xl font-bold text-pink-600 cursor-pointer">
            Little World
          </h1>
        </Link>

        <div className="flex items-center gap-6 text-pink-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>

          <Link href="/checkout" className="relative">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs px-2">
                {cart.length}
              </span>
            )}
          </Link>

          <a
            href="https://www.instagram.com/dlittleworld_26"
            target="_blank"
            className="text-pink-700 hover:text-pink-900"
          >
            📷 Instagram
          </a>
        </div>
      </div>
    </nav>
  );
}
