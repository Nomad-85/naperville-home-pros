import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { SEO_CONSTANTS } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Add Your Business | Naperville Home Pros',
  description: 'List your home service business in our Naperville & Wheaton directory. Reach local customers looking for your services and grow your business.',
};

export default function AddYourBusinessPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-700 text-white">
        <div className="container py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Add Your Business', href: '/add-your-business', isCurrent: true },
            ]}
          />
          <h1 className="text-3xl font-bold mt-4">
            Add Your Business
          </h1>
          <p className="mt-2 text-lg max-w-2xl">
            Join our directory of trusted home service professionals in Naperville & Wheaton
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Why List Your Business With Us?
            </h2>
            <ul className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">Targeted Local Exposure</h3>
                  <p className="mt-1 text-gray-600">
                    Reach homeowners in Naperville and Wheaton who are actively searching for your services.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">SEO Benefits</h3>
                  <p className="mt-1 text-gray-600">
                    Improve your online visibility with our SEO-optimized listings and backlinks to your website.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">Qualified Leads</h3>
                  <p className="mt-1 text-gray-600">
                    Connect with customers who are ready to hire, not just browsing.
                  </p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900">Build Trust</h3>
                  <p className="mt-1 text-gray-600">
                    Association with our trusted local directory enhances your business credibility.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Listing Options
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Standard Listing</h3>
                  <span className="text-lg font-bold text-primary-600">Free</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic business information
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Contact details
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Service areas
                  </li>
                </ul>
              </div>
              <div className="bg-primary-50 p-6 rounded-lg shadow-md border border-primary-100 relative">
                <div className="absolute -top-3 right-6 bg-primary-600 text-white px-3 py-1 text-sm font-medium rounded-full">
                  Recommended
                </div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Featured Listing</h3>
                  <span className="text-lg font-bold text-primary-600">$99/month</span>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Everything in Standard
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority placement in search results
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Featured badge
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Enhanced business profile
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Featured in homepage rotation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Apply to List Your Business
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <form>
                <div className="space-y-6">
                  {/* Business Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Business Information</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="business-name" className="block text-sm font-medium text-gray-700 mb-1">
                          Business Name *
                        </label>
                        <input
                          type="text"
                          id="business-name"
                          name="business-name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="business-category" className="block text-sm font-medium text-gray-700 mb-1">
                          Business Category *
                        </label>
                        <select
                          id="business-category"
                          name="business-category"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="plumbers">Plumbers</option>
                          <option value="electricians">Electricians</option>
                          <option value="hvac">HVAC</option>
                          <option value="roofers">Roofers</option>
                          <option value="landscapers">Landscapers</option>
                          <option value="painters">Painters</option>
                          <option value="flooring">Flooring</option>
                          <option value="remodeling">Remodeling</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="business-phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Business Phone *
                        </label>
                        <input
                          type="tel"
                          id="business-phone"
                          name="business-phone"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="business-website" className="block text-sm font-medium text-gray-700 mb-1">
                          Business Website
                        </label>
                        <input
                          type="url"
                          id="business-website"
                          name="business-website"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="business-description" className="block text-sm font-medium text-gray-700 mb-1">
                          Business Description *
                        </label>
                        <textarea
                          id="business-description"
                          name="business-description"
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        ></textarea>
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="business-services" className="block text-sm font-medium text-gray-700 mb-1">
                          Services Offered * (comma separated)
                        </label>
                        <input
                          type="text"
                          id="business-services"
                          name="business-services"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="e.g. Leak Repair, Water Heater Installation, Drain Cleaning"
                          required
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="service-areas" className="block text-sm font-medium text-gray-700 mb-1">
                          Service Areas * (comma separated)
                        </label>
                        <input
                          type="text"
                          id="service-areas"
                          name="service-areas"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="e.g. Naperville, Wheaton, Lisle, Aurora"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Name *
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          name="contact-name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Email *
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="contact-email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Phone *
                        </label>
                        <input
                          type="tel"
                          id="contact-phone"
                          name="contact-phone"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="listing-type" className="block text-sm font-medium text-gray-700 mb-1">
                          Listing Type *
                        </label>
                        <select
                          id="listing-type"
                          name="listing-type"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          required
                        >
                          <option value="standard">Standard (Free)</option>
                          <option value="featured">Featured ($99/month)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Terms and Submit */}
                  <div>
                    <div className="flex items-start mb-6">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-medium text-gray-700">
                          I agree to the <Link href="/terms" className="text-primary-600 hover:text-primary-700">Terms and Conditions</Link> and <Link href="/privacy" className="text-primary-600 hover:text-primary-700">Privacy Policy</Link>
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      Submit Application
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                How long does it take for my listing to appear?
              </h3>
              <p className="mt-2 text-gray-600">
                Standard listings are typically reviewed and published within 3-5 business days. Featured listings receive priority review and are usually published within 1-2 business days.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Can I upgrade from a standard to featured listing later?
              </h3>
              <p className="mt-2 text-gray-600">
                Yes, you can upgrade your listing at any time. Simply contact us and we'll help you through the process.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                How do I update my business information?
              </h3>
              <p className="mt-2 text-gray-600">
                You can request updates to your listing by contacting our support team at hello@napervillehomepros.com with your business name and the changes you'd like to make.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                What happens after I submit my application?
              </h3>
              <p className="mt-2 text-gray-600">
                After submission, our team will review your application. You'll receive an email confirmation, and we may contact you if additional information is needed. Once approved, your listing will be published on our directory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Add Your Business | Naperville Home Pros",
          "description": "List your home service business in our Naperville & Wheaton directory. Reach local customers looking for your services and grow your business.",
          "url": `${SEO_CONSTANTS.DOMAIN}/add-your-business`,
          "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long does it take for my listing to appear?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Standard listings are typically reviewed and published within 3-5 business days. Featured listings receive priority review and are usually published within 1-2 business days."
                }
              },
              {
                "@type": "Question",
                "name": "Can I upgrade from a standard to featured listing later?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, you can upgrade your listing at any time. Simply contact us and we'll help you through the process."
                }
              },
              {
                "@type": "Question",
                "name": "How do I update my business information?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can request updates to your listing by contacting our support team at hello@napervillehomepros.com with your business name and the changes you'd like to make."
                }
              },
              {
                "@type": "Question",
                "name": "What happens after I submit my application?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "After submission, our team will review your application. You'll receive an email confirmation, and we may contact you if additional information is needed. Once approved, your listing will be published on our directory."
                }
              }
            ]
          }
        }}
      />
    </>
  );
}
