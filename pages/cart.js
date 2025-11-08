import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          Your Shopping Cart 🛍️
        </h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>Your cart is empty.</p>
            <Link
              href="/shop"
              className="inline-block mt-4 bg-pink-500 text-white px-6 py-2 rounded-xl hover:bg-pink-600"
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-pink-500 font-semibold">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-100 text-red-500 px-4 py-1 rounded-xl hover:bg-red-200"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                Total: ₹{totalPrice}
              </h2>

              <div className="flex justify-center gap-4">
                <button
                  onClick={clearCart}
                  className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl hover:bg-gray-300"
                >
                  Clear Cart
                </button>

                <Link
                  href="/checkout"
                  className="bg-pink-500 text-white px-6 py-2 rounded-xl hover:bg-pink-600"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
