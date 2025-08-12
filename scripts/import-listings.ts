import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import categories from '../src/data/categories.json';

// Define the shape of our listings
interface Listing {
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

// Define the shape of our CSV records
interface CsvRecord {
  category_slug: string;
  name: string;
  phone: string;
  city: string;
  website: string;
  featured: string;
  short_description: string;
  services: string;
  service_areas: string;
  hours: string;
  image: string;
  address: string;
  email: string;
  notes: string;
}

// Convert kebab case
function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Main function to import listings
async function importListings() {
  try {
    // Define file paths
    const csvPath = path.join(process.cwd(), 'data', 'listings.csv');
    const jsonPath = path.join(process.cwd(), 'data', 'listings.json');
    
    // Check if CSV file exists
    if (!fs.existsSync(csvPath)) {
      console.error(`Error: CSV file not found at ${csvPath}`);
      process.exit(1);
    }
    
    // Read CSV file
    const csvData = fs.readFileSync(csvPath, 'utf8');
    
    // Parse CSV data
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    }) as CsvRecord[];
    
    console.log(`Found ${records.length} records in CSV file`);
    
    // Get category slugs for validation
    const categorySlugs = categories.map(category => category.slug);
    
    // Read existing listings JSON
    let existingListings: Listing[] = [];
    if (fs.existsSync(jsonPath)) {
      const jsonData = fs.readFileSync(jsonPath, 'utf8');
      existingListings = JSON.parse(jsonData);
      console.log(`Found ${existingListings.length} existing listings`);
    }
    
    // Create a map for quick lookup of existing listings by category+slug
    const existingListingsMap = new Map<string, Listing>();
    existingListings.forEach(listing => {
      const key = `${listing.category}:${listing.slug}`;
      existingListingsMap.set(key, listing);
    });
    
    // Process CSV records
    const processedRecords: Listing[] = [];
    const errors: string[] = [];
    const warnings: string[] = [];
    
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      const lineNumber = i + 2; // +2 because of 0-indexing and header row
      
      // Validate required fields
      if (!record.category_slug || !record.name || !record.phone || !record.city || !record.short_description) {
        errors.push(`Line ${lineNumber}: Missing required fields (category_slug, name, phone, city, short_description)`);
        continue;
      }
      
      // Validate category
      if (!categorySlugs.includes(record.category_slug)) {
        errors.push(`Line ${lineNumber}: Invalid category slug "${record.category_slug}". Must be one of: ${categorySlugs.join(', ')}`);
        continue;
      }
      
      // Generate slug from name
      const slug = toKebabCase(record.name);
      
      // Create listing object
      const listing: Listing = {
        category: record.category_slug,
        featured: record.featured.toLowerCase() === 'true',
        name: record.name,
        slug,
        phone: record.phone,
        website: record.website || null,
        short_description: record.short_description,
        services: record.services ? record.services.split('|').map(s => s.trim()) : [],
        service_areas: record.service_areas ? record.service_areas.split('|').map(s => s.trim()) : [],
        hours: record.hours || null,
        image: record.image ? (record.image.startsWith('http') ? record.image : `/static/providers/${record.image}`) : null,
        city: record.city
      };
      
      // Check for duplicate slugs within the same category
      const key = `${listing.category}:${listing.slug}`;
      const existingIndex = processedRecords.findIndex(l => l.category === listing.category && l.slug === listing.slug);
      
      if (existingIndex !== -1) {
        warnings.push(`Line ${lineNumber}: Duplicate slug "${listing.slug}" in category "${listing.category}". Skipping.`);
        continue;
      }
      
      // Add to processed records
      processedRecords.push(listing);
    }
    
    // Merge with existing listings
    const mergedListings: Listing[] = [];
    const seenKeys = new Set<string>();
    
    // First add processed records
    for (const listing of processedRecords) {
      const key = `${listing.category}:${listing.slug}`;
      mergedListings.push(listing);
      seenKeys.add(key);
    }
    
    // Then add existing listings that weren't replaced
    for (const listing of existingListings) {
      const key = `${listing.category}:${listing.slug}`;
      if (!seenKeys.has(key)) {
        mergedListings.push(listing);
        seenKeys.add(key);
      }
    }
    
    // Write to JSON file
    fs.writeFileSync(jsonPath, JSON.stringify(mergedListings, null, 2));
    
    // Print results
    console.log(`\nImport completed:`);
    console.log(`- ${records.length} rows read`);
    console.log(`- ${processedRecords.length} records processed`);
    console.log(`- ${mergedListings.length} total listings in output file`);
    console.log(`- ${errors.length} rows skipped due to errors`);
    
    if (errors.length > 0) {
      console.error('\nErrors:');
      errors.forEach(error => console.error(`- ${error}`));
    }
    
    if (warnings.length > 0) {
      console.warn('\nWarnings:');
      warnings.forEach(warning => console.warn(`- ${warning}`));
    }
    
  } catch (error) {
    console.error('Error importing listings:', error);
    process.exit(1);
  }
}

// Run the import
importListings().catch(console.error);
