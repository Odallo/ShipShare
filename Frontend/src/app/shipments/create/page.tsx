'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Package, Calendar, Truck, ArrowRight, Building2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';

const POPULAR_CORRIDORS = [
  { id: 'nbo-msa', origin: 'Nairobi', destination: 'Mombasa', avgSavings: '45%', soloPrice: 2500 },
  { id: 'nbo-ebb', origin: 'Nairobi', destination: 'Eldoret', avgSavings: '40%', soloPrice: 2800 },
  { id: 'nbo-nku', origin: 'Nairobi', destination: 'Nakuru', avgSavings: '35%', soloPrice: 1200 },
  { id: 'msa-nbo', origin: 'Mombasa', destination: 'Nairobi', avgSavings: '45%', soloPrice: 2200 },
  { id: 'nbo-ksm', origin: 'Nairobi', destination: 'Kisumu', avgSavings: '42%', soloPrice: 2600 },
  { id: 'custom', origin: 'Custom', destination: 'Custom', avgSavings: 'Varies', soloPrice: 0 },
];

const BUSINESS_PARTNERS = [
  { id: 'g4s', name: 'G4S Logistics', verified: true, rating: 4.8, coverage: 'Nationwide' },
  { id: 'dhl', name: 'DHL Kenya', verified: true, rating: 4.7, coverage: 'Major Cities' },
  { id: 'fedex', name: 'FedEx Kenya', verified: true, rating: 4.6, coverage: 'Major Cities' },
  { id: 'sendy', name: 'Sendy Kenya', verified: true, rating: 4.5, coverage: 'Nairobi & Mombasa' },
];

const PACKAGE_TYPES = [
  { id: 'document', label: 'Document', icon: '📄', maxWeight: '2kg' },
  { id: 'small', label: 'Small', icon: '📦', maxWeight: '5kg' },
  { id: 'medium', label: 'Medium', icon: '📦', maxWeight: '15kg' },
  { id: 'large', label: 'Large', icon: '📦', maxWeight: '30kg' },
  { id: 'fragile', label: 'Fragile', icon: '⚠️', maxWeight: '10kg' },
];

