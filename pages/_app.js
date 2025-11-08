import "@/styles/globals.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { CartProvider } from "../context/CartContext";
import { Facebook, Instagram, Phone, Mail, MessageCircle } from "lucide-react";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <CartProvider>
      {/* ==== NAVBAR ==== */}
      <nav className="fixed top-0 left-0 w-full bg-pink-200 text-gray-800 shadow-md z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <h1
            className="text-2xl font-bold text-pink-700 cursor-pointer"
            onClick={() => router.push("/")}
          >
            Little World 🧸
          </h1>

          <div className="space-x-6 font-medium">
            <Link href="/" className="hover:text-pink-600">Home</Link>
            <Link href="/shop" className="hover:text-pink-600">Shop</Link>
            <Link href="/checkout" className="hover:text-pink-600">Checkout</Link>
            <Link href="/about" className="hover:text-pink-600">About</Link>
          </div>
        </div>
      </nav>

      {/* ==== MAIN CONTENT ==== */}
      <main className="pt-24 min-h-screen bg-pink-50">
        <Component {...pageProps} />
      </main>

      {/* ==== GLOBAL FOOTER ==== */}
      <footer className="bg-pink-200 mt-10 py-8 rounded-t-3xl shadow-inner text-gray-800">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-bold text-pink-700 mb-2">Little World 🧸</h3>
            <p className="text-gray-700">
              Spreading smiles with every tiny outfit! Soft, safe & stylish baby clothing for your little one. 💕
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-pink-700 mb-2">Contact Us</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2"><Phone size={18}/> +91 98765 43210</li>
              <li className="flex items-center gap-2"><Mail size={18}/> support@littleworld.in</li>
              <li className="flex items-center gap-2"><MessageCircle size={18}/> Chat on WhatsApp</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold text-pink-700 mb-2">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/dlittleworld_26"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-600 flex items-center gap-2"
              >
                <Instagram size={24} /> @dlittleworld_26
              </a>
              <a href="#" className="hover:text-pink-600"><Facebook size={24}/></a>
              <a href="#" className="hover:text-pink-600"><MessageCircle size={24}/></a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 mt-6">
          © {new Date().getFullYear()} Little World. All rights reserved.
        </div>
      </footer>
    </CartProvider>
  );
}
