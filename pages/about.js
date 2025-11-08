import Navbar from "../components/Navbar";
import Image from "next/image";

export default function About() {
  return (
    <div className="bg-pink-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* About Header */}
      <section className="relative w-full h-[300px] md:h-[400px]">
        <Image
          src="/images/about-banner.jpg"
          alt="About Little World"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">About Little World</h1>
          <p className="text-lg md:text-xl">Because every little one deserves the best 💖</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto py-10 px-4 md:px-12 flex flex-col md:flex-row gap-10 flex-grow">
        {/* Left Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <Image
            src="/images/about-us.jpg"
            alt="Little World Babies"
            width={500}
            height={400}
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>

        {/* Right Text */}
        <div className="md:w-1/2 text-gray-700">
          <h2 className="text-3xl font-bold text-pink-600 mb-4">Our Story</h2>
          <p className="mb-4 leading-relaxed">
            Welcome to <strong>Little World</strong> — a place filled with love, comfort,
            and style for your little angels. Our mission is to bring you adorable,
            high-quality baby products that make parenting joyful and easy.
          </p>
          <p className="mb-4 leading-relaxed">
            Every item we offer is carefully curated with comfort, safety, and
            fashion in mind — from cozy rompers to stylish dresses, made with
            soft, baby-friendly fabrics.
          </p>
          <p className="mb-4 leading-relaxed">
            At <strong>Little World</strong>, we believe that babies deserve the
            best — and so do parents! That’s why we blend affordability, quality,
            and cuteness into everything we create.
          </p>
          <p className="leading-relaxed">
            Thank you for being part of our journey. Let’s make every moment with
            your little one special! 💕
          </p>
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
