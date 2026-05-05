import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('shipshare_token')?.value;

    if (token) {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    cookieStore.delete('shipshare_user');
    cookieStore.delete('shipshare_token');

    return NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout proxy error:', error);
    return NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    );
  }
}
