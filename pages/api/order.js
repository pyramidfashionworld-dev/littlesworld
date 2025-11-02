import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const options = {
        amount: req.body.amount * 100, // amount in paise (₹1 = 100)
        currency: "INR",
        receipt: `order_rcptid_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);

      return res.status(200).json(order);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
