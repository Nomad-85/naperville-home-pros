import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import StructuredData from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Accessibility Statement | Naperville Home Pros',
  description: 'Our commitment to accessibility for all users of the Naperville Home Pros directory.',
};

export default function AccessibilityPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Accessibility', href: '/accessibility', isCurrent: true },
  ];

  return (
    <>
      <div className="bg-gray-50 py-8">
        <div className="container">
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Accessibility Statement</h1>
          <p className="text-gray-600">Last updated: August 11, 2025</p>
        </div>
      </div>

      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-700 mb-4">
              Naperville Home Pros is committed to ensuring digital accessibility for people with disabilities. 
              We are continually improving the user experience for everyone, and applying the relevant 
              accessibility standards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Conformance Status</h2>
            <p className="text-gray-700 mb-4">
              The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and 
              developers to improve accessibility for people with disabilities. It defines three levels of 
              conformance: Level A, Level AA, and Level AAA.
            </p>
            <p className="text-gray-700 mb-4">
              Naperville Home Pros is partially conformant with WCAG 2.1 level AA. Partially conformant means 
              that some parts of the content do not fully conform to the accessibility standard.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Accessibility Features</h2>
            <p className="text-gray-700 mb-4">
              Naperville Home Pros includes the following accessibility features:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Skip to content link for keyboard users</li>
              <li>ARIA landmarks and roles for screen readers</li>
              <li>Keyboard navigation support</li>
              <li>Focus management for interactive elements</li>
              <li>Semantic HTML structure</li>
              <li>Text alternatives for non-text content</li>
              <li>Sufficient color contrast</li>
              <li>Resizable text without loss of content or functionality</li>
              <li>Accessibility widget with options for:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>High contrast mode</li>
                  <li>Text size adjustment</li>
                  <li>Focus indicators</li>
                </ul>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitations</h2>
            <p className="text-gray-700 mb-4">
              Despite our best efforts to ensure accessibility of Naperville Home Pros, there may be some 
              limitations. Below is a description of known limitations, and potential solutions. Please 
              contact us if you observe an issue not listed below.
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>
                <strong>Third-party content:</strong> Some content provided by third-party business listings 
                may not be fully accessible. We are working with our partners to improve this.
              </li>
              <li>
                <strong>PDF documents:</strong> Some older PDF documents may not be fully accessible. If you 
                encounter an inaccessible PDF, please contact us for assistance.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Feedback</h2>
            <p className="text-gray-700 mb-4">
              We welcome your feedback on the accessibility of Naperville Home Pros. Please let us know if you 
              encounter accessibility barriers:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Phone: <a href="tel:+16305551234" className="text-primary-600 hover:underline">630-555-1234</a></li>
              <li>E-mail: <a href="mailto:accessibility@napervillehomepros.com" className="text-primary-600 hover:underline">accessibility@napervillehomepros.com</a></li>
              <li>Visitor address: 123 Main Street, Naperville, IL 60540</li>
            </ul>
            <p className="text-gray-700 mb-4">
              We try to respond to feedback within 3 business days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Assessment Approach</h2>
            <p className="text-gray-700 mb-4">
              Naperville Home Pros assessed the accessibility of this website by the following approaches:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Self-evaluation</li>
              <li>Automated testing using accessibility tools</li>
              <li>User testing with assistive technologies</li>
            </ul>
          </section>

          <div className="border-t border-gray-200 pt-8 mt-8">
            <Link 
              href="/contact"
              className="text-primary-600 hover:underline font-medium"
            >
              Contact Us for Accessibility Support
            </Link>
          </div>
        </div>
      </div>

      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          'name': 'Accessibility Statement',
          'description': 'Our commitment to accessibility for all users of the Naperville Home Pros directory.',
          'url': 'https://napervillehomepros.com/accessibility',
          'mainEntity': {
            '@type': 'WebPageElement',
            'mainContentOfPage': {
              '@type': 'WebContent',
              'about': {
                '@type': 'Thing',
                'name': 'Web Accessibility'
              }
            }
          }
        }}
      />
    </>
  );
}
