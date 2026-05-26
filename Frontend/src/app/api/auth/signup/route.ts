import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: body.email,
      password: body.password,
      email_confirm: true,
      user_metadata: {
        name: body.name,
        phone: body.phone,
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    const user = data.user;
    if (!user) {
      return NextResponse.json(
        { error: 'Signup failed' },
        { status: 500 }
      );
    }

    const { error: profileError } = await supabaseAdmin.from('profiles').insert({
      id: user.id,
      name: body.name,
      email: body.email,
      phone: body.phone,
      role: body.role || 'filler',
      user_type: body.userType || 'individual',
      business_name: body.businessName,
      business_registration: body.businessRegistration,
    });

    if (profileError) {
      return NextResponse.json(
        { error: 'Profile creation failed: ' + profileError.message },
        { status: 500 }
      );
    }

    const { data: sessionData, error: sessionError } = await supabase.auth.signInWithPassword({
      email: body.email,
      password: body.password,
    });

    if (sessionError) {
      return NextResponse.json({
        user: {
          id: user.id,
          name: body.name,
          email: body.email,
          phone: body.phone,
          role: body.role || 'filler',
          userType: body.userType || 'individual',
          businessName: body.businessName,
          businessRegistration: body.businessRegistration,
          verified: false,
          trustScore: 0,
        },
      }, { status: 201 });
    }

    const response = NextResponse.json({
      user: {
        id: user.id,
        name: body.name,
        email: body.email,
        phone: body.phone,
        role: body.role || 'filler',
        userType: body.userType || 'individual',
        businessName: body.businessName,
        businessRegistration: body.businessRegistration,
        verified: false,
        trustScore: 0,
      },
    }, { status: 201 });

    if (sessionData?.session?.access_token) {
      response.cookies.set('sb-access-token', sessionData.session.access_token, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
      });
      response.cookies.set('sb-refresh-token', sessionData.session.refresh_token, {
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
