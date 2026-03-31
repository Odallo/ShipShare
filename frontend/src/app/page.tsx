'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Package, Users, TrendingDown, Truck, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

export default function LandingPage() {
  const steps = [
    { icon: Package, title: 'Create Shipment', description: 'Enter your package details and destination' },
    { icon: Users, title: 'Find Group', description: 'We match you with others shipping to similar locations' },
    { icon: TrendingDown, title: 'Save Money', description: 'Share costs and reduce shipping expenses by up to 40%' },
  ];
  
  const testimonials = [
    { name: 'Mary Wanjiku', role: 'Small Business Owner', content: 'ShipShare has cut my shipping costs by 35%! Now I can offer better prices to my customers.' },
    { name: 'James Otieno', role: 'Online Seller', content: 'The group shipping feature is genius. My packages arrive faster and cheaper.' },
  ];
  
  const features = [
    { icon: Truck, title: 'Local Focus', description: 'Designed specifically for the Kenyan market with local routes and partners.' },
    { icon: Shield, title: 'Secure Handling', description: 'All packages are tracked and handled with care by our verified partners.' },
    { icon: Clock, title: 'Fast Delivery', description: 'Group shipments often arrive faster due to optimized logistics.' },
  ];
  
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Save Money by
                <span className="text-primary-600"> Shipping Together</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of Kenyans who are reducing shipping costs through group shipments.
                Combine your packages with others heading to the same destination.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button size="lg">Get Started Free</Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="outline" size="lg">Learn More</Button>
                </Link>
              </div>
              <div className="mt-12">
                <p className="text-sm text-gray-500 dark:text-gray-400">Trusted by 5,000+ Kenyan shippers</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              How ShipShare Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-4">
                      <step.icon className="h-8 w-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              Why Choose ShipShare Kenya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <feature.icon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Saving?
            </h2>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Join ShipShare today and reduce your shipping costs by up to 40%
            </p>
            <Link href="/auth/signup">
              <Button variant="secondary" size="lg">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}