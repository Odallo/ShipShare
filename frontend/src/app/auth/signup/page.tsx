'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, ArrowRight, Package, Building2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';

type UserType = 'individual' | 'business';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    password: string;
    userType: UserType;
    businessName: string;
    businessRegistration: string;
  }>({
    name: '',
    email: '',
    phone: '',
    password: '',
    userType: 'individual',
    businessName: '',
    businessRegistration: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="blob blob-primary w-[400px] h-[400px] -top-32 -right-32 opacity-30" />
      <div className="blob blob-secondary w-[300px] h-[300px] -bottom-32 -left-32 opacity-30" />

      <div className="relative w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center text-white shadow-button">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold gradient-text">ShipShare</span>
          </Link>
        </div>

        <Card className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-surface-900">Create your account</h2>
            <p className="text-surface-500 mt-2">Start saving on shipping today</p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${step >= 1 ? 'gradient-bg text-white' : 'bg-surface-200 text-surface-500'}`}>
              1
            </div>
            <div className={`w-20 h-1 ${step >= 2 ? 'gradient-bg' : 'bg-surface-200'}`} />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${step >= 2 ? 'gradient-bg text-white' : 'bg-surface-200 text-surface-500'}`}>
              2
            </div>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {step === 1 ? (
            <div className="space-y-6 fade-in">
              {/* User Type Selection */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'individual' as UserType })}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    formData.userType === 'individual'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-surface-200 hover:border-surface-300'
                  }`}
                >
                  <User className="w-8 h-8 mx-auto mb-2 text-primary-600" />
                  <div className="font-semibold text-surface-900">Individual</div>
                  <div className="text-xs text-surface-500">Personal use</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, userType: 'business' as UserType })}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    formData.userType === 'business'
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-surface-200 hover:border-surface-300'
                  }`}
                >
                  <Building2 className="w-8 h-8 mx-auto mb-2 text-primary-600" />
                  <div className="font-semibold text-surface-900">Business</div>
                  <div className="text-xs text-surface-500">For my shop/store</div>
                </button>
              </div>

              <Input
                label="Full Name"
                type="text"
                placeholder="John Kamau"
                icon={<User className="w-5 h-5" />}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                icon={<Mail className="w-5 h-5" />}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <Button
                type="button"
                className="w-full"
                onClick={() => {
                  if (!formData.name.trim() || !formData.email.trim()) {
                    setError('Please fill in your name and email');
                    return;
                  }
                  setError('');
                  setStep(2);
                }}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 fade-in">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary-50 border border-primary-100">
                {formData.userType === 'business' ? (
                  <>
                    <Building2 className="w-5 h-5 text-primary-600" />
                    <span className="text-sm font-semibold text-primary-700">Creating a Business Account</span>
                  </>
                ) : (
                  <>
                    <User className="w-5 h-5 text-primary-600" />
                    <span className="text-sm font-semibold text-primary-700">Creating an Individual Account</span>
                  </>
                )}
              </div>

              {formData.userType === 'business' && (
                <>
                  <Input
                    label="Business Name"
                    type="text"
                    placeholder="Your Business Name"
                    icon={<Building2 className="w-5 h-5" />}
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                  <Input
                    label="Business Registration Number"
                    type="text"
                    placeholder="Registration number"
                    value={formData.businessRegistration}
                    onChange={(e) => setFormData({ ...formData, businessRegistration: e.target.value })}
                  />
                </>
              )}

              <Input
                label="Phone Number (M-Pesa)"
                type="tel"
                placeholder="+254 712 345 678"
                icon={<Phone className="w-5 h-5" />}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  icon={<Lock className="w-5 h-5" />}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-surface-400 hover:text-surface-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500"
                />
                <label className="text-sm text-surface-600">
                  I agree to the{' '}
                  <Link href="#" className="text-primary-600 hover:underline font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-primary-600 hover:underline font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="secondary" className="flex-1" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Account'}
                </Button>
              </div>
            </form>
          )}

          <p className="mt-8 text-center text-sm text-surface-500">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-semibold">
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}