'use client';

import React, { useState } from 'react';
import { Download, Zap, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface GeneratedImage {
  url: string;
  id: string;
  name: string;
  description: string;
  collection: string;
  price: number;
  sku: string;
}

export default function ClothingGenerator() {
  const [collection, setCollection] = useState<'winter' | 'summer'>('winter');
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [imageCount, setImageCount] = useState(4);
  const [quality, setQuality] = useState('hd');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());

  const defaultPrompts = {
    winter: "Premium baby winter clothing collection, cozy warm outfits, knitted sweaters, warm jackets, winter boots, cute baby models, professional product photography, white background, Little's World branding tag",
    summer: "Beautiful baby summer clothing collection, light breathable outfits, cotton dresses, rompers, summer hats, cute baby models, professional product photography, white background, Little's World branding tag",
  };

  const handleGenerateImages = async () => {
    setLoading(true);
    setMessage(null);
    const finalPrompt = prompt || defaultPrompts[collection];
    
    try {
      const response = await fetch('/api/generate-clothing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: finalPrompt,
          collection: collection,
          count: imageCount,
          quality: quality,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate images');
      }

      const data = await response.json();
      if (data.images) {
        setGeneratedImages(data.images);
        setMessage({ type: 'success', text: `✅ Generated ${data.images.length} images successfully!` });
        setSelectedImages(new Set());
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setMessage({ type: 'error', text: `❌ Error: ${errorMessage}` });
      console.error('Generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = async (image: GeneratedImage) => {
    try {
      const link = document.createElement('a');
      link.href = image.url;
      link.download = `${image.sku}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setMessage({ type: 'success', text: `Downloaded ${image.name}` });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to download image' });
    }
  };

  const handleSelectImage = (id: string) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedImages(newSelected);
  };

  const handleAddToStore = async (images: GeneratedImage[]) => {
    setLoading(true);
    try {
      const response = await fetch('/api/save-clothing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          images: images,
          collection: collection,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save products');
      }

      const data = await response.json();
      setMessage({ type: 'success', text: `✅ Added ${data.products.length} products to store!` });
      setGeneratedImages([]);
      setSelectedImages(new Set());
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setMessage({ type: 'error', text: `Failed to add products: ${errorMessage}` });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSelectedToStore = async () => {
    if (selectedImages.size === 0) {
      setMessage({ type: 'error', text: 'Please select at least one image' });
      return;
    }
    const selected = generatedImages.filter(img => selectedImages.has(img.id));
    await handleAddToStore(selected);
  };

  const handleAddAllToStore = async () => {
    await handleAddToStore(generatedImages);
  };

  const toggleSelectAll = () => {
    if (selectedImages.size === generatedImages.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(generatedImages.map(img => img.id)));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            👶 Little's World AI Clothing Generator
          </h1>
          <p className="text-gray-600 text-base md:text-lg">Create stunning AI-generated clothing collections with automatic branding</p>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success' 
              ? 'bg-green-100 border-2 border-green-500 text-green-800' 
              : 'bg-red-100 border-2 border-red-500 text-red-800'
          }`}>
            {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span className="font-semibold">{message.text}</span>
          </div>
        )}

        {/* Main Controls */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8">
          {/* Collection Selector */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-pink-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📦 Select Collection</h2>
            <div className="space-y-3">
              <button
                onClick={() => setCollection('winter')}
                className={`w-full p-4 rounded-lg font-bold transition transform hover:scale-105 ${
                  collection === 'winter'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ❄️ Winter Collection
              </button>
              <button
                onClick={() => setCollection('summer')}
                className={`w-full p-4 rounded-lg font-bold transition transform hover:scale-105 ${
                  collection === 'summer'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ☀️ Summer Collection
              </button>
            </div>
          </div>

          {/* Prompt Editor */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">✍️ Custom Prompt</h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={defaultPrompts[collection]}
              className="w-full h-32 p-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none resize-none text-sm"
            />
            <p className="text-xs text-gray-500 mt-2">Leave empty to use default prompt for {collection}</p>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">⚙️ Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Images to Generate</label>
                <select 
                  value={imageCount}
                  onChange={(e) => setImageCount(parseInt(e.target.value))}
                  className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                >
                  <option value={4}>4 images</option>
                  <option value={8}>8 images</option>
                  <option value={12}>12 images</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quality</label>
                <select 
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                >
                  <option value="hd">High (1024x1024)</option>
                  <option value="uhd">Ultra (2048x2048)</option>
                </select>
              </div>
              <button
                onClick={handleGenerateImages}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap size={20} />
                {loading ? 'Generating...' : 'Generate Images'}
              </button>
            </div>
          </div>
        </div>

        {/* Generated Images Grid */}
        {generatedImages.length > 0 && (
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 border-2 border-pink-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                🖼️ Generated {collection.charAt(0).toUpperCase() + collection.slice(1)} Collection
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={toggleSelectAll}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
                >
                  {selectedImages.size === generatedImages.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
              {generatedImages.map((img) => (
                <div 
                  key={img.id}
                  onClick={() => handleSelectImage(img.id)}
                  className={`bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105 cursor-pointer border-4 ${
                    selectedImages.has(img.id) ? 'border-pink-500' : 'border-transparent'
                  }`}
                >
                  <div className="relative bg-white h-48 md:h-64 flex items-center justify-center overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Little's World Watermark */}
                    <div className="absolute top-2 right-2 bg-pink-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      👶 LW
                    </div>
                    {/* Selection Checkbox */}
                    <div className="absolute top-2 left-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <input
                        type="checkbox"
                        checked={selectedImages.has(img.id)}
                        onChange={() => {}}
                        className="w-5 h-5 cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 mb-1 text-sm md:text-base">{img.name}</h3>
                    <p className="text-xs md:text-sm text-gray-600 mb-2 line-clamp-2">{img.description}</p>
                    <div className="flex flex-col gap-2 mb-3">
                      <span className="text-sm font-bold text-pink-600">₹{img.price}</span>
                      <span className="text-xs text-gray-500">SKU: {img.sku}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadImage(img);
                      }}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-1 font-semibold transition text-sm"
                    >
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={handleAddSelectedToStore}
                disabled={loading || selectedImages.size === 0}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ➕ Add Selected ({selectedImages.size}) to Store
              </button>
              <button
                onClick={handleAddAllToStore}
                disabled={loading}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ✅ Add All ({generatedImages.length}) to Store
              </button>
              <button
                onClick={() => {
                  setGeneratedImages([]);
                  setSelectedImages(new Set());
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition"
              >
                <RefreshCw size={20} />
                Generate New
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        {generatedImages.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-pink-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📖 How to Use</h2>
            <ol className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="font-bold text-pink-600 text-lg">1.</span>
                <span>Select <strong>Winter</strong> or <strong>Summer</strong> collection</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-pink-600 text-lg">2.</span>
                <span>Customize the prompt or use the default AI-optimized prompts</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-pink-600 text-lg">3.</span>
                <span>Choose image quality (HD or Ultra) and quantity (4, 8, or 12)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-pink-600 text-lg">4.</span>
                <span>Click <strong>Generate Images</strong> - AI creates unique clothing designs</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-pink-600 text-lg">5.</span>
                <span>Review images - select ones you like with the checkboxes</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-pink-600 text-lg">6.</span>
                <span>Click <strong>Add to Store</strong> to save products to your database</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-pink-600 text-lg">7.</span>
                <span>Products are automatically assigned prices, SKUs, and Little's World branding</span>
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}