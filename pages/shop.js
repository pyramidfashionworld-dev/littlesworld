// pages/shop.js
import Link from "next/link";
import { Star, Filter, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

export default function Shop() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState([]);

  const products = [
    {
      id: 1,
      name: "Organic Cotton Romper",
      price: 899,
      category: "rompers",
      image: "👶",
      rating: 4.8,
      description: "Soft and breathable organic cotton romper",
    },
    {
      id: 2,
      name: "Soft Bamboo Onesie",
      price: 799,
      category: "onesies",
      image: "👕",
      rating: 4.9,
      description: "Ultra-soft bamboo fabric onesie",
    },
    {
      id: 3,
      name: "Premium Sleep Set",
      price: 1299,
      category: "sleepwear",
      image: "🛏️",
      rating: 4.7,
      description: "Comfortable sleep set for babies",
    },
    {
      id: 4,
      name: "Floral Dress",
      price: 1099,
      category: "dresses",
      image: "👗",
      rating: 4.9,
      description: "Beautiful floral pattern dress",
    },
    {
      id: 5,
      name: "Striped T-Shirt",
      price: 599,
      category: "shirts",
      image: "👕",
      rating: 4.6,
      description: "Comfortable striped cotton t-shirt",
    },
    {
      id: 6,
      name: "Cozy Sweater",
      price: 1199,
      category: "sweaters",
      image: "🧶",
      rating: 4.8,
      description: "Warm and cozy baby sweater",
    },
    {
      id: 7,
      name: "Denim Overalls",
      price: 1399,
      category: "overalls",
      image: "👖",
      rating: 4.7,
      description: "Classic denim overalls for babies",
    },
    {
      id: 8,
      name: "Soft Booties",
      price: 499,
      category: "accessories",
      image: "👶",
      rating: 4.9,
      description: "Soft and warm baby booties",
    },
  ];

  const categories = [
    { id: "all", name: "All Products" },
    { id: "rompers", name: "Rompers" },
    { id: "onesies", name: "Onesies" },
    { id: "dresses", name: "Dresses" },
    { id: "shirts", name: "Shirts" },
    { id: "sweaters", name: "Sweaters" },
    { id: "sleepwear", name: "Sleepwear" },
    { id: "overalls", name: "Overalls" },
    { id: "accessories", name: "Accessories" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product) => {
    try {
      // Get existing cart from localStorage
      const cartData = localStorage.getItem("littlesworld_cart");
      const existingCart = cartData ? JSON.parse(cartData) : [];
      
      // Check if product already exists in cart
      const existingItem = existingCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        // Increase quantity if product already in cart
        existingItem.quantity += 1;
      } else {
        // Add new product to cart
        existingCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        });
      }

      // Save updated cart to localStorage
      localStorage.setItem("littlesworld_cart", JSON.stringify(existingCart));
      
      // Verify it was saved
      const saved = localStorage.getItem("littlesworld_cart");
      console.log("Cart saved:", saved);
      
      // Show confirmation
      alert(`✅ ${product.name} added to cart!\n\nGo to Checkout to see your items.`);
      
      // Update local state
      setCart(existingCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding to cart. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Our Shop</h1>
        <p className="text-gray-600 mb-8">Browse our premium collection of baby clothing</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={20} />
                <h3 className="font-bold text-lg">Filter by Category</h3>
              </div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      selectedCategory === category.id
                        ? "bg-pink-600 text-white font-semibold"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="text-sm text-gray-600 mb-6">
              Showing {filteredProducts.length} products
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition"
                >
                  <div className="text-6xl p-6 bg-gray-100 text-center h-48 flex items-center justify-center">
                    {product.image}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <Star
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                      <span className="text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-pink-600 mb-4">
                      ₹{product.price}
                    </p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 font-semibold flex items-center justify-center gap-2 transition"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}