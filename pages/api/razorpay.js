import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { amount } = req.body;

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    try {
      const order = await razorpay.orders.create(options);
      res.status(200).json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Order creation failed" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
