'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Package, Users, MapPin, Shield, Clock, Banknote, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

const MOCK_GROUPS = [
  {
    id: 1,
    destination: 'Mombasa',
    origin: 'Nairobi CBD',
    participants: 3,
    maxParticipants: 5,
    totalWeight: '45kg',
    savings: 'KES 2,400',
    deadline: '2 days',
    status: 'open',
  },
  {
    id: 2,
    destination: 'Kisumu',
    origin: 'Westlands, Nairobi',
    participants: 2,
    maxParticipants: 4,
    totalWeight: '28kg',
    savings: 'KES 1,800',
    deadline: '1 day',
    status: 'open',
  },
  {
    id: 3,
    destination: 'Nakuru',
    origin: 'Nairobi CBD',
    participants: 4,
    maxParticipants: 4,
    totalWeight: '62kg',
    savings: 'KES 3,200',
    deadline: 'Closing today',
    status: 'closing',
  },
];

export default function LandingPage() {
  const steps = [
    {
      icon: MapPin,
      title: 'Enter Your Route',
      desc: 'Tell us where you\'re shipping from and to within Kenya',
    },
    {
      icon: Users,
      title: 'Join a Group',
      desc: 'We match you with others shipping to the same destination',
    },
    {
      icon: Banknote,
      title: 'Save Money',
      desc: 'Split costs and save up to 60% on shipping fees',
    },
  ];

  const testimonials = [
    {
      name: 'Wanjiku M.',
      role: 'Small Business Owner',
      location: 'Nairobi',
      content: 'ShipShare has cut my shipping costs by half! I send stock to Mombasa weekly and the group shipping feature is a game changer.',
      avatar: 'WM',
    },
    {
      name: 'Ochieng J.',
      role: 'Online Seller',
      location: 'Kisumu',
      content: 'Finally, a platform that understands local logistics. The cost savings are real - from KES 3,000 to KES 1,200 per shipment!',
      avatar: 'OJ',
    },
    {
      name: 'Sarah K.',
      role: 'Student',
      location: 'Nakuru',
      content: 'I use ShipShare to send care packages to my family. It\'s affordable and reliable. Love the tracking feature!',
      avatar: 'SK',
    },
  ];
  
  return (
    <>
      <Navbar />
      <main className="fade-in">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50/30 dark:from-slate-900 dark:to-slate-800 opacity-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-40">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-400 text-sm font-medium mb-8 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-accent-500 animate-pulse"></span>
                Now serving major routes in Kenya
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
                Save Money by <br />
                <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                  Shipping Together
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                Join thousands of Kenyans reducing shipping costs through group logistics.
                Perfect for small businesses, online sellers, and individuals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button size="xl" className="gap-2">
                    <span>Get Started Free</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/matching">
                  <Button variant="secondary" size="xl" className="gap-2">
                    <Search className="w-5 h-5" />
                    <span>View Active Groups</span>
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent-500" />
                  <span>Secure & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent-500" />
                  <span>24-48h Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-accent-500" />
                  <span>Save up to 60%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="border-t border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">KES 12M+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Saved by users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">50K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Shipments grouped</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">15K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Active users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">4.9/5</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">User rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How ShipShare Works</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">Three simple steps to smarter shipping</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center text-primary-600 dark:text-primary-400 mx-auto mb-6">
                      <step.icon className="w-8 h-8" />
                    </div>
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
                  </div>
                  {idx < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-gray-300 dark:text-slate-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Routes Preview */}
        <div className="py-24 bg-gray-50 dark:bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Popular Routes Today</h2>
                <p className="text-gray-600 dark:text-gray-400">Join existing groups and ship today</p>
              </div>
              <Link href="/matching">
                <Button variant="secondary" className="mt-4 md:mt-0">
                  View All Routes
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {MOCK_GROUPS.map((group) => (
                <Card key={group.id} className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                        <MapPin className="w-4 h-4" />
                        {group.origin}
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-primary-500" />
                        <span className="font-semibold text-gray-900 dark:text-white">{group.destination}</span>
                      </div>
                    </div>
                    <Badge variant={group.status === 'closing' ? 'warning' : 'accent'}>
                      {group.status === 'closing' ? 'Closing Soon' : 'Open'}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Spots left</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {group.maxParticipants - group.participants} of {group.maxParticipants}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Total weight</span>
                      <span className="font-medium text-gray-900 dark:text-white">{group.totalWeight}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Closes in</span>
                      <span className="font-medium text-accent-600 dark:text-accent-400">{group.deadline}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">You save</div>
                      <div className="text-lg font-bold text-accent-600 dark:text-accent-400">{group.savings}</div>
                    </div>
                    <Link href="/matching">
                      <Button size="sm">Join Group</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-24 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
              Trusted by Kenyans Nationwide
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <Card key={idx} className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic">&ldquo;{t.content}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-700 dark:text-primary-400 font-semibold text-sm">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {t.role} &bull; {t.location}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24 bg-primary-600 dark:bg-primary-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to start saving on shipping?</h2>
            <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of smart shippers across Kenya. Create your first shipment in under 2 minutes.
            </p>
            <Link href="/auth/signup">
              <Button size="xl" variant="accent" className="shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                <Zap className="w-5 h-5 mr-2" />
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}