'use client';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-xl text-purple-600">
            🎀 Little's World
          </Link>
          <div className="flex gap-8">
            <Link href="/" className="hover:text-purple-600">Home</Link>
            <Link href="/collections" className="hover:text-purple-600">Collections</Link>
            <Link href="/admin/login" className="bg-purple-600 text-white px-4 py-2 rounded">Admin</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}