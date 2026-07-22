import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (error) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = data.user;
    if (!user) {
      return NextResponse.json(
        { error: 'Login failed' },
        { status: 500 }
      );
    }

    const profile = (await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()).data as Record<string, unknown> | null;

    const response = NextResponse.json({
      user: {
        id: user.id,
        name: profile?.name || user.user_metadata?.name || '',
        email: user.email,
        phone: profile?.phone || user.user_metadata?.phone || '',
        role: profile?.role || user.user_metadata?.role || 'filler',
        userType: profile?.user_type || user.user_metadata?.user_type || 'individual',
        businessName: profile?.business_name || user.user_metadata?.business_name,
        businessRegistration: profile?.business_registration || user.user_metadata?.business_registration,
        location: profile?.location,
        verified: profile?.verified || false,
        trustScore: profile?.trust_score || 0,
      },
    });

    if (data.session?.access_token) {
      response.cookies.set('sb-access-token', data.session.access_token, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
      });
      response.cookies.set('sb-refresh-token', data.session.refresh_token, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
      });
    }

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
