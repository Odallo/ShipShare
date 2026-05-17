import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabase.auth.signUp({
      email: body.email,
      password: body.password,
      options: {
        data: {
          name: body.name,
          phone: body.phone,
          role: body.role || 'filler',
          user_type: body.userType || 'individual',
          business_name: body.businessName,
          business_registration: body.businessRegistration,
        },
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

    await supabase.from('profiles').insert({
      id: user.id,
      name: body.name,
      email: body.email,
      phone: body.phone,
      role: body.role || 'filler',
      user_type: body.userType || 'individual',
      business_name: body.businessName,
      business_registration: body.businessRegistration,
    });

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
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
