import { useState, useEffect } from 'react';
import { Loader, RefreshCw, Save } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function GenerateFeaturedProducts() {
  const [generating, setGenerating] = useState(false);
  const [products, setProducts] = useState([]);
  const [isClient, setIsClient] = useState(false);

  const defaultProducts = [
    { id: 1, name: 'Organic Cotton Romper', price: 899, rating: 4.8, category: 'rompers' },
    { id: 2, name: 'Soft Bamboo Onesie', price: 799, rating: 4.9, category: 'bodysuits' },
    { id: 3, name: 'Premium Sleep Set', price: 1299, rating: 4.7, category: 'sets' },
  ];

  useEffect(() => {
    setIsClient(true);
    loadProducts();
  }, []);

  const loadProducts = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('littlesworld_featured_products');
      if (saved) {
        setProducts(JSON.parse(saved));
      } else {
        setProducts(defaultProducts.map(p => ({ ...p, image: null, generating: false })));
      }
    }
  };

  const generateImage = async (productId) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, generating: true } : p
    ));

    const product = products.find(p => p.id === productId);

    try {
      const response = await fetch('/api/generate-clothing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: product.name,
          category: product.category,
          color: 'pastel',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setProducts(products.map(p =>
          p.id === productId 
            ? { ...p, image: data.imageUrl, generating: false }
            : p
        ));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate image');
      setProducts(products.map(p => 
        p.id === productId ? { ...p, generating: false } : p
      ));
    }
  };

  const generateAllImages = async () => {
    setGenerating(true);

    for (const product of products) {
      if (!product.image) {
        await generateImage(product.id);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Delay between requests
      }
    }

    setGenerating(false);
  };

  const saveProducts = () => {
    if (products.some(p => !p.image)) {
      alert('Please generate images for all products first');
      return;
    }

    localStorage.setItem('littlesworld_featured_products', JSON.stringify(products));
    alert('✅ Featured products saved! They will appear on homepage.');
    window.location.reload();
  };

  const deleteImage = (productId) => {
    setProducts(products.map(p =>
      p.id === productId ? { ...p, image: null } : p
    ));
  };

  if (!isClient) return null;

  const generatedCount = products.filter(p => p.image).length;

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
        <h1 className="text-4xl font-bold mb-2">Featured Products AI Generator</h1>
        <p className="text-gray-600 mb-8">Generate realistic product images for your homepage featured section</p>

        {/* Generate Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8 border-2 border-pink-100">
          <h2 className="text-2xl font-bold mb-4">Products to Generate ({generatedCount}/3)</h2>

          <button
            onClick={generateAllImages}
            disabled={generating || generatedCount === 3}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-lg flex items-center gap-3 text-lg transition mb-6"
          >
            {generating ? (
              <>
                <Loader className="animate-spin" size={24} />
                Generating Images...
              </>
            ) : generatedCount === 3 ? (
              <>✅ All Images Generated</>
            ) : (
              <>✨ Generate All Images</>
            )}
          </button>

          {generatedCount === 3 && (
            <button
              onClick={saveProducts}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg flex items-center gap-2 transition"
            >
              <Save size={20} />
              Save to Homepage Featured
            </button>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Image Area */}
              <div className="bg-gray-100 h-64 flex items-center justify-center relative overflow-hidden">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-2">📸</div>
                    <p className="text-gray-500 text-sm">No image yet</p>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-2xl font-bold text-pink-600">₹{product.price}</p>
                  <p className="text-yellow-500 font-bold">⭐ {product.rating}</p>
                </div>

                {/* Buttons */}
                <div className="space-y-2">
                  {product.image ? (
                    <>
                      <button
                        onClick={() => generateImage(product.id)}
                        disabled={product.generating}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2"
                      >
                        {product.generating ? (
                          <>
                            <Loader className="animate-spin" size={18} />
                            Generating...
                          </>
                        ) : (
                          <>
                            <RefreshCw size={18} />
                            Regenerate
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => deleteImage(product.id)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg"
                      >
                        Delete Image
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => generateImage(product.id)}
                      disabled={product.generating || generating}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2"
                    >
                      {product.generating ? (
                        <>
                          <Loader className="animate-spin" size={18} />
                          Generating...
                        </>
                      ) : (
                        <>✨ Generate Image</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-bold text-lg mb-3">💡 How to Use:</h3>
          <ol className="text-gray-700 space-y-2 list-decimal list-inside">
            <li>Click "Generate All Images" to create AI images for all 3 featured products</li>
            <li>Each image will show a realistic baby clothing item with LittlesWorld branding</li>
            <li>You can regenerate individual images or delete and try again</li>
            <li>Once all 3 are generated, click "Save to Homepage Featured"</li>
            <li>The images will appear on your homepage immediately</li>
          </ol>
        </div>

        {/* API Setup Box */}
        <div className="mt-6 p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
          <h3 className="font-bold text-lg mb-2">⚠️ To Enable AI Generation:</h3>
          <p className="text-gray-700 mb-3">Add this to your <code className="bg-gray-200 px-2 py-1 rounded">.env.local</code>:</p>
          <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto text-sm">
{`REPLICATE_API_TOKEN=your_token_from_replicate.com
OR
HUGGINGFACE_API_KEY=your_key_from_huggingface.co`}
          </pre>
          <p className="text-sm text-gray-600 mt-3">Then restart: <code className="bg-gray-200 px-2 py-1 rounded">npm run dev</code></p>
        </div>
      </div>
    </>
  );
}