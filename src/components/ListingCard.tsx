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
    <div className={featured ? 'card-featured' : 'card'}>
      <div className="relative">
        {/* Image */}
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-2 right-2">
            <FeaturedBadge />
          </div>
        )}
      </div>
      
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900">
          <Link 
            href={`/${category}/${slug}`}
            className="hover:text-primary-600"
          >
            {name}
          </Link>
        </h3>
        
        {/* Location */}
        <p className="mt-1 text-sm text-gray-500">{city}</p>
        
        {/* Description */}
        <p className="mt-2 text-sm text-gray-600">{short_description}</p>
        
        {/* Services */}
        <div className="flex flex-wrap gap-1 mt-3">
          {services.slice(0, 3).map((service) => (
            <span 
              key={service} 
              className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-700"
            >
              {service}
            </span>
          ))}
          {services.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-700">
              +{services.length - 3} more
            </span>
          )}
        </div>
        
        {/* Contact */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <a 
            href={`tel:${phone.replace(/[^\d+]/g, '')}`}
            className="flex items-center text-primary-600 hover:text-primary-700"
          >
            <svg 
              className="w-4 h-4 mr-1" 
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
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
