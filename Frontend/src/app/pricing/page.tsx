'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Package, Truck, Zap, Users, Banknote, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

const PRICING_PLANS = [
  {
    name: 'Free',
    description: 'Pay per shipment. Perfect for testing and occasional shippers.',
    price: 0,
    period: 'pay as you go',
    platformFee: '10%',
    icon: Package,
    features: [
      'Up to 10kg package weight',
      'Standard shipping (3-5 days)',
      'Join existing groups',
      'Real-time tracking',
      'KES 10,000 insurance',
      'Email support',
      'M-Pesa integration',
    ],
    cta: 'Start Free',
    popular: true,
  },
  {
    name: 'Pro',
    description: 'Fixed monthly fee for frequent shippers. Save more with volume.',
    price: 2000,
    period: '/month',
    platformFee: '5%',
    icon: Truck,
    features: [
      'Up to 30kg package weight',
      'Priority shipping (2-3 days)',
      'Create unlimited groups',
      'Real-time tracking',
      'KES 25,000 insurance',
      'Priority support',
      'M-Pesa integration',
      'SMS notifications',
      'Dedicated account manager',
    ],
    cta: 'Go Pro',
    popular: false,
  },
  {
    name: 'Enterprise',
    description: 'Custom pricing for high-volume businesses and logistics partners.',
    price: 0,
    period: 'custom',
    platformFee: 'Negotiated',
    icon: Zap,
    features: [
      'Unlimited package weight',
      'Express shipping (24-48h)',
      'Unlimited group creation',
      'Advanced analytics dashboard',
      'KES 100,000 insurance',
      '24/7 phone support',
      'Dedicated account manager',
      'API access',
      'Custom billing',
      'White-label options',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const ROUTE_PRICING = [
  { route: 'Nairobi → Mombasa (10kg)', solo: 2500, group: 1500, bus: 400, savings: '40%' },
  { route: 'Nairobi → Kisumu (10kg)', solo: 2200, group: 1320, bus: 350, savings: '40%' },
  { route: 'Nairobi → Nakuru (10kg)', solo: 1200, group: 720, bus: 300, savings: '40%' },
  { route: 'Nairobi → Eldoret (10kg)', solo: 2800, group: 1540, bus: 350, savings: '45%' },
  { route: 'Mombasa → Nairobi (10kg)', solo: 2200, group: 1100, bus: 400, savings: '50%' },
  { route: 'Kisumu → Nairobi (10kg)', solo: 2400, group: 1440, bus: 350, savings: '40%' },
];

const FAQ = [
  {
    question: 'Is there a free trial?',
    answer: 'Yes! The Free plan has no monthly fees. You only pay a 10% platform fee per shipment. No credit card required to start.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. Cancel your subscription at any time with no penalties or hidden fees.',
  },
  {
    question: 'What happens if my package is lost or damaged?',
    answer: 'All shipments are insured up to the plan limit. File a claim through your dashboard and we process it within 7 business days.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a full refund within 30 days of payment if you are not satisfied with our service.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can change your plan at any time. Changes take effect on your next billing cycle.',
  },
  {
    question: 'Why is ShipShare more expensive than bus parcel?',
    answer: 'Bus parcel services are cheaper but don\'t include insurance, real-time tracking, door pickup/delivery, or accountability. ShipShare uses premium couriers (G4S, FedEx, DHL) with full insurance and tracking — at 40-60% less than going solo.',
  },
];

export default function PricingPage() {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan) => (
              <Card 
                key={plan.name} 
                className={`p-6 relative ${plan.popular ? 'ring-2 ring-primary-500 scale-105 z-10' : ''}`}
              >
                {plan.popular && (
                  <Badge variant="new" className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    plan.popular ? 'gradient-bg text-white' : 'bg-surface-100 text-surface-600'
                  }`}>
                    <plan.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-surface-900">{plan.name}</h3>
                  <p className="text-surface-500 text-sm mt-1">{plan.description}</p>
                </div>

                <div className="text-center mb-6">
                  {plan.price === 0 && plan.period === 'custom' ? (
                    <div>
                      <span className="text-3xl font-bold text-surface-900">Custom</span>
                      <p className="text-sm text-surface-500 mt-1">Tailored to your needs</p>
                    </div>
                  ) : plan.price === 0 ? (
                    <div>
                      <span className="text-3xl font-bold text-surface-900">Free</span>
                      <p className="text-sm text-surface-500 mt-1">No monthly fees</p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-surface-900">KES {plan.price.toLocaleString()}</span>
                        <span className="text-surface-500">{plan.period}</span>
                      </div>
                    </div>
                  )}
                  {plan.platformFee && (
                    <div className="mt-2">
                      <Badge variant="accent">
                        {plan.platformFee} per shipment
                      </Badge>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <Check className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                      <span className="text-surface-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/auth/signup">
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'primary' : 'secondary'}
                  >
                    {plan.cta}
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              Route-Based Pricing
            </h2>
            <p className="text-lg text-surface-600">
              See how much you can save compared to solo premium courier rates
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-surface-50 border-b border-surface-100">
                    <th className="text-left p-4 text-sm font-semibold text-surface-600">Route</th>
                    <th className="text-right p-4 text-sm font-semibold text-surface-600">Solo Courier</th>
                    <th className="text-right p-4 text-sm font-semibold text-surface-600">ShipShare Group</th>
                    <th className="text-right p-4 text-sm font-semibold text-surface-600">Bus Parcel</th>
                    <th className="text-right p-4 text-sm font-semibold text-surface-600">You Save</th>
                  </tr>
                </thead>
                <tbody>
                  {ROUTE_PRICING.map((route, idx) => (
                    <tr key={idx} className="border-b border-surface-50 last:border-0">
                      <td className="p-4 font-medium text-surface-900">{route.route}</td>
                      <td className="p-4 text-right text-surface-500 line-through">KES {route.solo.toLocaleString()}</td>
                      <td className="p-4 text-right font-semibold text-accent-600">KES {route.group.toLocaleString()}</td>
                      <td className="p-4 text-right text-surface-400">KES {route.bus.toLocaleString()}</td>
                      <td className="p-4 text-right">
                        <Badge variant="accent">{route.savings}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="text-sm text-amber-800">
                <strong>Note:</strong> Bus parcel rates are cheaper but come with tradeoffs — no insurance, no real-time tracking, 
                no door pickup/delivery, and limited accountability. ShipShare uses premium couriers (G4S, FedEx, DHL) 
                with full insurance, GPS tracking, and door-to-door service.
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-surface-500 mt-6">
            * Solo courier rates from G4S, FedEx & DHL. Bus parcel rates from Easy Coach, ENA Coach & Modern Coast.
          </p>
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