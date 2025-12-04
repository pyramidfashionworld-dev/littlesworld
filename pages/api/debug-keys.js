// pages/api/debug-keys.js
export default async function handler(req, res) {
  res.status(200).json({
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'NOT FOUND',
    keySecret: process.env.RAZORPAY_KEY_SECRET ? '***SET***' : 'NOT FOUND',
    keyIdLength: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.length || 0,
    keySecretLength: process.env.RAZORPAY_KEY_SECRET?.length || 0,
    nodeEnv: process.env.NODE_ENV
  });
}