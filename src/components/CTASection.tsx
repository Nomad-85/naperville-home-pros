'use client';

import React from 'react';
import Link from 'next/link';
import Container from './Container';

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

const CTASection: React.FC<CTASectionProps> = ({
  title = 'Ready to feature your business?',
  description = 'Get more leads and stand out from competitors with a featured listing on Naperville Home Pros.',
  buttonText = 'Add Your Business',
  buttonLink = '/add-your-business',
  className = '',
}) => {
  return (
    <section className={`bg-primary-700 text-white ${className}`}>
      <Container className="py-16">
        <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:text-left">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="mt-3 text-lg text-primary-100">{description}</p>
          </div>
          <Link
            href={buttonLink}
            className="px-6 py-3 text-lg font-medium text-primary-700 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
          >
            {buttonText}
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;
