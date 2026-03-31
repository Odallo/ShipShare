'use client';

import React, { useState } from 'react';
import { MapPin, Users, TrendingDown, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { mockMatches } from '@/utils/mockData';
import { Modal } from '@/components/ui/Modal';

export default function MatchingPage() {
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleJoinGroup = (match: any) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };
  
  const confirmJoin = () => {
    alert(`You've joined the group to ${selectedMatch.destination}!`);
    setIsModalOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Find Shipping Groups
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Join existing groups to save on shipping costs
              </p>
            </div>
            
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select className="px-3 py-2 border rounded-lg text-sm dark:bg-gray-800 dark:border-gray-700">
                    <option>All Destinations</option>
                    <option>Mombasa</option>
                    <option>Kisumu</option>
                    <option>Nakuru</option>
                    <option>Eldoret</option>
                  </select>
                  <select className="px-3 py-2 border rounded-lg text-sm dark:bg-gray-800 dark:border-gray-700">
                    <option>Any Date</option>
                    <option>Next 3 days</option>
                    <option>Next 7 days</option>
                  </select>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              {mockMatches.map((match) => (
                <Card key={match.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-5 w-5 text-primary-600" />
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {match.destination}
                          </h3>
                          <Badge variant="success">
                            {match.participants} Participants
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Users className="h-4 w-4" />
                            <span>{match.participants} people joining</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <span>{match.totalWeight} kg total</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4" />
                            <span>Departs {match.departureDate.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="mb-2">
                          <p className="text-2xl font-bold text-green-600">
                            Save KES {match.estimatedSavings.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">Estimated savings</p>
                        </div>
                        <Button onClick={() => handleJoinGroup(match)}>
                          Join Group
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Confirm Join Group">
        <div className="space-y-4">
          <p>Are you sure you want to join the group to <strong>{selectedMatch?.destination}</strong>?</p>
          <p className="text-sm text-gray-600">
            By joining this group, you agree to share shipping costs with {selectedMatch?.participants} other participants.
            Your estimated savings: <strong className="text-green-600">KES {selectedMatch?.estimatedSavings}</strong>
          </p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmJoin}>
              Confirm Join
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}