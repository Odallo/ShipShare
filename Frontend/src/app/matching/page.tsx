'use client';

import React, { useState } from 'react';
import { MapPin, Users, Calendar, Search, ArrowRight, PlusCircle, TrendingDown, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { Modal } from '@/components/ui/Modal';

const SHIPPING_GROUPS = [
  {
    id: 'grp-001',
    origin: 'Nairobi, CBD',
    destination: 'Mombasa, CBD',
    participants: 3,
    maxParticipants: 5,
    totalWeight: '12.5 kg',
    soloCost: 2500,
    groupCost: 1500,
    savingsPercent: 40,
    departureDate: 'Apr 5, 2024',
    daysLeft: 2,
    status: 'open',
    provider: 'G4S Logistics',
  },
  {
    id: 'grp-002',
    origin: 'Nairobi, Westlands',
    destination: 'Nakuru, Town',
    participants: 2,
    maxParticipants: 4,
    totalWeight: '8.0 kg',
    soloCost: 1200,
    groupCost: 780,
    savingsPercent: 35,
    departureDate: 'Apr 6, 2024',
    daysLeft: 3,
    status: 'open',
    provider: 'FedEx Kenya',
  },
  {
    id: 'grp-003',
    origin: 'Nairobi, Kilimani',
    destination: 'Eldoret, CBD',
    participants: 4,
    maxParticipants: 4,
    totalWeight: '22.0 kg',
    soloCost: 2800,
    groupCost: 1540,
    savingsPercent: 45,
    departureDate: 'Apr 7, 2024',
    daysLeft: 1,
    status: 'closing',
    provider: 'DHL Kenya',
  },
  {
    id: 'grp-004',
    origin: 'Mombasa, CBD',
    destination: 'Nairobi, CBD',
    participants: 2,
    maxParticipants: 6,
    totalWeight: '15.0 kg',
    soloCost: 2200,
    groupCost: 1100,
    savingsPercent: 50,
    departureDate: 'Apr 8, 2024',
    daysLeft: 4,
    status: 'open',
    provider: 'G4S Logistics',
  },
];

export default function MatchingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<typeof SHIPPING_GROUPS[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleJoinGroup = (group: typeof SHIPPING_GROUPS[0]) => {
    setSelectedGroup(group);
    setIsModalOpen(true);
  };

  const confirmJoin = () => {
    alert(`You've joined the group to ${selectedGroup?.destination}!`);
    setIsModalOpen(false);
  };

  const filteredGroups = SHIPPING_GROUPS.filter(
    (group) =>
      group.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.origin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-surface-50">
      <Navbar />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 pt-16 lg:pt-20 lg:pl-64 fade-in">
          <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-surface-900">
                  Find Shipping Groups
                </h1>
                <p className="text-surface-500 mt-1">
                  Join groups going your way and save up to 50%
                </p>
              </div>
              
              <Card className="p-4 bg-gradient-to-r from-accent-50 to-primary-50 border-accent-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-surface-500">Your potential savings</div>
                    <div className="text-xl font-bold text-accent-600">KES 5,800+</div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="mb-8 p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                  <input
                    type="text"
                    placeholder="Search by destination or origin..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
                <div className="flex gap-3 flex-wrap">
                  <select className="px-4 py-2.5 border border-surface-200 rounded-lg text-sm bg-white text-surface-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>All Destinations</option>
                    <option>Nairobi</option>
                    <option>Mombasa</option>
                    <option>Kisumu</option>
                    <option>Nakuru</option>
                    <option>Eldoret</option>
                  </select>
                  <select className="px-4 py-2.5 border border-surface-200 rounded-lg text-sm bg-white text-surface-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>Any Time</option>
                    <option>Today</option>
                    <option>Tomorrow</option>
                    <option>This Week</option>
                  </select>
                  <Button variant="secondary" className="gap-2">
                    <Filter className="w-4 h-4" />
                    More Filters
                  </Button>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              {filteredGroups.map((group) => (
                <Card key={group.id} hover className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 shrink-0">
                          <MapPin className="w-7 h-7" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <h3 className="text-lg font-semibold text-surface-900">{group.origin}</h3>
                            <ArrowRight className="w-4 h-4 text-surface-400" />
                            <h3 className="text-lg font-semibold text-surface-900">{group.destination}</h3>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant={group.status === 'closing' ? 'warning' : 'primary'}>
                              {group.status === 'closing' ? 'Closing Soon' : 'Accepting Members'}
                            </Badge>
                            <span className="text-sm text-surface-500">ID: {group.id}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-surface-500 text-xs mb-1">Members</div>
                          <div className="flex items-center gap-2 text-surface-900 font-medium">
                            <Users className="w-4 h-4 text-primary-500" />
                            <span>{group.participants}/{group.maxParticipants}</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-surface-500 text-xs mb-1">Total Weight</div>
                          <div className="text-surface-900 font-medium">{group.totalWeight}</div>
                        </div>
                        <div>
                          <div className="text-surface-500 text-xs mb-1">Departure</div>
                          <div className="flex items-center gap-2 text-surface-900 font-medium">
                            <Calendar className="w-4 h-4 text-primary-500" />
                            <span>{group.departureDate}</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-surface-500 text-xs mb-1">Provider</div>
                          <div className="text-surface-900 font-medium">{group.provider}</div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-surface-500 mb-1">
                          <span>{group.participants} joined</span>
                          <span>{group.maxParticipants - group.participants} spots left</span>
                        </div>
                        <div className="w-full bg-surface-100 rounded-full h-2">
                          <div
                            className="gradient-bg h-2 rounded-full transition-all"
                            style={{ width: `${(group.participants / group.maxParticipants) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-64 flex flex-col justify-center lg:border-l border-surface-100 lg:pl-6">
                      <div className="mb-2">
                        <div className="text-sm text-surface-500">Solo shipping</div>
                        <div className="text-lg text-surface-400 line-through">KES {group.soloCost.toLocaleString()}</div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm text-accent-600 font-medium">With this group</div>
                        <div className="text-3xl font-bold text-accent-600">
                          KES {group.groupCost.toLocaleString()}
                        </div>
                        <div className="text-sm text-surface-500">Save {group.savingsPercent}%</div>
                      </div>
                      <Button onClick={() => handleJoinGroup(group)} className="w-full">
                        Join Group
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredGroups.length === 0 && (
              <Card className="p-12 text-center">
                <MapPin className="w-12 h-12 text-surface-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-surface-900 mb-2">No groups found</h3>
                <p className="text-surface-500 mb-6">
                  Try adjusting your search or create a new group
                </p>
                <Button>Create New Group</Button>
              </Card>
            )}

            <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-primary-600 shadow-card">
                    <PlusCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-surface-900">Can&apos;t find a match?</h3>
                    <p className="text-sm text-surface-600">
                      Create your own group and invite others to join
                    </p>
                  </div>
                </div>
                <Button variant="secondary">Create New Group</Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Join Shipping Group"
      >
        {selectedGroup && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-xl p-4 border border-accent-100">
              <div className="text-center">
                <div className="text-sm text-surface-600 mb-1">You&apos;ll save approximately</div>
                <div className="text-4xl font-bold gradient-text">
                  KES {(selectedGroup.soloCost - selectedGroup.groupCost).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-surface-100">
                <span className="text-surface-500">Route</span>
                <span className="font-medium text-surface-900">
                  {selectedGroup.origin} - {selectedGroup.destination}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-surface-100">
                <span className="text-surface-500">Group size</span>
                <span className="font-medium text-surface-900">
                  {selectedGroup.participants}/{selectedGroup.maxParticipants} members
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-surface-100">
                <span className="text-surface-500">Departure</span>
                <span className="font-medium text-surface-900">{selectedGroup.departureDate}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-surface-500">Provider</span>
                <span className="font-medium text-surface-900">{selectedGroup.provider}</span>
              </div>
            </div>

            <p className="text-sm text-surface-600">
              By joining, you&apos;ll share shipping costs with other members. Payment will be 
              collected via M-Pesa once the group is full.
            </p>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={confirmJoin} className="flex-1">
                Confirm & Join
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
