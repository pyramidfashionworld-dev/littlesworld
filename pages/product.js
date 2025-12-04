import Link from 'next/link';

export default function Products() {
  const products = [
    { id: '1', name: 'Organic Cotton Romper', price: 899, image: '/product1.jpg' },
    // Add your products
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      {products.map(product => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <div className="border rounded-lg p-4 cursor-pointer hover:shadow-lg">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}