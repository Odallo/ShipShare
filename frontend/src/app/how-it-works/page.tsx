'use client';

import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Users, 
  Banknote, 
  Package, 
  Truck, 
  Shield, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  Star,
  Search,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

const STEPS = [
  {
    number: 1,
    icon: MapPin,
    title: 'Enter Your Route',
    description: 'Tell us where you\'re shipping from and your destination within Kenya. We cover all major routes including Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and more.',
    color: 'bg-primary-100 text-primary-600',
  },
  {
    number: 2,
    icon: Package,
    title: 'List Your Package',
    description: 'Provide details about your package - weight, size, type, and preferred pickup date. Our system calculates the best shipping options for you.',
    color: 'bg-secondary-100 text-secondary-600',
  },
  {
    number: 3,
    icon: Search,
    title: 'We Find Matches',
    description: 'Our algorithm automatically matches you with other shippers going to the same destination. Join existing groups or create new ones.',
    color: 'bg-accent-100 text-accent-600',
  },
  {
    number: 4,
    icon: Users,
    title: 'Join a Group',
    description: 'Once a group reaches minimum participants, it\'s confirmed. You\'ll receive payment details via M-Pesa and pickup scheduled.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    number: 5,
    icon: Truck,
    title: 'Ship Together',
    description: 'Your package joins others in the group shipment. All packages are tracked and insured throughout the journey.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    number: 6,
    icon: CheckCircle2,
    title: 'Delivered & Saved',
    description: 'Receive your package at the destination. You\'ve saved up to 60% compared to individual shipping rates!',
    color: 'bg-green-100 text-green-600',
  },
];

const FEATURES = [
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'All shipments are insured up to KES 50,000. Your package is protected from pickup to delivery.',
  },
  {
    icon: Clock,
    title: '24-48h Delivery',
    description: 'Express delivery on major routes. Standard delivery within 3-5 days.',
  },
  {
    icon: Banknote,
    title: 'Best Price Guarantee',
    description: 'We match any competitor pricing. Save up to 60% on every shipment.',
  },
  {
    icon: Package,
    title: 'Real-time Tracking',
    description: 'Track your package from pickup to delivery. Get updates at every stage.',
  },
];

const FAQ = [
  {
    question: 'How does group shipping work?',
    answer: 'Group shipping combines multiple packages heading to the same destination into a single shipment. This reduces costs for everyone since shipping providers charge per shipment, not per package weight within a group.',
  },
  {
    question: 'Is my package insured?',
    answer: 'Yes! All ShipShare shipments are fully insured up to KES 50,000. In the rare case of damage or loss, we\'ll process your claim within 7 business days.',
  },
  {
    question: 'How long does it take for a group to fill?',
    answer: 'Most groups fill within 1-3 days on popular routes like Nairobi-Mombasa. You\'ll be notified immediately when a group is confirmed.',
  },
  {
    question: 'What if my package doesn\'t fit in a group?',
    answer: 'For large packages, we offer dedicated group options with fewer participants. You can also choose express shipping for guaranteed dispatch.',
  },
  {
    question: 'How do I pay?',
    answer: 'We accept M-Pesa for local payments. Once your group is confirmed, you\'ll receive a payment prompt. Payment is required within 24 hours to secure your spot.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-surface-50 to-white overflow-hidden">
        <div className="blob blob-primary w-[400px] h-[400px] -top-32 -left-32 opacity-20" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="new" className="mb-6">How It Works</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-surface-900 mb-6">
            Shipping Made <span className="gradient-text">Simple & Affordable</span>
          </h1>
          <p className="text-lg text-surface-600 mb-10 max-w-2xl mx-auto">
            Learn how ShipShare helps you save up to 60% on shipping costs through group logistics.
            Six simple steps to smarter shipping in Kenya.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="gap-2">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              Six Steps to Savings
            </h2>
            <p className="text-lg text-surface-600">
              From listing your package to delivery - here&apos;s how it works
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <Card key={step.number} hover className="p-6 relative">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center text-2xl shrink-0`}>
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-surface-400">Step {step.number}</span>
                      <Badge variant="new" className="text-xs">NEW</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-surface-900 mb-2">{step.title}</h3>
                    <p className="text-surface-600 text-sm">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              Why Ship with ShipShare?
            </h2>
            <p className="text-lg text-surface-600">
              We make shipping reliable, affordable, and transparent
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, idx) => (
              <Card key={idx} className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">{feature.title}</h3>
                <p className="text-surface-600 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-1">KES 12M+</div>
              <div className="text-primary-100 text-sm">Total Saved</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-1">50,000+</div>
              <div className="text-primary-100 text-sm">Shipments</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-1">15,000+</div>
              <div className="text-primary-100 text-sm">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-1">4.9/5</div>
              <div className="text-primary-100 text-sm">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-surface-600">
              Got questions? We&apos;ve got answers
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

      {/* CTA */}
      <section className="py-20 bg-surface-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-surface-900 mb-4">
            Ready to Start Saving?
          </h2>
          <p className="text-lg text-surface-600 mb-8">
            Join thousands of Kenyans who are already saving on shipping costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg">Create Free Account</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="secondary" size="lg">View Pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}