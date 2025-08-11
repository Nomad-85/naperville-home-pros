import React from 'react';
import { Metadata } from 'next';

interface SchemaMetadataProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
  alternateLanguages?: Record<string, string>;
  keywords?: string[];
}

export function generateMetadata({
  title,
  description,
  canonicalUrl,
  ogImage = '/images/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noIndex = false,
  alternateLanguages = {},
  keywords = [],
}: SchemaMetadataProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://napervillehomepros.com';
  const fullCanonicalUrl = canonicalUrl.startsWith('http') ? canonicalUrl : `${baseUrl}${canonicalUrl}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  
  return {
    title,
    description,
    keywords: keywords.join(', '),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: fullCanonicalUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      title,
      description,
      url: fullCanonicalUrl,
      siteName: 'Naperville Home Pros',
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: ogType,
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [fullOgImage],
      creator: '@napervillehomepros',
      site: '@napervillehomepros',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    verification: {
      google: 'google-site-verification-code', // Replace with actual verification code
    },
    other: {
      'theme-color': '#4f46e5',
    },
  };
}

// Helper function for category pages
export function generateCategoryMetadata(category: {
  name: string;
  slug: string;
  description: string;
}) {
  return generateMetadata({
    title: `${category.name} Services in Naperville & Wheaton, IL`,
    description: category.description || `Find trusted ${category.name.toLowerCase()} professionals in Naperville and Wheaton, IL. Compare local services, read reviews, and contact top-rated providers.`,
    canonicalUrl: `/${category.slug}`,
    keywords: [category.name, 'Naperville', 'Wheaton', 'Illinois', 'home services', 'local professionals'],
  });
}

// Helper function for business listing pages
export function generateBusinessMetadata(business: {
  name: string;
  slug: string;
  category: { name: string; slug: string };
  description: string;
  image?: string;
}) {
  return generateMetadata({
    title: `${business.name} - ${business.category.name} in Naperville & Wheaton, IL`,
    description: business.description || `${business.name} provides professional ${business.category.name.toLowerCase()} services in Naperville and Wheaton, IL. Contact them today for a quote.`,
    canonicalUrl: `/${business.category.slug}/${business.slug}`,
    ogImage: business.image || '/images/og-image.jpg',
    ogType: 'business.business',
    keywords: [business.name, business.category.name, 'Naperville', 'Wheaton', 'Illinois', 'home services'],
  });
}

// Helper function for blog post pages
export function generateBlogPostMetadata(post: {
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  date: string;
}) {
  return generateMetadata({
    title: `${post.title} | Naperville Home Pros Blog`,
    description: post.excerpt,
    canonicalUrl: `/blog/${post.slug}`,
    ogImage: post.coverImage || '/images/blog-default.jpg',
    ogType: 'article',
    twitterCard: 'summary_large_image',
    keywords: ['blog', 'home improvement', 'Naperville', 'Wheaton', 'home services'],
  });
}
