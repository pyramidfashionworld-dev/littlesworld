import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { ShoppingCart } from 'lucide-react';

export default function NewbornCollectionPage() {
  const [isClient] = useState(true);

  const products = [
    { id: 101, name: 'Organic Newborn Sleeper', price: 1299, image: '👶', rating: 4.9 },
    { id: 102, name: 'Bamboo Newborn Bodysuit', price: 899, image: '👕', rating: 4.8 },
    { id: 103, name: 'Premium Newborn Swaddle', price: 1599, image: '🛏️', rating: 4.9 },
    { id: 104, name: 'Soft Newborn Mittens', price: 499, image: '🧤', rating: 4.7 },
    { id: 105, name: 'Gentle Newborn Hat', price: 599, image: '🧢', rating: 4.8 },
    { id: 106, name: 'Newborn Sleep Set', price: 2499, image: '🌙', rating: 4.9 },
  ];

  const handleAddToCart = (product) => {
    try {
      const cartData = localStorage.getItem('littlesworld_cart');
      const existingCart = cartData ? JSON.parse(cartData) : [];
      const existingItem = existingCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        existingCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        });
      }

      localStorage.setItem('littlesworld_cart', JSON.stringify(existingCart));
      alert(`✅ ${product.name} added to cart!`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-100 to-orange-100 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="text-sm font-semibold text-orange-600 bg-orange-200 px-4 py-2 rounded-full">
            ✨ New Collection
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4 mb-4">
            Softest Start: Newborn Essentials
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Trusted by parents, loved by littles. Organic, safe, and incredibly soft.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#products" className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose LittlesWorld</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 bg-blue-50 rounded-xl text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold mb-3">Organic & Certified</h3>
              <p>GOTS certified, hypoallergenic fabrics</p>
            </div>
            <div className="p-8 bg-pink-50 rounded-xl text-center">
              <div className="text-4xl mb-4">☁️</div>
              <h3 className="text-2xl font-bold mb-3">Incredibly Soft</h3>
              <p>Tagless designs for delicate skin</p>
            </div>
            <div className="p-8 bg-green-50 rounded-xl text-center">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold mb-3">Built to Last</h3>
              <p>Durable quality for siblings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Newborn Essentials</h2>
          <p className="text-center text-gray-600 mb-16">Curated selection for your newborn</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-6xl mb-4 text-center">{product.image}</div>
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-2xl font-bold text-pink-600">₹{product.price}</p>
                  <p className="text-yellow-500 font-bold">⭐ {product.rating}</p>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Our Organic Promise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-xl font-bold mb-3">🌾 100% Organic</h3>
              <p>Sourced from certified organic farms</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-xl font-bold mb-3">🧪 Rigorously Tested</h3>
              <p>Independent lab verification</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="text-xl font-bold mb-3">♻️ Eco-Friendly</h3>
              <p>100% recyclable packaging</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Give Your Baby The Softest Start?</h2>
        <Link href="/checkout" className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-lg">
          Start Shopping Now
        </Link>
      </section>
    </>
  );
}