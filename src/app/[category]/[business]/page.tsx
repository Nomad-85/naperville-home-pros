import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import FeaturedBadge from '@/components/FeaturedBadge';
import categories from '@/data/categories.json';
import listings from '@/data/listings.json';
import { SEO_CONSTANTS } from '@/lib/seo';

interface BusinessPageProps {
  params: {
    category: string;
    business: string;
  };
}

// Generate metadata for each business page
export async function generateMetadata({ params }: BusinessPageProps): Promise<Metadata> {
  const { category: categorySlug, business: businessSlug } = params;
  
  const listing = listings.find(
    listing => listing.category === categorySlug && listing.slug === businessSlug
  );
  
  if (!listing) {
    return {
      title: 'Business Not Found',
    };
  }
  
  const category = categories.find(c => c.slug === categorySlug);
  
  return {
    title: `${listing.name} — ${category?.name} in Naperville & Wheaton`,
    description: `Contact ${listing.name} for ${listing.services.slice(0, 2).join(', ')}. Serving Naperville & Wheaton.`,
  };
}

// Generate static paths for all businesses
export async function generateStaticParams() {
  return listings.map(listing => ({
    category: listing.category,
    business: listing.slug,
  }));
}

// Get the appropriate Schema.org business type based on category
function getBusinessType(categorySlug: string): string {
  const businessTypes: Record<string, string> = {
    plumbers: 'Plumber',
    electricians: 'Electrician',
    roofers: 'RoofingContractor',
    hvac: 'HVACBusiness',
    landscapers: 'LandscapeArchitect',
    painters: 'ProfessionalService',
    flooring: 'HomeAndConstructionBusiness',
    remodeling: 'GeneralContractor',
  };
  
  return businessTypes[categorySlug] || 'LocalBusiness';
}

export default function BusinessPage({ params }: BusinessPageProps) {
  const { category: categorySlug, business: businessSlug } = params;
  
  // Find the listing
  const listing = listings.find(
    listing => listing.category === categorySlug && listing.slug === businessSlug
  );
  
  // If listing doesn't exist, return 404
  if (!listing) {
    notFound();
  }
  
  // Find the category
  const category = categories.find(c => c.slug === categorySlug);
  
  if (!category) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-700 text-white">
        <div className="container py-12">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: category.name, href: `/${category.slug}` },
              { label: listing.name, href: `/${category.slug}/${listing.slug}`, isCurrent: true },
            ]}
          />
          <div className="flex items-center mt-4">
            {listing.featured && (
              <FeaturedBadge className="mr-3" />
            )}
            <h1 className="text-3xl font-bold">
              {listing.name} — {category.name} in {listing.city}
            </h1>
          </div>
        </div>
      </section>

      <section className="container py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image */}
            <div className="relative h-64 w-full rounded-lg overflow-hidden mb-6">
              <div className="absolute inset-0 bg-gray-200"></div>
            </div>
            
            {/* Description */}
            <div className="prose max-w-none">
              <p className="text-lg">{listing.short_description}</p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Services</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {listing.services.map((service) => (
                  <li key={service} className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {service}
                  </li>
                ))}
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Service Areas</h2>
              <div className="flex flex-wrap gap-2">
                {listing.service_areas.map((area) => (
                  <span key={area} className="px-3 py-1 bg-gray-100 rounded-full text-gray-700">
                    {area}
                  </span>
                ))}
              </div>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">About {listing.name}</h2>
              <p>
                {listing.name} is a trusted {category.name.toLowerCase().slice(0, -1)} serving {listing.service_areas.join(', ')} and surrounding areas. 
                With a focus on quality workmanship and customer satisfaction, they provide reliable service for all your {category.name.toLowerCase()} needs.
              </p>
              <p>
                Whether you need {listing.services.slice(0, 2).join(', ')}, or other {category.name.toLowerCase()} services, 
                their experienced team is ready to help. Contact them today to schedule service or request a quote.
              </p>
            </div>
          </div>
          
          {/* Contact Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              
              {/* Phone */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <a 
                  href={`tel:${listing.phone.replace(/[^\d+]/g, '')}`}
                  className="flex items-center mt-1 text-lg font-medium text-primary-600 hover:text-primary-700"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {listing.phone}
                </a>
              </div>
              
              {/* Website */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Website</h3>
                <a 
                  href={listing.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center mt-1 text-primary-600 hover:text-primary-700"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Website
                </a>
              </div>
              
              {/* Hours */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Business Hours</h3>
                <p className="mt-1">{listing.hours}</p>
              </div>
              
              {/* Service Areas */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Areas Served</h3>
                <p className="mt-1">{listing.service_areas.join(', ')}</p>
              </div>
              
              {/* Request Quote Form */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Request a Quote</h3>
                <form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Send Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Businesses */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            More {category.name} in {listing.city}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings
              .filter(l => l.category === categorySlug && l.slug !== businessSlug)
              .slice(0, 3)
              .map((relatedListing) => (
                <div key={relatedListing.slug} className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    <Link 
                      href={`/${relatedListing.category}/${relatedListing.slug}`}
                      className="hover:text-primary-600"
                    >
                      {relatedListing.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">{relatedListing.short_description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <a 
                      href={`tel:${relatedListing.phone.replace(/[^\d+]/g, '')}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      {relatedListing.phone}
                    </a>
                    <Link 
                      href={`/${relatedListing.category}/${relatedListing.slug}`}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": getBusinessType(categorySlug),
          "name": listing.name,
          "image": `${SEO_CONSTANTS.DOMAIN}${listing.image}`,
          "telephone": listing.phone,
          "url": `${SEO_CONSTANTS.DOMAIN}/${listing.category}/${listing.slug}`,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": listing.city,
            "addressRegion": "IL"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "41.7508",
            "longitude": "-88.1535"
          },
          "openingHours": listing.hours,
          "areaServed": listing.service_areas.map(area => ({
            "@type": "City",
            "name": `${area}, IL`
          })),
          "priceRange": "$$"
        }}
      />
    </>
  );
}
