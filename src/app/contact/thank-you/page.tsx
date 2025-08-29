import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Message Received | Naperville Home Pros',
  description:
    'Thanks for contacting Naperville Home Pros. We will review your message and get back to you soon.',
};

export default function ContactThankYouPage() {
  return (
    <section className="py-16">
      <div className="container max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900">Thanks for reaching out</h1>
        <p className="mt-4 text-gray-600">
          We received your message and will get back to you soon.
        </p>
        <div className="mt-8 space-x-6">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            Return to Home
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-800 font-medium">
            Back to Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
