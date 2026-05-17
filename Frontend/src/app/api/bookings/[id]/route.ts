import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
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
