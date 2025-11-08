import Link from "next/link";
import { useEffect } from "react";

export default function Success() {
  useEffect(() => {
    // Optionally clear local cart storage if used
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <img
          src="/images/success.png"
          alt="Success"
          className="mx-auto mb-6 w-24 h-24"
        />
        <h1 className="text-3xl font-bold text-pink-600 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-700 mb-4">
          Thank you for your purchase at <span className="font-semibold">Little’s World</span>.
        </p>
        <p className="text-gray-500 mb-6">
          A confirmation email with your order details has been sent.
        </p>
        <Link href="/">
          <button className="bg-pink-500 text-white py-2 px-6 rounded-lg hover:bg-pink-600 transition">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
