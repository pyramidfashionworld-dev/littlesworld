import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Image from "next/image";

export default function Shop() {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: "Cute Pink Romper", price: 499, image: "/images/product1.jpg" },
    { id: 2, name: "Soft Cotton Onesie", price: 399, image: "/images/product2.jpg" },
    { id: 3, name: "Blue Baby Set", price: 599, image: "/images/product3.jpg" },
    { id: 4, name: "Floral Dress", price: 699, image: "/images/product4.jpg" },
    { id: 5, name: "Baby Shoes", price: 299, image: "/images/product5.jpg" },
    { id: 6, name: "Winter Wool Cap", price: 199, image: "/images/product6.jpg" },
    { id: 7, name: "Soft Blanket", price: 499, image: "/images/product7.jpg" },
    { id: 8, name: "Baby Socks Pack", price: 249, image: "/images/product8.jpg" },
    { id: 9, name: "Baby Feeding Bottle", price: 349, image: "/images/product9.jpg" },
    { id: 10, name: "Baby Gloves", price: 199, image: "/images/product10.jpg" },
    { id: 11, name: "Baby Carrier", price: 899, image: "/images/product11.jpg" },
    { id: 12, name: "Adorable Hat", price: 249, image: "/images/product12.jpg" },
    { id: 13, name: "Teddy Night Suit", price: 549, image: "/images/product13.jpg" },
    { id: 14, name: "Cartoon Print Bibs", price: 179, image: "/images/product14.jpg" },
    { id: 15, name: "Baby Pillow", price: 299, image: "/images/product15.jpg" },
    { id: 16, name: "Baby Towels", price: 399, image: "/images/product16.jpg" },
    { id: 17, name: "Cute Hairband Set", price: 149, image: "/images/product17.jpg" },
    { id: 18, name: "Baby Gift Box", price: 999, image: "/images/product18.jpg" },
  ];

  return (
    <div className="bg-pink-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Shop Header */}
      <section className="text-center py-10 bg-pink-100">
        <h1 className="text-4xl font-bold text-pink-600">Shop</h1>
        <p className="text-gray-600 mt-2">Adorable products for your little ones 💖</p>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto py-8 px-4 flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center hover:shadow-pink-200 transition-shadow duration-300"
            >
              <div className="w-full h-56 relative mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-xl"
                  onError={(e) => (e.target.src = "/images/fallback.jpg")}
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-pink-600 font-bold mt-1">₹{product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-3 px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pink-200 text-center py-6 text-pink-800 font-medium">
        <p>© {new Date().getFullYear()} Little World. All Rights Reserved.</p>
        <p>
          Follow us on{" "}
          <a
            href="https://www.instagram.com/dlittleworld_26"
            target="_blank"
            className="underline hover:text-pink-600"
          >
            Instagram
          </a>
        </p>
      </footer>
    </div>
  );
}
