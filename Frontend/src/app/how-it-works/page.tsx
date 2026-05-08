'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Users, Banknote, Shield, Clock, Truck, Package, ArrowRight, CheckCircle2, Star } from 'lucide-react';
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
    description: 'Tell us where you\'re shipping from and to. We cover major routes across Kenya including Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and more.',
  },
  {
    number: 2,
    icon: Users,
    title: 'Join or Create a Group',
    description: 'Browse existing groups heading your way or create your own. Our smart matching algorithm connects you with others shipping to the same destination.',
  },
  {
    number: 3,
    icon: Banknote,
    title: 'Save Up to 60%',
    description: 'By grouping shipments together, you split the shipping costs and save significantly. Payment is collected securely via M-Pesa once groups are confirmed.',
  },
  {
    number: 4,
    icon: Truck,
    title: 'Track & Receive',
    description: 'Track your shipment in real-time from pickup to delivery. All shipments are insured for peace of mind.',
  },
];

const BENEFITS = [
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'Every shipment is insured up to KES 50,000. Your packages are protected from pickup to delivery.',
  },
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: '24-48 hour delivery on major routes. Express options available for urgent shipments.',
  },
  {
    icon: Package,
    title: 'Flexible Sizes',
    description: 'Ship documents, small packages, or large items up to 50kg. We handle it all.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Wanjiku M.',
    role: 'Small Business Owner',
    location: 'Nairobi',
    content: 'ShipShare has cut my shipping costs by half! I send stock to Mombasa weekly.',
    avatar: 'WM',
    rating: 5,
  },
  {
    name: 'Ochieng J.',
    role: 'Online Seller',
    location: 'Kisumu',
    content: 'The cost savings are real - from KES 3,000 to KES 1,200 per shipment!',
    avatar: 'OJ',
    rating: 5,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-surface-50 to-white overflow-hidden">
        <div className="blob blob-primary w-[400px] h-[400px] -top-32 -right-32 opacity-20" />
        <div className="blob blob-secondary w-[300px] h-[300px] -bottom-32 -left-32 opacity-20" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="new" className="mb-6">How It Works</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-surface-900 mb-6">
            Ship Smarter, <span className="gradient-text">Save More</span>
          </h1>
          <p className="text-lg text-surface-600 mb-10 max-w-2xl mx-auto">
            Learn how ShipShare helps you save up to 60% on shipping costs by connecting you with other shippers heading the same way.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="secondary" size="lg">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
                    <step.icon className="w-10 h-10" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-white font-bold text-sm shadow-glow">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-surface-900 mb-3">{step.title}</h3>
                <p className="text-surface-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              Why Ship with ShipShare?
            </h2>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">
              We make shipping affordable, reliable, and transparent for everyone in Kenya.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {BENEFITS.map((benefit, idx) => (
              <Card key={idx} hover className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-surface-900 mb-3">{benefit.title}</h3>
                <p className="text-surface-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-surface-900 mb-16">
            What Our Users Say
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {TESTIMONIALS.map((testimonial, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-surface-700 mb-6 italic">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-surface-900 text-sm">{testimonial.name}</div>
                    <div className="text-xs text-surface-500">
                      {testimonial.role} - {testimonial.location}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 relative overflow-hidden">
        <div className="blob blob-primary w-[400px] h-[400px] opacity-20 -bottom-32 -left-32" />
        <div className="blob blob-secondary w-[300px] h-[300px] opacity-20 -top-32 -right-32" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-lg text-primary-100 mb-10 max-w-2xl mx-auto">
            Join thousands of smart shippers across Kenya. Create your free account in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" variant="secondary" className="shadow-xl">
                Create Free Account
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-primary-200 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2 text-primary-200 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Free to join</span>
            </div>
            <div className="flex items-center gap-2 text-primary-200 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
