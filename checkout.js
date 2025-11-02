import Script from "next/script";
import { useRouter } from "next/router";
import emailjs from "emailjs-com";

export default function Checkout() {
  const router = useRouter();

  const handlePayment = async () => {
    const amount = 500;

    const orderResponse = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });

    const order = await orderResponse.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Littles World",
      description: "Payment for baby clothing",
      order_id: order.id,
      handler: function (response) {
        // ✅ Send confirmation email
        sendEmail(response);

        // ✅ Redirect to thank you page
        router.push("/success");
      },
      prefill: {
        name: "Customer",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: { color: "#f472b6" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const sendEmail = (paymentResponse) => {
    const templateParams = {
      to_name: "Customer",
      from_name: "Littles World",
      message: `Your payment was successful! Order ID: ${paymentResponse.razorpay_order_id}`,
      reply_to: "pyramidfashionworld@gmail.com",
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => console.log("✅ Email sent successfully"),
        (error) => console.error("❌ Email failed:", error)
      );
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button
        onClick={handlePayment}
        className="bg-pink-500 text-white px-6 py-3 rounded-xl"
      >
        Pay ₹500
      </button>
    </>
  );
}
