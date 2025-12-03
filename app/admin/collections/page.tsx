'use client';
export default function CollectionsPage() {
  const collections = [
    { id: 1, name: 'Baby Warm Winter', products: 12 },
    { id: 2, name: 'Baby Summer', products: 8 },
    { id: 3, name: 'Toddler Active Wear', products: 15 },
    { id: 4, name: 'Baby Formal Wear', products: 6 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Collections</h1>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
          + Add Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {collections.map((collection) => (
          <div key={collection.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h2 className="text-lg font-bold mb-2">{collection.name}</h2>
            <p className="text-gray-600 mb-4">{collection.products} products</p>
            <div className="flex gap-2">
              <button className="text-purple-600 hover:underline text-sm">Edit</button>
              <button className="text-red-600 hover:underline text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}