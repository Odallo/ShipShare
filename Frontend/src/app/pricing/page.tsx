'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Ship, Search, DollarSign, Shield, Percent, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

const FAQ = [
  {
    question: 'How does the commission work?',
    answer: 'We charge a flat 10% fee on each successful booking. If a filler books $500 worth of space, our fee is $50 and the shipper receives $450. No hidden fees, no subscriptions.',
  },
  {
    question: 'What if my container space doesn\'t sell?',
    answer: 'No charge. Listings are completely free. You only pay when a filler books space on your container.',
  },
  {
    question: 'How do fillers pay?',
    answer: 'Fillers pay via secure payment (Stripe). Funds are held in escrow until the container departs, then released to the shipper minus commission.',
  },
  {
    question: 'Is there a minimum CBM I need to list?',
    answer: 'No minimum. Even 1 CBM of slack space is worth listing. Every cubic meter counts.',
  },
  {
    question: 'How is the price per CBM determined?',
    answer: 'Shippers set their own price per CBM. Typical China → East Africa rates range from $35-55/CBM. We show market rate benchmarks when you create a listing.',
  },
  {
    question: 'What if my cargo is damaged?',
    answer: 'The shipper\'s existing cargo insurance covers full container loads. Fillers should arrange their own insurance for high-value goods, or we can connect you with a partner insurer.',
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
            List for free. Pay only when your space gets booked.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 relative ring-2 ring-accent-500">
              <Badge variant="accent" className="absolute -top-3 left-1/2 -translate-x-1/2">
                For Shippers
              </Badge>
              
              <div className="text-center mb-6 mt-4">
                <div className="w-14 h-14 mx-auto mb-4 bg-accent-100 rounded-2xl flex items-center justify-center text-accent-600">
                  <Ship className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-surface-900">Free to List</h3>
                <p className="text-surface-500 text-sm mt-1">Pay 10% only when space sells</p>
              </div>

              <div className="text-center mb-6">
                <div className="text-sm text-surface-500 mb-1">Commission per booking</div>
                <div className="text-4xl font-bold text-accent-600">10%</div>
                <div className="text-sm text-surface-400">of booking value</div>
              </div>

              <ul className="space-y-3 text-sm mb-8">
                <li className="flex items-center gap-2 text-surface-700">
                  <Check className="w-4 h-4 text-accent-500" /> Free listing — no upfront cost
                </li>
                <li className="flex items-center gap-2 text-surface-700">
                  <Check className="w-4 h-4 text-accent-500" /> No monthly subscription
                </li>
                <li className="flex items-center gap-2 text-surface-700">
                  <Check className="w-4 h-4 text-accent-500" /> You set your own price per CBM
                </li>
                <li className="flex items-center gap-2 text-surface-700">
                  <Check className="w-4 h-4 text-accent-500" /> Automatic payout on departure
                </li>
              </ul>

              <Link href="/shipments/create">
                <Button className="w-full" variant="secondary">
                  Start Listing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </Card>

            <Card className="p-8 relative ring-2 ring-primary-500">
              <Badge variant="new" className="absolute -top-3 left-1/2 -translate-x-1/2">
                For Fillers
              </Badge>
              
              <div className="text-center mb-6 mt-4">
                <div className="w-14 h-14 mx-auto mb-4 gradient-bg rounded-2xl flex items-center justify-center text-white">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-surface-900">Pay Per CBM</h3>
                <p className="text-surface-500 text-sm mt-1">Save 40-60% vs standard LCL rates</p>
              </div>

              <div className="text-center mb-6">
                <div className="text-sm text-surface-500 mb-1">Typical savings</div>
                <div className="text-4xl font-bold text-primary-600">40-60%</div>
                <div className="text-sm text-surface-400">off traditional LCL pricing</div>
              </div>

              <ul className="space-y-3 text-sm mb-8">
                <li className="flex items-center gap-2 text-surface-700">
                  <Check className="w-4 h-4 text-primary-500" /> Pay only for space you use
                </li>
                <li className="flex items-center gap-2 text-surface-700">
                  <Check className="w-4 h-4 text-primary-500" /> No minimum CBM
                </li>
                <li className="flex items-center gap-2 text-surface-700">
                  <Check className="w-4 h-4 text-primary-500" /> Transparent pricing per CBM
                </li>
                <li className="flex items-center gap-2 text-surface-700">
                  <Check className="w-4 h-4 text-primary-500" /> Secure escrow payment
                </li>
              </ul>

              <Link href="/matching">
                <Button className="w-full">
                  Browse Space
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface-50 border-y border-surface-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-surface-900 mb-2">
              How the Pricing Works
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                <Ship className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-surface-900 mb-2">Shipper Lists Space</h3>
              <p className="text-sm text-surface-600">
                Posts available CBM at their price. Free to list, no subscription.
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-accent-100 rounded-xl flex items-center justify-center text-accent-600">
                <Percent className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-surface-900 mb-2">Filler Books & Pays</h3>
              <p className="text-sm text-surface-600">
                Filler pays total price. Platform deducts 10% commission, rest goes to shipper.
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-secondary-100 rounded-xl flex items-center justify-center text-secondary-600">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-surface-900 mb-2">Cargo Ships</h3>
              <p className="text-sm text-surface-600">
                Container departs on schedule. Shipper gets paid. Filler gets their cargo.
              </p>
            </Card>
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
              Everything you need to know about pricing
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
            We're here to help you get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
