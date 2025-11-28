// FILE: pages/auth/login.tsx
// Update the login page with Little's World branding and cute baby background

import { useState } from 'react';
import { signInWithGoogle, signInWithFacebook, sendOTP, verifyOTP } from '@/lib/auth';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (error) {
      alert('Google login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      await signInWithFacebook();
    } catch (error) {
      alert('Facebook login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!phone || phone.length < 10) {
      alert('Enter valid phone number');
      return;
    }
    try {
      setLoading(true);
      await sendOTP(phone);
      setOtpSent(true);
      alert('OTP sent to ' + phone);
    } catch (error) {
      alert('Failed to send OTP: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      alert('Enter 6-digit OTP');
      return;
    }
    try {
      setLoading(true);
      await verifyOTP(phone, otp);
      alert('Login successful!');
      window.location.href = '/dashboard';
    } catch (error) {
      alert('OTP verification failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Cute Baby Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cute-baby-bg.jpg"
          alt="Little's World Background"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/70 via-purple-100/60 to-blue-100/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-pink-200">
          {/* Logo & Branding */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4 p-3 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full">
              <span className="text-4xl">👶</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Little's World
            </h1>
            <p className="text-gray-600 text-sm mt-2 font-medium">Premium Baby Fashion & Accessories</p>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-3 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <span className="text-xl">📧</span>
              Login with Gmail
            </button>

            <button
              onClick={handleFacebookLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-3 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <span className="text-xl">👨‍👩‍👧‍👦</span>
              Login with Facebook
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500 font-semibold">Or use OTP</span>
            </div>
          </div>

          {/* OTP Login */}
          {!otpSent ? (
            <div className="space-y-3">
              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition text-lg"
                />
              </div>
              <button
                onClick={handleSendOTP}
                disabled={loading || phone.length < 10}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {loading ? '⏳ Sending OTP...' : '📱 Send OTP'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-300 rounded-lg p-3">
                <p className="text-center text-gray-700 font-semibold">
                  OTP sent to <span className="text-pink-600">{phone}</span>
                </p>
                <p className="text-center text-gray-500 text-xs mt-1">Valid for 5 minutes</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold text-sm mb-2">Enter OTP</label>
                <input
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength="6"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition text-center tracking-widest text-2xl font-bold"
                />
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {loading ? '⏳ Verifying...' : '✅ Verify OTP'}
              </button>

              <button
                onClick={() => {
                  setOtpSent(false);
                  setOtp('');
                }}
                className="w-full text-pink-600 hover:text-pink-700 font-semibold py-2 hover:bg-pink-50 rounded-lg transition"
              >
                ← Change Phone Number
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-pink-600 hover:text-pink-700 font-bold">
                Sign up here
              </Link>
            </p>
          </div>

          {/* Trust badges */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span>🔒 Secure</span>
            <span>•</span>
            <span>🚀 Fast</span>
            <span>•</span>
            <span>😊 Easy</span>
          </div>
        </div>
      </div>
    </div>
  );
}


// FILE: pages/auth/signup.tsx
// Update signup page similarly

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert('Signup successful! Please login.');
        window.location.href = '/auth/login';
      }
    } catch (error) {
      alert('Signup failed: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Cute Baby Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cute-baby-bg.jpg"
          alt="Little's World Background"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/70 via-purple-100/60 to-blue-100/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-pink-200">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Little's World
            </h1>
            <p className="text-gray-600 text-sm mt-2">Join Our Family</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold text-sm mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold text-sm mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold text-sm mb-2">Phone</label>
              <input
                type="tel"
                placeholder="Enter your phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-pink-600 hover:text-pink-700 font-bold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


// FILE: components/Header.tsx
// Update main header to show "Little's World"

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl">👶</span>
          <div>
            <h1 className="text-2xl font-bold text-white">Little's World</h1>
            <p className="text-xs text-pink-100">Premium Baby Fashion</p>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-white hover:text-pink-100 font-semibold">
            Shop
          </Link>
          <Link href="/about" className="text-white hover:text-pink-100 font-semibold">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-pink-100 font-semibold">
            Contact
          </Link>
          <Link
            href="/auth/login"
            className="bg-white text-pink-600 px-6 py-2 rounded-full font-bold hover:bg-pink-50 transition"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}