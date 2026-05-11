'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Package, Truck, Zap, Users, Banknote, AlertTriangle, ShieldCheck, Scale, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

const WEIGHT_TIERS = [
  { weight: 'Up to 5kg', solo: 1200, group: 720, guaranteed: 900 },
  { weight: 'Up to 10kg', solo: 2000, group: 1200, guaranteed: 1500 },
  { weight: 'Up to 15kg', solo: 2800, group: 1680, guaranteed: 2100 },
  { weight: 'Up to 20kg', solo: 3500, group: 2100, guaranteed: 2600 },
  { weight: 'Up to 30kg', solo: 4800, group: 2880, guaranteed: 3600 },
];

const POPULAR_ROUTES = [
  { route: 'Nairobi ↔ Mombasa', avgDays: '24-48h', partners: ['G4S', 'DHL', 'FedEx'] },
  { route: 'Nairobi ↔ Kisumu', avgDays: '24-36h', partners: ['G4S', 'Sendy'] },
  { route: 'Nairobi ↔ Nakuru', avgDays: '12-24h', partners: ['G4S', 'FedEx'] },
  { route: 'Nairobi ↔ Eldoret', avgDays: '24-48h', partners: ['DHL', 'Sendy'] },
  { route: 'Mombasa ↔ Kisumu', avgDays: '36-48h', partners: ['G4S'] },
];

const PRICE_TYPES = [
  {
    id: 'solo',
    name: 'Solo Rate',
    description: 'Ship alone with full premium service',
    icon: Package,
    color: 'surface',
    savings: null,
  },
  {
    id: 'group',
    name: 'Group Rate',
    description: 'Join others heading the same way',
    icon: Users,
    color: 'accent',
    savings: '40-50%',
  },
  {
    id: 'guaranteed',
    name: 'Guaranteed Rate',
    description: 'Ship now, pay group rate if group fills',
    icon: ShieldCheck,
    color: 'primary',
    savings: '25-30%',
  },
];

const FAQ = [
  {
    question: 'How does the Guaranteed Rate work?',
    answer: 'Pay the guaranteed rate upfront. If the group fills before departure, you get refunded the difference back to your M-Pesa. If the group doesn\'t fill, your shipment still departs at the guaranteed rate — no waiting.',
  },
  {
    question: 'When do I pay?',
    answer: 'Payment is collected via M-Pesa once your group is confirmed. For Guaranteed Rate, payment is collected immediately to secure your spot.',
  },
  {
    question: 'What happens if my package is lost or damaged?',
    answer: 'All shipments are insured up to KES 50,000. File a claim through your dashboard and we process it within 7 business days.',
  },
  {
    question: 'Can I cancel my shipment?',
    answer: 'Yes, cancel for free up to 12 hours before departure. After that, a small cancellation fee applies.',
  },
  {
    question: 'Why is ShipShare more expensive than bus parcel?',
    answer: 'Bus parcel services are cheaper but don\'t include insurance, real-time tracking, door pickup/delivery, or accountability. ShipShare uses premium couriers (G4S, FedEx, DHL) with full insurance and tracking — at 40-60% less than going solo.',
  },
  {
    question: 'How do I join a group?',
    answer: 'Create a shipment with your route and package details. We\'ll automatically match you with existing groups or create a new group for you to invite others.',
  },
];

