"use client";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // 2.5s animation
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-pink-100 z-[9999] transition-all duration-500">
      <img
        src="/baby-hero.png"
        alt="Little's World Loading"
        className="w-32 h-32 animate-bounce"
      />
      <p className="mt-4 text-lg font-semibold text-pink-600 animate-pulse">
        Welcome to Little’s World 💖
      </p>
    </div>
  );
}
