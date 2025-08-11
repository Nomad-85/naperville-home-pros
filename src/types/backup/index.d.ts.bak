// Type declarations for the Naperville Home Pros project

// React and Next.js type declarations
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Add custom attributes here
  }
}

// JSON data types
interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  count?: number;
}

interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface BusinessListing {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  hours?: BusinessHours[];
  services?: string[];
  features?: string[];
  images?: string[];
  logo?: string;
  coverImage?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];
  featured?: boolean;
  verified?: boolean;
  established?: string;
  paymentMethods?: string[];
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorTitle?: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

// Declare JSON modules
declare module '*.json' {
  const value: any;
  export default value;
}

// Declare CSS modules
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Declare image modules
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

// Environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_BASE_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
