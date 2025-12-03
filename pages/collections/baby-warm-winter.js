// pages/collections/baby-warm-winter.js
import React from 'react';
import Head from 'next/head';
import ProductGrid from '@/components/ProductGrid';

export default function BabyWarmWinterCollection() {
  const siteUrl = 'https://littlesworld.co.in';
  const collectionUrl = `${siteUrl}/collections/baby-warm-winter`;
  const imageUrl = `${siteUrl}/images/baby-winter-collection-banner.jpg`;

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Baby Warm Winter Collection | 0-4 Years | Little's World</title>
        <meta 
          name="description" 
          content="Shop cozy warm winter clothes for babies 0-4 years old. Premium quality thermal wear, fleece hoodies, and insulated jackets for maximum comfort." 
        />
        <meta 
          name="keywords" 
          content="baby winter clothes, warm baby wear, baby thermal wear, toddler winter jackets, 0-4 years baby clothes, baby fleece hoodies" 
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Little's World" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={collectionUrl} />
        <meta property="og:title" content="Baby Warm Winter Collection | Little's World" />
        <meta 
          property="og:description" 
          content="Discover premium warm winter clothes for babies 0-4 years. Soft, comfortable, and perfect for cold weather." 
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="Little's World" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={collectionUrl} />
        <meta property="twitter:title" content="Baby Warm Winter Collection | Little's World" />
        <meta 
          property="twitter:description" 
          content="Premium warm winter clothes for babies 0-4 years. Cozy and comfortable." 
        />
        <meta property="twitter:image" content={imageUrl} />

        {/* Canonical URL */}
        <link rel="canonical" href={collectionUrl} />

        {/* Structured Data (Schema.org) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "CollectionPage",
            "name": "Baby Warm Winter Collection",
            "url": collectionUrl,
            "description": "Warm winter clothes for babies 0-4 years old",
            "image": imageUrl,
            "publisher": {
              "@type": "Organization",
              "name": "Little's World",
              "url": siteUrl,
              "logo": `${siteUrl}/logo.png`
            }
          })}
        </script>

        {/* Product Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Baby Warm Winter Collection",
            "numberOfItems": 3,
            "itemListElement": [
              {
                "@type": "Product",
                "name": "Baby Thermal Bodysuit",
                "url": `${siteUrl}/products/thermal-bodysuit`,
                "image": `${siteUrl}/images/thermal-bodysuit.jpg`,
                "description": "Soft thermal bodysuits for newborns",
                "offers": {
                  "@type": "Offer",
                  "price": "599",
                  "priceCurrency": "INR"
                }
              },
              {
                "@type": "Product",
                "name": "Fleece Baby Hoodie",
                "url": `${siteUrl}/products/fleece-hoodie`,
                "image": `${siteUrl}/images/fleece-hoodie.jpg`,
                "description": "Warm fleece hoodies for active toddlers",
                "offers": {
                  "@type": "Offer",
                  "price": "899",
                  "priceCurrency": "INR"
                }
              },
              {
                "@type": "Product",
                "name": "Winter Baby Jacket",
                "url": `${siteUrl}/products/winter-jacket`,
                "image": `${siteUrl}/images/winter-jacket.jpg`,
                "description": "Insulated winter jackets with waterproof finish",
                "offers": {
                  "@type": "Offer",
                  "price": "1299",
                  "priceCurrency": "INR"
                }
              }
            ]
          })}
        </script>

        {/* Viewport & Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#6366f1" />
      </Head>

      <div className="collection-page">
        <div className="collection-header">
          <h1>Baby Warm Winter Collection</h1>
          <p>Cozy comfort for babies 0-4 years old</p>
        </div>
        
        <div className="collection-filters">
          <select onChange={(e) => filterByAge(e.target.value)}>
            <option>All Ages</option>
            <option>0-12 months</option>
            <option>1-2 years</option>
            <option>2-4 years</option>
          </select>
        </div>

        <ProductGrid category="baby-warm-winter" />
      </div>
    </>
  );
}