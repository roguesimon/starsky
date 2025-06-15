"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Star, 
  Download,
  Eye,
  Code,
  Palette,
  Layout,
  Type,
  Image,
  CreditCard,
  MessageSquare,
  Users,
  BarChart3,
  Globe,
  Shield
} from 'lucide-react';

interface ComponentTemplate {
  id: string;
  name: string;
  description: string;
  category: 'hero' | 'navigation' | 'pricing' | 'testimonials' | 'contact' | 'footer' | 'dashboard' | 'auth';
  preview: string;
  code: string;
  tags: string[];
  isPremium: boolean;
  framework: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

interface VisualComponentGalleryProps {
  onComponentSelect: (component: ComponentTemplate) => void;
  framework: string;
}

const componentTemplates: ComponentTemplate[] = [
  {
    id: 'hero-1',
    name: 'Modern Hero Section',
    description: 'Clean hero with gradient background, compelling headline, and CTA',
    category: 'hero',
    preview: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    code: `<section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20">
  <div className="container mx-auto px-4 text-center">
    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
      Build Amazing Products
    </h1>
    <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
      Create beautiful, responsive websites with our modern tools and templates.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
        Get Started Free
      </button>
      <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
        Watch Demo
      </button>
    </div>
  </div>
</section>`,
    tags: ['gradient', 'cta', 'responsive'],
    isPremium: false,
    framework: ['nextjs', 'react', 'static'],
    difficulty: 'Beginner'
  },
  {
    id: 'nav-1',
    name: 'Responsive Navigation',
    description: 'Modern navbar with mobile menu and smooth animations',
    category: 'navigation',
    preview: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    code: `<nav className="bg-white shadow-lg sticky top-0 z-50">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center h-16">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
        <span className="text-xl font-bold text-gray-900">Brand</span>
      </div>
      
      <div className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Sign Up
        </button>
      </div>
      
      <button className="md:hidden">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </div>
</nav>`,
    tags: ['responsive', 'sticky', 'mobile'],
    isPremium: false,
    framework: ['nextjs', 'react', 'static'],
    difficulty: 'Intermediate'
  },
  {
    id: 'pricing-1',
    name: 'Pricing Table',
    description: 'Three-tier pricing with popular badge and feature comparison',
    category: 'pricing',
    preview: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    code: `<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
      <p className="text-xl text-gray-600">Choose the plan that's right for you</p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold mb-2">Starter</h3>
        <div className="text-4xl font-bold mb-6">$9<span className="text-lg text-gray-500">/month</span></div>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 5 Projects</li>
          <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Basic Support</li>
          <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 1GB Storage</li>
        </ul>
        <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
          Get Started
        </button>
      </div>
      
      <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-xl relative">
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
        <h3 className="text-2xl font-bold mb-2">Pro</h3>
        <div className="text-4xl font-bold mb-6">$29<span className="text-lg opacity-75">/month</span></div>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center"><span className="text-blue-200 mr-2">✓</span> Unlimited Projects</li>
          <li className="flex items-center"><span className="text-blue-200 mr-2">✓</span> Priority Support</li>
          <li className="flex items-center"><span className="text-blue-200 mr-2">✓</span> 100GB Storage</li>
          <li className="flex items-center"><span className="text-blue-200 mr-2">✓</span> Advanced Features</li>
        </ul>
        <button className="w-full bg-white text-blue-600 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
          Get Started
        </button>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
        <div className="text-4xl font-bold mb-6">$99<span className="text-lg text-gray-500">/month</span></div>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Everything in Pro</li>
          <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Custom Integrations</li>
          <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Dedicated Support</li>
          <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> SLA Guarantee</li>
        </ul>
        <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
          Contact Sales
        </button>
      </div>
    </div>
  </div>
</section>`,
    tags: ['pricing', 'cards', 'comparison'],
    isPremium: false,
    framework: ['nextjs', 'react', 'static'],
    difficulty: 'Beginner'
  },
  {
    id: 'testimonials-1',
    name: 'Customer Testimonials',
    description: 'Social proof section with customer photos and quotes',
    category: 'testimonials',
    preview: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
    code: `<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
      <p className="text-xl text-gray-600">Join thousands of satisfied customers</p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-8">
      <div className="bg-gray-50 p-8 rounded-2xl">
        <div className="flex items-center mb-4">
          <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100" 
               alt="Customer" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h4 className="font-semibold">Sarah Johnson</h4>
            <p className="text-gray-600 text-sm">CEO, TechCorp</p>
          </div>
        </div>
        <p className="text-gray-700 italic">
          "This platform has transformed how we build products. The AI assistance is incredible and saves us hours of development time."
        </p>
        <div className="flex mt-4">
          <span className="text-yellow-400">★★★★★</span>
        </div>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-2xl">
        <div className="flex items-center mb-4">
          <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100" 
               alt="Customer" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h4 className="font-semibold">Mike Chen</h4>
            <p className="text-gray-600 text-sm">Founder, StartupXYZ</p>
          </div>
        </div>
        <p className="text-gray-700 italic">
          "I built my entire MVP without writing a single line of code. The results are professional and the process is intuitive."
        </p>
        <div className="flex mt-4">
          <span className="text-yellow-400">★★★★★</span>
        </div>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-2xl">
        <div className="flex items-center mb-4">
          <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100" 
               alt="Customer" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h4 className="font-semibold">Emily Davis</h4>
            <p className="text-gray-600 text-sm">Designer, Creative Co</p>
          </div>
        </div>
        <p className="text-gray-700 italic">
          "The design quality is outstanding. It understands design principles better than most developers I've worked with."
        </p>
        <div className="flex mt-4">
          <span className="text-yellow-400">★★★★★</span>
        </div>
      </div>
    </div>
  </div>
</section>`,
    tags: ['testimonials', 'social-proof', 'reviews'],
    isPremium: false,
    framework: ['nextjs', 'react', 'static'],
    difficulty: 'Beginner'
  },
  {
    id: 'contact-1',
    name: 'Contact Form',
    description: 'Modern contact form with validation and success states',
    category: 'contact',
    preview: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
    code: `<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
        <p className="text-xl text-gray-600">We'd love to hear from you. Send us a message!</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-gray-600">hello@company.com</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold">Address</h4>
                <p className="text-gray-600">123 Business St, City, State 12345</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
            </div>
            
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>`,
    tags: ['contact', 'form', 'validation'],
    isPremium: false,
    framework: ['nextjs', 'react', 'static'],
    difficulty: 'Intermediate'
  },
  {
    id: 'dashboard-1',
    name: 'Analytics Dashboard',
    description: 'Complete dashboard with charts, metrics, and data tables',
    category: 'dashboard',
    preview: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
    code: `<div className="min-h-screen bg-gray-100">
  <div className="flex">
    <div className="w-64 bg-white shadow-sm">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
      </div>
      <nav className="mt-6">
        <a href="#" className="block px-6 py-3 text-gray-700 bg-gray-100 border-r-2 border-blue-600">Overview</a>
        <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-50">Analytics</a>
        <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-50">Users</a>
        <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-50">Settings</a>
      </nav>
    </div>
    
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">12,345</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">+12.5%</span>
            <span className="text-gray-500 text-sm"> from last month</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Revenue</p>
              <p className="text-3xl font-bold text-gray-900">$45,678</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">+8.2%</span>
            <span className="text-gray-500 text-sm"> from last month</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Orders</p>
              <p className="text-3xl font-bold text-gray-900">1,234</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-red-600 text-sm font-medium">-2.1%</span>
            <span className="text-gray-500 text-sm"> from last month</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Conversion</p>
              <p className="text-3xl font-bold text-gray-900">3.24%</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">+5.4%</span>
            <span className="text-gray-500 text-sm"> from last month</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 font-semibold">JD</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">John Doe</p>
                <p className="text-sm text-gray-500">Completed purchase</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">2 min ago</span>
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 font-semibold">SM</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Sarah Miller</p>
                <p className="text-sm text-gray-500">Signed up for newsletter</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">5 min ago</span>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-purple-600 font-semibold">MJ</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Mike Johnson</p>
                <p className="text-sm text-gray-500">Updated profile</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">10 min ago</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    tags: ['dashboard', 'analytics', 'charts', 'admin'],
    isPremium: true,
    framework: ['nextjs', 'react'],
    difficulty: 'Advanced'
  }
];

export function VisualComponentGallery({ onComponentSelect, framework }: VisualComponentGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const categories = [
    { id: 'all', name: 'All Components', icon: Layout },
    { id: 'hero', name: 'Hero Sections', icon: Globe },
    { id: 'navigation', name: 'Navigation', icon: Layout },
    { id: 'pricing', name: 'Pricing', icon: CreditCard },
    { id: 'testimonials', name: 'Testimonials', icon: MessageSquare },
    { id: 'contact', name: 'Contact Forms', icon: MessageSquare },
    { id: 'footer', name: 'Footers', icon: Layout },
    { id: 'dashboard', name: 'Dashboards', icon: BarChart3 },
    { id: 'auth', name: 'Authentication', icon: Shield },
  ];

  const filteredComponents = componentTemplates.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || component.difficulty === selectedDifficulty;
    const matchesFramework = component.framework.includes(framework);
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesFramework;
  });

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.icon || Layout;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Visual Component Gallery</h2>
          <Badge variant="secondary">
            {filteredComponents.length} components
          </Badge>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex space-x-4">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm"
            >
              <option value="all">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1">
        <div className="px-6 py-4 border-b">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="navigation">Nav</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="testimonials">Reviews</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComponents.map((component) => (
              <Card key={component.id} className="group hover:shadow-xl transition-all duration-200 cursor-pointer">
                <div className="relative">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <img 
                      src={component.preview} 
                      alt={component.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {component.isPremium && (
                      <Badge className="bg-yellow-500 text-yellow-900">
                        <Star className="h-3 w-3 mr-1" />
                        Pro
                      </Badge>
                    )}
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getDifficultyColor(component.difficulty)}`}
                    >
                      {component.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {component.name}
                    <Button variant="ghost" size="sm">
                      <Star className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <CardDescription>{component.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {component.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => onComponentSelect(component)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Insert
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Code className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredComponents.length === 0 && (
            <div className="text-center py-12">
              <Layout className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No components found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or browse different categories.
              </p>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}