'use client';

import React from 'react';
import Link from 'next/link';
import { SEO_CONSTANTS } from '@/lib/seo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50">
      {/* CTA Banner */}
      <div className="bg-primary-700 text-white">
        <div className="container py-12">
          <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">Get Featured — $50/mo</h2>
              <p className="mt-2 text-primary-100">
                Stand out from competitors and get more leads with a featured listing
              </p>
            </div>
            <Link
              href="/add-your-business"
              className="px-6 py-3 text-lg font-medium text-primary-700 bg-white rounded-md shadow-sm hover:bg-gray-100"
            >
              Add Your Business
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Column 1: About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">About</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/add-your-business" className="text-gray-600 hover:text-primary-600">
                  Add Your Business
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-primary-600">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 2: Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/plumbers" className="text-gray-600 hover:text-primary-600">
                  Plumbers
                </Link>
              </li>
              <li>
                <Link href="/electricians" className="text-gray-600 hover:text-primary-600">
                  Electricians
                </Link>
              </li>
              <li>
                <Link href="/roofers" className="text-gray-600 hover:text-primary-600">
                  Roofers
                </Link>
              </li>
              <li>
                <Link href="/hvac" className="text-gray-600 hover:text-primary-600">
                  HVAC
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: More Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">More Categories</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/landscapers" className="text-gray-600 hover:text-primary-600">
                  Landscapers
                </Link>
              </li>
              <li>
                <Link href="/painters" className="text-gray-600 hover:text-primary-600">
                  Painters
                </Link>
              </li>
              <li>
                <Link href="/flooring" className="text-gray-600 hover:text-primary-600">
                  Flooring
                </Link>
              </li>
              <li>
                <Link href="/remodeling" className="text-gray-600 hover:text-primary-600">
                  Remodeling
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a href={`mailto:${SEO_CONSTANTS.CONTACT_EMAIL}`} className="text-gray-600 hover:text-primary-600">
                  {SEO_CONSTANTS.CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <a href={`tel:${SEO_CONSTANTS.CONTACT_PHONE.replace(/[^\d+]/g, '')}`} className="text-gray-600 hover:text-primary-600">
                  {SEO_CONSTANTS.CONTACT_PHONE}
                </a>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mt-0.5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-gray-600">
                  Naperville & Wheaton, IL
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-8 mt-8 border-t border-gray-200">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-base text-gray-500">
              &copy; {currentYear} {SEO_CONSTANTS.SITE_NAME}. All rights reserved.
            </p>
            <div className="flex mt-4 space-x-6 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-primary-600">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-primary-600">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
