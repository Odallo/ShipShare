'use client';

import React from 'react';
import Link from 'next/link';
import { Ship, Search, DollarSign, Shield, Clock, Users, ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

const STEPS = [
  {
    number: 1,
    icon: Ship,
    title: 'Shipper Lists Space',
    description: 'A freight forwarder or shipper posts available container slack space — route, CBM available, departure date, and price per CBM.',
  },
  {
    number: 2,
    icon: Search,
    title: 'Filler Finds & Books',
    description: 'Fillers browse by route and date, find a container heading their way, and book the exact CBM they need.',
  },
  {
    number: 3,
    icon: DollarSign,
    title: 'Pay Per CBM',
    description: 'Fillers pay only for the space they use. Shipper gets paid. Platform takes a small commission on booking.',
  },
  {
    number: 4,
    icon: Shield,
    title: 'Cargo Ships Confirmed',
    description: 'The container departs on schedule. Both parties track the shipment and rate each other afterward.',
  },
];

const BENEFITS = [
  {
    icon: DollarSign,
    title: 'Save 40-60% vs LCL',
    description: 'Fill slack space that would otherwise ship empty. Fillers get rates far below standard LCL pricing.',
  },
  {
    icon: Clock,
    title: 'No Minimum Volume',
    description: 'Need just 5 CBM? No problem. Book exactly what you need — no minimums, no wasted spend.',
  },
  {
    icon: Users,
    title: 'Monetize Empty Space',
    description: 'Shippers earn revenue from space they were already shipping empty. Turn waste into profit.',
  },
];

const TESTIMONIALS = [
  {
    name: 'James K.',
    role: 'Freight Forwarder',
    location: 'Mombasa',
    content: 'I was shipping containers with 30% empty space every week. Now I monetize that space and fillers get competitive rates.',
    avatar: 'JK',
    rating: 5,
  },
  {
    name: 'Amina H.',
    role: 'Importer',
    location: 'Nairobi',
    content: 'I ship electronics from China monthly. Finding slack space cut my freight costs by 45%. The platform is simple and transparent.',
    avatar: 'AH',
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
            Fill Empty Space, <span className="gradient-text">Ship Cheaper</span>
          </h1>
          <p className="text-lg text-surface-600 mb-10 max-w-2xl mx-auto">
            A marketplace connecting shippers with spare container capacity to businesses that need affordable freight.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="gap-2">
                <Ship className="w-5 h-5" />
                List Your Space
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/matching">
              <Button variant="secondary" size="lg">
                <Search className="w-5 h-5 mr-2" />
                Find Space
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
              Why Use ContainerShare?
            </h2>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">
              Better than LCL. Better than shipping empty.
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
            Ready to Ship Smarter?
          </h2>
          <p className="text-lg text-primary-100 mb-10 max-w-2xl mx-auto">
            Join freight forwarders and importers already using container slack space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup?role=shipper">
              <Button size="lg" variant="secondary" className="shadow-xl">
                List Your Space
              </Button>
            </Link>
            <Link href="/matching">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Find Space
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
              <span>Free to list</span>
            </div>
            <div className="flex items-center gap-2 text-primary-200 text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Pay only on booking</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
