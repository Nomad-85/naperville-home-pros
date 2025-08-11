import React from 'react';

interface StructuredDataProps {
  data: Record<string, any>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

// Helper functions for common structured data types

export function createBreadcrumbList(items: Array<{ name: string; item: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.item,
    })),
  };
}

export function createLocalBusiness(data: {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  image?: string;
  priceRange?: string;
  openingHours?: string[];
  sameAs?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    ...data,
    ...(data.geo && {
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': data.geo.latitude,
        'longitude': data.geo.longitude,
      },
    }),
  };
}

export function createFAQPage(questions: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': questions.map(q => ({
      '@type': 'Question',
      'name': q.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': q.answer,
      },
    })),
  };
}

export function createArticle(data: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher: {
    name: string;
    logo: string;
  };
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': data.headline,
    'description': data.description,
    'image': data.image,
    'datePublished': data.datePublished,
    'dateModified': data.dateModified || data.datePublished,
    'author': {
      '@type': 'Person',
      'name': data.author.name,
      ...(data.author.url && { 'url': data.author.url }),
    },
    'publisher': {
      '@type': 'Organization',
      'name': data.publisher.name,
      'logo': {
        '@type': 'ImageObject',
        'url': data.publisher.logo,
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': data.url,
    },
  };
}

export function createOrganization(data: {
  name: string;
  url: string;
  logo: string;
  description?: string;
  sameAs?: string[];
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: Array<{
    telephone: string;
    contactType: string;
    email?: string;
    areaServed?: string;
    availableLanguage?: string;
  }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    ...data,
    'logo': {
      '@type': 'ImageObject',
      'url': data.logo,
    },
    ...(data.address && {
      'address': {
        '@type': 'PostalAddress',
        ...data.address,
      },
    }),
    ...(data.contactPoint && {
      'contactPoint': data.contactPoint.map(cp => ({
        '@type': 'ContactPoint',
        ...cp,
      })),
    }),
  };
}
