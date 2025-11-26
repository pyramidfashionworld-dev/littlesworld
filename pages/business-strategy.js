import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function BusinessStrategy() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <Head>
        <title>Business Strategy - Little World</title>
        <meta name="description" content="D2C Kids Apparel Market Strategy & Business Plan" />
      </Head>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        lineHeight: 1.6,
        color: '#333'
      }}>
        {/* Header */}
        <div style={{ 
          background: 'linear-gradient(135deg, #ff6b8b 0%, #ff8e53 100%)',
          color: 'white',
          padding: '40px 20px',
          textAlign: 'center',
          borderRadius: '15px',
          marginBottom: '30px'
        }}>
          <h1 style={{ fontSize: '2.5em', marginBottom: '10px' }}>🍼 Little World</h1>
          <p style={{ fontSize: '1.2em', opacity: 0.9 }}>D2C Kids Apparel Market Strategy & Business Plan</p>
        </div>

        {/* Back to Store Button */}
        <div style={{ marginBottom: '30px' }}>
          <Link 
            href="/checkout"
            style={{
              display: 'inline-block',
              background: '#ff6b8b',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            ← Back to Store
          </Link>
        </div>

        {/* Rest of your business strategy code remains the same */}
        {/* ... */}
      </div>
    </>
  );
}