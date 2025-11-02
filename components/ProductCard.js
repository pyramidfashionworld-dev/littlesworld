// components/ProductCard.js
import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="h-56 relative">
        <Image src={`/products/${product.image}`} alt={product.name} fill style={{objectFit:'cover'}}/>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        <p className="text-pink-600 font-bold mt-2">₹{product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-3 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
