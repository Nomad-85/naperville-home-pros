import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import Search from '@/components/Search';
import categories from '@/data/categories.json';
import { SEO_CONSTANTS } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Service Categories | Naperville Home Pros',
  description: 'Browse home service categories in Naperville & Wheaton. Find plumbers, electricians, roofers, HVAC technicians, and more local professionals.',
};

export default function CategoriesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-700 text-white">
        <div className="container py-12">
          <h1 className="text-3xl font-bold">Service Categories</h1>
          <p className="mt-2 text-lg text-primary-100">
            Find trusted home service professionals in Naperville & Wheaton
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="container py-8">
        <Search categories={categories} />
      </section>

      {/* Categories Grid */}
      <section className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="aspect-[3/2] overflow-hidden rounded-xl w-full relative">
                <Image 
                  src={category.image || "/static/placeholders/category.jpg" || "/static/og-default.jpg"}
                  alt={`${category.name} in Naperville & Wheaton`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gray-900 opacity-40"></div>
                <h2 className="absolute inset-0 z-10 flex items-center justify-center text-xl font-bold text-white text-center">
                  {category.name}
                </h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600">
                  Find the best {category.name.toLowerCase()} in Naperville & Wheaton
                </p>
                <div className="mt-4 text-primary-600 font-medium">
                  View {category.name} →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Naperville Home Pros
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary-100 text-primary-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Trusted Local Pros</h3>
              <p className="mt-2 text-gray-600">
                We feature only established local businesses serving Naperville & Wheaton.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary-100 text-primary-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Featured Listings</h3>
              <p className="mt-2 text-gray-600">
                Our featured providers are highlighted for their exceptional service and reliability.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary-100 text-primary-600">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Easy Contact</h3>
              <p className="mt-2 text-gray-600">
                Connect directly with service providers with just one click or tap.
              </p>
            </div>
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
