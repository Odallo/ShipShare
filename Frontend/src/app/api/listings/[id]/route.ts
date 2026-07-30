import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabase
    .from('container_listings')
    .select('*, profiles!inner(name, verified, trust_score)')
    .eq('id', params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const res = NextResponse.json({ listing: data });
  res.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
  return res;
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { data, error } = await (supabase as any)
    .from('container_listings')
    .update(body)
    .eq('id', params.id)
    .eq('shipper_id', user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ listing: data });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: listing } = await (supabase as any)
    .from('container_listings')
    .select('shipper_id')
    .eq('id', params.id)
    .single();

  if (!listing || !(listing as Record<string, unknown>).shipper_id) {
    return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
  }

  if ((listing as Record<string, unknown>).shipper_id !== user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { error: delErr } = await supabase
    .from('container_listings')
    .delete()
    .eq('id', params.id);

  if (delErr) {
    return NextResponse.json({ error: delErr.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
