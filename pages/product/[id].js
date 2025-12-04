import { useState } from 'react';
import Image from 'next/image';

export default function ProductDetail({ product }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = { ...product, size: selectedSize, quantity };
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image 
            src={product.images[0]} 
            alt={product.name}
            width={500}
            height={500}
            className="w-full"
          />
          <div className="flex gap-2 mt-4">
            {product.images.map((img, idx) => (
              <Image 
                key={idx}
                src={img} 
                alt="thumbnail"
                width={80}
                height={80}
                className="cursor-pointer"
              />
            ))}
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>
          
          <p className="text-3xl font-bold text-blue-600 mb-4">₹{product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Material:</label>
            <p>{product.material}</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Select Size:</label>
            <div className="flex gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size ? 'bg-blue-600 text-white' : 'bg-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Quantity:</label>
            <input 
              type="number" 
              min="1" 
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 px-3 py-2 border rounded"
            />
          </div>
          
          <button 
            onClick={addToCart}
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const products = require('@/data/products.json');
  const product = products.find(p => p.id === parseInt(params.id));
  return { props: { product }, revalidate: 60 };
}

export async function getStaticPaths() {
  const products = require('@/data/products.json');
  return {
    paths: products.map(p => ({ params: { id: p.id.toString() } })),
    fallback: 'blocking'
  };
}