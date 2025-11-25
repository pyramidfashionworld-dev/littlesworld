# LittlesWorld Full Upgrade – Next.js + Tailwind + Razorpay + Vercel

Below are **all files** required for a complete upgraded version of your website, ready for Vercel deployment.

Each section contains the filename and the code.

---

## 📌 package.json

```json
{
  "name": "littlesworld",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.1.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "axios": "1.6.0",
    "sharp": "0.33.2"
  },
  "devDependencies": {
    "autoprefixer": "10.4.15",
    "postcss": "8.4.30",
    "tailwindcss": "3.3.3"
  }
}
```

---

## 📌 next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["littlesworld.co.in", "res.cloudinary.com"],
  },
};
module.exports = nextConfig;
```

---

## 📌 tailwind.config.cjs

```js
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

## 📌 pages/_app.js

```js
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

---

## 📌 components/Navbar.js

```js
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full p-4 bg-white shadow sticky top-0 z-50 flex justify-between items-center">
      <h1 className="text-xl font-bold">LittlesWorld</h1>
      <div className="flex gap-6 text-lg">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/trade-in">Trade-In</Link>
      </div>
    </nav>
  );
}
```

---

## 📌 components/Footer.js

```js
export default function Footer() {
  return (
    <footer className="w-full bg-black text-white p-8 text-center mt-10">
      <p>LittlesWorld © 2025. All Rights Reserved.</p>
    </footer>
  );
}
```

---

## 📌 components/ProductCard.js

```js
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.slug}`}>
      <div className="shadow rounded-xl p-4 hover:scale-105 transition bg-white">
        <Image src={product.image} width={400} height={400} alt={product.name} className="rounded" />
        <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
        <p className="text-md font-bold text-pink-600">₹{product.price}</p>
      </div>
    </Link>
  );
}
```

---

## 📌 components/GrowthBadge.js

```js
export default function GrowthBadge() {
  return (
    <div className="bg-green-100 p-4 rounded-xl mt-4 shadow">
      <h3 className="font-bold text-green-700 text-lg">Growth Guarantee</h3>
      <p className="text-sm mt-2 text-gray-700">
        If your little one outgrows this item within 90 days, return it for store credit.
      </p>
    </div>
  );
}
```

---

## 📌 pages/index.js (Homepage)

```js
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="p-10 text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to LittlesWorld</h1>
        <p className="text-lg">Premium Babywear with Growth Guarantee</p>
        <Link href="/shop" className="mt-6 inline-block bg-pink-600 text-white px-6 py-3 rounded-xl text-lg">
          Browse Products
        </Link>
      </main>
      <Footer />
    </>
  );
}
```

---

## 📌 pages/shop.js

```js
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

const products = [
  {
    name: "Premium Romper",
    slug: "premium-romper",
    price: 799,
    image: "/images/romper1.jpg",
  },
];

export default function Shop() {
  return (
    <>
      <Navbar />
      <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <ProductCard key={i} product={p} />
        ))}
      </div>
      <Footer />
    </>
  );
}
```

---

## 📌 pages/product/[slug].js

```js
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GrowthBadge from "../../components/GrowthBadge";
import RazorpayButton from "../../components/RazorpayButton";

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;

  const product = {
    name: "Premium Romper",
    price: 799,
    description: "Soft premium cotton for your baby.",
  };

  return (
    <>
      <Navbar />
      <main className="p-10">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-lg">₹{product.price}</p>
        <p className="mt-4 text-gray-600">{product.description}</p>

        <GrowthBadge />

        <RazorpayButton product={product} />
      </main>
      <Footer />
    </>
  );
}
```

---

## 📌 components/RazorpayButton.js

```js
import axios from "axios";

export default function RazorpayButton({ product }) {
  const payNow = async () => {
    const order = await axios.post("/api/create-order", {
      amount: product.price,
    });

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: order.data.amount,
      currency: "INR",
      name: "LittlesWorld",
      order_id: order.data.id,
      handler: async function (response) {
        await axios.post("/api/verify-payment", response);
        alert("Payment Successful!");
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={payNow}
      className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-xl"
    >
      Buy Now
    </button>
  );
}
```

---

## 📌 pages/api/create-order.js

```js
import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  const order = await razorpay.orders.create({
    amount: req.body.amount * 100,
    currency: "INR",
  });

  res.json(order);
}
```

---

## 📌 pages/api/verify-payment.js

```js
import crypto from "crypto";

export default async function handler(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === razorpay_signature) {
    return res.json({ success: true });
  }

  res.status(400).json({ success: false });
}
```

---

## 📌 pages/checkout.js

```js
export default function Checkout() {
  return <h1 className="p-10 text-3xl font-bold">Checkout Page</h1>;
}
```

---

## 📌 pages/trade-in.js

```js
export default function TradeIn() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Trade-In Program</h1>
      <p className="mt-4 text-gray-600">
        Return outgrown items for store credit.
      </p>
    </div>
  );
}
```

---

## 📌 public/images/README.txt

```
Place all product and banner images in this folder.
```

---

# ✅ **Next: Vercel Deployment Steps + Growth Guarantee Policy**

Tell me and I will continue.
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="bg-pink-200 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/">
          <h1 className="text-2xl font-bold text-pink-600 cursor-pointer">
            Little World
          </h1>
        </Link>

        <div className="flex items-center gap-6 text-pink-700 font-medium">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>

          <Link href="/checkout" className="relative">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs px-2">
                {cart.length}
              </span>
            )}
          </Link>

          <a
            href="https://www.instagram.com/dlittleworld_26"
            target="_blank"
            className="text-pink-700 hover:text-pink-900"
          >
            📷 Instagram
          </a>
        </div>
      </div>
    </nav>
  );
}
