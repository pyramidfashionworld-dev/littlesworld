export default function Contact() {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>📧 Email: contact@littlesworld.co.in</p>
      <p>📱 Phone: +91 XXXXXXXXXX</p>
      <p>📍 Address: Little's World, India</p>
      
      <form>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="5" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}