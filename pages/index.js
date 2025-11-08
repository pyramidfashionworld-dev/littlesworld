import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const products = [
    { id: 1, name: "Pink Baby Dress", price: "₹899", image: "/images/product1.jpg" },
    { id: 2, name: "Blue Romper", price: "₹749", image: "/images/product2.jpg" },
    { id: 3, name: "Yellow Jumpsuit", price: "₹999", image: "/images/product3.jpg" },
    { id: 4, name: "Cute Onesie", price: "₹699", image: "/images/product4.jpg" },
    { id: 5, name: "Floral Frock", price: "₹849", image: "/images/product5.jpg" },
    { id: 6, name: "Winter Jacket", price: "₹1199", image: "/images/product6.jpg" },
    { id: 7, name: "Soft Cap Set", price: "₹499", image: "/images/product7.jpg" },
    { id: 8, name: "Baby Socks", price: "₹299", image: "/images/product8.jpg" },
    { id: 9, name: "Cotton Bibs", price: "₹199", image: "/images/product9.jpg" },
    { id: 10, name: "Sleep Suit", price: "₹899", image: "/images/product10.jpg" },
    { id: 11, name: "Party Dress", price: "₹1299", image: "/images/product11.jpg" },
  ];

  return (
    <>
      <Head>
        <title>Little’s World | Baby Clothing</title>
      </Head>

      {/* ✅ Banner Section */}
      <section className="relative w-full h-[400px]">
        <Image
          src="/images/banner.jpg"
          alt="Baby Clothing Banner"
          layout="fill"
          objectFit="cover"
          className="brightness-90"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black/30">
          <h1 className="text-4xl md:text-6xl font-bold">Welcome to Little’s World</h1>
          <p className="mt-3 text-lg md:text-2xl">Cute • Comfy • Colorful</p>
          <Link href="/shop">
            <button className="mt-5 px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-full text-white text-lg shadow-lg">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      {/* ✅ Product Section */}
      <section className="py-12 bg-pink-50">
        <h2 className="text-3xl font-bold text-center mb-8">Our Latest Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
              <div className="relative w-full h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
              <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
              <p className="text-pink-600 font-bold">{product.price}</p>
              <button className="mt-3 w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ About Section */}
      <section className="py-16 px-6 md:px-20 flex flex-col md:flex-row items-center bg-white">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <Image
            src="/images/about.jpg"
            alt="About Little’s World"
            width={500}
            height={400}
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>
        <div className="md:w-1/2 md:pl-10">
          <h2 className="text-3xl font-bold mb-4">About Little’s World</h2>
          <p className="text-gray-700 leading-relaxed">
            At Little’s World, we believe your baby deserves the softest, cutest, and safest clothing. 
            Our fabrics are handpicked for comfort, and our designs are crafted with love — perfect for 
            every precious smile and giggle.
          </p>
          <Link href="/about">
            <button className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition">
              Learn More
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
