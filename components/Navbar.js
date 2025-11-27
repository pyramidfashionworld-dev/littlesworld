// components/Navbar.js
import Link from "next/link";
import { useRouter } from "next/router";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Newborn Collection", path: "/newborn-collection" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-pink-600">
          🌸 Little Petals
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`font-medium transition ${
                router.pathname === item.path
                  ? "text-pink-600 border-b-2 border-pink-600"
                  : "text-gray-700 hover:text-pink-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/checkout"
            className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
          >
            <ShoppingCart size={20} />
            Cart
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t py-4 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="block py-2 text-gray-700 hover:text-pink-600"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/checkout"
            className="block py-2 text-gray-700 hover:text-pink-600"
            onClick={() => setIsOpen(false)}
          >
            Cart
          </Link>
        </div>
      )}
    </nav>
  );
}