'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Ship, MapPin, Calendar, DollarSign, Package, ShieldCheck, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { ContainerListing, ContainerType } from '@/types';

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const listingId = params.id as string;

  const [listing, setListing] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOwner, setIsOwner] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [showBookModal, setShowBookModal] = useState(false);
  const [cbmInput, setCbmInput] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');

  useEffect(() => {
    fetch(`/api/listings/${listingId}`)
      .then(r => {
        if (r.status === 404) throw new Error('Not found');
        if (!r.ok) throw new Error('Failed to load');
        return r.json();
      })
      .then(data => {
        setListing(data.listing);
        if (user) {
          setIsOwner(data.listing.shipper_id === user.id);
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [listingId, user]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/listings/${listingId}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Failed to delete');
        return;
      }
      router.push('/dashboard');
    } catch {
      alert('Something went wrong');
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleBookSpace = () => {
    if (!cbmInput || Number(cbmInput) < 1) {
      setBookingError('Please enter a valid CBM amount');
      return;
    }
    if (Number(cbmInput) > (listing?.available_cbm as number || 0)) {
      setBookingError(`Only ${listing?.available_cbm} CBM available`);
      return;
    }

    setBookingLoading(true);
    setBookingError('');

    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        listingId: listingId,
        cbmBooked: Number(cbmInput),
      }),
    })
      .then(async res => {
        if (!res.ok) {
          const err = await res.json();
          setBookingError(err.error || 'Booking failed');
          return;
        }
        setShowBookModal(false);
        alert('Booking request sent! The shipper will confirm shortly.');
      })
      .catch(() => setBookingError('Something went wrong'))
      .finally(() => setBookingLoading(false));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-50">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 pt-16 lg:pt-20 lg:pl-64 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-[3px] border-primary-500 border-t-transparent rounded-full" />
          </main>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-surface-50">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 pt-16 lg:pt-20 lg:pl-64">
            <div className="p-6 lg:p-8 max-w-3xl mx-auto text-center">
              <Package className="w-16 h-16 text-surface-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-surface-900 mb-2">Listing not found</h2>
              <p className="text-surface-500 mb-6">{error || 'This listing could not be found or has been removed.'}</p>
              <Link href="/matching">
                <Button>Browse Listings</Button>
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const fillRate = listing.total_cbm
    ? Math.round((((listing.total_cbm as number) - (listing.available_cbm as number || 0)) / (listing.total_cbm as number)) * 100)
    : 0;
  const statusVariant = listing.status === 'published' ? 'primary' : listing.status === 'fully_booked' ? 'success' : 'secondary';

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pt-16 lg:pt-20 lg:pl-64 fade-in">
          <div className="p-6 lg:p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={() => router.back()} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              {isOwner && (
                <div className="flex gap-2">
                  <Link href={`/shipments/create?editId=${listingId}`}>
                    <Button size="sm" variant="secondary" className="gap-1.5">
                      <Pencil className="w-4 h-4" />
                      Edit
                    </Button>
                  </Link>
                  <Button size="sm" variant="secondary" className="gap-1.5 text-red-600 hover:bg-red-50" onClick={() => setShowDeleteModal(true)}>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              )}
            </div>

            <Card className="p-6 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-surface-900 mb-1">
                    {listing.origin_port as string} → {listing.destination_port as string}
                  </h1>
                  <p className="text-surface-500 text-sm">Listing ID: {listingId.slice(0, 8)}...</p>
                </div>
                <Badge variant={statusVariant as 'primary' | 'success' | 'secondary'}>
                  {(listing.status as string)?.replace('_', ' ')}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-xs text-surface-500 mb-1">Container</div>
                  <div className="font-semibold text-surface-900">{listing.container_type as string}</div>
                  <div className="text-xs text-surface-400">{listing.total_cbm as number} CBM total</div>
                </div>
                <div>
                  <div className="text-xs text-surface-500 mb-1">Available Space</div>
                  <div className="font-semibold text-surface-900">{listing.available_cbm as number} CBM</div>
                  <div className="text-xs text-surface-400">{fillRate}% filled</div>
                </div>
                <div>
                  <div className="text-xs text-surface-500 mb-1">Price</div>
                  <div className="font-semibold text-accent-600">${listing.price_per_cbm as number}/CBM</div>
                </div>
                <div>
                  <div className="text-xs text-surface-500 mb-1">Shipping Line</div>
                  <div className="font-semibold text-surface-900">{listing.shipping_line as string}</div>
                </div>
                <div>
                  <div className="text-xs text-surface-500 mb-1">Departure</div>
                  <div className="font-semibold text-surface-900">{listing.departure_date as string}</div>
                </div>
                <div>
                  <div className="text-xs text-surface-500 mb-1">Cutoff</div>
                  <div className="font-semibold text-surface-900">{listing.cutoff_date as string}</div>
                </div>
              </div>

              <div className="w-full bg-surface-100 rounded-full h-3 mb-2">
                <div
                  className="gradient-bg h-3 rounded-full transition-all"
                  style={{ width: `${fillRate}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-surface-500">
                <span>{fillRate}% filled</span>
                <span>{(listing.available_cbm as number)} CBM remaining</span>
              </div>

              {!!(listing.restrictions as string) && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-xl text-sm text-yellow-700">
                  <span className="font-medium">Restrictions:</span> {listing.restrictions as string}
                </div>
              )}
            </Card>

            {!!(listing.profiles as Record<string, unknown>)?.name && (
              <Card className="p-4 mb-6 bg-accent-50 border-accent-100">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-accent-600" />
                  <div className="text-sm text-accent-700">
                    <span className="font-semibold">{((listing.profiles as Record<string, unknown>)?.name as string) || 'Shipper'}</span>
                    {(listing.profiles as Record<string, unknown>)?.verified ? ' is a verified shipper' : ''}
                  </div>
                </div>
              </Card>
            )}

            <Button onClick={() => setShowBookModal(true)} className="w-full">
              Book Space
            </Button>
          </div>
        </main>
      </div>

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Listing">
        <div className="space-y-4">
          <p className="text-surface-600">Are you sure you want to delete this listing? This action cannot be undone.</p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)} className="flex-1" disabled={deleting}>
              Cancel
            </Button>
            <Button onClick={handleDelete} disabled={deleting} className="flex-1 bg-red-600 hover:bg-red-700">
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showBookModal} onClose={() => setShowBookModal(false)} title="Book Container Space">
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-xl p-4 border border-accent-100">
            <div className="text-center">
              <div className="text-sm text-surface-600 mb-1">Price per CBM</div>
              <div className="text-3xl font-bold gradient-text">${listing.price_per_cbm as number}</div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-surface-100">
              <span className="text-surface-500">Route</span>
              <span className="font-medium">{(listing.origin_port as string)} → {(listing.destination_port as string)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-surface-100">
              <span className="text-surface-500">Available</span>
              <span className="font-medium">{listing.available_cbm as number} CBM</span>
            </div>
          </div>

          {bookingError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{bookingError}</div>
          )}

          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-surface-700 mb-1">CBM needed</label>
              <input
                type="number"
                placeholder="e.g. 5"
                max={listing.available_cbm as number}
                value={cbmInput}
                onChange={e => setCbmInput(e.target.value)}
                className="input-field w-full"
              />
            </div>
            <Button onClick={handleBookSpace} disabled={bookingLoading}>
              {bookingLoading ? 'Sending...' : 'Send Request'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
