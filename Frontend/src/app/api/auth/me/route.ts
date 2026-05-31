import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/server-supabase';

export async function GET() {
  try {
    const supabase = createServerSupabase();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    return NextResponse.json({
      user: {
        id: session.user.id,
        name: profile?.name || session.user.user_metadata?.name || '',
        email: session.user.email,
        phone: profile?.phone || session.user.user_metadata?.phone || '',
        role: profile?.role || session.user.user_metadata?.role || 'filler',
        userType: profile?.user_type || session.user.user_metadata?.user_type || 'individual',
        businessName: profile?.business_name || session.user.user_metadata?.business_name,
        businessRegistration: profile?.business_registration || session.user.user_metadata?.business_registration,
        location: profile?.location,
        verified: profile?.verified || false,
        trustScore: profile?.trust_score || 0,
      },
    });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
