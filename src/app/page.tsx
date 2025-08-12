import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { buildMetadata, buildViewport } from '@/components/SchemaMetadata';
import { SEO_CONSTANTS } from '@/lib/seo';
import ListingCard from '@/components/ListingCard';
import SearchBar from '@/components/SearchBar';
import CTASection from '@/components/CTASection';
import { JsonLd } from '@/components/JsonLd';
import { getFeaturedListings } from '@/lib/data';
import categories from '@/data/categories.json';
import blogs from '@/data/blogs.json';

export const metadata = buildMetadata({
  title: 'Home Service Pros in Naperville & Wheaton | Naperville Home Pros',
  description: 'Find trusted plumbers, electricians, roofers & more. Compare top local pros in Naperville & Wheaton. Feature your business today.',
  path: '/',
  ogType: 'website'
});

export const viewport = buildViewport({
  themeColor: '#4f46e5'
});

export default function Home() {
  // Get featured listings
  const featuredListings = getFeaturedListings(6);
  
  // Get recent blog posts (placeholder for now)
  const recentPosts = [
    {
      title: 'Top 10 Plumbers in Naperville (2025 Update)',
      slug: 'top-10-plumbers-in-naperville-2025',
      excerpt: 'Looking for a reliable plumber in Naperville? Our updated guide covers the top 10 plumbing companies with proven track records.',
      date: '2025-07-28',
      image: '/static/blog/plumbers-naperville.jpg',
    },
    {
      title: 'How to Choose a Roofing Contractor in Wheaton',
      slug: 'how-to-choose-a-roofing-contractor-in-wheaton',
      excerpt: 'Selecting the right roofing contractor is crucial for your home. Learn what questions to ask and red flags to watch for.',
      date: '2025-07-15',
      image: '/static/blog/roofing-wheaton.jpg',
    },
    {
      title: 'Naperville HVAC: Repair vs Replace — What to Know Before Winter',
      slug: 'naperville-hvac-repair-vs-replace-guide',
      excerpt: 'Is your furnace ready for winter? Learn when to repair and when to replace your HVAC system to avoid costly emergencies.',
      date: '2025-07-01',
      image: '/static/blog/hvac-winter.jpg',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary-700 text-white">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Find Trusted Home Service Pros in Naperville & Wheaton
            </h1>
            <p className="mt-4 text-lg text-primary-100">
              Connect with top-rated local service providers for all your home maintenance and improvement needs.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container -mt-8 mb-12 relative z-10">
        <SearchBar placeholder="Search for services or providers..." />
      </section>

      {/* Featured Categories */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="group relative flex items-center justify-center overflow-hidden bg-white rounded-lg shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="aspect-[3/2] overflow-hidden rounded-xl w-full relative">
                  {category.image ? (
                    <Image 
                      src={category.image}
                      alt={`${category.name || category.slug} in Naperville & Wheaton`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <Image 
                      src="/static/placeholders/category.jpg"
                      alt={`${category.name || category.slug} in Naperville & Wheaton`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gray-900 opacity-40 group-hover:opacity-50 transition-opacity"></div>
                <h3 className="absolute inset-0 z-10 flex items-center justify-center text-xl font-bold text-white text-center">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Service Providers</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredListings.map((listing) => (
              <ListingCard
                key={listing.slug}
                name={listing.name}
                slug={listing.slug}
                category={listing.category}
                city={listing.city}
                short_description={listing.short_description}
                phone={listing.phone}
                image={listing.image}
                featured={listing.featured}
                services={listing.services}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/categories"
              className="btn-secondary"
            >
              View All Service Providers
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary-100 text-primary-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Search</h3>
              <p className="mt-2 text-gray-600">
                Find the right service provider by category or search for specific needs.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary-100 text-primary-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Compare</h3>
              <p className="mt-2 text-gray-600">
                Review services, areas served, and contact information to make the best choice.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary-100 text-primary-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Contact</h3>
              <p className="mt-2 text-gray-600">
                Reach out directly to service providers with one click to get your project started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Recent Blog Posts */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Articles</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {recentPosts.map((post) => (
              <div key={post.slug} className="card overflow-hidden">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gray-200"></div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500">{post.date}</p>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary-600">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block mt-4 text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="btn-secondary"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": categories.map((category, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Service",
              "name": category.name,
              "url": `${SEO_CONSTANTS.DOMAIN}/${category.slug}`
            }
          }))
        }}
      />
    </>
  );
}