export default function CreateShipmentPage() {
  const [step, setStep] = useState(1);
  const [selectedCorridor, setSelectedCorridor] = useState<string | null>(null);
  const [showCustomRoute, setShowCustomRoute] = useState(false);
  const [formData, setFormData] = useState({
    pickupLocation: '',
    destination: '',
    packageType: '',
    weight: '',
    pickupDate: '',
    description: '',
  });
  const router = useRouter();

  const steps = [
    { id: 1, label: 'Route', icon: MapPin },
    { id: 2, label: 'Package', icon: Package },
    { id: 3, label: 'Details', icon: Truck },
    { id: 4, label: 'Review', icon: Calendar },
  ];

  const handleSubmit = () => {
    const existingShipments = localStorage.getItem('shipshare_shipments');
    const shipments = existingShipments ? JSON.parse(existingShipments) : [];
    
    const newShipment = {
      id: `SHP-${String(shipments.length + 1).padStart(3, '0')}`,
      pickupLocation: formData.pickupLocation,
      destination: formData.destination,
      status: 'matching',
      estimatedCost: Math.floor(Number(formData.weight) * 100),
      saved: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    shipments.push(newShipment);
    localStorage.setItem('shipshare_shipments', JSON.stringify(shipments));
    
    alert('Shipment created! We\'ll find matching groups for you.');
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
                Create New Shipment
              </h1>
              <p className="text-surface-500 mt-1">
                Fill in the details below to create your shipment and find matching groups
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
                  <h2 className="text-lg font-semibold text-surface-900">Where are you shipping from and to?</h2>
                  
                  {!showCustomRoute ? (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-surface-700 mb-3">
                          Select a Popular Route
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {POPULAR_CORRIDORS.slice(0, -1).map((corridor) => (
                            <button
                              key={corridor.id}
                              type="button"
                              onClick={() => {
                                setSelectedCorridor(corridor.id);
                                setFormData({ 
                                  ...formData, 
                                  pickupLocation: corridor.origin, 
                                  destination: corridor.destination 
                                });
                              }}
                              className={`p-3 rounded-xl border-2 text-left transition-all ${
                                selectedCorridor === corridor.id
                                  ? 'border-primary-500 bg-primary-50'
                                  : 'border-surface-200 hover:border-surface-300'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <ArrowRight className="w-3 h-3 text-surface-400" />
                                <span className="text-sm font-medium text-surface-900">
                                  {corridor.origin} → {corridor.destination}
                                </span>
                              </div>
                              <div className="text-xs text-surface-500">
                                Save up to {corridor.avgSavings}
                              </div>
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => setShowCustomRoute(true)}
                            className="p-3 rounded-xl border-2 border-dashed border-surface-200 text-center hover:border-surface-300 transition-all"
                          >
                            <div className="text-sm font-medium text-surface-600">Custom Route</div>
                            <div className="text-xs text-surface-400">Anywhere in Kenya</div>
                          </button>
                        </div>
                      </div>

                      {selectedCorridor && (
                        <div className="p-4 rounded-xl bg-primary-50 border border-primary-100">
                          <div className="flex items-center gap-2 mb-2">
                            <Building2 className="w-5 h-5 text-primary-600" />
                            <span className="font-semibold text-primary-700">Business Partners Available</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {BUSINESS_PARTNERS.map((partner) => (
                              <div 
                                key={partner.id}
                                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-lg border border-primary-100"
                              >
                                <ShieldCheck className="w-3.5 h-3.5 text-primary-500" />
                                <span className="text-xs font-medium text-surface-700">{partner.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="space-y-4">
                      <Input
                        label="Pickup Location"
                        placeholder="e.g., Nakuru, Town"
                        icon={<MapPin className="w-5 h-5" />}
                        value={formData.pickupLocation}
                        onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                      />
                      
                      <Input
                        label="Destination"
                        placeholder="e.g., Kisumu, CBD"
                        icon={<MapPin className="w-5 h-5" />}
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      />

                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowCustomRoute(false)}
                      >
                        ← Back to popular routes
                      </Button>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button 
                      onClick={() => setStep(2)}
                      disabled={!formData.pickupLocation || !formData.destination}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 fade-in">
                  <h2 className="text-lg font-semibold text-surface-900">What are you shipping?</h2>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {PACKAGE_TYPES.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, packageType: type.id })}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          formData.packageType === type.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-surface-200 hover:border-surface-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{type.icon}</div>
                        <div className="font-medium text-surface-900 text-sm">{type.label}</div>
                        <div className="text-xs text-surface-500">Up to {type.maxWeight}</div>
                      </button>
                    ))}
                  </div>

                  <Input
                    label="Weight (kg)"
                    type="number"
                    placeholder="Enter weight in kg"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  />

                  <div className="flex justify-between">
                    <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                    <Button 
                      onClick={() => setStep(3)}
                      disabled={!formData.packageType || !formData.weight}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 fade-in">
                  <h2 className="text-lg font-semibold text-surface-900">Any additional details?</h2>
                  
                  <Input
                    label="Preferred Pickup Date"
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                  />

                  <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-2">
                      Description (optional)
                    </label>
                    <textarea
                      className="input-field min-h-[100px] resize-none"
                      placeholder="Describe your package contents..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
                    <Button onClick={() => setStep(4)}>
                      Review
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 fade-in">
                  <h2 className="text-lg font-semibold text-surface-900">Review your shipment</h2>
                  
                  <div className="bg-surface-50 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-surface-500">Route</span>
                      <span className="font-medium text-surface-900">
                        {formData.pickupLocation} - {formData.destination}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-500">Package Type</span>
                      <span className="font-medium text-surface-900 capitalize">{formData.packageType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-surface-500">Weight</span>
                      <span className="font-medium text-surface-900">{formData.weight} kg</span>
                    </div>
                    {formData.pickupDate && (
                      <div className="flex justify-between">
                        <span className="text-surface-500">Pickup Date</span>
                        <span className="font-medium text-surface-900">{formData.pickupDate}</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-accent-50 rounded-xl p-4 border border-accent-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="success">Estimated Savings: 35%</Badge>
                    </div>
                    <p className="text-sm text-surface-600">
                      By joining a group, you could save up to KES {Math.floor(Number(formData.weight) * 100 * 0.35).toLocaleString()} on this shipment.
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="secondary" onClick={() => setStep(3)}>Back</Button>
                    <Button onClick={handleSubmit}>
                      Create Shipment
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
