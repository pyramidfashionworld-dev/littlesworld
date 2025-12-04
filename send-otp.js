import twilio from 'twilio';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phone } = req.body;
  
  if (!phone) {
    return res.status(400).json({ error: 'Phone number required' });
  }

  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    
    // Store OTP in database with expiry (5 minutes)
    await saveOTPToDatabase(phone, otp);

    // Send SMS
    await twilioClient.messages.create({
      body: `Your Little's World OTP is: ${otp}. Valid for 5 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    res.status(200).json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}