export default function PricingPage() {
  const [selectedWeight, setSelectedWeight] = useState(1);
  return (
    <>
      <Navbar />
      
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-surface-50 to-white overflow-hidden">
        <div className="blob blob-primary w-[400px] h-[400px] -top-32 -right-32 opacity-20" />
        <div className="blob blob-secondary w-[300px] h-[300px] -bottom-32 -left-32 opacity-20" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="new" className="mb-6">Pricing</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-surface-900 mb-6">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h1>
          <p className="text-lg text-surface-600 mb-10 max-w-2xl mx-auto">
            Premium courier shipping made affordable through group logistics. 
            You save up to 60% compared to solo courier rates.
          </p>
          
          <div className="inline-flex items-center gap-3 p-1.5 bg-surface-100 rounded-xl">
            <div className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-surface-900 shadow-sm">
              Premium Couriers
            </div>
            <div className="px-4 py-2 text-sm font-medium text-surface-600">
              G4S · FedEx · DHL
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              Pay Per Shipment
            </h2>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">
              No subscriptions. No monthly fees. Just pay for what you ship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICE_TYPES.map((type) => (
              <Card 
                key={type.id} 
                className={`p-6 relative ${
                  type.id === 'group' ? 'ring-2 ring-accent-500' : 
                  type.id === 'guaranteed' ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                {type.id === 'group' && (
                  <Badge variant="accent" className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Best Savings
                  </Badge>
                )}
                {type.id === 'guaranteed' && (
                  <Badge variant="new" className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    type.id === 'group' ? 'bg-accent-100 text-accent-600' :
                    type.id === 'guaranteed' ? 'gradient-bg text-white' :
                    'bg-surface-100 text-surface-600'
                  }`}>
                    <type.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-surface-900">{type.name}</h3>
                  <p className="text-surface-500 text-sm mt-1">{type.description}</p>
                  {type.savings && (
                    <div className="mt-2 text-sm font-medium text-accent-600">
                      Save {type.savings}
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <div className="text-sm text-surface-500 mb-1">Starting from</div>
                  <div className="text-3xl font-bold text-surface-900">
                    KES {type.id === 'solo' ? WEIGHT_TIERS[0].solo : 
                        type.id === 'group' ? WEIGHT_TIERS[0].group : 
                        WEIGHT_TIERS[0].guaranteed}
                  </div>
                  <div className="text-sm text-surface-400">per shipment</div>
                </div>

                <ul className="mt-6 space-y-2 text-sm">
                  {type.id === 'solo' && (
                    <>
                      <li className="flex items-center gap-2 text-surface-600">
                        <Check className="w-4 h-4 text-accent-500" /> Premium courier (G4S/DHL/FedEx)
                      </li>
                      <li className="flex items-center gap-2 text-surface-600">
                        <Check className="w-4 h-4 text-accent-500" /> Door-to-door pickup & delivery
                      </li>
                      <li className="flex items-center gap-2 text-surface-600">
                        <Check className="w-4 h-4 text-accent-500" /> Real-time GPS tracking
                      </li>
                      <li className="flex items-center gap-2 text-surface-600">
                        <Check className="w-4 h-4 text-accent-500" /> KES 50,000 insurance
                      </li>
                    </>
                  )}
                  {type.id === 'group' && (
                    <>
                      <li className="flex items-center gap-2 text-surface-600">
                        <Check className="w-4 h-4 text-accent-500" /> Everything in Solo Rate
                      </li>
                      <li className="flex items-center gap-2 text-surface-600">
                        <Check className="w-4 h-4 text-accent-500" /> Split costs with others
                      </li>
                      <li className="flex items-center gap-2 text-surface-600">
                        <Check className="w-4 h-4 text-accent-500" /> Best savings (40-50%)
                      </li>
                      <li className="flex items-center gap-2 text-surface-500">
                        <Info className="w-4 h-4" /> Ships only if group fills
                      </li>
                    </>
                  )}
                  {type.id === 'guaranteed' && (
                    <>
                      <li className="flex items-center gap-2 text-surface-600">
                        <Check className="w-4 h-4 text-accent-500" /> Everything in Group Rate
                      </li>
                      <li className="flex items-center gap-2 text-surface-600">
                        <Check className="w-4 h-4 text-accent-500" /> Ship immediately
                      </li>
                      <li className="flex items-center gap-2 text-surface-600">
                        <Check className="w-4 h-4 text-accent-500" /> Refund if group fills
                      </li>
                      <li className="flex items-center gap-2 text-surface-600">
                        <Check className="w-4 h-4 text-accent-500" /> No waiting, guaranteed delivery
                      </li>
                    </>
                  )}
                </ul>

                <Link href="/auth/signup" className="block mt-6">
                  <Button 
                    className="w-full" 
                    variant={type.id === 'guaranteed' ? 'primary' : 'secondary'}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-surface-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-surface-900 mb-2">
              How Our Pricing Works
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-surface-900 mb-2">You List Shipment</h3>
              <p className="text-sm text-surface-600">
                Tell us what you're shipping and where it's going. We find a group for you.
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-surface-900 mb-2">Group Ships Together</h3>
              <p className="text-sm text-surface-600">
                We connect you with others heading the same way. You split the courier cost.
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-secondary-100 rounded-xl flex items-center justify-center text-secondary-600">
                <Banknote className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-surface-900 mb-2">We Take a Small Fee</h3>
              <p className="text-sm text-surface-600">
                5-10% of the group shipping cost keeps the platform running.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-surface-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              Weight-Based Pricing
            </h2>
            <p className="text-lg text-surface-600">
              Choose your package size. All prices include insurance and tracking.
            </p>
          </div>

          <Card className="p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Scale className="w-5 h-5 text-primary-600" />
              <span className="font-semibold text-surface-900">Select your package weight</span>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {WEIGHT_TIERS.map((tier, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedWeight(idx)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedWeight === idx
                      ? 'gradient-bg text-white'
                      : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                  }`}
                >
                  {tier.weight}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-xl border-2 ${
                PRICE_TYPES[0].id === 'solo' ? 'border-surface-200 bg-white' : ''
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  <Package className="w-5 h-5 text-surface-500" />
                  <span className="font-semibold text-surface-900">Solo Rate</span>
                </div>
                <div className="text-2xl font-bold text-surface-400 line-through mb-1">
                  KES {WEIGHT_TIERS[selectedWeight].solo.toLocaleString()}
                </div>
                <div className="text-sm text-surface-500">Full premium service</div>
              </div>
              
              <div className="p-4 rounded-xl border-2 border-accent-200 bg-accent-50">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-accent-600" />
                  <span className="font-semibold text-accent-700">Group Rate</span>
                  <Badge variant="accent">Best</Badge>
                </div>
                <div className="text-3xl font-bold text-accent-600 mb-1">
                  KES {WEIGHT_TIERS[selectedWeight].group.toLocaleString()}
                </div>
                <div className="text-sm text-accent-600">
                  Save {Math.round((1 - WEIGHT_TIERS[selectedWeight].group / WEIGHT_TIERS[selectedWeight].solo) * 100)}% vs solo
                </div>
              </div>
              
              <div className="p-4 rounded-xl border-2 border-primary-200 bg-primary-50">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-5 h-5 text-primary-600" />
                  <span className="font-semibold text-primary-700">Guaranteed</span>
                </div>
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  KES {WEIGHT_TIERS[selectedWeight].guaranteed.toLocaleString()}
                </div>
                <div className="text-sm text-primary-600">
                  Ship now, refund if group fills
                </div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-5 gap-4">
            {POPULAR_ROUTES.map((route, idx) => (
              <Card key={idx} className="p-4">
                <div className="font-semibold text-surface-900 mb-1">{route.route}</div>
                <div className="text-xs text-surface-500 mb-2">{route.avgDays}</div>
                <div className="flex flex-wrap gap-1">
                  {route.partners.map((partner) => (
                    <span key={partner} className="text-xs px-2 py-0.5 bg-surface-100 rounded text-surface-600">
                      {partner}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <strong>What's included:</strong> Door-to-door pickup & delivery, real-time GPS tracking, 
                KES 50,000 insurance, and M-Pesa payment. All prices are final — no hidden fees.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-surface-600">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="space-y-4">
            {FAQ.map((item, idx) => (
              <details key={idx} className="group card-elevated">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="font-semibold text-surface-900 pr-4">{item.question}</span>
                  <ArrowRight className="w-5 h-5 text-surface-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-surface-600">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-surface-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-surface-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-surface-600 mb-8">
            Our team is here to help you find the right plan for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Button variant="secondary" size="lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}