'use client';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Baby Warm Winter Jacket', price: 1999, stock: 45, category: 'Winter Wear' },
      { id: 2, name: 'Toddler Active Wear', price: 899, stock: 62, category: 'Active Wear' },
      { id: 3, name: 'Baby Formal Wear', price: 1499, stock: 28, category: 'Formal Wear' },
      { id: 4, name: 'Casual Baby Dress', price: 799, stock: 85, category: 'Casual' },
    ];
    setProducts(mockProducts);
    setLoading(false);
  }, []);

  if (loading) return <div className="text-center py-10">Loading products...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Product Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Stock</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">₹{product.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${product.stock > 30 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-purple-600 hover:underline mr-4">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}