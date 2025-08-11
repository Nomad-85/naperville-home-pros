'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SEO_CONSTANTS } from '@/lib/seo';
import Container from './Container';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <Container className="py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-14 h-14 flex-shrink-0 bg-primary-50 rounded-lg p-2 transition-all group-hover:bg-primary-100 shadow-sm">
              <Image
                src="/static/logo.png"
                alt={SEO_CONSTANTS.SITE_NAME}
                width={48}
                height={48}
                className="object-contain"
                priority
                onError={(e) => {
                  // Fallback if the logo fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = "/static/placeholders/logo.svg";
                }}
              />
            </div>
            <span className="text-2xl font-bold text-primary-700 leading-tight group-hover:text-primary-800 transition-colors">
              {SEO_CONSTANTS.SITE_NAME}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-10">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-center">
              Home
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-center">
              Categories
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-center">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-center">
              Contact
            </Link>
            <Link href="/add-your-business" className="px-5 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-500 transition-colors shadow-md hover:shadow-lg">
              Add Your Business
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md md:hidden hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            aria-expanded="false"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            {/* Icon when menu is closed */}
            {!isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-100 animate-fadeIn">
            <div className="pt-4 pb-5 space-y-3 px-5">
              <Link
                href="/"
                className="block px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:text-primary-600 hover:bg-primary-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/categories"
                className="block px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:text-primary-600 hover:bg-primary-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/blog"
                className="block px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:text-primary-600 hover:bg-primary-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:text-primary-600 hover:bg-primary-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/add-your-business"
                className="block px-5 py-3 text-base font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-500 shadow-md transition-colors mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Your Business
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
