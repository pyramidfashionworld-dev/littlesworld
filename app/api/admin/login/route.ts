export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

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
      { success: false, message: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}