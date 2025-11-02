"use client";

export default function Navbar() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-pink-200 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-600 cursor-pointer">
          Little's World
        </h1>
        <div className="space-x-6">
          <button
            onClick={() => scrollToSection("hero")}
            className="hover:text-pink-700 font-medium"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("products")}
            className="hover:text-pink-700 font-medium"
          >
            Products
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-pink-700 font-medium"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="hover:text-pink-700 font-medium"
          >
            Contact
          </button>
          <button
            onClick={() => scrollToSection("checkout")}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </nav>
  );
}
