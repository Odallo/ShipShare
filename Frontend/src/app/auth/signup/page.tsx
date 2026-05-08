'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Phone, MapPin, Package, ArrowRight, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'individual' as 'individual' | 'business',
    businessName: '',
    businessRegistration: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (formData.userType === 'business' && (!formData.businessName || !formData.businessRegistration)) {
      setError('Business name and registration number are required');
      setIsLoading(false);
      return;
    }

    const success = await signup({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      userType: formData.userType,
      businessName: formData.businessName || undefined,
      businessRegistration: formData.businessRegistration || undefined,
    });

    if (success) {
      router.push('/dashboard');
    } else {
      setError('Registration failed. Email may already be in use.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-50 via-primary-50 to-secondary-50 p-4">
      <div className="blob blob-primary w-[400px] h-[400px] -top-32 -left-32 opacity-20" />
      <div className="blob blob-secondary w-[300px] h-[300px] -bottom-32 -right-32 opacity-20" />

      <div className="relative w-full max-w-lg">
        <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <Package className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-surface-900">ShipShare</span>
        </Link>

        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-surface-900 mb-2">Create Account</h1>
            <p className="text-surface-500">Join thousands shipping smarter in Kenya</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, userType: 'individual' })}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  formData.userType === 'individual'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-surface-200 hover:border-surface-300'
                }`}
              >
                <User className="w-6 h-6 mx-auto mb-2 text-surface-600" />
                <div className="font-medium text-surface-900">Individual</div>
                <div className="text-xs text-surface-500">Personal shipping</div>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, userType: 'business' })}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  formData.userType === 'business'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-surface-200 hover:border-surface-300'
                }`}
              >
                <Briefcase className="w-6 h-6 mx-auto mb-2 text-surface-600" />
                <div className="font-medium text-surface-900">Business</div>
                <div className="text-xs text-surface-500">High volume</div>
              </button>
            </div>

            <Input
              label="Full Name"
              name="name"
              placeholder="John Doe"
              icon={<User className="w-5 h-5" />}
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-5 h-5" />}
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+254 712 345 678"
              icon={<Phone className="w-5 h-5" />}
              value={formData.phone}
              onChange={handleChange}
              required
            />

            {formData.userType === 'business' && (
              <>
                <Input
                  label="Business Name"
                  name="businessName"
                  placeholder="Your Company Ltd"
                  icon={<Briefcase className="w-5 h-5" />}
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Business Registration Number"
                  name="businessRegistration"
                  placeholder="ROC/2024/123456"
                  icon={<Briefcase className="w-5 h-5" />}
                  value={formData.businessRegistration}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="At least 6 characters"
              icon={<Lock className="w-5 h-5" />}
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              icon={<Lock className="w-5 h-5" />}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <div className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1 rounded border-surface-300" />
              <span className="text-sm text-surface-600">
                I agree to the{' '}
                <Link href="/terms" className="text-primary-600 hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>
              </span>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 text-center text-surface-500">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary-600 font-medium hover:text-primary-700">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
