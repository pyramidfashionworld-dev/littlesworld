// pages/order-success.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CheckCircle, Package, Home } from 'lucide-react';

export default function OrderSuccess() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (id) {
      const orders = JSON.parse(localStorage.getItem('littlesworld_orders') || '[]');
      const foundOrder = orders.find(o => o.id === id);
      setOrder(foundOrder);
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="inline-block p-4 bg-green-100 rounded-full mb-6">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully! 🎉</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase! Your order has been confirmed.
        </p>

        {order && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-bold text-lg mb-4">Order Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-semibold">#{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold">{order.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold text-pink-600">₹{order.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment ID:</span>
                <span className="font-semibold text-xs">{order.paymentId}</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-4">
            <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Expected Delivery</h3>
            <p className="text-sm text-gray-600">5-7 Business Days</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <Home className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Delivery To</h3>
            <p className="text-sm text-gray-600">{order?.customerName}</p>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          We've sent a confirmation email with order details.
          You can track your order in your account.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/account">
            <button className="bg-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-pink-600 transition">
              View My Orders
            </button>
          </Link>
          <Link href="/shop">
            <button className="border-2 border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}