// app/layout.js
import '../styles/globals.css';

export const metadata = {
  title: 'Little World',
  description: '3D baby clothes website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
