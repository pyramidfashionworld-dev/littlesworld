import "@/styles/globals.css";
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">

// pages/_app.js
import "../styles/globals.css";
import { CartProvider } from "../context/CartContext";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
