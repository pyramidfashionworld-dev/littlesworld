'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthed(true);
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (loading) return <div>Loading...</div>;
  if (!isAuthed) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 fixed h-screen`}>
        <div className="p-4 flex justify-between items-center">
          <h1 className={`font-bold text-lg ${!isOpen && 'hidden'}`}>Admin</h1>
          <button onClick={() => setIsOpen(!isOpen)} className="text-xl hover:bg-gray-800 p-1 rounded">☰</button>
        </div>

        <nav className="mt-8 space-y-2">
          <Link href="/admin" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800 rounded">
            <span className="text-xl">📊</span>
            <span className={!isOpen ? 'hidden' : ''}>Dashboard</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800 rounded">
            <span className="text-xl">📦</span>
            <span className={!isOpen ? 'hidden' : ''}>Products</span>
          </Link>
          <Link href="/admin/collections" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800 rounded">
            <span className="text-xl">🎁</span>
            <span className={!isOpen ? 'hidden' : ''}>Collections</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-800 rounded">
            <span className="text-xl">📋</span>
            <span className={!isOpen ? 'hidden' : ''}>Orders</span>
          </Link>
        </nav>

        <button onClick={handleLogout} className="absolute bottom-4 left-4 right-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm">
          {isOpen ? 'Logout' : '🚪'}
        </button>
      </aside>

      <main className={`${isOpen ? 'ml-64' : 'ml-20'} flex-1 overflow-auto transition-all duration-300`}>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}