import { useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';
import { addToCart } from '../components/ShoppingCart';

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Update cart count on page load
  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem('littlesworld_cart') || '[]');
      setCartCount(cart.length);
    };
    
    updateCount();
    window.addEventListener('storage', updateCount);
    return () => window.removeEventListener('storage', updateCount);
  }, []);

  return (
    <div>
      {/* Add Cart Icon to Header */}
      <header className="flex justify-between items-center p-4">
        <h1>Little's World</h1>
        <button 
          onClick={() => setCartOpen(true)}
          className="relative"
        >
          🛒 Cart
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* Your existing content */}
      
      {/* Add "Add to Cart" buttons to products */}
      <div className="product">
        <button onClick={() => {
          addToCart({
            id: '1',
            name: 'Product Name',
            price: 899,
            image: '/product.jpg',
            size: '6-12M'
          });
          setCartCount(prev => prev + 1);
        }}>
          Add to Cart
        </button>
      </div>

      {/* Shopping Cart Component */}
      <ShoppingCart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}