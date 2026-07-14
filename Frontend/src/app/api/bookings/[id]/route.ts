import { NextResponse } from 'next/server';
import { getServerUser, getAuthenticatedClient, getServiceClient } from '@/lib/server-supabase';

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

  const body = await request.json();

  const { data: booking, error: bErr } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', params.id)
    .single();

  if (bErr) {
    return NextResponse.json({ error: bErr.message }, { status: 500 });
  }

  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  const { data: listing, error: lErr } = await supabase
    .from('container_listings')
    .select('shipper_id')
    .eq('id', booking.listing_id)
    .single();

  if (lErr) {
    return NextResponse.json({ error: lErr.message }, { status: 500 });
  }

  const isShipper = listing?.shipper_id === user.id;
  const isFiller = booking.filler_id === user.id;

  if (body.status === 'approved' && !isShipper) {
    return NextResponse.json({ error: 'Only the shipper can approve bookings' }, { status: 403 });
  }

  if (body.status === 'cancelled' && !isShipper && !isFiller) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const serviceSupabase = getServiceClient();
  const listingId = booking.listing_id;
  const cbmBooked = booking.cbm_booked;

  if (body.status === 'approved') {
    const { data: listingData, error: adErr } = await serviceSupabase
      .from('container_listings')
      .select('available_cbm')
      .eq('id', listingId)
      .single();

    if (adErr) {
      return NextResponse.json({ error: adErr.message }, { status: 500 });
    }

    if (!listingData) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    const newAvailable = listingData.available_cbm - cbmBooked;
    const updates: Record<string, unknown> = { available_cbm: newAvailable };
    if (newAvailable <= 0) {
      updates.status = 'fully_booked';
      updates.available_cbm = 0;
    }

    await serviceSupabase
      .from('container_listings')
      .update(updates)
      .eq('id', listingId);
  }

  if (body.status === 'cancelled' && (booking.status === 'approved' || booking.status === 'pending')) {
    const { data: listingData } = await serviceSupabase
      .from('container_listings')
      .select('available_cbm, status')
      .eq('id', listingId)
      .single();

    if (listingData) {
      const newAvailable = listingData.available_cbm + cbmBooked;
      await serviceSupabase
        .from('container_listings')
        .update({
          available_cbm: newAvailable,
          status: newAvailable > 0 ? 'published' : listingData.status,
        })
        .eq('id', listingId);
    }
  }

  const { error: updErr } = await serviceSupabase
    .from('bookings')
    .update({ status: body.status })
    .eq('id', params.id);

  if (updErr) {
    return NextResponse.json({ error: updErr.message }, { status: 500 });
  }

  const { data: updatedBooking } = await serviceSupabase
    .from('bookings')
    .select('*')
    .eq('id', params.id)
    .single();

  return NextResponse.json({ booking: updatedBooking });
}
