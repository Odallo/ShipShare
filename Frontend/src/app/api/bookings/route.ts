import { NextResponse } from 'next/server';
import { getServerUser, getAuthenticatedClient } from '@/lib/server-supabase';

function getToken(request: Request) {
  return request.headers.get('cookie')?.split(';')
    .find(c => c.trim().startsWith('sb-access-token='))
    ?.split('=')[1];
}

export async function GET(request: Request) {
  const token = getToken(request);
  const { data: { user }, error: authError } = await getServerUser(token);
  if (authError || !user || !token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getAuthenticatedClient(token);

  const { data: fillerData, error: fillerErr } = await supabase
    .from('bookings')
    .select('*, container_listings(*)')
    .eq('filler_id', user.id)
    .order('created_at', { ascending: false });

  if (fillerErr) {
    return NextResponse.json({ error: fillerErr.message }, { status: 500 });
  }

  const { data: listings } = await supabase
    .from('container_listings')
    .select('id')
    .eq('shipper_id', user.id);

  const listingIds = (listings || []).map(l => l.id);
  let shipperData: any[] = [];

  if (listingIds.length > 0) {
    const { data, error: sErr } = await supabase
      .from('bookings')
      .select('*, container_listings(*)')
      .in('listing_id', listingIds)
      .order('created_at', { ascending: false });

    if (sErr) {
      return NextResponse.json({ error: sErr.message }, { status: 500 });
    }
    shipperData = data || [];
  }

  const seen = new Set<string>();
  const bookings = [...(fillerData || []), ...shipperData].filter(b => {
    if (seen.has(b.id)) return false;
    seen.add(b.id);
    return true;
  });

  return NextResponse.json({ bookings });
}

export async function POST(request: Request) {
  const token = getToken(request);
  const { data: { user }, error: authError } = await getServerUser(token);
  if (authError || !user || !token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getAuthenticatedClient(token);
  const body = await request.json();

  const { data: listing } = await supabase
    .from('container_listings')
    .select('available_cbm, price_per_cbm')
    .eq('id', body.listingId)
    .single();

  if (!listing) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }

  if (body.cbmBooked > listing.available_cbm) {
    return NextResponse.json({ error: 'Not enough available space' }, { status: 400 });
  }

  const totalPrice = body.cbmBooked * listing.price_per_cbm;

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      listing_id: body.listingId,
      filler_id: user.id,
      cbm_booked: body.cbmBooked,
      total_price: totalPrice,
      status: 'pending',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ booking: data }, { status: 201 });
}
