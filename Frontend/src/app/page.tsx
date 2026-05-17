'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Ship, 
  Users, 
  Shield, 
  Clock, 
  Banknote, 
  Star,
  Zap,
  TrendingUp,
  CheckCircle2,
  Container,
  Search,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

const MOCK_LISTINGS = [
  {
    id: 1,
    origin: 'Shenzhen',
    destination: 'Mombasa',
    containerType: '40HC',
    availableCbm: 32,
    totalCbm: 76,
    pricePerCbm: 42,
    departureDate: 'May 22, 2026',
    shippingLine: 'Maersk',
    fillRate: 58,
    status: 'open',
  },
  {
    id: 2,
    origin: 'Ningbo',
    destination: 'Mombasa',
    containerType: '40ft',
    availableCbm: 18,
    totalCbm: 67,
    pricePerCbm: 39,
    departureDate: 'May 28, 2026',
    shippingLine: 'MSC',
    fillRate: 73,
    status: 'open',
  },
  {
    id: 3,
    origin: 'Shanghai',
    destination: 'Dar es Salaam',
    containerType: '40HC',
    availableCbm: 12,
    totalCbm: 76,
    pricePerCbm: 45,
    departureDate: 'Jun 2, 2026',
    shippingLine: 'CMA CGM',
    fillRate: 84,
    status: 'closing',
  },
];

const STEPS = [
  {
    icon: Search,
    title: 'Find Container Space',
    description: 'Search available slack space by route, date, and price',
  },
  {
    icon: Container,
    title: 'Book Your Share',
    description: 'Pay only for the CBM you need — no minimum, no waste',
  },
  {
    icon: DollarSign,
    title: 'Save Up to 50%',
    description: 'Pay far less than LCL rates by filling existing container space',
  },
];

