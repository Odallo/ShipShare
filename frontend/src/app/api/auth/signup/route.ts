import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface SignupRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  location?: string;
  userType?: 'individual' | 'business';
  businessName?: string;
  businessRegistration?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SignupRequest = await request.json();

    if (!body.name || !body.email || !body.password || !body.phone) {
      return NextResponse.json(
        { error: 'Name, email, password, and phone are required' },
        { status: 400 }
      );
    }

    if (!body.email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (body.password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    if (body.name.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (body.userType === 'business') {
      if (!body.businessName || !body.businessRegistration) {
        return NextResponse.json(
          { error: 'Business name and registration number are required for business accounts' },
          { status: 400 }
        );
      }
    }

    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error }, { status: response.status });
    }

    const cookieStore = await cookies();
    cookieStore.set('shipshare_user', JSON.stringify(data.user), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400,
      path: '/',
    });

    cookieStore.set('shipshare_token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400,
      path: '/',
    });

    return NextResponse.json(
      { user: data.user, message: data.message },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

