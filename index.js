import '@google/model-viewer';
import Image from "next/image";

export default function Home() {
  const products = [
    { id: 1, name: "Baby Romper", img: "/products/romper1.jpg", price: "₹499" },
    { id: 2, name: "Baby T-Shirt", img: "/products/tshirt1.jpg", price: "₹399" },
    { id: 3, name: "Baby Dress", img: "/products/dress1.jpg", price: "₹599" },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>Welcome to Little's World</h1>
        <p>High-quality clothes for babies 0-2 years</p>
      </header>

      {/* 3D Crawling Baby Model */}
      <section style={{ textAlign: "center", marginBottom: "50px" }}>
        <h2>Crawling Baby 3D Model</h2>
        <model-viewer
          src="/models/baby_crawling.glb"
          alt="Crawling Baby"
          auto-rotate
          camera-controls
          style={{ width: "300px", height: "300px" }}
        ></model-viewer>
      </section>

      {/* Products */}
      <section>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Our Products</h2>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap"
        }}>
          {products.map((product) => (
            <div key={product.id} style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              width: "200px",
              textAlign: "center"
            }}>
              <Image src={product.img} alt={product.name} width={180} height={180} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
