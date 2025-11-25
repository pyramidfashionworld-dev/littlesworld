export default function ResaleMarketplace() {
  const resaleItems = [
    { id: 1, name: 'Pink Dress', originalPrice: 899, resalePrice: 450, condition: 'Like New', age: '6-12M' },
    { id: 2, name: 'Blue Romper', originalPrice: 749, resalePrice: 375, condition: 'Good', age: '0-6M' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Circular Resale Marketplace</h1>
          <p className="text-xl text-gray-600">Buy pre-loved clothes at 50% off or sell yours for store credits!</p>
        </div>

        {/* Trade-In Section */}
        <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Trade In Your Clothes</h2>
              <p className="text-gray-700 mb-4">Get up to 40% of original value as store credit</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Clean, good condition items
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Purchased from Little's World
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Within 2 years of purchase
                </li>
              </ul>
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700">
                Start Trade-In
              </button>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold mb-4">Trade-In Calculator</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm">Original Purchase Price</label>
                  <input type="number" placeholder="₹899" className="w-full px-4 py-2 border rounded-lg mt-1" />
                </div>
                <div>
                  <label className="text-sm">Condition</label>
                  <select className="w-full px-4 py-2 border rounded-lg mt-1">
                    <option>Like New (40%)</option>
                    <option>Good (30%)</option>
                    <option>Fair (20%)</option>
                  </select>
                </div>
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mt-4">
                  <p className="text-sm text-gray-600">You'll receive</p>
                  <p className="text-3xl font-bold text-green-600">₹360</p>
                  <p className="text-xs text-gray-500">in store credits</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resale Products Grid */}
        <h2 className="text-2xl font-bold mb-6">Browse Pre-Loved Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resaleItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative">
                <div className="h-48 bg-pink-100 flex items-center justify-center text-5xl">👗</div>
                <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  PRE-LOVED
                </div>
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold">
                  {item.condition}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.age}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-green-600">₹{item.resalePrice}</span>
                  <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">50% OFF</span>
                </div>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}