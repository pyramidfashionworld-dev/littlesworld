// app/layout.js
import '../styles/globals.css';

export const metadata = {
  title: 'Little World',
  description: '3D baby clothes website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '20px', background: '#f5f5f5' }}>
          <h1>Little World</h1>
        </header>
        <main>{children}</main>
        <footer style={{ padding: '20px', background: '#f5f5f5', marginTop: '20px' }}>
          © 2025 Little World
        </footer>
      </body>
    </html>
  );
}
