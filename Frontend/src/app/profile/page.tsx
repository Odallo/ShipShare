'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, Briefcase, Save, ArrowLeft, Ship, Search, ShieldCheck, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: '' as UserRole | '',
    userType: 'individual' as 'individual' | 'business',
    businessName: '',
    businessRegistration: '',
  });
  const { user, updateUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('containershare_user');
      if (!storedUser && !user) {
        router.push('/auth/login');
        return;
      }

      const currentUser = user || JSON.parse(storedUser || '{}');
      setFormData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        location: currentUser.location || '',
        role: currentUser.role || '',
        userType: currentUser.userType || 'individual',
        businessName: currentUser.businessName || '',
        businessRegistration: currentUser.businessRegistration || '',
      });
    }
  }, [user, router]);

  const handleSave = () => {
    if (!user) return;
    updateUser({
      name: formData.name,
      phone: formData.phone,
      location: formData.location,
      role: formData.role as UserRole,
      userType: formData.userType,
      businessName: formData.businessName,
      businessRegistration: formData.businessRegistration,
    });
    setIsEditing(false);
  };

  const storedUser = typeof window !== 'undefined' ? localStorage.getItem('containershare_user') : null;
  const currentUser = user || (storedUser ? JSON.parse(storedUser) : null);

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 pt-16 lg:pt-20 lg:pl-64 fade-in">
          <div className="p-6 lg:p-8 max-w-3xl mx-auto">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <h1 className="text-2xl lg:text-3xl font-bold text-surface-900 mb-8">
              Your Profile
            </h1>

            {currentUser && (
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="p-4 text-center">
                  <Ship className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                  <div className="text-2xl font-bold text-surface-900">
                    {currentUser.role === 'shipper' || currentUser.role === 'both' ? 'Yes' : '-'}
                  </div>
                  <div className="text-xs text-surface-500">List Space</div>
                </Card>
                <Card className="p-4 text-center">
                  <Search className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                  <div className="text-2xl font-bold text-surface-900">
                    {currentUser.role === 'filler' || currentUser.role === 'both' ? 'Yes' : '-'}
                  </div>
                  <div className="text-xs text-surface-500">Book Space</div>
                </Card>
                <Card className="p-4 text-center">
                  <ShieldCheck className="w-6 h-6 mx-auto mb-2 text-primary-600" />
                  <div className="text-2xl font-bold text-surface-900">
                    {currentUser.verified ? 'Yes' : 'No'}
                  </div>
                  <div className="text-xs text-surface-500">Verified</div>
                </Card>
              </div>
            )}

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center text-white text-3xl font-bold relative">
                    {formData.name?.charAt(0) || 'U'}
                    {currentUser?.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-surface-900">{formData.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={formData.userType === 'business' ? 'secondary' : 'primary'}>
                        {formData.userType === 'business' ? 'Business' : 'Individual'}
                      </Badge>
                      {formData.role && (
                        <Badge variant="accent">
                          {formData.role === 'both' ? 'Shipper & Filler' : formData.role === 'shipper' ? 'Shipper' : 'Filler'}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  variant={isEditing ? 'primary' : 'secondary'}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    'Edit Profile'
                  )}
                </Button>
              </div>

              <div className="space-y-6">
                <Input
                  label="Full Name"
                  icon={<User className="w-5 h-5" />}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                />

                <Input
                  label="Email Address"
                  icon={<Mail className="w-5 h-5" />}
                  value={formData.email}
                  disabled
                />

                <Input
                  label="Phone Number"
                  icon={<Phone className="w-5 h-5" />}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                />

                <Input
                  label="Location"
                  icon={<MapPin className="w-5 h-5" />}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  disabled={!isEditing}
                />

                {isEditing && (
                  <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-3">
                      I want to...
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {([
                        { value: 'shipper', label: 'List Space', icon: Ship },
                        { value: 'filler', label: 'Book Space', icon: Search },
                        { value: 'both', label: 'Both', icon: Award },
                      ] as const).map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, role: opt.value })}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            formData.role === opt.value
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-surface-200 hover:border-surface-300'
                          }`}
                        >
                          <opt.icon className="w-6 h-6 mx-auto mb-1 text-surface-600" />
                          <div className="font-medium text-surface-900 text-sm">{opt.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!isEditing && formData.role && (
                  <div>
                    <label className="block text-sm font-semibold text-surface-700 mb-3">
                      I want to...
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {([
                        { value: 'shipper', label: 'List Space', icon: Ship },
                        { value: 'filler', label: 'Book Space', icon: Search },
                        { value: 'both', label: 'Both', icon: Award },
                      ] as const).map((opt) => (
                        <div
                          key={opt.value}
                          className={`p-4 rounded-xl border-2 text-center ${
                            formData.role === opt.value
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-surface-200'
                          }`}
                        >
                          <opt.icon className={`w-6 h-6 mx-auto mb-1 ${formData.role === opt.value ? 'text-primary-600' : 'text-surface-300'}`} />
                          <div className={`font-medium text-sm ${formData.role === opt.value ? 'text-surface-900' : 'text-surface-400'}`}>{opt.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-surface-700 mb-3">Account Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {([
                      { value: 'individual', label: 'Individual' },
                      { value: 'business', label: 'Business' },
                    ] as const).map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        disabled={!isEditing}
                        onClick={() => setFormData({ ...formData, userType: opt.value })}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          formData.userType === opt.value
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-surface-200 hover:border-surface-300'
                        } ${!isEditing ? 'cursor-default' : ''}`}
                      >
                        <div className={`font-medium text-sm ${formData.userType === opt.value ? 'text-surface-900' : 'text-surface-600'}`}>
                          {opt.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {formData.userType === 'business' && (
                  <>
                    <Input
                      label="Business Name"
                      icon={<Briefcase className="w-5 h-5" />}
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Business Registration Number"
                      icon={<Briefcase className="w-5 h-5" />}
                      value={formData.businessRegistration}
                      onChange={(e) => setFormData({ ...formData, businessRegistration: e.target.value })}
                      disabled={!isEditing}
                    />
                  </>
                )}
              </div>
            </Card>

            {currentUser?.verified && (
              <Card className="mt-6 p-4 bg-accent-50 border-accent-100">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-accent-600" />
                  <div>
                    <div className="font-semibold text-accent-700 text-sm">Verified Account</div>
                    <p className="text-xs text-accent-600">Your identity has been verified. Fillers see a trust badge on your listings.</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