const TESTIMONIALS = [
  {
    name: 'James K.',
    role: 'Freight Forwarder',
    location: 'Mombasa',
    content: 'I was shipping containers with 30% empty space every week. Now I monetize that space and my fillers get competitive rates. Win-win.',
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
  {
    name: 'Peter O.',
    role: 'Logistics Manager',
    location: 'Kampala',
    content: 'We finally have a way to find affordable container space for our Uganda-bound cargo. The Mombasa route has been a game changer.',
    avatar: 'PO',
    rating: 5,
  },
];

const FEATURES = [
  {
    icon: Shield,
    title: 'Verified Partners',
    description: 'Every shipper is verified. View trust scores and history before booking.',
  },
  {
    icon: Clock,
    title: 'Real-Time Availability',
    description: 'Live container listings with fill rates, departure dates, and pricing per CBM.',
  },
  {
    icon: TrendingUp,
    title: 'Market Rates',
    description: 'Transparent pricing at 40-60% below standard LCL rates. No hidden fees.',
  },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />
      
      <section className="relative min-h-screen flex items-center overflow-hidden bg-surface-50 pt-16 lg:pt-20">
        <div className="blob blob-primary w-[500px] h-[500px] -top-32 -left-32 animate-pulse-slow" />
        <div className="blob blob-secondary w-[400px] h-[400px] top-1/2 -right-32 animate-pulse-slow" style={{ animationDelay: '2s' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-center lg:text-left fade-in">
              <Badge variant="new" className="mb-6">
                <Zap className="w-3 h-3 mr-1" />
                Now serving China → East Africa routes
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-surface-900 tracking-tight mb-6 leading-tight">
                Fill Empty Container <br />
                <span className="gradient-text">Space. Ship Smarter.</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-surface-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                A marketplace connecting shippers with spare container capacity 
                to businesses that need affordable freight. Pay only for the space you use.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/auth/signup">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    <Ship className="w-5 h-5" />
                    <span>List Your Space</span>
                  </Button>
                </Link>
                <Link href="/matching">
                  <Button variant="secondary" size="lg" className="gap-2 w-full sm:w-auto">
                    <Search className="w-5 h-5" />
                    <span>Find Space</span>
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-sm text-surface-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary-600" />
                  <span>Verified Shippers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <span>Real-Time Listings</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-primary-600" />
                  <span>Save up to 50%</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white rounded-2xl shadow-card-hover p-6 border border-surface-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-surface-900">Available Container Space</h3>
                  <Badge variant="primary">Live</Badge>
                </div>
                <div className="space-y-4">
                  {MOCK_LISTINGS.map((listing) => (
                    <div key={listing.id} className="p-4 rounded-xl bg-surface-50 border border-surface-100 hover:shadow-card transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Ship className="w-4 h-4 text-primary-600" />
                          <span className="text-sm font-medium text-surface-700">{listing.origin}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-surface-400" />
                        <span className="text-sm font-semibold text-surface-900">{listing.destination}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-surface-500 mb-2">
                        <span>{listing.containerType} — {listing.availableCbm}/{listing.totalCbm} CBM</span>
                        <span className="text-accent-600 font-medium">${listing.pricePerCbm}/CBM</span>
                      </div>
                      <div className="w-full bg-surface-200 rounded-full h-1.5">
                        <div 
                          className="gradient-bg h-1.5 rounded-full" 
                          style={{ width: `${listing.fillRate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">50K+</div>
              <div className="text-sm text-surface-500">CBM of space filled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">2,000+</div>
              <div className="text-sm text-surface-500">Containers listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">1,500+</div>
              <div className="text-sm text-surface-500">Businesses connected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">4.9/5</div>
              <div className="text-sm text-surface-500">User rating</div>
            </div>
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
              The smartest way to ship goods internationally.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature, idx) => (
              <Card key={idx} hover className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-surface-900 mb-3">{feature.title}</h3>
                <p className="text-surface-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-surface-600">
              Three simple steps to smarter shipping
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {STEPS.map((step, idx) => (
              <div key={idx} className="relative text-center">
                <div className="card-elevated p-8">
                  <div className="relative inline-block mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600">
                      <step.icon className="w-8 h-8" />
                    </div>
                    <div className="absolute -top-2 -left-2 w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-white font-bold text-sm shadow-glow">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-surface-900 mb-3">{step.title}</h3>
                  <p className="text-surface-600">{step.description}</p>
                </div>
                
                {idx < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-surface-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-gradient-to-b from-surface-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
                Available Container Space
              </h2>
              <p className="text-lg text-surface-600">
                Browse active listings and book the space you need
              </p>
            </div>
            <Link href="/matching">
              <Button variant="secondary">
                View All Listings
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {MOCK_LISTINGS.map((listing) => (
              <Card key={listing.id} hover className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-surface-500 mb-1">
                      <Ship className="w-4 h-4" />
                      {listing.origin}
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-primary-500" />
                      <span className="font-semibold text-surface-900">{listing.destination}</span>
                    </div>
                  </div>
                  <Badge variant={listing.status === 'closing' ? 'warning' : 'primary'}>
                    {listing.status === 'closing' ? 'Closing Soon' : 'Open'}
                  </Badge>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-500">Container</span>
                    <span className="font-medium text-surface-900">{listing.containerType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-500">Available space</span>
                    <span className="font-medium text-surface-900">{listing.availableCbm} / {listing.totalCbm} CBM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-500">Price</span>
                    <span className="font-medium text-accent-600">${listing.pricePerCbm}/CBM</span>
                  </div>
                </div>

                <div className="w-full bg-surface-100 rounded-full h-2 mb-4">
                  <div 
                    className="gradient-bg h-2 rounded-full"
                    style={{ width: `${listing.fillRate}%` }}
                  />
                </div>

                <div className="pt-4 border-t border-surface-100 flex justify-between items-center">
                  <div>
                    <div className="text-xs text-surface-500">Departs</div>
                    <div className="text-sm font-semibold text-surface-900">{listing.departureDate}</div>
                  </div>
                  <Link href="/matching">
                    <Button size="sm">Book Space</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-surface-900 mb-16">
            Trusted by Logistics Professionals
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
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

      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 relative overflow-hidden">
        <div className="blob blob-primary w-[600px] h-[600px] opacity-30 -bottom-32 -left-32" />
        <div className="blob blob-secondary w-[400px] h-[400px] opacity-30 -top-32 -right-32" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to optimize your shipping?
          </h2>
          <p className="text-lg text-primary-100 mb-10 max-w-2xl mx-auto">
            Whether you have container space to fill or cargo to ship, join the marketplace that connects both.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup?role=shipper">
              <Button 
                size="lg" 
                variant="secondary"
                className="shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <Ship className="w-5 h-5 mr-2" />
                List Your Container Space
              </Button>
            </Link>
            <Link href="/matching">
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Search className="w-5 h-5 mr-2" />
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
