'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Package, Truck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

const PRICING_PLANS = [
  {
    name: 'Starter',
    description: 'Perfect for personal shipments and occasional shippers',
    price: 0,
    icon: Package,
    features: [
      'Up to 5kg package weight',
      'Standard shipping (3-5 days)',
      'Join existing groups',
      'Basic tracking',
      'KES 10,000 insurance',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Regular',
    description: 'Great for small businesses and frequent shippers',
    price: 499,
    period: '/month',
    icon: Truck,
    features: [
      'Up to 15kg package weight',
      'Priority shipping (2-3 days)',
      'Create & join groups',
      'Real-time tracking',
      'KES 25,000 insurance',
      'Priority email support',
      'M-Pesa integration',
      'SMS notifications',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Business',
    description: 'For businesses with high shipping volumes',
    price: 1999,
    period: '/month',
    icon: Zap,
    features: [
      'Up to 50kg package weight',
      'Express shipping (24-48h)',
      'Unlimited group creation',
      'Advanced tracking & analytics',
      'KES 50,000 insurance',
      '24/7 phone support',
      'Dedicated account manager',
      'API access',
      'Custom billing',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const ROUTE_PRICING = [
  { route: 'Nairobi - Mombasa', solo: 2500, group: 1500, savings: '40%' },
  { route: 'Nairobi - Kisumu', solo: 2200, group: 1320, savings: '40%' },
  { route: 'Nairobi - Nakuru', solo: 1200, group: 720, savings: '40%' },
  { route: 'Nairobi - Eldoret', solo: 2800, group: 1540, savings: '45%' },
  { route: 'Mombasa - Nairobi', solo: 2200, group: 1100, savings: '50%' },
  { route: 'Kisumu - Nairobi', solo: 2400, group: 1440, savings: '40%' },
];

const FAQ = [
  {
    question: 'Is there a free trial?',
    answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required to start.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. Cancel your subscription at any time with no penalties or hidden fees.',
  },
  {
    question: 'What happens if my package is lost or damaged?',
    answer: 'All shipments are insured up to the plan limit. File a claim through your dashboard and we\'ll process it within 7 business days.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a full refund within 30 days of payment if you\'re not satisfied with our service.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can change your plan at any time. Changes take effect on your next billing cycle.',
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
            Choose the plan that fits your shipping needs. All plans include our group shipping savings.
          </p>
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
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-surface-900">KES {plan.price.toLocaleString()}</span>
                    {plan.period && <span className="text-surface-500">{plan.period}</span>}
                  </div>
                  {plan.price === 0 && (
                    <span className="text-sm text-surface-500">Free forever</span>
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

      <section className="py-20 lg:py-32 bg-surface-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              Route-Based Pricing
            </h2>
            <p className="text-lg text-surface-600">
              See how much you can save on popular routes
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-surface-50 border-b border-surface-100">
                    <th className="text-left p-4 text-sm font-semibold text-surface-600">Route</th>
                    <th className="text-right p-4 text-sm font-semibold text-surface-600">Solo Shipping</th>
                    <th className="text-right p-4 text-sm font-semibold text-surface-600">Group Shipping</th>
                    <th className="text-right p-4 text-sm font-semibold text-surface-600">You Save</th>
                  </tr>
                </thead>
                <tbody>
                  {ROUTE_PRICING.map((route, idx) => (
                    <tr key={idx} className="border-b border-surface-50 last:border-0">
                      <td className="p-4 font-medium text-surface-900">{route.route}</td>
                      <td className="p-4 text-right text-surface-500 line-through">KES {route.solo.toLocaleString()}</td>
                      <td className="p-4 text-right font-semibold text-surface-900">KES {route.group.toLocaleString()}</td>
                      <td className="p-4 text-right">
                        <Badge variant="accent">{route.savings}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <p className="text-center text-sm text-surface-500 mt-6">
            * Prices are estimates and may vary based on package weight and current group rates
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
