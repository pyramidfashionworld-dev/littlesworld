export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phone, otp } = req.body;

  try {
    // Verify OTP from database
    const isValid = await verifyOTPFromDatabase(phone, otp);
    
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Create user session/token
    const token = generateToken(phone);
    
    res.status(200).json({ 
      success: true, 
      token,
      message: 'Login successful' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}