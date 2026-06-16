import { NextResponse } from 'next/server';
import { getServerUser, getAuthenticatedClient } from '@/lib/server-supabase';

function getToken(request: Request) {
  return request.headers.get('cookie')?.split(';')
    .find(c => c.trim().startsWith('sb-access-token='))
    ?.split('=')[1];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');
  const dest = searchParams.get('destination');
  const containerType = searchParams.get('containerType');
  const priceMax = searchParams.get('priceMax');
  const shipperId = searchParams.get('shipperId');

  const token = getToken(request);
  const supabase = getAuthenticatedClient(token || '');

  try {
    let query = supabase
      .from('container_listings')
      .select('*, profiles(name, verified, trust_score)')
      .gte('available_cbm', 1)
      .order('departure_date', { ascending: true });

    if (shipperId) {
      query = query.eq('shipper_id', shipperId);
    } else {
      query = query.eq('status', 'published');
    }
    if (origin) query = query.ilike('origin_port', `%${origin}%`);
    if (dest) query = query.ilike('destination_port', `%${dest}%`);
    if (containerType) query = query.eq('container_type', containerType);
    if (priceMax) query = query.lte('price_per_cbm', Number(priceMax));

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ listings: data || [] });
  } catch (err) {
    return NextResponse.json(
      { error: 'Database unavailable. Please check your Supabase project is running.' },
      { status: 503 }
    );
  }
}

export async function POST(request: Request) {
  const token = getToken(request);
  const { data: { user }, error: authError } = await getServerUser(token);
  if (authError || !user || !token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getAuthenticatedClient(token);
  const body = await request.json();

  const { data, error } = await supabase
    .from('container_listings')
    .insert({
      shipper_id: user.id,
      origin_port: body.originPort,
      destination_port: body.destinationPort,
      container_type: body.containerType,
      total_cbm: body.totalCbm,
      available_cbm: body.availableCbm,
      price_per_cbm: body.pricePerCbm,
      departure_date: body.departureDate,
      cutoff_date: body.cutoffDate,
      shipping_line: body.shippingLine,
      container_number: body.containerNumber,
      restrictions: body.restrictions,
      status: 'published',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ listing: data }, { status: 201 });
}
