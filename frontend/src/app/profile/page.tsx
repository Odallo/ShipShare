'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Package, Settings, Save, CheckCircle, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { mockUser, mockShipments } from '@/utils/mockData';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUser);
  
  const userShipments = mockShipments.filter(s => s.userId === userData.id);
  const completedShipments = userShipments.filter(s => s.status === 'delivered');
  const savings = 1850;
  
  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage your account information
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Package className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{userShipments.length}</p>
                  <p className="text-sm text-gray-600">Total Shipments</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">{completedShipments.length}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <TrendingDown className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold">KES {savings.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Saved</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Full Name</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userData.name}
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                          className="w-full px-3 py-1 border rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="font-medium">{userData.name}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Email Address</p>
                      {isEditing ? (
                        <input
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                          className="w-full px-3 py-1 border rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="font-medium">{userData.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Phone Number</p>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                          className="w-full px-3 py-1 border rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="font-medium">{userData.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Location</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userData.location}
                          onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                          className="w-full px-3 py-1 border rounded-lg focus:ring-2 focus:ring-primary-500"
                        />
                      ) : (
                        <p className="font-medium">{userData.location}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">{userData.joinDate.toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <h2 className="text-xl font-semibold">Shipment History</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userShipments.map((shipment) => (
                    <div key={shipment.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">{shipment.pickupLocation} → {shipment.destination}</p>
                        <p className="text-sm text-gray-500">{shipment.weight} kg • {shipment.packageType}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          shipment.status === 'delivered' ? 'success' :
                          shipment.status === 'shipped' ? 'info' : 'warning'
                        }>
                          {shipment.status}
                        </Badge>
                        <p className="text-sm mt-1">KES {shipment.actualCost || shipment.estimatedCost}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}