import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import SearchBar from '@/components/SearchBar';
import OptimizedImage from '@/components/OptimizedImage';
import StructuredData from '@/components/StructuredData';

interface SearchPageProps {
  searchParams: { q?: string };
}

// Generate metadata for the search page
export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || '';
  
  return {
    title: query ? `Search results for "${query}" | Naperville Home Pros` : 'Search | Naperville Home Pros',
    description: `Search results for home service professionals in Naperville and Wheaton, IL${query ? ` matching "${query}"` : ''}`,
    robots: {
      index: false, // Don't index search results pages
      follow: true,
    },
  };
}

// Mock function to simulate search results
async function getSearchResults(query: string) {
  'use server';
  
  // In a real implementation, this would be an API call or database query
  // For now, we'll import the listings data directly
  const listings = (await import('@/data/listings.json')).default;
  
  if (!query) return [];
  
  return listings.filter((listing: any) => 
    listing.name.toLowerCase().includes(query.toLowerCase()) ||
    listing.description.toLowerCase().includes(query.toLowerCase()) ||
    listing.category.name.toLowerCase().includes(query.toLowerCase())
  ).map((listing: any) => ({
    id: listing.id,
    name: listing.name,
    category: listing.category.name,
    categorySlug: listing.category.slug,
    slug: listing.slug,
    description: listing.description,
    image: listing.image || '/images/placeholder.jpg',
    featured: listing.featured || false,
  }));
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const results = query ? await getSearchResults(query) : [];
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Search', href: '/search', isCurrent: true },
  ];

  return (
    <>
      <div className="bg-gray-50 py-8">
        <div className="container">
          <Breadcrumbs items={breadcrumbItems} />
          
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {query ? `Search Results for "${query}"` : 'Search'}
          </h1>
          
          <div className="max-w-2xl mb-8">
            <SearchBar placeholder="Search for services..." className="w-full" />
          </div>
          
          {query && (
            <p className="text-gray-600 mb-6">
              Found {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>
      
      <div className="container py-8">
        {!query ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Enter a search term to find home service professionals
            </h2>
            <p className="text-gray-600 mb-8">
              Search for services, business names, or categories to find the right professional for your needs
            </p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
              <div 
                key={result.id} 
                className={`${result.featured ? 'card-featured' : 'card'} h-full flex flex-col`}
              >
                <div className="relative h-48">
                  <OptimizedImage
                    src={result.image}
                    alt={result.name}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {result.featured && (
                    <span className="absolute top-2 right-2 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-primary-600 uppercase tracking-wider">
                      {result.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    <Link 
                      href={`/${result.categorySlug}/${result.slug}`}
                      className="hover:text-primary-600 hover:underline"
                    >
                      {result.name}
                    </Link>
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {result.description}
                  </p>
                  <Link
                    href={`/${result.categorySlug}/${result.slug}`}
                    className="text-primary-600 font-medium text-sm hover:underline inline-flex items-center"
                  >
                    View Details
                    <svg 
                      className="w-4 h-4 ml-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              No results found for &quot;{query}&quot;
            </h2>
            <p className="text-gray-600 mb-8">
              Try adjusting your search terms or browse our categories below
            </p>
            <Link 
              href="/"
              className="btn"
            >
              Browse All Categories
            </Link>
          </div>
        )}
      </div>
      
      {/* Structured data for search page */}
      <StructuredData
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          'name': query ? `Search results for "${query}"` : 'Search',
          'description': `Search results for home service professionals in Naperville and Wheaton, IL${query ? ` matching "${query}"` : ''}`,
          'url': `https://napervillehomepros.com/search${query ? `?q=${query}` : ''}`,
          'isPartOf': {
            '@type': 'WebSite',
            'name': 'Naperville Home Pros',
            'url': 'https://napervillehomepros.com',
            'potentialAction': {
              '@type': 'SearchAction',
              'target': 'https://napervillehomepros.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          }
        }}
      />
    </>
  );
}
