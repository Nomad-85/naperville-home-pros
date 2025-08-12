import listings from '../../data/listings.json';

// Define the Listing type if not already imported
export type Listing = {
  category: string;
  slug: string;
  name: string;
  phone: string;
  website?: string | null;
  short_description: string;
  services?: string[];
  service_areas?: string[];
  hours?: string | null;
  image?: string | null;
  city?: string;
  featured?: boolean;
};

/**
 * Get all listings from the data source
 */
export function getListings(): Listing[] {
  return listings as Listing[];
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

/**
 * Get a specific listing by category and slug
 */
export function getListingBySlugs(category: string, slug: string): Listing | undefined {
  return getListings().find(l => l.category === category && l.slug === slug);
}
