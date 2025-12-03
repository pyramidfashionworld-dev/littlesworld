'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300`}>
        <div className="p-4 flex justify-between items-center">
          <h1 className={`font-bold ${!isOpen && 'hidden'}`}>Admin Panel</h1>
          <button onClick={() => setIsOpen(!isOpen)} className="text-xl">
            ☰
          </button>
        </div>

        <nav className="mt-8">
          <Link href="/admin" className="flex items-center gap-4 px-4 py-2 hover:bg-gray-800">
            <span className="text-xl">📊</span>
            <span className={!isOpen ? 'hidden' : ''}>Dashboard</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-4 px-4 py-2 hover:bg-gray-800">
            <span className="text-xl">📦</span>
            <span className={!isOpen ? 'hidden' : ''}>Products</span>
          </Link>
          <Link href="/admin/collections" className="flex items-center gap-4 px-4 py-2 hover:bg-gray-800">
            <span className="text-xl">🎁</span>
            <span className={!isOpen ? 'hidden' : ''}>Collections</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-4 px-4 py-2 hover:bg-gray-800">
            <span className="text-xl">📋</span>
            <span className={!isOpen ? 'hidden' : ''}>Orders</span>
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-4 left-4 right-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          {isOpen ? 'Logout' : '🚪'}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}