// pages/api/products.js - Create a backend API
import products from '@/data/products.json';

export default function handler(req, res) {
  const { category, ageGroup, minPrice, maxPrice, search } = req.query;
  
  let filtered = products;
  
  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }
  if (ageGroup) {
    filtered = filtered.filter(p => p.ageGroup === ageGroup);
  }
  if (minPrice && maxPrice) {
    filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);
  }
  if (search) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.status(200).json(filtered);
}