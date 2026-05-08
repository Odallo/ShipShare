'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, Briefcase, Save, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    userType: 'individual',
    businessName: '',
    businessRegistration: '',
  });
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('shipshare_user');
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
        userType: currentUser.userType || 'individual',
        businessName: currentUser.businessName || '',
        businessRegistration: currentUser.businessRegistration || '',
      });
    }
  }, [user, router]);

  const handleSave = () => {
    const currentUser = user || JSON.parse(localStorage.getItem('shipshare_user') || '{}');
    const updatedUser = { ...currentUser, ...formData };
    localStorage.setItem('shipshare_user', JSON.stringify(updatedUser));
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

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

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {formData.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-surface-900">{formData.name}</h2>
                    <Badge variant={formData.userType === 'business' ? 'secondary' : 'primary'}>
                      {formData.userType === 'business' ? 'Business Account' : 'Individual Account'}
                    </Badge>
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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
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
          </div>
        </main>
      </div>
    </div>
  );
}
