// pages/api/verify-payment.js
const crypto = require('crypto');

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Only POST requests are accepted.'
    });
  }

  console.log('=== Payment Verification Started ===');
  console.log('Request received at:', new Date().toISOString());

  try {
    // Parse request body
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = req.body;

    console.log('Received data:', {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature: razorpay_signature ? '***' + razorpay_signature.slice(-8) : 'missing'
    });

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error('Missing required fields:', {
        has_order_id: !!razorpay_order_id,
        has_payment_id: !!razorpay_payment_id,
        has_signature: !!razorpay_signature
      });

      return res.status(400).json({
        success: false,
        error: 'Missing required payment data',
        details: {
          missing_fields: {
            order_id: !razorpay_order_id,
            payment_id: !razorpay_payment_id,
            signature: !razorpay_signature
          }
        }
      });
    }

    // Check if secret key is available
    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error('RAZORPAY_KEY_SECRET environment variable is missing');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error - secret key not found'
      });
    }

    console.log('Environment check:', {
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ? '***' + process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID.slice(-8) : 'missing',
      key_secret: process.env.RAZORPAY_KEY_SECRET ? '***' + process.env.RAZORPAY_KEY_SECRET.slice(-8) : 'missing'
    });

    // Generate the expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    console.log('Signature generation body:', body);

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    console.log('Signature comparison:', {
      expected: '***' + expectedSignature.slice(-8),
      received: '***' + razorpay_signature.slice(-8),
      match: expectedSignature === razorpay_signature
    });

    // Verify the signature
    const isSignatureValid = expectedSignature === razorpay_signature;

    if (isSignatureValid) {
      console.log('✅ Payment verification SUCCESSFUL');
      console.log('Payment ID:', razorpay_payment_id);
      console.log('Order ID:', razorpay_order_id);

      // Here you can add additional business logic:
      // - Save to database
      // - Update order status
      // - Send confirmation email
      // - Update inventory, etc.

      // Example: Save payment details (you would replace this with your actual database logic)
      const paymentDetails = {
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        amount: 'TBD', // You might want to fetch this from your database
        currency: 'INR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        verifiedAt: new Date().toISOString()
      };

      console.log('Payment details to save:', paymentDetails);

      // Simulate database save
      // await savePaymentToDatabase(paymentDetails);

      // Return success response
      return res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        data: {
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          verifiedAt: new Date().toISOString()
        }
      });

    } else {
      console.error('❌ Payment verification FAILED - Signature mismatch');
      
      // Additional debugging for signature issues
      console.log('Signature debugging:', {
        bodyUsedForHmac: body,
        secretKeyLength: process.env.RAZORPAY_KEY_SECRET?.length,
        expectedSignatureLength: expectedSignature.length,
        receivedSignatureLength: razorpay_signature.length
      });

      return res.status(400).json({
        success: false,
        error: 'Payment verification failed - invalid signature',
        details: {
          reason: 'The payment signature does not match the expected value. This could indicate tampering or incorrect data.',
          suggestion: 'Please check your Razorpay keys and ensure the payment was made with the correct account.'
        }
      });
    }

  } catch (error) {
    console.error('🔥 Unexpected error during payment verification:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Internal server error during payment verification',
      details: {
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  } finally {
    console.log('=== Payment Verification Completed ===');
  }
}

// Optional: Database function example (uncomment and implement as needed)
/*
async function savePaymentToDatabase(paymentDetails) {
  try {
    // Example using Prisma
    // await prisma.payment.create({
    //   data: {
    //     paymentId: paymentDetails.paymentId,
    //     orderId: paymentDetails.orderId,
    //     amount: paymentDetails.amount,
    //     currency: paymentDetails.currency,
    //     status: paymentDetails.status,
    //     verifiedAt: new Date(paymentDetails.verifiedAt)
    //   }
    // });

    console.log('Payment saved to database:', paymentDetails.paymentId);
  } catch (dbError) {
    console.error('Failed to save payment to database:', dbError);
    // Don't throw here - we still want to return success to the user
    // You might want to implement retry logic or alert system
  }
}
*/

// Optional: Function to fetch order details from Razorpay (if needed)
/*
async function fetchOrderDetails(orderId) {
  const Razorpay = require('razorpay');
  
  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
    const order = await razorpay.orders.fetch(orderId);
    return order;
  } catch (error) {
    console.error('Error fetching order details:', error);
    return null;
  }
}
*/