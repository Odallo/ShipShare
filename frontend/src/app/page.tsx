'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Search, 
  Package, 
  Users, 
  MapPin, 
  Shield, 
  Clock, 
  Banknote, 
  Star,
  Zap,
  Truck,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
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

const STEPS = [
  {
    icon: MapPin,
    title: 'Enter Your Route',
    description: 'Tell us where you\'re shipping from and to within Kenya',
  },
  {
    icon: Users,
    title: 'Join a Group',
    description: 'We match you with others shipping to the same destination',
  },
  {
    icon: Banknote,
    title: 'Save Money',
    description: 'Split costs and save up to 60% on shipping fees',
  },
];

const TESTIMONIALS = [
  {
    name: 'Wanjiku M.',
    role: 'Small Business Owner',
    location: 'Nairobi',
    content: 'ShipShare has cut my shipping costs by half! I send stock to Mombasa weekly and the group shipping feature is a game changer.',
    avatar: 'WM',
    rating: 5,
  },
  {
    name: 'Ochieng J.',
    role: 'Online Seller',
    location: 'Kisumu',
    content: 'Finally, a platform that understands local logistics. The cost savings are real - from KES 3,000 to KES 1,200 per shipment!',
    avatar: 'OJ',
    rating: 5,
  },
  {
    name: 'Sarah K.',
    role: 'Student',
    location: 'Nakuru',
    content: 'I use ShipShare to send care packages to my family. It\'s affordable and reliable. Love the tracking feature!',
    avatar: 'SK',
    rating: 5,
  },
];

const FEATURES = [
  {
    icon: Shield,
    title: 'Secure & Insured',
    description: 'All shipments are fully insured. Track your package in real-time from pickup to delivery.',
  },
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: '24-48 hour delivery on major routes. Express options available for urgent shipments.',
  },
  {
    icon: TrendingUp,
    title: 'Best Rates',
    description: 'Our group shipping model saves you up to 60% compared to individual shipping rates.',
  },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-surface-50 pt-16 lg:pt-20">
        {/* Background Blobs */}
        <div className="blob blob-primary w-[500px] h-[500px] -top-32 -left-32 animate-pulse-slow" />
        <div className="blob blob-secondary w-[400px] h-[400px] top-1/2 -right-32 animate-pulse-slow" style={{ animationDelay: '2s' }} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Text Content */}
            <div className="text-center lg:text-left slide-up">
              <Badge variant="new" className="mb-6">
                <Zap className="w-3 h-3 mr-1" />
                Now serving major routes in Kenya
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-surface-900 tracking-tight mb-6 leading-tight">
                Save Money by <br />
                <span className="gradient-text">Shipping Together</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-surface-600 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Join thousands of Kenyans reducing shipping costs through group logistics. 
                Perfect for small businesses, online sellers, and individuals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/auth/signup">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    <span>Get Started Free</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/matching">
                  <Button variant="secondary" size="lg" className="gap-2 w-full sm:w-auto">
                    <Search className="w-5 h-5" />
                    <span>View Active Groups</span>
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-6 text-sm text-surface-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary-600" />
                  <span>Secure & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <span>24-48h Delivery</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-primary-600" />
                  <span>Save up to 60%</span>
                </div>
              </div>
            </div>

            {/* Right - Isometric Card */}
            <div className="hidden lg:block isometric perspective-[2000px]">
              <div className="isometric-card bg-white rounded-2xl shadow-card-hover p-6 border border-surface-100">
                {/* Mock Shipping Groups */}
                <div className="space-y-4">
                  {MOCK_GROUPS.map((group) => (
                    <div key={group.id} className="p-4 rounded-xl bg-surface-50 border border-surface-100 hover:shadow-card transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary-600" />
                          <span className="text-sm font-medium text-surface-700">{group.origin}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-surface-400" />
                        <span className="text-sm font-semibold text-surface-900">{group.destination}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-surface-500 mb-2">
                        <span>{group.participants}/{group.maxParticipants} members</span>
                        <span className="text-accent-600 font-medium">{group.savings} saved</span>
                      </div>
                      <div className="w-full bg-surface-200 rounded-full h-1.5">
                        <div 
                          className="gradient-bg h-1.5 rounded-full" 
                          style={{ width: `${(group.participants / group.maxParticipants) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-glow">
                  KES 12M+ Saved
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">KES 12M+</div>
              <div className="text-sm text-surface-500">Saved by users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">50K+</div>
              <div className="text-sm text-surface-500">Shipments grouped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">15K+</div>
              <div className="text-sm text-surface-500">Active users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">4.9/5</div>
              <div className="text-sm text-surface-500">User rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              Why Choose ShipShare?
            </h2>
            <p className="text-lg text-surface-600 max-w-2xl mx-auto">
              We make shipping affordable, reliable, and transparent for everyone in Kenya.
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

      {/* How It Works */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
              How ShipShare Works
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
                
                {/* Arrow Connector */}
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

      {/* Popular Routes */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-surface-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-4">
                Popular Routes Today
              </h2>
              <p className="text-lg text-surface-600">
                Join existing groups and ship today
              </p>
            </div>
            <Link href="/matching">
              <Button variant="secondary">
                View All Routes
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {MOCK_GROUPS.map((group) => (
              <Card key={group.id} hover className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-surface-500 mb-1">
                      <MapPin className="w-4 h-4" />
                      {group.origin}
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-primary-500" />
                      <span className="font-semibold text-surface-900">{group.destination}</span>
                    </div>
                  </div>
                  <Badge variant={group.status === 'closing' ? 'warning' : 'primary'}>
                    {group.status === 'closing' ? 'Closing Soon' : 'Open'}
                  </Badge>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-500">Spots left</span>
                    <span className="font-medium text-surface-900">
                      {group.maxParticipants - group.participants} of {group.maxParticipants}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-500">Total weight</span>
                    <span className="font-medium text-surface-900">{group.totalWeight}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-surface-500">Closes in</span>
                    <span className="font-medium text-accent-600">{group.deadline}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-surface-100 rounded-full h-2 mb-4">
                  <div 
                    className="gradient-bg h-2 rounded-full"
                    style={{ width: `${(group.participants / group.maxParticipants) * 100}%` }}
                  />
                </div>

                <div className="pt-4 border-t border-surface-100 flex justify-between items-center">
                  <div>
                    <div className="text-xs text-surface-500">You save</div>
                    <div className="text-lg font-bold text-accent-600">{group.savings}</div>
                  </div>
                  <Link href="/matching">
                    <Button size="sm">Join Group</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-surface-900 mb-16">
            Trusted by Kenyans Nationwide
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
                      {testimonial.role} • {testimonial.location}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="blob blob-primary w-[600px] h-[600px] opacity-30 -bottom-32 -left-32" />
        <div className="blob blob-secondary w-[400px] h-[400px] opacity-30 -top-32 -right-32" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to start saving on shipping?
          </h2>
          <p className="text-lg text-primary-100 mb-10 max-w-2xl mx-auto">
            Join thousands of smart shippers across Kenya. Create your first shipment in under 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button 
                size="lg" 
                variant="secondary"
                className="shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <Zap className="w-5 h-5 mr-2" />
                Create Free Account
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </Link>
          </div>
          
          {/* Trust Badges */}
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