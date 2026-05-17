import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('bookings')
    .select('*, container_listings(*)')
    .or(`filler_id.eq.${user.id},and(container_listings.shipper_id.eq.${user.id})`)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bookings: data });
}

export async function POST(request: Request) {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
