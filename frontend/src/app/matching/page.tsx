'use client';

import React, { useState } from 'react';
import { MapPin, Users, Calendar, Filter, Search, Clock, ArrowRight, PlusCircle, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { mockMatches, mockGroups } from '@/utils/mockData';
import { Modal } from '@/components/ui/Modal';

export default function MatchingPage() {
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleJoinGroup = (match: any) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const confirmJoin = () => {
    alert(`You've joined the group to ${selectedMatch.destination}!`);
    setIsModalOpen(false);
  };

  const allGroups = [...mockMatches, ...mockGroups];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 fade-in">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Find Shipping Groups
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Join groups going your way and save up to 40%
                </p>
              </div>
              <div className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-4 flex items-center gap-3 border border-accent-100 dark:border-accent-900/30">
                <TrendingDown className="w-6 h-6 text-accent-600" />
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Your potential savings</div>
                  <div className="text-lg font-bold text-accent-700 dark:text-accent-400">KES 5,800+</div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <Card className="mb-8 p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by destination..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <select className="px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg text-sm dark:bg-slate-800 dark:text-white">
                    <option>All Destinations</option>
                    <option>Nairobi</option>
                    <option>Mombasa</option>
                    <option>Kisumu</option>
                  </select>
                  <select className="px-4 py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg text-sm dark:bg-slate-800 dark:text-white">
                    <option>Any Time</option>
                    <option>Today</option>
                    <option>Tomorrow</option>
                    <option>This Week</option>
                  </select>
                  <Button variant="secondary">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Results */}
            <div className="space-y-4">
              {allGroups.map((group) => (
                <Card key={group.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left - Route */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0">
                          <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{group.origin}</h3>
                            <ArrowRight className="h-4 w-4 text-gray-400" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{group.destination}</h3>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={group.status === 'closing' ? 'warning' : 'accent'}>
                              {group.status === 'closing' ? 'Closing Soon' : 'Accepting Members'}
                            </Badge>
                            <span className="text-sm text-gray-500 dark:text-gray-400">ID: {group.id}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Members</div>
                          <div className="flex items-center gap-1 text-gray-900 dark:text-white">
                            <Users className="h-4 w-4 text-primary-500" />
                            <span className="font-medium">{group.participants}/{group.maxParticipants}</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Total Weight</div>
                          <div className="text-gray-900 dark:text-white font-medium">{group.totalWeight}</div>
                        </div>
                        <div>
                          <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Departure</div>
                          <div className="flex items-center gap-1 text-gray-900 dark:text-white">
                            <Calendar className="h-4 w-4 text-primary-500" />
                            <span className="font-medium">{group.deadline || 'In 2 days'}</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Provider</div>
                          <div className="text-gray-900 dark:text-white font-medium">G4S Logistics</div>
                        </div>
                      </div>
                    </div>

                    {/* Right - Pricing & CTA */}
                    <div className="lg:w-64 flex flex-col justify-center lg:border-l border-gray-200 dark:border-slate-700 lg:pl-6">
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Solo shipping</div>
                        <div className="text-lg text-gray-400 line-through">KES {group.estimatedCost || '2,500'}</div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm text-accent-600 dark:text-accent-400 font-medium">With this group</div>
                        <div className="text-2xl font-bold text-accent-700 dark:text-accent-400">
                          KES {Math.round((group.estimatedCost || 2500) * 0.6).toLocaleString()}
                        </div>
                      </div>
                      <Button onClick={() => handleJoinGroup(group)} className="w-full">
                        Join Group
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Create Group CTA */}
            <div className="mt-8 bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 border border-primary-100 dark:border-primary-900/30">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400">
                    <PlusCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Can't find a match?</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Create your own group and invite others to join</p>
                  </div>
                </div>
                <Button variant="outline">Create New Group</Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Join Shipping Group">
        <div className="space-y-4">
          <div className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-4 border border-accent-100 dark:border-accent-900/30">
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">You'll save approximately</div>
              <div className="text-3xl font-bold text-accent-700 dark:text-accent-400">
                KES {selectedMatch?.estimatedSavings || '1,000'}
              </div>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-700">
              <span className="text-gray-600 dark:text-gray-400">Route</span>
              <span className="font-medium text-gray-900 dark:text-white">{selectedMatch?.origin || 'Nairobi'} &rarr; {selectedMatch?.destination}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-700">
              <span className="text-gray-600 dark:text-gray-400">Group size</span>
              <span className="font-medium text-gray-900 dark:text-white">{selectedMatch?.participants || 4} members</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600 dark:text-gray-400">Departure</span>
              <span className="font-medium text-gray-900 dark:text-white">{selectedMatch?.deadline || 'In 2 days'}</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            By joining, you'll share shipping costs with other members. Payment will be collected via MPesa once the group is full.
          </p>

          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={confirmJoin} className="flex-1">
              Confirm & Join
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}