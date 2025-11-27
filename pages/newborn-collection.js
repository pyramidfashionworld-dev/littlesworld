'use client';

import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, X } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  ageGroup: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  inStock: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

const NEWBORN_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Newborn Onesie - Soft Pink',
    ageGroup: '0-6 months',
    price: 449,
    image: 'https://images.unsplash.com/photo-1618886815814-e5d84c6b9e94?w=400&h=400&fit=crop',
    description: 'Ultra-soft organic cotton onesie for newborns',
    rating: 4.9,
    inStock: true,
  },
  {
    id: 2,
    name: 'Baby Sleeper Set - Mint Green',
    ageGroup: '0-3 months',
    price: 549,
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc338?w=400&h=400&fit=crop',
    description: 'Comfortable sleeper set with mittens',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 3,
    name: 'Infant Bodysuit - White',
    ageGroup: '0-12 months',
    price: 399,
    image: 'https://images.unsplash.com/photo-1519689373023-dd07e1b1c5bb?w=400&h=400&fit=crop',
    description: 'Classic white bodysuit for infants',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 4,
    name: 'Toddler T-shirt - Rainbow',
    ageGroup: '1-2 years',
    price: 399,
    image: 'https://images.unsplash.com/photo-1503919545889-48854d7ee213?w=400&h=400&fit=crop',
    description: 'Colorful rainbow t-shirt for toddlers',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 5,
    name: 'Baby Girl Dress - Floral',
    ageGroup: '1-2 years',
    price: 549,
    image: 'https://images.unsplash.com/photo-1519689373023-dd07e1b1c5bb?w=400&h=400&fit=crop',
    description: 'Beautiful floral dress for baby girls',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 6,
    name: 'Baby Boy Shorts - Blue Denim',
    ageGroup: '2-3 years',
    price: 449,
    image: 'https://images.unsplash.com/photo-1503919545889-48854d7ee213?w=400&h=400&fit=crop',
    description: 'Trendy blue denim shorts for boys',
    rating: 4.5,
    inStock: true,
  },
  {
    id: 7,
    name: 'Toddler Jacket - Navy Blue',
    ageGroup: '2-3 years',
    price: 699,
    image: 'https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=400&h=400&fit=crop',
    description: 'Warm navy blue jacket for toddlers',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 8,
    name: 'Kid Sweater - Gray',
    ageGroup: '3-5 years',
    price: 599,
    image: 'https://images.unsplash.com/photo-1503919545889-48854d7ee213?w=400&h=400&fit=crop',
    description: 'Cozy gray sweater for kids',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 9,
    name: 'Kids Joggers - Black',
    ageGroup: '3-5 years',
    price: 499,
    image: 'https://images.unsplash.com/photo-1503919545889-48854d7ee213?w=400&h=400&fit=crop',
    description: 'Comfortable black joggers for kids',
    rating: 4.4,
    inStock: true,
  },
  {
    id: 10,
    name: 'Baby Pajama Set - Pink Stars',
    ageGroup: '1-3 years',
    price: 449,
    image: 'https://images.unsplash.com/photo-1618886815814-e5d84c6b9e94?w=400&h=400&fit=crop',
    description: 'Soft pajama set with cute stars',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 11,
    name: 'Toddler Dungarees - Yellow',
    ageGroup: '1-2 years',
    price: 549,
    image: 'https://images.unsplash.com/photo-1519689373023-dd07e1b1c5bb?w=400&h=400&fit=crop',
    description: 'Cute yellow dungarees for toddlers',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 12,
    name: 'Kids Hoodie - Red',
    ageGroup: '3-5 years',
    price: 649,
    image: 'https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=400&h=400&fit=crop',
    description: 'Warm red hoodie for active kids',
    rating: 4.5,
    inStock: true,
  },
];

const AGE_GROUPS = ['All', '0-6 months', '0-3 months', '0-12 months', '1-2 years', '2-3 years', '3-5 years'];

export default function NewbornCollection() {
  const [selectedAge, setSelectedAge] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = NEWBORN_PRODUCTS.filter((product) => {
    const matchAge = selectedAge === 'All' || product.ageGroup === selectedAge;
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchAge && matchSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { id: product.id, name: product.name, price: product.price, qty: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🍼</span>
            <div>
              <h1 className="text-3xl font-bold text-white">Newborn Collection</h1>
              <p className="text-sm text-blue-100 font-semibold">littlesworld (0-5 Years)</p>
            </div>
          </div>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative bg-white text-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-50 transition font-semibold"
          >
            <ShoppingCart size={20} />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Filters</h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search clothes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Age Groups */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Age Group</label>
                <div className="space-y-2">
                  {AGE_GROUPS.map((age) => (
                    <button
                      key={age}
                      onClick={() => setSelectedAge(age)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedAge === age
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {showCart ? (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
                  <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-4 border-b">
                          <div>
                            <p className="font-semibold text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">₹{item.price} × {item.qty}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-bold text-lg">₹{item.price * item.qty}</p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold text-gray-900">Total:</span>
                        <span className="text-2xl font-bold text-blue-600">₹{cartTotal}</span>
                      </div>

                      <Link href="/checkout">
                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                          Proceed to Checkout
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing <span className="font-bold">{filteredProducts.length}</span> products
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                      <div className="relative bg-gray-200 h-64 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition"
                        />
                        <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                          {product.ageGroup}
                        </div>
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className={`absolute top-3 right-3 p-2 rounded-full transition ${
                            favorites.includes(product.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <Heart size={18} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
                        </button>
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 text-sm mb-2">{product.name}</h3>
                        <p className="text-xs text-gray-500 mb-3">{product.description}</p>

                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-bold text-blue-600">₹{product.price}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-xs font-semibold">{product.rating}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => addToCart(product)}
                          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={16} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-2xl">🍼</span>
                littlesworld
              </h3>
              <p className="text-gray-400">Premium newborn & kids collection for 0-5 years</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/baby-collection" className="hover:text-white">Baby Collection</a></li>
                <li><a href="/newborn-collection" className="hover:text-white">Newborn Collection</a></li>
                <li><a href="/checkout" className="hover:text-white">Checkout</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Contact</h4>
              <p className="text-gray-400">Email: info@littlesworld.co.in</p>
              <p className="text-gray-400">Phone: +91 9876543210</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">© 2025 <span className="font-bold text-white">littlesworld</span>. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}