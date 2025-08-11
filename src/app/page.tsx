import React from 'react';
import Link from 'next/link';
import Search from '@/components/Search';
import ListingCard from '@/components/ListingCard';
import CTASection from '@/components/CTASection';
import { JsonLd } from '@/components/JsonLd';
import Container from '@/components/Container';
import OptimizedImage from '@/components/OptimizedImage';
import categories from '@/data/categories.json';
import listings from '@/data/listings.json';
import { SEO_CONSTANTS } from '@/lib/seo';
import { buildMetadata, buildViewport } from '@/components/SchemaMetadata';

export const metadata = buildMetadata({
  title: 'Home Service Pros in Naperville & Wheaton | Naperville Home Pros',
  description: 'Find trusted plumbers, electricians, roofers & more. Compare top local pros in Naperville & Wheaton. Feature your business today.',
  path: '/',
  ogType: 'website'
});

export const viewport = buildViewport({
  width: 'device-width',
  initialScale: 1,
  maximumScale: 2,
  userScalable: true,
  themeColor: '#0f766e'
});

export default function Home() {
  // Get featured listings
  const featuredListings = listings
    .filter(listing => listing.featured)
    .slice(0, 6);
  
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
      <section className="relative bg-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern-grid"></div>
        </div>
        <Container spacing="xl" animate={true}>
          <div className="max-w-3xl relative z-10">
            <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl leading-tight">
              Find Trusted Home Service Pros in Naperville & Wheaton
            </h1>
            <p className="mt-6 text-xl text-primary-100">
              Connect with top-rated local service providers for all your home maintenance and improvement needs.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/categories" className="px-6 py-3 bg-white text-primary-700 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-md">
                Browse Categories
              </Link>
              <Link href="/add-your-business" className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-500 transition-colors border border-primary-500 shadow-md">
                Add Your Business
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Search Section */}
      <section className="-mt-10">
        <Container spacing="none">
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-100 animate-slideInUp">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Find Local Service Providers</h2>
            <Search categories={categories} />
          </div>
        </Container>
      </section>

      {/* Featured Categories */}
      <section className="bg-gray-50">
        <Container spacing="lg" animate={true}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Browse our most popular service categories in Naperville & Wheaton.</p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="group relative flex items-center justify-center h-40 overflow-hidden bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="absolute inset-0 bg-gray-900 opacity-40 group-hover:opacity-50 transition-opacity"></div>
                <h3 className="relative z-10 text-xl font-bold text-white text-center">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Listings */}
      <section>
        <Container spacing="lg" animate={true}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Providers</h2>
              <p className="text-lg text-gray-600 mb-6 md:mb-0 max-w-2xl">Top-rated service providers in Naperville & Wheaton.</p>
            </div>
            <Link 
              href="/categories" 
              className="px-6 py-3 text-primary-600 hover:text-primary-700 font-medium border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition-colors shadow-sm inline-flex items-center"
            >
              View All Categories
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="mt-16 text-center">
            <Link
              href="/categories"
              className="px-8 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-500 transition-colors shadow-md inline-flex items-center group"
            >
              View All Service Providers
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="bg-primary-50">
        <Container spacing="lg" animate={true}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Finding the right service provider is easy with Naperville Home Pros.</p>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-primary-100 text-primary-600 shadow-inner">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Browse</h3>
              <p className="mt-4 text-gray-600 text-lg">
                Find the right service provider by category or search for specific needs.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-primary-100 text-primary-600 shadow-inner">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Compare</h3>
              <p className="mt-4 text-gray-600 text-lg">
                Review services, areas served, and contact information to make the best choice.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-24 h-24 mb-8 rounded-full bg-primary-100 text-primary-600 shadow-inner">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Contact</h3>
              <p className="mt-4 text-gray-600 text-lg">
                Reach out directly to service providers with one click to get your project started.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Recent Blog Posts */}
      <section className="bg-gray-50">
        <Container spacing="lg" animate={true}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Articles</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Stay informed with the latest tips and insights for homeowners.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {recentPosts.map((post) => (
              <div key={post.slug} className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 bg-white transform hover:-translate-y-1 h-full flex flex-col">
                <div className="relative w-full aspect-[3/2] overflow-hidden rounded-t-xl bg-gray-100">
                  <OptimizedImage
                    src={post.image || "/static/placeholders/listing.jpg"}
                    alt={post.title}
                    fill
                    priority={false}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <p className="text-sm font-medium text-primary-600 mb-1">{post.date}</p>
                  <h3 className="mt-2 text-xl font-bold text-gray-900">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary-600 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-4 text-gray-600 text-lg line-clamp-3">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center mt-6 text-base font-medium text-primary-600 hover:text-primary-700 transition-colors group"
                  >
                    Read More
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-500 transition-colors shadow-md inline-flex items-center"
            >
              View All Articles
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </Container>
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
