// Step 1: Create this file - components/Navigation.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-pink-600">
            Little's World
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-pink-100 text-pink-700 border-b-2 border-pink-600'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-pink-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'bg-pink-100 text-pink-700'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

// Step 2: Create page files in app/ directory
// app/page.tsx (Home - modify existing if needed)
'use client';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Your existing home content */}
      </main>
    </>
  );
}

// Step 3: Create app/products/page.tsx
'use client';
import Navigation from '@/components/Navigation';

const products = [
  { id: 1, name: 'Pink Baby Dress', price: '₹899', image: '/images/product1.jpg' },
  { id: 2, name: 'Blue Romper', price: '₹749', image: '/images/product2.jpg' },
  { id: 3, name: 'Yellow Jumpsuit', price: '₹999', image: '/images/product3.jpg' },
  { id: 4, name: 'Cute Onesie', price: '₹699', image: '/images/product4.jpg' },
  { id: 5, name: 'Floral Frock', price: '₹849', image: '/images/product5.jpg' },
  { id: 6, name: 'Winter Jacket', price: '₹1199', image: '/images/product6.jpg' },
];

export default function Products() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-12">Our Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                  <p className="text-pink-600 text-xl font-bold mt-2">{product.price}</p>
                  <button className="w-full mt-4 bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

// Step 4: Create app/about/page.tsx
'use client';
import Navigation from '@/components/Navigation';

export default function About() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">About Little's World</h1>
          
          <section className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Little's World is dedicated to providing the finest quality baby clothing and accessories for your little ones. 
              With a focus on comfort, safety, and style, we bring you the best collection of baby wear.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to make parents' lives easier by offering high-quality, affordable, and fashionable baby products.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Why Choose Us?</h2>
            <ul className="space-y-3 text-gray-700">
              <li>✓ Premium quality materials</li>
              <li>✓ Safe and comfortable designs</li>
              <li>✓ Affordable pricing</li>
              <li>✓ Fast delivery across India</li>
              <li>✓ Customer satisfaction guaranteed</li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}

// Step 5: Create app/contact/page.tsx
'use client';
import Navigation from '@/components/Navigation';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="your@email.com"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pink-600 text-white py-3 rounded-md font-semibold hover:bg-pink-700 transition-colors"
              >
                Send Message
              </button>
            </form>

            <div className="mt-12 border-t pt-8">
              <h2 className="text-2xl font-bold text-pink-600 mb-4">Get in Touch</h2>
              <p className="text-gray-700 mb-2">📧 Email: contact@littlesworld.co.in</p>
              <p className="text-gray-700 mb-2">📱 Phone: +91 XXXXXXXXXX</p>
              <p className="text-gray-700">📍 Address: Little's World, India</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}