// This endpoint is deprecated - using Razorpay instead
export default async function handler(req, res) {
  res.status(410).json({ 
    error: 'This endpoint is no longer in use',
    message: 'Please use /api/razorpay for payment processing'
  });
}