// server.js
import express from "express";
import Razorpay from "razorpay";
import bodyParser from "body-parser";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json());

// 1️⃣ Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RZP_KEY_ID,
  key_secret: process.env.RZP_KEY_SECRET,
});

// 2️⃣ Create order endpoint
app.post("/api/create-order", async (req, res) => {
  try {
    const { amount } = req.body; // in rupees
    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency: "INR",
      payment_capture: 1,
    });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order creation failed" });
  }
});

// 3️⃣ Razorpay webhook for payment verification
app.post("/api/webhook", bodyParser.raw({ type: "application/json" }), (req, res) => {
  const secret = process.env.RZP_WEBHOOK_SECRET;
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(req.body);
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    const data = JSON.parse(req.body);
    console.log("✅ Verified event:", data.event);
    res.json({ status: "ok" });
  } else {
    console.log("❌ Invalid webhook signature");
    res.status(400).send("Invalid signature");
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
