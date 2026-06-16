import { NextResponse } from 'next/server';
import { getServerUser, getAuthenticatedClient } from '@/lib/server-supabase';

export async function GET(request: Request) {
  try {
    const token = request.headers.get('cookie')?.split(';')
      .find(c => c.trim().startsWith('sb-access-token='))
      ?.split('=')[1];
    const { data: { user }, error: authError } = await getServerUser(token);

    if (authError || !user || !token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const supabase = getAuthenticatedClient(token);
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return NextResponse.json({
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
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
