import { useState } from 'react';
import { Camera, Upload } from 'lucide-react';

export default function AISizeTool({ isOpen, onClose, onRecommendation }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    
    // Mock AI processing - Replace with actual AI API
    setTimeout(() => {
      const mockRecommendation = {
        size: '6-12M',
        confidence: 95,
        measurements: {
          height: '68cm',
          weight: '8kg',
          chestCircumference: '42cm'
        },
        suggestions: [
          'Based on your baby\'s height, 6-12M size will fit perfectly',
          'Current size will last approximately 3-4 months',
          'Consider ordering 12-18M for future growth'
        ]
      };
      setRecommendation(mockRecommendation);
      setLoading(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-8">
        <h2 className="text-3xl font-bold mb-4">AI Size Recommendation</h2>
        
        {!recommendation ? (
          <>
            <p className="text-gray-600 mb-6">
              Upload your baby's full-body photo for instant size recommendation!
            </p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center mb-6">
              {loading ? (
                <div className="animate-pulse">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-semibold">Analyzing photo...</p>
                  <p className="text-sm text-gray-500">AI is measuring your baby</p>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-semibold mb-2">Click to upload photo</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="bg-teal-50 border-2 border-teal-500 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">Recommended Size:</h3>
                <span className="text-4xl font-bold text-teal-600">{recommendation.size}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Confidence:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-teal-500 h-2 rounded-full"
                    style={{width: `${recommendation.confidence}%`}}
                  />
                </div>
                <span className="text-sm font-semibold">{recommendation.confidence}%</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Detected Measurements:</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-pink-500">{recommendation.measurements.height}</p>
                  <p className="text-sm text-gray-600">Height</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-pink-500">{recommendation.measurements.weight}</p>
                  <p className="text-sm text-gray-600">Weight</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-pink-500">{recommendation.measurements.chestCircumference}</p>
                  <p className="text-sm text-gray-600">Chest</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Our Suggestions:</h4>
              <ul className="space-y-2">
                {recommendation.suggestions.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-500 mt-1">✓</span>
                    <span className="text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => {
                  onRecommendation(recommendation.size);
                  onClose();
                }}
                className="flex-1 bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600"
              >
                Apply Size to Cart
              </button>
              <button 
                onClick={() => setRecommendation(null)}
                className="px-6 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
}