export default function GrowthGuarantee() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Grow-With-Me Guarantee</h1>
        
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center font-bold text-teal-700 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Purchase any item</h3>
                <p className="text-gray-600">All items come with our growth guarantee automatically</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center font-bold text-teal-700 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Baby outgrows it within 30 days?</h3>
                <p className="text-gray-600">Simply return the item in good condition</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center font-bold text-teal-700 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Get the next size up for FREE</h3>
                <p className="text-gray-600">We'll ship the larger size at no additional cost</p>
              </div>
            </div>
          </div>
        </div>

        {/* Request Form */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Request Size-Up</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Order Number</label>
              <input 
                type="text" 
                placeholder="LW-12345"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Product Name</label>
              <input 
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Current Size</label>
              <select className="w-full px-4 py-2 border rounded-lg">
                <option>0-6 Months</option>
                <option>6-12 Months</option>
                <option>12-18 Months</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">New Size Needed</label>
              <select className="w-full px-4 py-2 border rounded-lg">
                <option>6-12 Months</option>
                <option>12-18 Months</option>
                <option>18-24 Months</option>
              </select>
            </div>
            <button className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}