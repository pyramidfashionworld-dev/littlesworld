'use client';

import React, { useState } from 'react';
import { ShoppingCart, Heart, Search, Filter, X } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  category: string;
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

const BABY_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Baby Girl Dress - Pink',
    category: 'Dresses',
    price: 599,
    image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc338?w=400&h=400&fit=crop',
    description: 'Cute pink cotton dress for baby girls',
    rating: 4.5,
    inStock: true,
  },
  {
    id: 2,
    name: 'Baby Boy Romper - Blue',
    category: 'Rompers',
    price: 649,
    image: 'https://images.unsplash.com/photo-1519689373023-dd07e1b1c5bb?w=400&h=400&fit=crop',
    description: 'Comfortable blue romper for baby boys',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 3,
    name: 'Soft Baby Blanket',
    category: 'Accessories',
    price: 499,
    image: 'https://images.unsplash.com/photo-1613503328567-fbb5c4d27e0e?w=400&h=400&fit=crop',
    description: 'Ultra-soft cotton baby blanket',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 4,
    name: 'Baby Booties Set',
    category: 'Footwear',
    price: 399,
    image: 'https://images.unsplash.com/photo-1598243867433-1e10e48137d6?w=400&h=400&fit=crop',
    description: 'Set of 3 colorful baby booties',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 5,
    name: 'Teething Toy',
    category: 'Toys',
    price: 299,
    image: 'https://images.unsplash.com/photo-1595642632823-47fd3b511b85?w=400&h=400&fit=crop',
    description: 'Safe silicone teething toy',
    rating: 4.4,
    inStock: true,
  },
  {
    id: 6,
    name: 'Baby Hat & Mittens',
    category: 'Accessories',
    price: 349,
    image: 'https://images.unsplash.com/photo-1620236457336-628149393e83?w=400&h=400&fit=crop',
    description: 'Warm winter set for babies',
    rating: 4.3,
    inStock: true,
  },
  {
    id: 7,
    name: 'Organic Baby Soap',
    category: 'Care',
    price: 199,
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4d4b3f0?w=400&h=400&fit=crop',
    description: 'Gentle organic baby soap',
    rating: 4.9,
    inStock: true,
  },
  {
    id: 8,
    name: 'Baby Onesie Set',
    category: 'Clothing',
    price: 749,
    image: 'https://images.unsplash.com/photo-1516770663200-3beffb2e6c27?w=400&h=400&fit=crop',
    description: 'Pack of 3 comfortable onesies',
    rating: 4.6,
    inStock: true,
  },
];

const CATEGORIES = ['All', 'Dresses', 'Rompers', 'Clothing', 'Toys', 'Accessories', 'Care', 'Footwear'];

export default function BabyCollection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = BABY_PRODUCTS.filter((product) => {
    const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-500 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl">👶</span>
            <div>
              <h1 className="text-3xl font-bold text-white">Baby Collection</h1>
              <p className="text-sm text-pink-100 font-semibold">Little's World</p>
            </div>
          </div>
          <button
            onClick={() => setShowCart(!showCart)}
            className="relative bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition"
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
          {/* Sidebar */}
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
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Categories</label>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedCategory === category
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
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
                        <span className="text-2xl font-bold text-purple-600">₹{cartTotal}</span>
                      </div>

                      <Link href="/checkout">
                        <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
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
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-gray-900 text-sm">{product.name}</h3>
                        </div>

                        <p className="text-xs text-gray-600 mb-2">{product.category}</p>
                        <p className="text-xs text-gray-500 mb-3">{product.description}</p>

                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-bold text-purple-600">₹{product.price}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-xs font-semibold">{product.rating}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => addToCart(product)}
                          className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2"
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
      <footer className="bg-gradient-to-r from-gray-900 to-purple-900 text-white mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-2xl">👶</span>
                Little's World
              </h3>
              <p className="text-gray-400">Premium baby collection for your little ones</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/baby-collection" className="hover:text-white">Baby Collection</a></li>
                <li><a href="/checkout" className="hover:text-white">Checkout</a></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Contact</h4>
              <p className="text-gray-400">Email: info@littlesworld.com</p>
              <p className="text-gray-400">Phone: +91 9876543210</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">© 2025 <span className="font-bold text-white">Little's World</span>. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}