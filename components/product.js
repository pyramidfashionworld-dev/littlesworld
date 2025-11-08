"use client";
import Image from "next/image";

export default function ProductGallery() {
  const products = [
    { id: 1, name: "Little World Romper", image: "/images/product1.jpg", price: "₹699" },
    { id: 2, name: "Baby Hoodie Set", image: "/images/product2.jpg", price: "₹899" },
    { id: 3, name: "Cute Onesie", image: "/images/product3.jpg", price: "₹499" },
  ];

  return (
    <section className="p-8 text-center">
      <h2 className="text-3xl font-semibold mb-6 text-pink-600">Our Baby Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-center">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="rounded-xl object-cover"
            />
            <h3 className="mt-3 text-lg font-medium">{product.name}</h3>
            <p className="text-pink-500 font-semibold">{product.price}</p>
            <button className="mt-3 px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600">
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
