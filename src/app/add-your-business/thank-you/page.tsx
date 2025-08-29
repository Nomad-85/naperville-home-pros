import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Application Received | Naperville Home Pros',
  description:
    'Thanks for submitting your business application to Naperville Home Pros. We will review your submission and get back to you soon.',
};

export default function AddBusinessThankYouPage() {
  return (
    <section className="py-16">
      <div className="container max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900">Application received</h1>
        <p className="mt-4 text-gray-600">
          Thanks for submitting your business to Naperville Home Pros. Our team will review your application and follow up soon.
        </p>
        <div className="mt-8 space-x-6">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            Return to Home
          </Link>
          <Link href="/add-your-business" className="text-gray-600 hover:text-gray-800 font-medium">
            Back to Add Your Business
          </Link>
        </div>
      </div>
    </section>
  );
}
