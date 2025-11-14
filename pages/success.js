export default function Success() {
  return (
    <div style={{ 
      textAlign: "center", 
      padding: "60px 20px", 
      maxWidth: "600px", 
      margin: "0 auto" 
    }}>
      
      <h1 style={{ fontSize: "32px", marginBottom: "20px", color: "green" }}>
        Payment Successful!
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "10px" }}>
        Thank you for your order.
      </p>

      <p style={{ fontSize: "16px", color: "#555" }}>
        We have received your payment.  
        Your items will be shipped shortly.
      </p>

      <a 
        href="/" 
        style={{ 
          display: "inline-block", 
          marginTop: "30px", 
          padding: "12px 24px", 
          backgroundColor: "black", 
          color: "white", 
          borderRadius: "8px", 
          textDecoration: "none" 
        }}
      >
        Continue Shopping
      </a>
    </div>
  );
}
