'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Package, Calendar, DollarSign, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

interface FormData {
  pickupLocation: string;
  destination: string;
  weight: number;
  packageType: string;
  preferredDate: string;
  estimatedValue?: number;
}

const kenyanLocations = [
  'Nairobi, CBD', 'Nairobi, Westlands', 'Nairobi, Kilimani', 'Nairobi, Karen',
  'Mombasa, CBD', 'Mombasa, Nyali', 'Kisumu, Town', 'Kisumu, Milimani',
  'Nakuru, Town', 'Nakuru, Milimani', 'Eldoret, CBD', 'Thika, Town',
  'Machakos, Town', 'Kitale, Town', 'Malindi, Town'
];

const packageTypes = [
  { value: 'document', label: 'Document/Letter', weightRange: '0-0.5 kg' },
  { value: 'small', label: 'Small Box', weightRange: '0.5-2 kg' },
  { value: 'medium', label: 'Medium Box', weightRange: '2-5 kg' },
  { value: 'large', label: 'Large Box', weightRange: '5-10 kg' },
  { value: 'fragile', label: 'Fragile Items', weightRange: 'Varies' },
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
    router.push('/dashboard');
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Where is your package?</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pickup Location
              </label>
              <select
                value={formData.pickupLocation}
                onChange={(e) => updateForm('pickupLocation', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                required
              >
                <option value="">Select pickup location</option>
                {kenyanLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Destination
              </label>
              <select
                value={formData.destination}
                onChange={(e) => updateForm('destination', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                required
              >
                <option value="">Select destination</option>
                {kenyanLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Package Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Package Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {packageTypes.map(type => (
                  <button
                    key={type.value}
                    onClick={() => updateForm('packageType', type.value)}
                    className={`p-3 border rounded-lg text-left transition-all ${
                      formData.packageType === type.value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-300 hover:border-primary-300'
                    }`}
                  >
                    <p className="font-medium">{type.label}</p>
                    <p className="text-sm text-gray-500">{type.weightRange}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.weight || ''}
                onChange={(e) => updateForm('weight', parseFloat(e.target.value))}
                placeholder="e.g., 2.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                required
              />
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shipping Preferences</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Shipping Date
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => updateForm('preferredDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Estimated Value (Optional)
              </label>
              <input
                type="number"
                value={formData.estimatedValue || ''}
                onChange={(e) => updateForm('estimatedValue', parseFloat(e.target.value))}
                placeholder="KES"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
              <p className="text-sm text-primary-800 dark:text-primary-200">
                💡 Did you know? Shipping with a group can save you up to 40% on this shipment!
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6 md:p-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className={`w-1/3 h-1 rounded-full ${
                  step >= s ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center">Step {step} of 3</p>
        </div>
        
        {/* Form Content */}
        {renderStep()}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <Button variant="outline" onClick={prevStep}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={nextStep} className={step === 1 ? 'ml-auto' : ''}>
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              isLoading={isSubmitting}
              className="ml-auto"
            >
              Submit Shipment
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};