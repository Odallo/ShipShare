'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Ship, MapPin, Calendar, ArrowRight, Package, DollarSign, Container } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { ContainerType, CONTAINER_CBM } from '@/types';

const POPULAR_ROUTES = [
  { label: 'Shenzhen → Mombasa', origin: 'Shenzhen', dest: 'Mombasa' },
  { label: 'Ningbo → Mombasa', origin: 'Ningbo', dest: 'Mombasa' },
  { label: 'Shanghai → Dar es Salaam', origin: 'Shanghai', dest: 'Dar es Salaam' },
  { label: 'Guangzhou → Mombasa', origin: 'Guangzhou', dest: 'Mombasa' },
  { label: 'Qingdao → Mombasa', origin: 'Qingdao', dest: 'Mombasa' },
  { label: 'Shenzhen → Nairobi ICD', origin: 'Shenzhen', dest: 'Nairobi ICD' },
];

export default function CreateListingPage() {
  const [step, setStep] = useState(1);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [showCustomRoute, setShowCustomRoute] = useState(false);
  const [formData, setFormData] = useState({
    originPort: '',
    destinationPort: '',
    containerType: '' as ContainerType | '',
    totalCbm: '',
    availableCbm: '',
    pricePerCbm: '',
    departureDate: '',
    cutoffDate: '',
    shippingLine: '',
    containerNumber: '',
    restrictions: '',
  });
  const router = useRouter();

  const steps = [
    { id: 1, label: 'Route', icon: MapPin },
    { id: 2, label: 'Container', icon: Container },
    { id: 3, label: 'Pricing', icon: DollarSign },
    { id: 4, label: 'Review', icon: Ship },
  ];

  const handleContainerTypeChange = (type: ContainerType) => {
    const cbm = CONTAINER_CBM[type];
    setFormData({
      ...formData,
      containerType: type,
      totalCbm: String(cbm),
      availableCbm: String(cbm),
    });
  };

  const handleSubmit = () => {
    const existing = localStorage.getItem('containershare_listings');
    const listings = existing ? JSON.parse(existing) : [];

    const newListing = {
      id: `LST-${String(listings.length + 1).padStart(3, '0')}`,
      shipperId: '1',
      shipperName: 'My Company',
      shipperVerified: false,
      originPort: formData.originPort,
      destinationPort: formData.destinationPort,
      containerType: formData.containerType,
      totalCbm: Number(formData.totalCbm),
      availableCbm: Number(formData.availableCbm),
      pricePerCbm: Number(formData.pricePerCbm),
      departureDate: formData.departureDate,
      cutoffDate: formData.cutoffDate,
      shippingLine: formData.shippingLine,
      containerNumber: formData.containerNumber || undefined,
      restrictions: formData.restrictions || undefined,
      status: 'published',
      createdAt: new Date().toISOString().split('T')[0],
    };

    listings.push(newListing);
    localStorage.setItem('containershare_listings', JSON.stringify(listings));

    alert('Container space listed! Fillers can now find and book your space.');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pt-16 lg:pt-20 lg:pl-64 fade-in">
          <div className="p-6 lg:p-8 max-w-3xl mx-auto">
            <div className="mb-8">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="mb-4 gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl lg:text-3xl font-bold text-surface-900">
                List Your Container Space
              </h1>
              <p className="text-surface-500 mt-1">
                Fill in the details below to publish your available container space
              </p>
            </div>

            <div className="flex items-center justify-between mb-8">
              {steps.map((s, idx) => (
                <React.Fragment key={s.id}>
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                      ${step >= s.id 
                        ? 'gradient-bg text-white' 
                        : 'bg-surface-100 text-surface-400'}
                    `}>
                      {step > s.id ? '✓' : <s.icon className="w-5 h-5" />}
                    </div>
                    <span className={`text-xs mt-2 ${step >= s.id ? 'text-surface-900 font-medium' : 'text-surface-400'}`}>
                      {s.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${step > s.id ? 'gradient-bg' : 'bg-surface-200'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            <Card className="p-6">
              {step === 1 && (
                <div className="space-y-6 fade-in">
                  <h2 className="text-lg font-semibold text-surface-900">Where is your container shipping?</h2>
                  
                  {!showCustomRoute ? (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-surface-700 mb-3">
                          Select a Route
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {POPULAR_ROUTES.map((route) => (
                            <button
                              key={route.label}
                              type="button"
                              onClick={() => {
                                setSelectedRoute(route.label);
                                setFormData({ ...formData, originPort: route.origin, destinationPort: route.dest });
                              }}
                              className={`p-3 rounded-xl border-2 text-left transition-all ${
                                selectedRoute === route.label
                                  ? 'border-primary-500 bg-primary-50'
                                  : 'border-surface-200 hover:border-surface-300'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <ArrowRight className="w-3 h-3 text-surface-400" />
                                <span className="text-sm font-medium text-surface-900">{route.label}</span>
                              </div>
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => setShowCustomRoute(true)}
                            className="p-3 rounded-xl border-2 border-dashed border-surface-200 text-center hover:border-surface-300 transition-all"
                          >
                            <div className="text-sm font-medium text-surface-600">Custom Route</div>
                            <div className="text-xs text-surface-400">Enter manually</div>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <Input
                        label="Origin Port"
                        placeholder="e.g., Shenzhen"
                        icon={<MapPin className="w-5 h-5" />}
                        value={formData.originPort}
                        onChange={(e) => setFormData({ ...formData, originPort: e.target.value })}
                      />
                      <Input
                        label="Destination Port"
                        placeholder="e.g., Mombasa"
                        icon={<MapPin className="w-5 h-5" />}
                        value={formData.destinationPort}
                        onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                      />
                      <Button variant="ghost" size="sm" onClick={() => setShowCustomRoute(false)}>
                        ← Back to popular routes
                      </Button>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!formData.originPort || !formData.destinationPort}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 fade-in">
                  <h2 className="text-lg font-semibold text-surface-900">Container Details</h2>

                  <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-3">Container Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(Object.entries(CONTAINER_CBM) as [ContainerType, number][]).map(([type, cbm]) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleContainerTypeChange(type)}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            formData.containerType === type
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-surface-200 hover:border-surface-300'
                          }`}
                        >
                          <Ship className="w-6 h-6 mx-auto mb-1 text-surface-600" />
                          <div className="font-medium text-surface-900 text-sm">{type}</div>
                          <div className="text-xs text-surface-500">{cbm} CBM</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Total CBM"
                      type="number"
                      value={formData.totalCbm}
                      onChange={(e) => setFormData({ ...formData, totalCbm: e.target.value })}
                      disabled
                    />
                    <Input
                      label="Available CBM"
                      type="number"
                      placeholder="Slack space"
                      value={formData.availableCbm}
                      onChange={(e) => setFormData({ ...formData, availableCbm: e.target.value })}
                    />
                  </div>

                  <Input
                    label="Container Number (optional)"
                    placeholder="e.g., MSCU4821037"
                    value={formData.containerNumber}
                    onChange={(e) => setFormData({ ...formData, containerNumber: e.target.value })}
                  />

                  <div className="flex justify-between">
                    <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                    <Button onClick={() => setStep(3)} disabled={!formData.containerType || !formData.availableCbm}>
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 fade-in">
                  <h2 className="text-lg font-semibold text-surface-900">Pricing & Schedule</h2>

                  <Input
                    label="Price per CBM (USD)"
                    type="number"
                    placeholder="e.g., 42"
                    icon={<DollarSign className="w-5 h-5" />}
                    value={formData.pricePerCbm}
                    onChange={(e) => setFormData({ ...formData, pricePerCbm: e.target.value })}
                  />

                  <div className="p-4 rounded-xl bg-accent-50 border border-accent-100">
                    <div className="text-sm font-medium text-accent-700 mb-1">Pricing reference</div>
                    <p className="text-xs text-accent-600">
                      Typical rates on China → East Africa routes range from $35-55/CBM.
                      Lower prices attract more fillers faster.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Departure Date"
                      type="date"
                      icon={<Calendar className="w-5 h-5" />}
                      value={formData.departureDate}
                      onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                    />
                    <Input
                      label="Cutoff Date"
                      type="date"
                      icon={<Calendar className="w-5 h-5" />}
                      value={formData.cutoffDate}
                      onChange={(e) => setFormData({ ...formData, cutoffDate: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Shipping Line"
                      placeholder="e.g., Maersk, MSC"
                      icon={<Ship className="w-5 h-5" />}
                      value={formData.shippingLine}
                      onChange={(e) => setFormData({ ...formData, shippingLine: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-2">
                      Restrictions (optional)
                    </label>
                    <textarea
                      className="input-field min-h-[80px] resize-none"
                      placeholder="e.g., No hazardous materials, food-safe only..."
                      value={formData.restrictions}
                      onChange={(e) => setFormData({ ...formData, restrictions: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
                    <Button
                      onClick={() => setStep(4)}
                      disabled={!formData.pricePerCbm || !formData.departureDate || !formData.cutoffDate || !formData.shippingLine}
                    >
                      Review
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 fade-in">
                  <h2 className="text-lg font-semibold text-surface-900">Review your listing</h2>

                  <div className="bg-surface-50 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-surface-500">Route</span>
                      <span className="font-medium text-surface-900">
                        {formData.originPort} → {formData.destinationPort}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-500">Container</span>
                      <span className="font-medium text-surface-900">{formData.containerType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-500">Space</span>
                      <span className="font-medium text-surface-900">{formData.availableCbm} / {formData.totalCbm} CBM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-500">Price</span>
                      <span className="font-medium text-accent-600">${formData.pricePerCbm}/CBM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-500">Shipping Line</span>
                      <span className="font-medium text-surface-900">{formData.shippingLine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-500">Departure</span>
                      <span className="font-medium text-surface-900">{formData.departureDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-500">Cutoff</span>
                      <span className="font-medium text-surface-900">{formData.cutoffDate}</span>
                    </div>
                  </div>

                  <div className="bg-primary-50 rounded-xl p-4 border border-primary-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-primary-600" />
                      <span className="font-semibold text-primary-700">Almost done!</span>
                    </div>
                    <p className="text-sm text-primary-600">
                      Your listing will be published immediately and visible to fillers searching for space on this route.
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="secondary" onClick={() => setStep(3)}>Back</Button>
                    <Button onClick={handleSubmit}>
                      Publish Listing
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
