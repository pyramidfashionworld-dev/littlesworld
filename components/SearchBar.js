import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    ageGroup: '',
    minPrice: 0,
    maxPrice: 2000
  });

  const handleSearch = async () => {
    const params = new URLSearchParams({
      search: searchTerm,
      ...filters
    });
    
    const res = await fetch(`/api/products?${params}`);
    const data = await res.json();
    onSearch(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex gap-4 mb-4">
        <input 
          type="text" 
          placeholder="Search baby clothes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded"
        />
        <button 
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        <select 
          value={filters.category}
          onChange={(e) => setFilters({...filters, category: e.target.value})}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="Dresses">Dresses</option>
          <option value="Rompers">Rompers</option>
          <option value="Jackets">Jackets</option>
          <option value="Accessories">Accessories</option>
        </select>
        
        <select 
          value={filters.ageGroup}
          onChange={(e) => setFilters({...filters, ageGroup: e.target.value})}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Ages</option>
          <option value="0-3">0-3 months</option>
          <option value="3-6">3-6 months</option>
          <option value="6-12">6-12 months</option>
        </select>
        
        <input 
          type="number" 
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
          className="px-4 py-2 border rounded"
        />
        
        <input 
          type="number" 
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
          className="px-4 py-2 border rounded"
        />
      </div>
    </div>
  );
}