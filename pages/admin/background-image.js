import { useState, useEffect } from 'react';
import { Upload, Trash2, Save } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function BackgroundImageManager() {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    loadBackgroundImage();
  }, []);

  const loadBackgroundImage = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('littlesworld_background_image');
      if (saved) {
        setBackgroundImage(saved);
        setPreview(saved);
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) {
        alert('File is too large. Maximum 5MB allowed.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target.result;
        setPreview(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveBackgroundImage = () => {
    if (!preview) {
      alert('Please select an image first');
      return;
    }

    localStorage.setItem('littlesworld_background_image', preview);
    setBackgroundImage(preview);
    alert('✅ Background image saved! Changes will appear on homepage.');
  };

  const deleteBackgroundImage = () => {
    if (confirm('Are you sure you want to remove the background image?')) {
      localStorage.removeItem('littlesworld_background_image');
      setBackgroundImage(null);
      setPreview(null);
      alert('✅ Background image removed!');
    }
  };

  const resetImage = () => {
    setPreview(backgroundImage);
  };

  if (!isClient) {
    return (
      <>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
        <h1 className="text-4xl font-bold mb-2">Hero Background Image Manager</h1>
        <p className="text-gray-600 mb-12">Set a cute baby picture as the background for your homepage hero section</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Upload New Background</h2>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block font-semibold mb-2 text-gray-800">Select Image</label>
              <div className="border-2 border-dashed border-pink-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="bgImageInput"
                />
                <label htmlFor="bgImageInput" className="cursor-pointer block">
                  <Upload size={40} className="mx-auto text-pink-600 mb-2" />
                  <p className="text-gray-700 font-semibold">Click to upload</p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={saveBackgroundImage}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Save Image
              </button>
              {preview && preview !== backgroundImage && (
                <button
                  onClick={resetImage}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Preview</h2>

            {preview ? (
              <div>
                <div className="relative mb-4 rounded-lg overflow-hidden h-64 bg-gray-100">
                  <img
                    src={preview}
                    alt="Background Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-green-600 font-semibold mb-4">✓ Image ready to save</p>

                {backgroundImage && (
                  <button
                    onClick={deleteBackgroundImage}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Trash2 size={20} />
                    Remove Current Image
                  </button>
                )}
              </div>
            ) : (
              <div className="h-64 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center text-center">
                <div>
                  <p className="text-gray-600 font-semibold text-lg">📸 No image selected</p>
                  <p className="text-gray-500 text-sm mt-2">Upload an image to see preview</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-bold text-lg mb-3 text-blue-900">💡 How to Use:</h3>
          <ul className="text-gray-700 space-y-2">
            <li>✓ Upload a cute baby picture from your desktop</li>
            <li>✓ Preview it on the right side</li>
            <li>✓ Click "Save Image" to apply it as hero background</li>
            <li>✓ The image will appear on your homepage immediately</li>
            <li>✓ Text is overlaid on the image with a semi-transparent overlay</li>
          </ul>
        </div>

        {/* Tips Box */}
        <div className="mt-6 p-6 bg-pink-50 rounded-lg border-l-4 border-pink-500">
          <h3 className="font-bold text-lg mb-3 text-pink-900">🎨 Best Practices:</h3>
          <ul className="text-gray-700 space-y-2">
            <li>• Best size: 1920x600 pixels or larger</li>
            <li>• Use high-quality, bright images (helps readability)</li>
            <li>• Avoid very dark images (text might be hard to read)</li>
            <li>• Formats: JPG, PNG, GIF</li>
            <li>• Maximum file size: 5MB</li>
            <li>• Cute baby photos work best!</li>
          </ul>
        </div>

        {/* Current Image Display */}
        {backgroundImage && (
          <div className="mt-12 p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
            <h3 className="font-bold text-lg mb-3 text-green-900">✓ Current Background Image:</h3>
            <div className="rounded-lg overflow-hidden h-32 bg-gray-100">
              <img
                src={backgroundImage}
                alt="Current Background"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-green-700 mt-3">This image is currently set as your homepage background</p>
          </div>
        )}
      </div>
    </>
  );
}