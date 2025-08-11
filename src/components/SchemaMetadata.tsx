// src/components/SchemaMetadata.tsx
import type { Metadata } from 'next';

type OGType =
  | 'website'
  | 'article'
  | 'book'
  | 'profile'
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_station'
  | 'video.movie'
  | 'video.episode'
  | 'video.tv_show'
  | 'video.other';

interface MetaInput {
  title: string;
  description: string;
  path?: string;               // e.g., "/plumbers"
  siteName?: string;           // default "Naperville Home Pros"
  ogType?: OGType;             // default "website"
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
  locale?: string;             // default "en_US"
  alternates?: Record<string, string>; // { "en-US": "/en", "es-ES": "/es" }
}

const BASE_URL = 'https://napervillehomepros.com';

export function buildMetadata(input: MetaInput): Metadata {
  const {
    title,
    description,
    path = '/',
    siteName = 'Naperville Home Pros',
    ogType = 'website',
    image,
    locale = 'en_US',
    alternates
  } = input;

  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
  const ogImages: NonNullable<NonNullable<Metadata['openGraph']>['images']> =
    image
      ? [
          {
            url: image.url,
            width: image.width ?? 1200,
            height: image.height ?? 630,
            alt: image.alt ?? title,
          },
        ]
      : [
          {
            url: `${BASE_URL}/static/og-default.jpg`,
            width: 1200,
            height: 630,
            alt: title,
          },
        ];

  const md: Metadata = {
    title,
    description,
    alternates: {
      canonical: url,
      languages: alternates ?? undefined, // object map of locale -> URL; optional
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: ogImages,
      locale,
      type: ogType as OGType, // <-- ensure it's a valid literal
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImages.map(i => (typeof i === 'string' ? i : 'url' in i ? i.url : i.toString())),
    },
  };

  return md;
}

// Convenience component if you were rendering tags manually (optional):
export default function SchemaMetadata(_: { meta?: Metadata }) {
  // No-op in App Router when using exported `metadata` per page.
  return null;
}

// Helper function for category pages
export function generateCategoryMetadata(category: {
  name: string;
  slug: string;
  description: string;
}) {
  return buildMetadata({
    title: `${category.name} Services in Naperville & Wheaton, IL`,
    description: category.description || `Find trusted ${category.name.toLowerCase()} professionals in Naperville and Wheaton, IL. Compare local services, read reviews, and contact top-rated providers.`,
    path: `/${category.slug}`,
    ogType: 'website',
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
  return buildMetadata({
    title: `${business.name} - ${business.category.name} in Naperville & Wheaton, IL`,
    description: business.description || `${business.name} provides professional ${business.category.name.toLowerCase()} services in Naperville and Wheaton, IL. Contact them today for a quote.`,
    path: `/${business.category.slug}/${business.slug}`,
    image: business.image ? { url: business.image } : undefined,
    ogType: 'website', // Using 'website' as 'business.business' is not in the OGType union
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
  return buildMetadata({
    title: `${post.title} | Naperville Home Pros Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage ? { url: post.coverImage } : undefined,
    ogType: 'article',
  });
}
