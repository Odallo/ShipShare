import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface SignupRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  location?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SignupRequest = await request.json();

    // Validate input
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

    // Create new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: body.name,
      email: body.email,
      phone: body.phone,
      location: body.location || '',
      joinDate: new Date(),
    };

    // Set authentication cookie server-side
    const cookieStore = await cookies();
    cookieStore.set('shipshare_user', JSON.stringify(newUser), {
      httpOnly: false, // Set to false for localStorage compatibility
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 24 hours
      path: '/',
    });

    return NextResponse.json(
      { user: newUser, message: 'Signup successful' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
