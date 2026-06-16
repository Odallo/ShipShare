import { NextResponse } from 'next/server';
import { getServerUser, getAuthenticatedClient } from '@/lib/server-supabase';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const token = request.headers.get('cookie')?.split(';')
    .find(c => c.trim().startsWith('sb-access-token='))
    ?.split('=')[1];
  const { data: { user }, error: authError } = await getServerUser(token);
  if (authError || !user || !token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getAuthenticatedClient(token);
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const { data: booking } = await supabase
    .from('bookings')
    .select('*, container_listings!inner(shipper_id)')
    .eq('id', params.id)
    .single();

  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  const isShipper = booking.container_listings.shipper_id === user.id;
  const isFiller = booking.filler_id === user.id;

  if (body.status === 'approved' && !isShipper) {
    return NextResponse.json({ error: 'Only the shipper can approve bookings' }, { status: 403 });
  }

  if (body.status === 'cancelled' && !isShipper && !isFiller) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const listingId = booking.listing_id;
  const cbmBooked = booking.cbm_booked;

  if (body.status === 'approved') {
    const { data: listing } = await supabase
      .from('container_listings')
      .select('available_cbm')
      .eq('id', listingId)
      .single();

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    const newAvailable = listing.available_cbm - cbmBooked;
    const updates: Record<string, unknown> = { available_cbm: newAvailable };
    if (newAvailable <= 0) {
      updates.status = 'fully_booked';
      updates.available_cbm = 0;
    }

    await supabase
      .from('container_listings')
      .update(updates)
      .eq('id', listingId);
  }

  if (body.status === 'cancelled' && (booking.status === 'approved' || booking.status === 'pending')) {
    const { data: listing } = await supabase
      .from('container_listings')
      .select('available_cbm, status')
      .eq('id', listingId)
      .single();

    if (listing) {
      const newAvailable = listing.available_cbm + cbmBooked;
      await supabase
        .from('container_listings')
        .update({
          available_cbm: newAvailable,
          status: newAvailable > 0 ? 'published' : listing.status,
        })
        .eq('id', listingId);
    }
  }

  const { data, error } = await supabase
    .from('bookings')
    .update({ status: body.status })
    .eq('id', params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ booking: data });
}
