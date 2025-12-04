import { useState, useEffect } from 'react';
import { Upload, Trash2, Plus, Save } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [formData, setFormData] = useState({
    id: Date.now(),
    name: '',
    price: '',
    description: '',
    category: 'newborn',
    imageFile: null,
    imagePreview: null,
  });

  useEffect(() => {
    setIsClient(true);
    loadProducts();
  }, []);

  const loadProducts = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('littlesworld_products');
      if (saved) {
        setProducts(JSON.parse(saved));
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          imageFile: file,
          imagePreview: event.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveProduct = () => {
    if (!formData.name || !formData.price || !formData.imagePreview) {
      alert('Please fill all fields and upload an image');
      return;
    }

    const newProduct = {
      id: formData.id,
      name: formData.name,
      price: parseInt(formData.price),
      description: formData.description,
      category: formData.category,
      image: formData.imagePreview,
      rating: 4.8,
    };

    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem('littlesworld_products', JSON.stringify(updated));

    alert('✅ Product saved successfully!');
    resetForm();
  };

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem('littlesworld_products', JSON.stringify(updated));
    alert('✅ Product deleted!');
  };

  const resetForm = () => {
    setFormData({
      id: Date.now(),
      name: '',
      price: '',
      description: '',
      category: 'newborn',
      imageFile: null,
      imagePreview: null,
    });
    setShowForm(false);
  };

  if (!isClient) return null;

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Product Manager</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {/* Add Product Form */}
        {showForm && (
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block font-semibold mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Organic Newborn Sleeper"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="1299"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600"
                >
                  <option value="newborn">Newborn</option>
                  <option value="3-6m">3-6 Months</option>
                  <option value="6-12m">6-12 Months</option>
                  <option value="accessories">Accessories</option>
                  <option value="sets">Sets</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Short description"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-600"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Upload Product Image</label>
              <div className="border-2 border-dashed border-pink-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageInput"
                />
                <label htmlFor="imageInput" className="cursor-pointer block">
                  {formData.imagePreview ? (
                    <div>
                      <img src={formData.imagePreview} alt="Preview" className="w-32 h-32 mx-auto rounded-lg mb-2 object-cover" />
                      <p className="text-green-600 font-semibold">Image selected</p>
                    </div>
                  ) : (
                    <div>
                      <Upload size={40} className="mx-auto text-pink-600 mb-2" />
                      <p className="text-gray-600">Click to upload product image</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={saveProduct}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2"
              >
                <Save size={20} />
                Save Product
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">No products yet. Click "Add Product" to get started!</p>
            </div>
          ) : (
            products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                {/* Product Image */}
                <div className="h-64 bg-gray-100 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>

                  <div className="flex justify-between items-center mb-4">
                    <p className="text-2xl font-bold text-pink-600">₹{product.price}</p>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this product?')) {
                        deleteProduct(product.id);
                      }
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}