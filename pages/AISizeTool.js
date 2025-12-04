// pages/AISizeTool.js
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { Ruler, Check } from 'lucide-react';

export default function AISizeTool() {
  const [babyAge, setBabyAge] = useState('');
  const [babyWeight, setBabyWeight] = useState('');
  const [babyHeight, setBabyHeight] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  const sizeChart = {
    newborn: { size: 'Newborn (0-3M)', ageRange: '0-3 months', weight: '3-6 kg', height: '45-60 cm' },
    '3m': { size: '3-6 Months', ageRange: '3-6 months', weight: '5-8 kg', height: '55-70 cm' },
    '6m': { size: '6-12 Months', ageRange: '6-12 months', weight: '7-10 kg', height: '65-80 cm' },
    '12m': { size: '12-18 Months', ageRange: '12-18 months', weight: '9-12 kg', height: '75-90 cm' },
    '18m': { size: '18-24 Months', ageRange: '18-24 months', weight: '11-15 kg', height: '85-100 cm' },
    '2y': { size: '2-3 Years', ageRange: '2-3 years', weight: '12-18 kg', height: '90-110 cm' },
  };

  const handleFindSize = () => {
    if (!babyAge) {
      alert('Please select baby age');
      return;
    }

    const sizeInfo = sizeChart[babyAge];
    setRecommendation(sizeInfo);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12 min-h-screen">
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Ruler size={32} className="text-pink-600" />
            <h1 className="text-3xl font-bold text-gray-800">AI Size Finder</h1>
          </div>
          <p className="text-gray-700">Get the perfect clothing size for your little one</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="space-y-6">
            {/* Age Selection */}
            <div>
              <label className="block font-semibold text-gray-700 mb-3">Baby Age</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(sizeChart).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setBabyAge(key)}
                    className={`p-3 rounded-lg border-2 transition ${
                      babyAge === key
                        ? 'border-pink-600 bg-pink-50 text-pink-700 font-semibold'
                        : 'border-gray-300 hover:border-pink-300'
                    }`}
                  >
                    {value.ageRange}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Weight (kg) - Optional
                </label>
                <input
                  type="number"
                  value={babyWeight}
                  onChange={(e) => setBabyWeight(e.target.value)}
                  placeholder="e.g., 6.5"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  Height (cm) - Optional
                </label>
                <input
                  type="number"
                  value={babyHeight}
                  onChange={(e) => setBabyHeight(e.target.value)}
                  placeholder="e.g., 65"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600"
                />
              </div>
            </div>

            {/* Find Size Button */}
            <button
              onClick={handleFindSize}
              className="w-full bg-pink-600 text-white py-3 rounded-lg font-bold hover:bg-pink-700 transition text-lg"
            >
              Find Your Size
            </button>
          </div>
        </div>

        {/* Recommendation */}
        {recommendation && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300 p-8 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <Check size={28} className="text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">Recommended Size</h2>
                <p className="text-gray-600">Based on your selection</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-gray-600 text-sm font-semibold">SIZE</p>
                <p className="text-3xl font-bold text-pink-600">{recommendation.size}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-gray-600 text-sm font-semibold">AGE RANGE</p>
                <p className="text-lg font-semibold text-gray-800">{recommendation.ageRange}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-gray-600 text-sm font-semibold">TYPICAL WEIGHT</p>
                <p className="text-lg font-semibold text-gray-800">{recommendation.weight}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-gray-600 text-sm font-semibold">TYPICAL HEIGHT</p>
                <p className="text-lg font-semibold text-gray-800">{recommendation.height}</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> For the best fit, we recommend checking the specific product's size chart as sizing may vary by brand and style. If between sizes, consider going up for room to grow!
              </p>
            </div>
          </div>
        )}

        {/* Size Chart Reference */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Complete Size Chart</h2>
          <div className="space-y-3">
            {Object.entries(sizeChart).map(([key, value]) => (
              <div key={key} className="bg-white p-4 rounded-lg shadow">
                <p className="font-bold text-lg text-pink-600 mb-2">{value.size}</p>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="font-semibold text-gray-700">Age</p>
                    <p>{value.ageRange}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Weight</p>
                    <p>{value.weight}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Height</p>
                    <p>{value.height}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}