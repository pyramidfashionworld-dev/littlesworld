import { useRouter } from 'next/router';
import { useState } from 'react';
import { Star, TrendingUp, Shield, Recycle } from 'lucide-react';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Mock product data - replace with actual API call
  const product = {
    id: id,
    name: 'Pink Baby Dress',
    price: 899,
    images: ['/images/product1.jpg', '/images/product1-2.jpg'],
    description: 'Premium organic cotton dress with adjustable straps',
    durability: 8,
    material: 'Organic Cotton',
    ageRange: '6-12 months',
    washCycles: '50+',
    reviews: [
      { name: 'Priya M.', rating: 5, text: 'Perfect fit! Lasted 6 months.' },
      { name: 'Rahul S.', rating: 4, text: 'Good quality, worth the price.' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <div className="bg-pink-100 h-96 rounded-xl flex items-center justify-center text-9xl mb-4">
              👗
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-gray-200 h-20 rounded-lg"></div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(24 reviews)</span>
            </div>

            <div className="text-4xl font-bold text-pink-500 mb-6">₹{product.price}</div>

            {/* USP Badges */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="border-2 border-teal-500 rounded-lg p-3 text-center">
                <TrendingUp className="w-6 h-6 mx-auto text-teal-500 mb-1" />
                <p className="text-xs font-semibold">Grow Guarantee</p>
              </div>
              <div className="border-2 border-blue-500 rounded-lg p-3 text-center">
                <Shield className="w-6 h-6 mx-auto text-blue-500 mb-1" />
                <p className="text-xs font-semibold">50+ Washes</p>
              </div>
              <div className="border-2 border-green-500 rounded-lg p-3 text-center">
                <Recycle className="w-6 h-6 mx-auto text-green-500 mb-1" />
                <p className="text-xs font-semibold">Resellable</p>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Select Size</label>
              <div className="flex gap-2">
                {['0-6M', '6-12M', '12-18M', '18-24M'].map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 rounded-lg ${
                      selectedSize === size 
                        ? 'border-pink-500 bg-pink-50' 
                        : 'border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button className="text-sm text-teal-500 mt-2">Use AI Size Recommender →</button>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">Quantity</label>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border-2 px-4 py-2 rounded-lg"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="border-2 px-4 py-2 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-pink-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-pink-600 mb-4">
              Add to Cart
            </button>
            <button className="w-full border-2 border-pink-500 text-pink-500 py-4 rounded-lg font-semibold hover:bg-pink-50">
              Buy Now
            </button>

            {/* Product Details */}
            <div className="mt-8 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Material & Care</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• 100% Organic Cotton</li>
                  <li>• Machine washable (cold water)</li>
                  <li>• Tumble dry low</li>
                  <li>• Tested for 50+ wash cycles</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-semibold">{review.name}</span>
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}