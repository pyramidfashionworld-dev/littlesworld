export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Replace with your actual authentication logic
  const validEmail = 'admin@littlesworld.co.in';
  const validPassword = 'password123';

  if (email === validEmail && password === validPassword) {
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
    
    return Response.json({ 
      success: true, 
      token,
      message: 'Login successful' 
    });
  }

  return Response.json(
    { success: false, message: 'Invalid credentials' },
    { status: 401 }
  );
}