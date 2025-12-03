'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-400 to-purple-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to Little's World</h1>
          <p className="text-xl mb-8">Premium Baby & Kids Clothing Collections</p>
          <Link 
            href="/collections" 
            className="bg-white text-purple-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Baby Warm Winter', image: '❄️' },
              { name: 'Baby Summer', image: '☀️' },
              { name: 'Toddler Active Wear', image: '⚽' },
              { name: 'Baby Formal Wear', image: '👔' },
            ].map((collection) => (
              <Link 
                key={collection.name}
                href={`/collections/${collection.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center text-6xl">
                  {collection.image}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{collection.name}</h3>
                  <p className="text-gray-600 text-sm">Explore collection →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Little's World</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-bold text-lg mb-2">Premium Quality</h3>
              <p className="text-gray-600">High-quality fabrics and materials for your little ones</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick shipping across India with tracking</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="font-bold text-lg mb-2">Customer Care</h3>
              <p className="text-gray-600">Dedicated support for all your queries</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">About Us</h4>
              <p className="text-gray-400 text-sm">Little's World - Premium baby and kids clothing store</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/collections" className="hover:text-white">Collections</Link></li>
                <li><Link href="/admin" className="hover:text-white">Admin</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-gray-400 text-sm">Email: info@littlesworld.co.in</p>
              <p className="text-gray-400 text-sm">Phone: +91 XXXXXXXXXX</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4 text-gray-400">
                <a href="#" className="hover:text-white">Facebook</a>
                <a href="#" className="hover:text-white">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Little's World. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}