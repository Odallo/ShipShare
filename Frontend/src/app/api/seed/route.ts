import { NextResponse } from 'next/server';
import { getServerUser, getAuthenticatedClient } from '@/lib/server-supabase';

export async function POST(request: Request) {
  const token = request.headers.get('cookie')?.split(';')
    .find(c => c.trim().startsWith('sb-access-token='))
    ?.split('=')[1];
  const { data: { user }, error: authError } = await getServerUser(token);
  if (authError || !user || !token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getAuthenticatedClient(token);

  const sampleListings = [
    {
      shipper_id: user.id,
      origin_port: 'Shenzhen',
      destination_port: 'Mombasa',
      container_type: '40HC',
      total_cbm: 76.3,
      available_cbm: 32,
      price_per_cbm: 42,
      departure_date: '2026-06-10',
      cutoff_date: '2026-06-06',
      shipping_line: 'Maersk',
      status: 'published',
    },
    {
      shipper_id: user.id,
      origin_port: 'Ningbo',
      destination_port: 'Mombasa',
      container_type: '40ft',
      total_cbm: 67.3,
      available_cbm: 18,
      price_per_cbm: 39,
      departure_date: '2026-06-15',
      cutoff_date: '2026-06-11',
      shipping_line: 'MSC',
      status: 'published',
    },
    {
      shipper_id: user.id,
      origin_port: 'Shanghai',
      destination_port: 'Dar es Salaam',
      container_type: '40HC',
      total_cbm: 76.3,
      available_cbm: 45,
      price_per_cbm: 36,
      departure_date: '2026-06-20',
      cutoff_date: '2026-06-16',
      shipping_line: 'CMA CGM',
      status: 'published',
    },
  ];

  const { data, error } = await supabase
    .from('container_listings')
    .insert(sampleListings)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ listings: data, count: data.length });
}
