'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FeaturedBadge from './FeaturedBadge';

interface ListingCardProps {
  name: string;
  slug: string;
  category: string;
  city: string;
  short_description: string;
  phone: string;
  image: string;
  featured: boolean;
  services: string[];
}

const ListingCard: React.FC<ListingCardProps> = ({
  name,
  slug,
  category,
  city,
  short_description,
  phone,
  image,
  featured,
  services,
}) => {
  return (
    <div className={`overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col ${featured ? 'border-2 border-primary-500 bg-primary-50/20' : 'border border-gray-100'}`}>
      <div className="relative">
        {/* Image */}
        <div className="relative w-full aspect-[3/2] overflow-hidden rounded-t-xl bg-gray-100">
          <Image
            src={image || "/static/placeholders/listing.jpg"}
            alt={name}
            fill
            className="rounded-xl object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Fallback if the image fails to load
              const target = e.target as HTMLImageElement;
              target.src = "/static/placeholders/listing.jpg";
            }}
          />
        </div>
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-3 right-3 z-10">
            <FeaturedBadge className="shadow-md" />
          </div>
        )}
      </div>
      
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors">
          <Link 
            href={`/${category}/${slug}`}
            className="hover:text-primary-600 transition-colors"
          >
            {name}
          </Link>
        </h3>
        
        {/* Location */}
        <p className="mt-1 text-sm text-gray-500">{city}</p>
        
        {/* Description */}
        <p className="mt-3 text-base text-gray-600 line-clamp-2">{short_description}</p>
        
        {/* Services */}
        <div className="flex flex-wrap gap-2 mt-5 flex-1">
          {services.slice(0, 3).map((service) => (
            <span 
              key={service} 
              className="px-3 py-1.5 text-sm font-medium bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors shadow-sm"
            >
              {service}
            </span>
          ))}
          {services.length > 3 && (
            <span className="px-3 py-1.5 text-sm font-medium bg-primary-100 rounded-full text-primary-700 hover:bg-primary-200 transition-colors shadow-sm">
              +{services.length - 3} more
            </span>
          )}
        </div>
        
        {/* Contact */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100 mt-auto">
          <a 
            href={`tel:${phone.replace(/[^\d+]/g, '')}`}
            className="flex items-center text-primary-600 hover:text-primary-700 font-medium group"
          >
            <svg 
              className="w-5 h-5 mr-2 group-hover:animate-pulse" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
              />
            </svg>
            {phone}
          </a>
          <Link 
            href={`/${category}/${slug}`}
            className="inline-flex items-center text-base font-medium text-primary-600 hover:text-primary-700 transition-colors group"
          >
            View Details
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
