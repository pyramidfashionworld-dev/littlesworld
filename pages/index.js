// pages/index.js
import Navbar from "../components/Navbar";
import Link from "next/link";
import { Star, TrendingUp, Shield, Sparkles } from "lucide-react";

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: "Organic Cotton Romper",
      price: 899,
      image: "👶",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Soft Bamboo Onesie",
      price: 799,
      image: "👕",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Premium Sleep Set",
      price: 1299,
      image: "🛏️",
      rating: 4.7,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-12 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            🌸 Welcome to Little Petals
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Premium, organic baby clothing designed with love for your little ones
          </p>
          <Link
            href="/shop"
            className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-700"
          >
            Start Shopping
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <Sparkles size={40} className="mx-auto text-pink-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">100% Organic</h3>
            <p className="text-gray-600">Premium organic cotton and bamboo materials</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <Shield size={40} className="mx-auto text-pink-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Safe & Tested</h3>
            <p className="text-gray-600">All products tested for safety and quality</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <TrendingUp size={40} className="mx-auto text-pink-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">Fast Shipping</h3>
            <p className="text-gray-600">Quick delivery across India</p>
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                <div className="text-6xl p-6 bg-gray-100 text-center">
                  {product.image}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <p className="text-xl font-bold text-pink-600 mb-4">₹{product.price}</p>
                  <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Size Tool CTA */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-8 mb-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Not Sure About Size?</h2>
          <p className="text-gray-600 mb-6">Try our AI-powered size recommendation tool!</p>
          <Link
            href="/AISizeTool"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Get Size Recommendation →
          </Link>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get Updates & Offers</h2>
          <p className="mb-4">Subscribe to our newsletter for special discounts</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded text-black"
            />
            <button className="bg-pink-600 px-6 py-2 rounded font-semibold hover:bg-pink-700">
              Subscribe
            </button>
          </div>
        </div>
      </main>
    </>
  );
}