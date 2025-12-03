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
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>🌍</span>
            Little's World
          </Link>

          <ul className={styles.navMenu}>
            {navigation.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <Link href={item.path} className={styles.navLink}>
                  {item.name}
                  {item.submenu && <span className={styles.arrow}>▼</span>}
                </Link>

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

          <button
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </nav>

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