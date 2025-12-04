import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, currency } = req.body;
    
    const options = {
      amount: amount * 100,
      currency: currency || 'INR',
      receipt: 'order_' + Date.now(),
    };
    
    try {
      const order = await razorpay.orders.create(options);
      res.status(200).json(order);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}