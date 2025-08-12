import listings from '../data/listings.json';

// Define the Listing type if not already imported
export interface Listing {
  category: string;
  featured: boolean;
  name: string;
  slug: string;
  phone: string;
  website: string | null;
  short_description: string;
  services: string[];
  service_areas: string[];
  hours: string | null;
  image: string | null;
  city: string;
  address?: string;
  email?: string;
  notes?: string;
}

/**
 * Get all listings from the data source
 */
export function getListings(): Listing[] {
  return listings as unknown as Listing[];
}

/**
 * Get listings filtered by category slug
 */
export function getListingsByCategory(slug: string): Listing[] {
  return getListings().filter(l => l.category === slug);
}

/**
 * Get featured listings, optionally limited to a specific count
 */
export function getFeaturedListings(limit = 6): Listing[] {
  return getListings()
    .filter(l => l.featured === true)
    .slice(0, limit);
}
