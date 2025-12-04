export default function Cancel() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px 20px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "32px", marginBottom: "20px", color: "red" }}>
        Payment Cancelled
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "10px" }}>
        Your payment was not completed.
      </p>

      <p style={{ fontSize: "16px", color: "#555" }}>
        You can try again anytime or continue browsing our cute baby products.
      </p>

      <a
        href="/cart"
        style={{
          display: "inline-block",
          marginTop: "30px",
          padding: "12px 24px",
          backgroundColor: "black",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none",
        }}
      >
        Return to Cart
      </a>
    </div>
  );
}
