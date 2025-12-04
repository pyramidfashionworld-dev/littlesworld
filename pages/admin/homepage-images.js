import { useState, useEffect } from 'react';
import { Upload, Trash2, Save } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function HomepageImageManager() {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    loadImages();
  }, []);

  const loadImages = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('littlesworld_homepage_images');
      if (saved) {
        try {
          setImages(JSON.parse(saved));
        } catch (error) {
          console.error('Error loading images:', error);
        }
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
        setSelectedFile(file);
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = () => {
    if (!preview || !title) {
      alert('Please select an image and add a title');
      return;
    }

    const newImage = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      image: preview,
      uploadedAt: new Date().toLocaleDateString(),
    };

    const updated = [...images, newImage];
    setImages(updated);
    localStorage.setItem('littlesworld_homepage_images', JSON.stringify(updated));

    alert('✅ Image uploaded successfully!');
    resetForm();
  };

  const deleteImage = (id) => {
    if (confirm('Are you sure you want to delete this image?')) {
      const updated = images.filter((img) => img.id !== id);
      setImages(updated);
      localStorage.setItem('littlesworld_homepage_images', JSON.stringify(updated));
      alert('✅ Image deleted!');
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreview(null);
    setTitle('');
    setDescription('');
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

      <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen bg-white">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Homepage Images Manager</h1>
          <p className="text-gray-600">Upload cute images to display on your homepage</p>
        </div>

        {/* Upload Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-12 border-2 border-pink-100">
          <h2 className="text-2xl font-bold mb-6">Upload New Image</h2>

          {/* Image Upload Area */}
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-800">Select Image</label>
            <div className="border-2 border-dashed border-pink-300 rounded-lg p-8 text-center hover:border-pink-600 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="imageInput"
              />
              <label htmlFor="imageInput" className="cursor-pointer block">
                {preview ? (
                  <div>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-64 h-64 mx-auto rounded-lg mb-3 object-cover shadow-md"
                    />
                    <p className="text-green-600 font-semibold text-lg">✓ Image Selected</p>
                    <p className="text-sm text-gray-500 mt-2">Click to change</p>
                  </div>
                ) : (
                  <div>
                    <Upload size={48} className="mx-auto text-pink-600 mb-3" />
                    <p className="text-gray-700 font-semibold text-lg">Click to upload image</p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Title & Description */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-semibold mb-2 text-gray-800">Image Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Newborn Baby Sleeping Peacefully"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600 transition"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-gray-800">Description (Optional)</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description for the image"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600 transition"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={uploadImage}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition shadow-md"
            >
              <Save size={20} />
              Upload Image
            </button>
            {preview && (
              <button
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Uploaded Images Gallery */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Uploaded Images ({images.length})</h2>

          {images.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-600 text-lg">📸 No images uploaded yet</p>
              <p className="text-gray-500 mt-2">Upload your first cute image above to get started!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {images.map((img) => (
                <div key={img.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
                  {/* Image */}
                  <div className="h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={img.image}
                      alt={img.title}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{img.title}</h3>
                    {img.description && (
                      <p className="text-gray-600 text-sm mb-3">{img.description}</p>
                    )}
                    <p className="text-xs text-gray-500 mb-4">Uploaded: {img.uploadedAt}</p>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteImage(img.id)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-bold text-lg mb-3 text-blue-900">💡 How to Use:</h3>
          <ul className="text-gray-700 space-y-2">
            <li>✓ Upload cute baby images from your desktop</li>
            <li>✓ Add a title and optional description for each image</li>
            <li>✓ Images automatically appear on your homepage in "Our Cute Moments" section</li>
            <li>✓ Delete images anytime from this manager</li>
            <li>✓ Images are stored locally in your browser</li>
          </ul>
        </div>

        {/* Tips Box */}
        <div className="mt-6 p-6 bg-pink-50 rounded-lg border-l-4 border-pink-500">
          <h3 className="font-bold text-lg mb-3 text-pink-900">🎨 Image Tips:</h3>
          <ul className="text-gray-700 space-y-2">
            <li>• Best size: 1000x800 pixels or larger</li>
            <li>• Formats: JPG, PNG, GIF</li>
            <li>• Maximum file size: 5MB</li>
            <li>• Upload 3-5 images for best appearance</li>
            <li>• Use high-quality, well-lit photos</li>
          </ul>
        </div>
      </div>
    </>
  );
}