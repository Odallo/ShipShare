'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Package, Weight, ArrowRight, ArrowLeft, Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface FormData {
  pickupLocation: string;
  destination: string;
  weight: number;
  packageType: string;
  preferredDate: string;
  description: string;
}

const kenyanLocations = [
  'Nairobi CBD', 'Westlands, Nairobi', 'Kilimani, Nairobi', 'Karen, Nairobi',
  'Mombasa Island', 'Nyali, Mombasa', 'Kisumu CBD', 'Milimani, Kisumu',
  'Nakuru Town', 'Eldoret CBD', 'Thika', 'Machakos',
  'Kitale', 'Malindi', 'Nyeri', 'Meru'
];

const packageTypes = [
  { value: 'documents', label: 'Documents', icon: '📄' },
  { value: 'electronics', label: 'Electronics', icon: '📱' },
  { value: 'clothing', label: 'Clothing', icon: '👕' },
  { value: 'food', label: 'Food', icon: '🍱' },
  { value: 'fragile', label: 'Fragile', icon: '🥃' },
  { value: 'other', label: 'Other', icon: '📦' },
];

export const ShipmentWizard: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    pickupLocation: '',
    destination: '',
    weight: 0,
    packageType: '',
    preferredDate: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateForm = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    router.push('/matching');
  };

  const steps = [
    { num: 1, label: 'Location' },
    { num: 2, label: 'Package' },
    { num: 3, label: 'Schedule' },
    { num: 4, label: 'Review' },
  ];

  return (
    <div className="max-w-3xl mx-auto fade-in">
      {/* Step Wizard */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, idx) => (
            <div key={s.num} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-colors ${step >= s.num ? 'bg-primary-600 text-white border-primary-600' : 'bg-white dark:bg-slate-800 text-gray-400 border-gray-300 dark:border-slate-600'}`}>
                  {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                </div>
                <span className={`mt-2 text-xs font-medium ${step >= s.num ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}>{s.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${step > s.num ? 'bg-primary-600' : 'bg-gray-300 dark:bg-slate-600'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Card className="p-6 md:p-8">
        {step === 1 && (
          <div className="space-y-6 fade-in">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Where are you shipping from and to?</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pickup Location
              </label>
              <select
                value={formData.pickupLocation}
                onChange={(e) => updateForm('pickupLocation', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-800 dark:text-white"
                required
              >
                <option value="">Select pickup location</option>
                {kenyanLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-400">
                <ArrowRight className="w-5 h-5 rotate-90" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Destination
              </label>
              <select
                value={formData.destination}
                onChange={(e) => updateForm('destination', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-800 dark:text-white"
                required
              >
                <option value="">Select destination</option>
                {kenyanLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={nextStep} disabled={!formData.pickupLocation || !formData.destination}>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 fade-in">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tell us about your package</h3>

            <div className="grid grid-cols-3 gap-4">
              {packageTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => updateForm('packageType', type.value)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${formData.packageType === type.value ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 text-gray-700 dark:text-gray-300'}`}
                >
                  <span className="text-2xl mb-2 block">{type.icon}</span>
                  {type.label}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Approximate Weight (kg)
              </label>
              <div className="relative">
                <Weight className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  step="0.1"
                  value={formData.weight || ''}
                  onChange={(e) => updateForm('weight', parseFloat(e.target.value))}
                  placeholder="e.g., 5"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Package Description (Optional)
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => updateForm('description', e.target.value)}
                placeholder="What's inside?"
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="secondary" onClick={prevStep}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={nextStep} disabled={!formData.packageType || !formData.weight}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 fade-in">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">When do you want to ship?</h3>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {['Today', 'Tomorrow', 'This Week'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateForm('preferredDate', option)}
                  className={`p-3 rounded-lg border-2 text-center text-sm transition-all ${formData.preferredDate === option ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-slate-700'}`}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-4 flex gap-3">
              <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                <p className="font-medium mb-1">Flexible dates save more!</p>
                <p className="text-yellow-700/80 dark:text-yellow-300/80">If you are flexible within 2-3 days, we can find you bigger groups with better savings.</p>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="secondary" onClick={prevStep}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={nextStep} disabled={!formData.preferredDate}>
                Review Details
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 fade-in">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Review your shipment</h3>

            <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Route</span>
                <span className="font-medium text-gray-900 dark:text-white">{formData.pickupLocation} &rarr; {formData.destination}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Type</span>
                <span className="font-medium text-gray-900 dark:text-white capitalize">{formData.packageType}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Weight</span>
                <span className="font-medium text-gray-900 dark:text-white">{formData.weight} kg</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-slate-700">
                <span className="text-gray-600 dark:text-gray-400">Shipping Date</span>
                <span className="font-medium text-gray-900 dark:text-white">{formData.preferredDate}</span>
              </div>
              <div className="flex justify-between py-2 text-lg font-semibold">
                <span className="text-gray-900 dark:text-white">Est. Solo Cost</span>
                <span className="text-gray-900 dark:text-white">KES 2,500</span>
              </div>
              <div className="flex justify-between py-2 text-lg font-bold text-accent-600 dark:text-accent-400">
                <span>Est. Group Cost</span>
                <span>KES 1,000 - 1,500</span>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="secondary" onClick={prevStep}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleSubmit} isLoading={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Find Groups'}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};