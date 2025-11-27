import React, { useState } from 'react';
import { Loader2, Download, Sparkles } from 'lucide-react';

export default function ClothingGenerator() {
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [clothingType, setClothingType] = useState('onesie');
  const [color, setColor] = useState('white');
  const [pattern, setPattern] = useState('solid');

  const clothingTypes = [
    { value: 'onesie', label: 'Onesie' },
    { value: 'romper', label: 'Romper' },
    { value: 'bodysuit', label: 'Bodysuit' },
    { value: 'sleepsuit', label: 'Sleepsuit' },
    { value: 'dress', label: 'Baby Dress' },
    { value: 'set', label: 'Outfit Set' }
  ];

  const colors = [
    { value: 'white', label: 'White' },
    { value: 'pink', label: 'Soft Pink' },
    { value: 'blue', label: 'Baby Blue' },
    { value: 'yellow', label: 'Pastel Yellow' },
    { value: 'mint', label: 'Mint Green' },
    { value: 'lavender', label: 'Lavender' },
    { value: 'peach', label: 'Peach' }
  ];

  const patterns = [
    { value: 'solid', label: 'Solid Color' },
    { value: 'stripes', label: 'Stripes' },
    { value: 'polka dots', label: 'Polka Dots' },
    { value: 'stars', label: 'Stars' },
    { value: 'animals', label: 'Cute Animals' },
    { value: 'floral', label: 'Floral' }
  ];

  const generateClothing = async () => {
    setLoading(true);
    setGeneratedImage(null);

    const fullPrompt = `Create a photorealistic product image of a newborn baby ${clothingType} in ${color} color with ${pattern} pattern. The clothing should be displayed flat lay style on a clean white background, professionally lit with soft shadows. The garment should have a small fabric tag visible with "LittlesWorld" brand name embroidered or printed on it. The tag should look natural and high-quality. The clothing should look soft, premium quality, suitable for newborns (0-3 months). Studio photography style, e-commerce product photo quality. ${prompt ? 'Additional details: ' + prompt : ''}`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: fullPrompt
            }
          ]
        })
      });

      const data = await response.json();
      
      // Extract text response
      const textContent = data.content
        .filter(item => item.type === 'text')
        .map(item => item.text)
        .join('\n');

      setGeneratedImage({
        description: textContent,
        prompt: fullPrompt
      });
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPrompt = () => {
    const blob = new Blob([generatedImage.prompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'littlesworld-prompt.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="text-pink-500" />
            LittlesWorld Clothing Generator
          </h1>
          <p className="text-gray-600">Create stunning product images for your newborn collection</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Panel - Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Clothing Type
              </label>
              <select
                value={clothingType}
                onChange={(e) => setClothingType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-400"
              >
                {clothingTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Color
              </label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-400"
              >
                {colors.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pattern
              </label>
              <select
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-400"
              >
                {patterns.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Details (Optional)
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., with buttons, organic cotton, gender neutral..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-pink-400 h-24 resize-none"
              />
            </div>

            <button
              onClick={generateClothing}
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-4 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Product Image
                </>
              )}
            </button>
          </div>

          {/* Right Panel - Preview */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Generated Design</h2>
            
            {!generatedImage && !loading && (
              <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
                <div className="text-center text-gray-400">
                  <Sparkles size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Your generated clothing will appear here</p>
                </div>
              </div>
            )}

            {loading && (
              <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="animate-spin mx-auto mb-4 text-pink-500" size={48} />
                  <p className="text-gray-600">Creating your LittlesWorld product...</p>
                </div>
              </div>
            )}

            {generatedImage && (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-6 border-2 border-pink-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {generatedImage.description}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">💡 Next Steps:</h3>
                  <p className="text-sm text-blue-800">
                    Use this description with AI image generators like DALL-E, Midjourney, or Stable Diffusion to create the actual product photos. Download the prompt below to use with your preferred tool!
                  </p>
                </div>

                <button
                  onClick={downloadPrompt}
                  className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Download Full Prompt
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-3">🎨 Tips for Best Results:</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>• Use the generated prompts with tools like Midjourney, DALL-E, or Stable Diffusion</li>
            <li>• For consistent branding, keep the same lighting and background style across all products</li>
            <li>• The "LittlesWorld" tag will be incorporated naturally into each design</li>
            <li>• Try different combinations to build a complete collection</li>
            <li>• Add specific fabric details in the "Additional Details" field for more realistic results</li>
          </ul>
        </div>
      </div>
    </div>
  );
}