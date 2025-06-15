"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Menu, X, Zap, Github, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Docs', href: '/docs' },
    { name: 'Demo', href: '/demo' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-navy-900/80 backdrop-blur-xl z-50 border-b border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Zap className="h-8 w-8 text-blue-400 group-hover:text-teal-400 transition-colors duration-300" />
              <div className="absolute inset-0 h-8 w-8 bg-blue-400 rounded-full opacity-20 group-hover:opacity-30 blur-sm transition-opacity duration-300"></div>
            </div>
            <span className="text-xl font-bold text-gradient-blue">
              Starsky AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-navy-300 hover:text-blue-400 transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-blue-teal group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />
            <Button variant="ghost" size="sm" className="text-navy-300 hover:text-blue-400 hover:bg-navy-800" asChild>
              <Link href="https://github.com" target="_blank">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="text-navy-300 hover:text-blue-400 hover:bg-navy-800" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button size="sm" className="bg-gradient-blue-teal hover:shadow-glow-blue transition-all duration-300" asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy-300 hover:text-blue-400 hover:bg-navy-800"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-navy-900/95 backdrop-blur-xl border-t border-navy-800 rounded-b-lg">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-navy-300 hover:text-blue-400 hover:bg-navy-800 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-navy-800">
                <div className="flex flex-col space-y-2">
                  <Button variant="ghost" size="sm" className="justify-start text-navy-300 hover:text-blue-400 hover:bg-navy-800" asChild>
                    <Link href="/auth/login">Sign In</Link>
                  </Button>
                  <Button size="sm" className="bg-gradient-blue-teal hover:shadow-glow-blue transition-all duration-300" asChild>
                    <Link href="/auth/signup">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}