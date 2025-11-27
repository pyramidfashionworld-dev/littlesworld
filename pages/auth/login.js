import { useState } from 'react';
import { signInWithGoogle, signInWithFacebook, sendOTP, verifyOTP } from '@/lib/auth';
import Link from 'next/link';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome to Little's World</h1>
        
        {/* Social Login */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
          >
            🔴 Login with Gmail
          </button>
          
          <button
            onClick={handleFacebookLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
          >
            👨‍💼 Login with Facebook
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or login with OTP</span>
          </div>
        </div>

        {/* OTP Login */}
        {!otpSent ? (
          <div className="space-y-3">
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-center text-gray-600 text-sm">OTP sent to {phone}</p>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.slice(0, 6))}
              maxLength="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-center tracking-widest"
            />
            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              onClick={() => setOtpSent(false)}
              className="w-full text-pink-500 hover:text-pink-600 font-semibold py-2"
            >
              Change Phone Number
            </button>
          </div>
        )}

        <p className="text-center text-gray-600 mt-6">
          Don't have an account? <Link href="/auth/signup" className="text-pink-500 hover:text-pink-600 font-semibold">Sign up</Link>
        </p>
      </div>
    </div>
  );
}