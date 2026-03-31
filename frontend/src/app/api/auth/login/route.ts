import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface LoginRequest {
  email: string;
  password: string;
}

// Basic validation - in production, verify against database
const VALID_CREDENTIALS = [
  { email: 'demo@shipshare.com', password: 'password123' },
  { email: 'test@example.com', password: 'test123' },
];

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json();

    // Validate input
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!body.email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check credentials (mock validation)
    const isValidCredential = VALID_CREDENTIALS.some(
      (cred) => cred.email === body.email && cred.password === body.password
    );

    if (!isValidCredential) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create mock user
    const mockUser = {
      id: '1',
      name: 'John Odallo',
      email: body.email,
      phone: '+254 712 345 678',
      location: 'Nairobi, CBD',
      joinDate: new Date(),
    };

    // Set authentication cookie server-side
    const cookieStore = await cookies();
    cookieStore.set('shipshare_user', JSON.stringify(mockUser), {
      httpOnly: false, // Set to false for localStorage compatibility
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 24 hours
      path: '/',
    });

    return NextResponse.json(
      { user: mockUser, message: 'Login successful' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
