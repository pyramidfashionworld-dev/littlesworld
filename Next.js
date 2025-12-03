// pages/_app.js - Global Layout with Fixed Navigation
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import styles from '@/styles/layout.module.css';

export default function App({ Component, pageProps }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Collections', path: '/collections', submenu: true },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' }
  ];

  const collections = [
    { name: 'Baby Warm Winter', path: '/collections/baby-warm-winter' },
    { name: 'Baby Summer', path: '/collections/baby-summer' },
    { name: 'Baby Casual Wear', path: '/collections/baby-casual' },
    { name: 'Baby Formal Wear', path: '/collections/baby-formal' },
    { name: 'Toddler Active Wear', path: '/collections/toddler-active' }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>🌍</span>
            Little's World
          </Link>

          {/* Desktop Navigation */}
          <ul className={styles.navMenu}>
            {navigation.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <Link href={item.path} className={styles.navLink}>
                  {item.name}
                  {item.submenu && <span className={styles.arrow}>▼</span>}
                </Link>

                {/* Collections Submenu */}
                {item.submenu && (
                  <ul className={styles.submenu}>
                    {collections.map((collection) => (
                      <li key={collection.path}>
                        <Link href={collection.path} className={styles.submenuLink}>
                          {collection.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenu}>
            {navigation.map((item) => (
              <div key={item.path}>
                <Link
                  href={item.path}
                  className={styles.mobileNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className={styles.mobileSubmenu}>
                    {collections.map((collection) => (
                      <Link
                        key={collection.path}
                        href={collection.path}
                        className={styles.mobileSubmenuLink}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {collection.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </header>

      <main className={styles.main}>
        <Component {...pageProps} />
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 Little's World. All rights reserved.</p>
      </footer>
    </div>
  );
}

// ============================================
// pages/index.js - Homepage
// ============================================
export default function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Little's World</h1>
        <p>Your ultimate destination for amazing experiences</p>
      </section>

      <section className="collections-preview">
        <h2>Our Collections</h2>
        <div className="collection-grid">
          <CollectionCard 
            title="Baby Warm Winter" 
            image="/images/winter.jpg"
            link="/collections/baby-warm-winter"
          />
          <CollectionCard 
            title="Baby Summer" 
            image="/images/summer.jpg"
            link="/collections/baby-summer"
          />
          <CollectionCard 
            title="Baby Casual Wear" 
            image="/images/casual.jpg"
            link="/collections/baby-casual"
          />
        </div>
      </section>
    </div>
  );
}

function CollectionCard({ title, image, link }) {
  return (
    <Link href={link} className="collection-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <button>Shop Now</button>
    </Link>
  );
}

// ============================================
// pages/about.js - About Page
// ============================================
export default function About() {
  return (
    <div className="about">
      <h1>About Little's World</h1>
      <p>We are dedicated to providing the best baby clothes...</p>
    </div>
  );
}

// ============================================
// pages/services.js - Services Page
// ============================================
export default function Services() {
  return (
    <div className="services">
      <h1>Our Services</h1>
      <ul>
        <li>Premium Quality Baby Clothes</li>
        <li>Fast Shipping</li>
        <li>Easy Returns</li>
        <li>Customer Support</li>
      </ul>
    </div>
  );
}

// ============================================
// pages/collections/index.js - All Collections
// ============================================
export default function CollectionsPage() {
  const collections = [
    {
      id: 'baby-warm-winter',
      name: 'Baby Warm Winter Collection',
      description: 'Cozy warm clothes for babies 0-4 years',
      image: '/images/winter.jpg'
    },
    {
      id: 'baby-summer',
      name: 'Baby Summer Collection',
      description: 'Light and breathable summer wear',
      image: '/images/summer.jpg'
    },
    {
      id: 'baby-casual',
      name: 'Baby Casual Wear',
      description: 'Comfortable everyday clothing',
      image: '/images/casual.jpg'
    },
    {
      id: 'baby-formal',
      name: 'Baby Formal Wear',
      description: 'Elegant outfits for special occasions',
      image: '/images/formal.jpg'
    },
    {
      id: 'toddler-active',
      name: 'Toddler Active Wear',
      description: 'Durable clothes for active play',
      image: '/images/active.jpg'
    }
  ];

  return (
    <div className="collections-page">
      <h1>All Collections</h1>
      <div className="collections-grid">
        {collections.map((collection) => (
          <Link key={collection.id} href={`/collections/${collection.id}`}>
            <div className="collection-item">
              <img src={collection.image} alt={collection.name} />
              <h3>{collection.name}</h3>
              <p>{collection.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ============================================
// pages/collections/[id].js - Dynamic Collection Page
// ============================================
import Head from 'next/head';

const collectionData = {
  'baby-warm-winter': {
    name: 'Baby Warm Winter Collection',
    description: 'Cozy warm clothes for babies 0-4 years',
    products: [
      {
        id: 1,
        name: 'Thermal Baby Bodysuit',
        price: 599,
        age: '0-12 months',
        image: '/images/thermal-bodysuit.jpg',
        description: 'Soft thermal bodysuits for newborns'
      },
      {
        id: 2,
        name: 'Fleece Baby Hoodie',
        price: 899,
        age: '1-3 years',
        image: '/images/fleece-hoodie.jpg',
        description: 'Warm fleece hoodies for active toddlers'
      },
      {
        id: 3,
        name: 'Winter Baby Jacket',
        price: 1299,
        age: '2-4 years',
        image: '/images/winter-jacket.jpg',
        description: 'Insulated winter jackets with waterproof finish'
      }
    ]
  },
  'baby-summer': {
    name: 'Baby Summer Collection',
    description: 'Light and breathable summer wear',
    products: [
      {
        id: 1,
        name: 'Cotton Summer Dress',
        price: 499,
        age: '0-12 months',
        image: '/images/summer-dress.jpg',
        description: 'Lightweight cotton dress for summer'
      }
    ]
  }
};

export default function CollectionPage({ collection }) {
  if (!collection) return <div>Collection not found</div>;

  return (
    <>
      <Head>
        <title>{collection.name} | Little's World</title>
        <meta name="description" content={collection.description} />
        <meta name="keywords" content={`baby clothes, ${collection.name}`} />
        <link rel="canonical" href={`https://littlesworld.co.in/collections/${collection.name.toLowerCase().replace(/\s+/g, '-')}`} />
      </Head>

      <div className="collection-page">
        <h1>{collection.name}</h1>
        <p className="description">{collection.description}</p>

        <div className="products-grid">
          {collection.products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="age">Age: {product.age}</p>
              <p className="description">{product.description}</p>
              <p className="price">₹{product.price}</p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const collection = collectionData[params.id];
  
  if (!collection) {
    return { notFound: true };
  }

  return {
    props: { collection },
    revalidate: 60
  };
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(collectionData).map(id => ({
      params: { id }
    })),
    fallback: 'blocking'
  };
}